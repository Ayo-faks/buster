import { describe, expect, it } from 'vitest';
import { ChartConfigPropsSchema } from './chartConfigProps';
import { DEFAULT_CHART_THEME } from './configColors';

describe('DEFAULT_CHART_CONFIG', () => {
  it('should conform to BusterChartConfigPropsSchema and have expected default values', () => {
    // Verify that DEFAULT_CHART_CONFIG is valid according to the schema
    const parseResult = ChartConfigPropsSchema.safeParse({});
    expect(parseResult.success).toBe(true);

    if (parseResult.success) {
      const config = parseResult.data;

      // Test key default values
      expect(config.colors).toEqual(DEFAULT_CHART_THEME);
      expect(config.gridLines).toBe(true);
      expect(config.showLegendHeadline).toBe(false);
      expect(config.disableTooltip).toBe(false);
      expect(config.goalLines).toEqual([]);
      expect(config.trendlines).toEqual([]);
      expect(config.columnSettings).toEqual({});
      expect(config.columnLabelFormats).toEqual({});
      expect(config.showLegend).toBeNull();
      expect(config.barLayout).toBe('vertical');
      expect(config.barSortBy).toEqual([]);
      expect(config.barGroupType).toBe('group');
      expect(config.barShowTotalAtTop).toBe(false);
      expect(config.lineGroupType).toBeNull();
      expect(config.scatterAxis).toEqual({
        x: [],
        y: [],
        category: [],
        size: [],
        tooltip: null,
      });
      expect(config.pieChartAxis).toEqual({
        x: [],
        y: [],
        tooltip: null,
      });

      // Verify the config is a complete object with all required properties
      expect(typeof config).toBe('object');
      expect(config).not.toBeNull();

      // Verify it has a selectedChartType (required field)
      expect(config.selectedChartType).toBeDefined();
    }
  });
});
