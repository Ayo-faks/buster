import type { Sandbox } from '@buster/sandbox';
import { currentSpan, initLogger, wrapTraced } from 'braintrust';
import type { Logger as BraintrustLogger } from 'braintrust';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { DocsAgentContext } from '../../agents/docs-agent/docs-agent-context';
import { runDocsAgentWorkflow } from './docs-agent-workflow';
import {
  TEST_MESSAGES,
  createContextWithClarifications,
  createContextWithTodos,
  createPartiallyCompletedContext,
  createTestContext,
  createTestWorkflowInput,
  validateWorkflowOutput,
} from './test-helpers/context-helpers';
import {
  type TestSandboxResult,
  addFilesToSandbox,
  createComplexProjectStructure,
  createFilesWithMissingDocs,
  createIntegrationTestSandbox,
  createMalformedYamlFiles,
} from './test-helpers/sandbox-helpers';

describe('docs-agent-workflow', () => {
  let testSandbox: TestSandboxResult | null = null;
  let braintrustLogger: BraintrustLogger<true> | null = null;

  // Initialize Braintrust logger before each test
  beforeEach(() => {
    if (process.env.BRAINTRUST_KEY) {
      braintrustLogger = initLogger({
        apiKey: process.env.BRAINTRUST_KEY,
        projectName: 'DOCS-AGENT',
      });
    }
  });

  // Cleanup after each test
  afterEach(async () => {
    if (testSandbox) {
      await testSandbox.cleanup();
      testSandbox = null;
    }
    if (braintrustLogger) {
      await braintrustLogger.flush();
      braintrustLogger = null;
    }
  });

  /**
   * Helper to run workflow with Braintrust tracing
   */
  async function runWorkflowWithTracing(input: unknown, metadata: Record<string, unknown> = {}) {
    if (!braintrustLogger) {
      // Run without tracing if no Braintrust key
      return await runDocsAgentWorkflow(input as any);
    }

    return await wrapTraced(
      async () => {
        currentSpan().log({
          metadata: {
            testName: expect.getState().currentTestName,
            ...metadata,
          },
        });

        return await runDocsAgentWorkflow(input as any);
      },
      {
        name: 'Docs Agent Workflow Test',
      }
    )();
  }

  describe('basic workflow execution', () => {
    it('should successfully document a simple dbt project', async () => {
      // Create test sandbox with a minimal project
      testSandbox = await createIntegrationTestSandbox({
        projectOptions: {
          projectName: 'test_analytics',
          companyName: 'TestCo',
          includeDocumentation: false, // Start without docs
          includeTests: false, // Simplify - no tests
          includeMacros: false, // Simplify - no macros
        },
      });

      const context = createTestContext({
        sandbox: testSandbox.sandbox,
      });

      const input = createTestWorkflowInput({
        message: TEST_MESSAGES.documentAll, // Use simpler test message
        context,
      });

      const result = await runWorkflowWithTracing(input, {
        testType: 'basic-documentation',
        projectType: 'simple-dbt',
      });

      expect(result).toBeDefined();
      expect(result.status).toBe('success');
      if (result.status === 'success') {
        // Check that the workflow completes
        expect(result.result).toBeDefined();
        expect(result.result.todos).toBeDefined();
        expect(result.result.todoList).toBeDefined();

        // Log what actually happened for debugging
        console.log('Workflow completed with:', {
          documentationCreated: result.result.documentationCreated,
          filesCreated: result.result.metadata?.filesCreated,
          toolsUsed: result.result.metadata?.toolsUsed,
          finished: result.result.finished,
        });

        // For now, we're just checking that the workflow runs without errors
        // The mock sandbox doesn't actually create files, but the agent should attempt to
      }
    }, 300000); // Increase timeout to 5 minutes

    it('should generate clarification questions when needed', async () => {
      testSandbox = await createIntegrationTestSandbox();

      // Add files with unclear business logic
      await addFilesToSandbox(
        testSandbox.sandbox,
        createFilesWithMissingDocs(),
        testSandbox.projectPath
      );

      const context = createTestContext({
        sandbox: testSandbox.sandbox,
      });

      const input = createTestWorkflowInput({
        message: TEST_MESSAGES.askClarification,
        context,
      });

      const result = await runWorkflowWithTracing(input, {
        testType: 'clarification-needed',
      });

      const validation = validateWorkflowOutput(result);
      expect(validation.isValid).toBe(true);

      if (result.status === 'success' && result.result.clarificationNeeded) {
        expect(result.result.clarificationQuestion).toBeDefined();
        if (result.result.clarificationQuestion) {
          expect(result.result.clarificationQuestion.issue).toBeTruthy();
          expect(result.result.clarificationQuestion.context).toBeTruthy();
          expect(result.result.clarificationQuestion.clarificationQuestion).toBeTruthy();
        }
      }
    });
  }, 300000);
});
