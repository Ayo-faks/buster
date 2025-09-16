import {
  type ChartConfigProps,
  type ChartEncodes,
  type ChartType,
  type ColumnLabelFormat,
  type ComboChartAxis,
  DEFAULT_COLUMN_LABEL_FORMAT,
  DEFAULT_COLUMN_SETTINGS,
} from '@buster/server-shared/metrics';
import type { GridLineOptions, Scale, ScaleChartOptions } from 'chart.js';
import { useMemo } from 'react';
import type { DeepPartial } from 'utility-types';
import { useMemoizedFn } from '@/hooks/useMemoizedFn';
import type { BusterChartProps } from '../../../BusterChart.types';
import { formatYAxisLabel, yAxisSimilar } from '../../../commonHelpers';
import { useYAxisTitle } from './axisHooks/useYAxisTitle';
import { useIsStacked } from './useIsStacked';
import { DEFAULT_Y2_AXIS_COUNT } from './useY2Axis';

export const useYAxis = ({
  columnLabelFormats,
  selectedAxis,
  selectedChartType,
  barGroupType,
  lineGroupType,
  yAxisAxisTitle,
  yAxisShowAxisTitle,
  yAxisShowAxisLabel,
  yAxisStartAxisAtZero,
  yAxisScaleType,
  gridLines,
  columnMetadata,
  columnSettings,
}: {
  columnLabelFormats: NonNullable<ChartConfigProps['columnLabelFormats']>;
  selectedAxis: ChartEncodes;
  selectedChartType: ChartType;
  columnMetadata: NonNullable<BusterChartProps['columnMetadata']> | undefined;
  barGroupType: BusterChartProps['barGroupType'];
  lineGroupType: BusterChartProps['lineGroupType'];
  yAxisAxisTitle: BusterChartProps['yAxisAxisTitle'];
  yAxisShowAxisTitle: BusterChartProps['yAxisShowAxisTitle'];
  yAxisShowAxisLabel: BusterChartProps['yAxisShowAxisLabel'];
  yAxisStartAxisAtZero: BusterChartProps['yAxisStartAxisAtZero'];
  yAxisScaleType: BusterChartProps['yAxisScaleType'];
  columnSettings: NonNullable<BusterChartProps['columnSettings']>;
  gridLines: BusterChartProps['gridLines'];
}): DeepPartial<ScaleChartOptions<'bar'>['scales']['y']> | undefined => {
  const yAxisKeys = selectedAxis.y;
  const hasY2Axis = (selectedAxis as ComboChartAxis)?.y2?.length > 0;

  const useMinValue = useMemo(() => {
    if (!hasY2Axis) return false;
    if (selectedChartType !== 'combo') return false;
    if (!columnMetadata) return false;
    return columnMetadata?.some((column) => {
      return (
        yAxisKeys.includes(column.name) &&
        (columnSettings[column.name]?.columnVisualization ||
          DEFAULT_COLUMN_SETTINGS.columnVisualization) === 'bar'
      );
    });
  }, [hasY2Axis, yAxisKeys, selectedChartType]);

  const isSupportedType = useMemo(() => {
    return selectedChartType !== 'pie';
  }, [selectedChartType]);

  const grid: DeepPartial<GridLineOptions> | undefined = useMemo(() => {
    return {
      display: gridLines,
    } satisfies DeepPartial<GridLineOptions>;
  }, [gridLines]);

  const usePercentageModeAxis = useMemo(() => {
    if (!isSupportedType) return false;
    if (selectedChartType === 'bar') return barGroupType === 'percentage-stack';
    if (selectedChartType === 'line') return lineGroupType === 'percentage-stack';
    return false;
  }, [lineGroupType, selectedChartType, barGroupType, isSupportedType]);

  const yAxisColumnFormats: Record<string, ColumnLabelFormat> = useMemo(() => {
    if (!isSupportedType) return {};

    return selectedAxis.y.reduce<Record<string, ColumnLabelFormat>>((acc, y) => {
      acc[y] = columnLabelFormats[y] || DEFAULT_COLUMN_LABEL_FORMAT;
      return acc;
    }, {});
  }, [selectedAxis.y, columnLabelFormats, isSupportedType]);

  const stacked = useIsStacked({ selectedChartType, lineGroupType, barGroupType });

  const canUseSameYFormatter = useMemo(() => {
    if (!isSupportedType) return false;

    const hasMultipleY = selectedAxis.y.length > 1;
    return hasMultipleY ? yAxisSimilar(selectedAxis.y, columnLabelFormats) : true;
  }, [selectedAxis.y, columnLabelFormats, isSupportedType]);

  const title = useYAxisTitle({
    yAxis: selectedAxis.y,
    columnLabelFormats,
    yAxisAxisTitle,
    yAxisShowAxisTitle,
    selectedAxis,
    isSupportedChartForAxisTitles: isSupportedType,
  });

  const tickCallback = useMemoizedFn(function (
    this: Scale,
    value: string | number,
    _index: number
  ) {
    return formatYAxisLabel(
      value,
      yAxisKeys,
      canUseSameYFormatter,
      yAxisColumnFormats,
      usePercentageModeAxis
    );
  });

  const type = useMemo(() => {
    if (!isSupportedType) return undefined;
    return yAxisScaleType === 'log' ? 'logarithmic' : 'linear';
  }, [yAxisScaleType, isSupportedType]);

  const memoizedYAxisOptions: DeepPartial<ScaleChartOptions<'bar'>['scales']['y']> | undefined =
    useMemo(() => {
      if (!isSupportedType) return undefined;

      const baseConfig = {
        type,
        grid,
        max: usePercentageModeAxis ? 100 : undefined,
        beginAtZero: yAxisStartAxisAtZero !== false,
        stacked,
        title: {
          display: !!title,
          text: title,
        },
        ticks: {
          display: yAxisShowAxisLabel,
          callback: tickCallback,
          count: useMinValue ? DEFAULT_Y2_AXIS_COUNT : undefined,
          includeBounds: true,
        },
        min: useMinValue ? 0 : undefined,
        border: {
          display: yAxisShowAxisLabel,
        },
      } as DeepPartial<ScaleChartOptions<'bar'>['scales']['y']>;

      return baseConfig;
    }, [
      tickCallback,
      type,
      title,
      stacked,
      grid,
      isSupportedType,
      yAxisStartAxisAtZero,
      yAxisShowAxisLabel,
      usePercentageModeAxis,
    ]);

  return memoizedYAxisOptions;
};
