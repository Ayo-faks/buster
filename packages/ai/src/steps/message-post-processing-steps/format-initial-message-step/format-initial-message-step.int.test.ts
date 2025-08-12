import type { ModelMessage } from 'ai';
import { describe, expect, it } from 'vitest';
import { runFormatInitialMessageStep } from './format-initial-message-step';

describe('format-initial-message-step integration', () => {
  it('should format initial message when major assumptions are found', async () => {
    const mockConversationHistory: ModelMessage[] = [
      {
        content:
          'How many stock Mountain-500 series bikes were sold online to NA customers using a ColonialVoice card?',
        role: 'user',
      },
      {
        content: [
          {
            text: '<todo_list>\n        - Below are the items on your TODO list:\n        [ ] Determine how "Mountain-500 series bikes" are identified in the product data\n[ ] Determine how to filter for "stock" bikes versus other types\n[ ] Determine how "online" sales are identified versus other sales channels\n[ ] Determine how "NA customers" are identified in the customer data\n[ ] Determine how "ColonialVoice card" payment method is identified\n[ ] Determine the visualization type and axes for displaying the count\n        </todo_list>',
            type: 'text',
          },
        ],
        role: 'user',
      },
      {
        content: [
          {
            type: 'tool-call',
            toolCallId: 'toolu_06WAfvCoQtpBoNdmNi17LKCe',
            toolName: 'doneTool',
            input: {
              final_response:
                "I found the answer to your specific question about Mountain-500 series bikes sold online to North American customers using ColonialVoice cards.\n\n**Result: 47 Mountain-500 series bikes were sold under these exact conditions.**\n\nHere's how I identified and filtered the data based on your requirements:\n\n- **Mountain-500 series bikes**: Found 10 different Mountain-500 variants in the database (5 black and 5 silver in various sizes: 40, 42, 44, 48, 52)\n- **Stock bikes**: Filtered for finished goods ready for sale (using the `finishedgoodsflag`)\n- **Online sales**: Used the online order flag to identify web-based purchases\n- **NA customers**: Included customers from United States, Canada, and Mexico\n- **ColonialVoice card**: Filtered specifically for this credit card type (which exists in the database alongside Vista, SuperiorCard, and Distinguish)\n\nThe analysis shows that despite the very specific filtering criteria, there was still a meaningful volume of 47 bikes sold through this particular channel combination. This suggests that ColonialVoice cardholders in North America represent an active customer segment for the Mountain-500 product line in online sales.",
            },
          },
        ],
        role: 'assistant',
      },
      {
        content: [
          {
            type: 'tool-result',
            toolCallId: 'toolu_06WAfvCoQtpBoNdmNi17LKCe',
            toolName: 'doneTool',
            output: {
              type: 'json',
              value: { success: true },
            },
          },
        ],
        role: 'tool',
      },
    ];

    // Mock combined input from parallel steps with major assumptions
    const mockInput = {
      conversationHistory: mockConversationHistory,
      userName: 'John',
      messageId: 'msg_12345',
      userId: 'user_67890',
      chatId: 'chat_abcde',
      isFollowUp: false,
      isSlackFollowUp: false,
      previousMessages: [],
      datasets:
        'name: product\ndescription: Product catalog information\ntables:\n  - name: product\n    description: Product information including bikes and accessories\n  - name: sales_order_header\n    description: Sales order header information\n  - name: credit_card\n    description: Credit card information',

      // Fields from flag-chat step
      toolCalled: 'noIssuesFound',
      summaryMessage: undefined,
      summaryTitle: undefined,
      message: 'No issues detected in this conversation that require data team review.',

      // Fields from identify-assumptions step with major assumptions
      assumptions: [
        {
          descriptiveTitle: 'Stock bikes interpretation',
          classification: 'businessLogic' as const,
          explanation:
            'Interpreted "stock" bikes as finished goods ready for sale using finishedgoodsflag field without explicit confirmation',
          label: 'minor' as const,
        },
        {
          descriptiveTitle: 'North America geographic boundaries',
          classification: 'segmentInterpretation' as const,
          explanation:
            'Defined North America as US, Canada, and Mexico, excluding American Samoa and other territories which could significantly impact results',
          label: 'major' as const,
        },
        {
          descriptiveTitle: 'Product name pattern matching',
          classification: 'fieldMapping' as const,
          explanation:
            'Used ILIKE pattern matching for Mountain-500 series which could miss products with different naming conventions',
          label: 'major' as const,
        },
      ],
    };

    // Call the step execution function with proper parameters
    const result = await runFormatInitialMessageStep({
      userName: 'Test User',
      flaggedIssues: 'No significant issues detected',
      majorAssumptions: [
        {
          descriptiveTitle: 'Mountain-500 Product Identification',
          explanation:
            'Assumed Mountain-500 refers to products with names containing "Mountain-500"',
          label: 'major',
        },
        {
          descriptiveTitle: 'Stock Bikes Definition',
          explanation:
            'Interpreted "stock" bikes as finished goods ready for sale using finishedgoodsflag',
          label: 'major',
        },
        {
          descriptiveTitle: 'North America Definition',
          explanation:
            'Defined North America as US, Canada, and Mexico, excluding American Samoa and other territories',
          label: 'major',
        },
      ],
      conversationHistory: mockConversationHistory,
    });

    // Verify the step executed successfully and returned formatted message
    expect(result).toBeDefined();
    expect(result.summaryMessage).toBeDefined();
    expect(result.summaryTitle).toBeDefined();
    expect(typeof result.summaryMessage).toBe('string');
    expect(typeof result.summaryTitle).toBe('string');
  });

  it('should return null formatted message when no major assumptions are found', async () => {
    const mockConversationHistory: ModelMessage[] = [
      {
        content: 'Show me total sales for this month',
        role: 'user',
      },
      {
        content: [
          {
            type: 'tool-call',
            toolCallId: 'toolu_simple_query',
            toolName: 'doneTool',
            input: {
              final_response: 'Total sales for this month: $125,000',
            },
          },
        ],
        role: 'assistant',
      },
    ];

    // Call the step execution function with only minor assumptions (should return empty)
    const result = await runFormatInitialMessageStep({
      userName: 'John',
      flaggedIssues: 'No issues detected in this conversation that require data team review.',
      majorAssumptions: [], // No major assumptions
      conversationHistory: mockConversationHistory,
    });

    // Verify the step returns empty messages since no major assumptions
    expect(result).toBeDefined();
    expect(result.summaryMessage).toBe('');
    expect(result.summaryTitle).toBe('');
  });
});
