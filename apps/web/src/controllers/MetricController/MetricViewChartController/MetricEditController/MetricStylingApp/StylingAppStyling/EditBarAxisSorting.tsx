import type { BarSortBy, ChartConfigProps } from '@buster/server-shared/metrics';
import React, { useMemo } from 'react';
import { BarChartSortNoneIcon } from '@/components/ui/icons/customIcons/BarChart_NoSort';
import { BarChartSortAscIcon } from '@/components/ui/icons/customIcons/BarChartSortAscIcon';
import { BarChartSortDescIcon } from '@/components/ui/icons/customIcons/BarChartSortDescIcon';
import { AppSegmented, type SegmentedItem } from '@/components/ui/segmented';
import { LabelAndInput } from '../Common';

const options: SegmentedItem<BarSortBy[0]>[] = [
  {
    value: 'none',
    tooltip: 'No sorting',
    icon: <BarChartSortNoneIcon />,
  },
  {
    icon: <BarChartSortAscIcon />,
    value: 'asc',
    tooltip: 'Sort ascending',
  },
  {
    icon: <BarChartSortDescIcon />,
    value: 'desc',
    tooltip: 'Sort descending',
  },
];

export const EditBarSorting: React.FC<{
  barSortBy: ChartConfigProps['barSortBy'];
  onUpdateChartConfig: (v: Partial<ChartConfigProps>) => void;
}> = React.memo(({ barSortBy, onUpdateChartConfig }) => {
  const selectedOption = useMemo(() => {
    return (
      options.find((option) => {
        return barSortBy.includes(option.value);
      })?.value || 'none'
    );
  }, [barSortBy]);

  const onChange = (value: SegmentedItem<'none' | 'asc' | 'desc'>) => {
    onUpdateChartConfig({ barSortBy: [value.value] });
  };

  return (
    <LabelAndInput label="Sorting">
      <div className="flex justify-end">
        <AppSegmented options={options} value={selectedOption} onChange={onChange} type="button" />
      </div>
    </LabelAndInput>
  );
});
EditBarSorting.displayName = 'EditBarSorting';
