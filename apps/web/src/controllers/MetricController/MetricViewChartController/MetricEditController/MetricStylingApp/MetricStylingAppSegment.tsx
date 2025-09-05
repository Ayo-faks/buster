import type { ChartConfigProps } from '@buster/server-shared/metrics';
import React, { useMemo } from 'react';
import { AppSegmented, type SegmentedItem } from '@/components/ui/segmented';
import { cn } from '@/lib/utils';
import { MetricStylingAppSegments } from './config';

export const MetricStylingAppSegment: React.FC<{
  segment: MetricStylingAppSegments;
  setSegment: (segment: MetricStylingAppSegments) => void;
  selectedChartType: ChartConfigProps['selectedChartType'];
  className?: string;
}> = React.memo(({ segment, setSegment, selectedChartType, className = '' }) => {
  const isTable = selectedChartType === 'table';
  const isMetric = selectedChartType === 'metric';
  const disableColors = isTable || isMetric;
  const disableStyling = isTable || isMetric;

  const options: SegmentedItem<MetricStylingAppSegments>[] = useMemo(
    () => [
      {
        label: MetricStylingAppSegments.VISUALIZE,
        value: MetricStylingAppSegments.VISUALIZE,
      },
      {
        label: MetricStylingAppSegments.STYLING,
        value: MetricStylingAppSegments.STYLING,
        disabled: disableStyling,
      },
      {
        label: MetricStylingAppSegments.COLORS,
        value: MetricStylingAppSegments.COLORS,
        disabled: disableColors,
      },
    ],
    [disableColors, disableStyling]
  );

  const onChangeSegment = (value: SegmentedItem<MetricStylingAppSegments>) => {
    setSegment(value.value);
  };

  return (
    <div className={cn('border-b')}>
      <div className={cn('pb-3', className)}>
        <AppSegmented
          type="track"
          size="default"
          block
          options={options}
          value={segment}
          onChange={onChangeSegment}
        />
      </div>
    </div>
  );
});
MetricStylingAppSegment.displayName = 'MetricStylingAppSegment';
