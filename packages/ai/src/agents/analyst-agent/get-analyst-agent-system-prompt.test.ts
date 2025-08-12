import { describe, expect, it } from 'vitest';
import analystAgentPrompt from './analyst-agent-prompt.txt';
import { getAnalystAgentSystemPrompt } from './get-analyst-agent-system-prompt';

describe('Analyst Agent Instructions', () => {
  it('should validate template file contains expected variables', () => {
    const content = analystAgentPrompt;

    // Expected template variables
    const expectedVariables = ['sql_dialect_guidance', 'date'];

    // Find all template variables in the file
    const templateVariablePattern = /\{\{([^}]+)\}\}/g;
    const foundVariables = new Set<string>();

    const matches = Array.from(content.matchAll(templateVariablePattern));
    for (const match of matches) {
      if (match[1] && match[1] !== 'variable') {
        foundVariables.add(match[1]);
      }
    }

    // Convert to arrays for easier comparison
    const foundVariablesArray = Array.from(foundVariables).sort();
    const expectedVariablesArray = expectedVariables.sort();

    // Check that we have exactly the expected variables
    expect(foundVariablesArray).toEqual(expectedVariablesArray);

    // Also verify each expected variable exists
    for (const variable of expectedVariables) {
      expect(content).toMatch(new RegExp(`\\{\\{${variable}\\}\\}`));
    }

    // Ensure no unexpected variables exist
    expect(foundVariables.size).toBe(expectedVariables.length);
  });

  it('should load and process the prompt template correctly', () => {
    const sqlDialectGuidance = 'Test SQL guidance for PostgreSQL';
    const result = getAnalystAgentSystemPrompt(sqlDialectGuidance);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);

    // Should contain the SQL guidance we provided
    expect(result).toContain(sqlDialectGuidance);

    // Should not contain any unreplaced template variables
    expect(result).not.toMatch(/\{\{sql_dialect_guidance\}\}/);
    expect(result).not.toMatch(/\{\{date\}\}/);

    // Should contain the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];
    expect(result).toContain(currentDate);
  });

  it('should contain expected sections from the prompt template', () => {
    const result = getAnalystAgentSystemPrompt('Test guidance');

    // Check for key sections that should be in the prompt
    expect(result).toContain('<intro>');
    expect(result).toContain('<analysis_mode_capability>');
    expect(result).toContain('<sql_best_practices>');
    expect(result).toContain('<visualization_and_charting_guidelines>');
    expect(result).toContain('You are a Buster');
  });

  it('should throw an error for empty SQL dialect guidance', () => {
    expect(() => {
      getAnalystAgentSystemPrompt('');
    }).toThrow('SQL dialect guidance is required');

    expect(() => {
      getAnalystAgentSystemPrompt('   '); // whitespace only
    }).toThrow('SQL dialect guidance is required');
  });
});
