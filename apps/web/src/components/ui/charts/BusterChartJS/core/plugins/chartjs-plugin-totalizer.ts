import type { ChartType, Plugin } from 'chart.js';

export interface ChartTotalizerPluginOptions {
  enabled?: boolean;
}

declare module 'chart.js' {
  // biome-ignore lint/correctness/noUnusedVariables: we need to define the plugin options
  interface PluginOptionsByType<TType extends ChartType> {
    totalizer?: ChartTotalizerPluginOptions | false;
  }

  interface Chart {
    $totalizer: { stackTotals: Record<number, number>; seriesTotals: number[] };
  }
}

export const ChartTotalizerPlugin: Plugin<ChartType, ChartTotalizerPluginOptions> = {
  id: 'totalizer',
  start: (chart) => {
    chart.$totalizer = { stackTotals: {}, seriesTotals: [] };
  },
  stop: (chart) => {
    chart.$totalizer = { stackTotals: {}, seriesTotals: [] };
  },

  beforeDatasetsUpdate: (chart, _args, options) => {
    if (options?.enabled === false) return;

    const stackTotals: Record<string, number> = {};
    const seriesTotals: number[] = [];
    chart.data.datasets
      .filter((dataset, index) => {
        const meta = chart.getDatasetMeta(index);
        //meta.hidden is true when the dataset is hidden by the legend
        //dataset.hidden is true when the dataset is hidden by what was passed in the options
        return !meta.hidden && !dataset.hidden;
      })
      .forEach((dataset) => {
        (chart.data.labels as string[])?.forEach((_label, labelIndex) => {
          const value = dataset.data[labelIndex];
          if (typeof value === 'number') {
            stackTotals[labelIndex] = (stackTotals[labelIndex] || 0) + value;
          }
        });

        const seriesTotal: number = dataset.data.reduce<number>(
          (sum, value) => sum + (typeof value === 'number' ? value : 0),
          0
        );

        seriesTotals.push(seriesTotal);
      });

    chart.$totalizer = { stackTotals, seriesTotals };
  },
  defaults: {
    enabled: true
  }
};
