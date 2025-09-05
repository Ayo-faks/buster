import {
  type ChartConfigProps,
  DEFAULT_CHART_CONFIG,
  MIN_DONUT_WIDTH,
} from '@buster/server-shared/metrics';
import React, { useMemo, useState } from 'react';
import { AppSegmented, type SegmentedItem } from '@/components/ui/segmented';
import { SliderWithInputNumber } from '@/components/ui/slider';
import { useDebounceEffect } from '@/hooks/useDebounceEffect';
import { LabelAndInput } from '../Common';

const options: SegmentedItem<'donut' | 'pie'>[] = [
  { label: 'Donut', value: 'donut' },
  { label: 'Pie', value: 'pie' },
];

const DONUT_WIDTH_MIN = MIN_DONUT_WIDTH;
const DONUT_WIDTH_MAX = 50;

export const EditPieAppearance = React.memo(
  ({
    pieDonutWidth,
    onUpdateChartConfig,
    pieChartAxis,
  }: {
    pieDonutWidth: ChartConfigProps['pieDonutWidth'];
    onUpdateChartConfig: (config: Partial<ChartConfigProps>) => void;
    pieChartAxis: ChartConfigProps['pieChartAxis'];
  }) => {
    const [showDonutWidthSelector, setShowDonutWidthSelector] = useState(pieDonutWidth > 0);
    const [value, setValue] = useState(pieDonutWidth);

    const hasMultipleYAxis = pieChartAxis.y.length > 1;

    const selectedAppearance = useMemo(() => {
      if (hasMultipleYAxis) return 'pie';
      return pieDonutWidth > 0 ? 'donut' : 'pie';
    }, [hasMultipleYAxis, pieDonutWidth]);

    const setPieDonutWidth = (value: number | null) => {
      onUpdateChartConfig({ pieDonutWidth: value || 0 });
      setValue(value || 0);
    };

    const onChange = (value: SegmentedItem<'donut' | 'pie'>) => {
      setShowDonutWidthSelector(value.value === 'donut');
      if (value.value === 'donut') {
        setPieDonutWidth(DEFAULT_CHART_CONFIG.pieDonutWidth);
      } else {
        setPieDonutWidth(0);
      }
    };

    useDebounceEffect(
      () => {
        if (value !== pieDonutWidth) {
          setValue(pieDonutWidth);
          setShowDonutWidthSelector(pieDonutWidth > 0);
        }
      },
      [pieDonutWidth],
      { wait: 25 }
    );

    return (
      <>
        <LabelAndInput label="Appearance">
          <AppSegmented
            block
            className="w-full"
            options={options}
            value={selectedAppearance}
            disabled={hasMultipleYAxis}
            onChange={onChange}
          />
        </LabelAndInput>

        {showDonutWidthSelector && !hasMultipleYAxis && (
          <LabelAndInput label="Donut width">
            <SliderWithInputNumber
              min={DONUT_WIDTH_MIN}
              max={DONUT_WIDTH_MAX}
              value={value}
              onChange={setPieDonutWidth}
            />
          </LabelAndInput>
        )}
      </>
    );
  }
);
EditPieAppearance.displayName = 'EditPieAppearance';
