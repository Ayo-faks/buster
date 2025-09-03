import { relative, resolve } from 'node:path';
import { getConfigBaseDir, loadBusterConfig, resolveConfiguration } from './config/config-loader';
import {
  createParseFailures,
  formatDeploymentSummary,
  mergeDeploymentResults,
  processDeploymentResponse,
} from './deployment/results';
import {
  type DeployFunction,
  createAuthenticatedDeployer,
  createDryRunDeployer,
} from './deployment/strategies';
import {
  createModelFileMap,
  prepareDeploymentRequest,
  validateModelsForDeployment,
} from './deployment/transformers';
import { discoverModelFiles, filterModelFiles } from './models/discovery';
import { parseModelFile, resolveModelConfig, validateModel } from './models/parsing';
import type { CLIDeploymentResult, DeployOptions, Model, ProjectContext } from './schemas';

/**
 * Main deploy handler that orchestrates the entire deployment pipeline
 * using functional composition
 */
export async function deployHandler(options: DeployOptions): Promise<CLIDeploymentResult> {
  // 1. Determine base directory
  const baseDir = resolve(options.path || '.');

  // 2. Load configuration (required)
  const busterConfig = await loadBusterConfig(baseDir);

  // 3. Create deployment function based on mode
  const deploy = options.dryRun
    ? createDryRunDeployer(options.verbose)
    : await createAuthenticatedDeployer();

  // 4. Process all projects in parallel
  const projectResults = await Promise.all(
    busterConfig.projects.map((project) => processProject(project, baseDir, deploy, options))
  );

  // 5. Merge results from all projects (pure function)
  const finalResult = mergeDeploymentResults(projectResults);

  // 6. Display summary
  const summary = formatDeploymentSummary(finalResult);
  console.info(`\n${summary}`);

  return finalResult;
}

/**
 * Process a single project - this is where the composition happens
 */
async function processProject(
  project: ProjectContext,
  baseDir: string,
  deploy: DeployFunction,
  options: DeployOptions
): Promise<CLIDeploymentResult> {
  console.info(`\n📦 Processing project: ${project.name}`);

  const configBaseDir = getConfigBaseDir(baseDir);
  const resolvedConfig = resolveConfiguration({ projects: [project] }, options, project.name);

  // 1. Discover model files (I/O)
  console.info(`  📁 Discovering model files for ${project.name}...`);
  const allFiles = await discoverModelFiles(resolvedConfig, configBaseDir);
  console.info(`  Found ${allFiles.length} files`);

  // 2. Apply exclusion filters (pure)
  const { included, excluded } = await filterModelFiles(
    allFiles,
    resolvedConfig.exclude,
    configBaseDir
  );

  if (excluded.length > 0 && options.verbose) {
    console.info(`  Excluded ${excluded.length} files based on patterns`);
    for (const ex of excluded) {
      console.info(`    ⛔ ${ex.file}: ${ex.reason}`);
    }
  }

  // 3. Parse and collect models (I/O + pure validation)
  const { models, parseFailures } = await parseAndCollectModels(
    included,
    resolvedConfig,
    configBaseDir
  );

  console.info(`  Successfully parsed ${models.length} models from ${included.length} files`);

  // 4. Check if we have models to deploy
  if (models.length === 0) {
    console.warn(`  ⚠️  No valid models found for project ${project.name}`);
    return {
      success: [],
      updated: [],
      noChange: [],
      failures: createParseFailures(parseFailures, configBaseDir),
      excluded,
    };
  }

  // 5. Validate models for deployment (pure)
  const { valid: validModels, invalid } = validateModelsForDeployment(models);

  // Add validation failures to parse failures
  const allFailures = [
    ...parseFailures,
    ...invalid.map(({ model, errors }) => ({
      file: 'validation',
      error: `Model ${model.name}: ${errors.join(', ')}`,
    })),
  ];

  if (validModels.length === 0) {
    return {
      success: [],
      updated: [],
      noChange: [],
      failures: createParseFailures(allFailures, configBaseDir),
      excluded,
    };
  }

  // 6. Prepare deployment request (pure)
  const deployRequest = prepareDeploymentRequest(validModels);

  // 7. Create model-to-file mapping for result processing (pure)
  const modelFileMap = createModelFileMap(
    included.map((file) => ({
      file: relative(configBaseDir, file),
      models: validModels.filter(
        (_m) =>
          // Find models that came from this file
          // This is a simplified approach - in real implementation,
          // we'd track this during parsing
          true
      ),
    }))
  );

  // 8. Execute deployment (I/O via strategy function)
  console.info(`  🚀 Deploying ${validModels.length} models for ${project.name}...`);

  try {
    const response = await deploy(deployRequest);

    // 9. Process response (pure)
    const result = processDeploymentResponse(response, modelFileMap);

    // Add parse failures and exclusions
    result.failures.push(...createParseFailures(allFailures, configBaseDir));
    result.excluded.push(...excluded);

    // Log deleted models if any
    if (response.deleted && response.deleted.length > 0) {
      console.info(
        `  🗑️  Soft-deleted ${response.deleted.length} models not included in deployment`
      );
      if (options.verbose) {
        for (const name of response.deleted) {
          console.info(`     - ${name}`);
        }
      }
    }

    return result;
  } catch (error) {
    // Handle deployment error
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`  ❌ Deployment failed: ${errorMessage}`);

    return {
      success: [],
      updated: [],
      noChange: [],
      failures: validModels.map((model) => ({
        file: modelFileMap.get(model.name) || 'unknown',
        modelName: model.name,
        errors: [`Deployment error: ${errorMessage}`],
      })),
      excluded,
    };
  }
}

/**
 * Parse and collect models from files
 */
async function parseAndCollectModels(
  files: string[],
  config: {
    data_source_name?: string | undefined;
    database?: string | undefined;
    schema?: string | undefined;
  },
  baseDir: string
): Promise<{ models: Model[]; parseFailures: Array<{ file: string; error: string }> }> {
  const models: Model[] = [];
  const parseFailures: Array<{ file: string; error: string }> = [];

  for (const file of files) {
    try {
      const fileModels = await parseModelFile(file);

      for (const model of fileModels) {
        // Resolve configuration for each model
        const resolved = resolveModelConfig(model, config);

        // Validate the resolved model
        const validation = validateModel(resolved);
        if (!validation.valid) {
          throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        }

        models.push(resolved);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const relativeFile = relative(baseDir, file);
      parseFailures.push({ file: relativeFile, error: errorMessage });
      console.error(`  ❌ Failed to parse ${relativeFile}: ${errorMessage}`);
    }
  }

  return { models, parseFailures };
}

/**
 * Validate deployment options before starting
 */
export function validateDeployOptions(options: DeployOptions): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check if path exists (if provided)
  if (options.path) {
    const fs = require('node:fs');
    if (!fs.existsSync(options.path)) {
      errors.push(`Path does not exist: ${options.path}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
