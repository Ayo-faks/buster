import type { ChartConfigProps } from '@buster/server-shared/metrics';
import React, { useMemo, useState } from 'react';
import { Select, type SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { LabelAndInput } from '../../../Common/LabelAndInput';

const barGroupingOptions: SelectItem<NonNullable<ChartConfigProps['barGroupType']>>[] = [
  { label: 'Grouped', value: 'group' },
  { label: 'Stacked', value: 'stack' },
];

const lineGroupingOptions: SelectItem<
  NonNullable<ChartConfigProps['lineGroupType']> | 'default'
>[] = [
  { label: 'Default', value: 'default' },
  { label: 'Stacked', value: 'stack' },
];

export const EditGrouping: React.FC<{
  selectedChartType: ChartConfigProps['selectedChartType'];
  onUpdateChartConfig: (value: Partial<ChartConfigProps>) => void;
  lineGroupType: ChartConfigProps['lineGroupType'];
  barGroupType: ChartConfigProps['barGroupType'];
  barShowTotalAtTop: ChartConfigProps['barShowTotalAtTop'];
}> = React.memo(
  ({ selectedChartType, onUpdateChartConfig, lineGroupType, barGroupType, barShowTotalAtTop }) => {
    const isBarChart = selectedChartType === 'bar';
    const [usePercentageStack, setUsePercentageStack] = useState(
      isBarChart ? barGroupType === 'stack' : lineGroupType === 'stack'
    );
    const [value, setValue] = useState<
      ChartConfigProps['lineGroupType'] | 'default' | ChartConfigProps['barGroupType']
    >(isBarChart ? barGroupType : lineGroupType);

    const showTotal = useMemo(() => {
      return isBarChart && (value === 'stack' || value === 'percentage-stack');
    }, [isBarChart, value]);

    const options: SelectItem[] = useMemo(() => {
      if (selectedChartType === 'bar') {
        return barGroupingOptions;
      }
      return lineGroupingOptions;
    }, [selectedChartType]);

    const selectedValue = useMemo(() => {
      if (selectedChartType === 'bar') {
        return barGroupType === 'percentage-stack' || barGroupType === 'stack' ? 'stack' : 'group';
      }
      return lineGroupType === 'stack' || lineGroupType === 'percentage-stack'
        ? 'stack'
        : 'default';
    }, [selectedChartType, lineGroupType, barGroupType]);

    const onChangeStackTotals = (value: boolean) => {
      setUsePercentageStack(value);
      if (isBarChart) onUpdateChartConfig({ barShowTotalAtTop: value });
    };

    const onChangeGroupType = (
      value: ChartConfigProps['lineGroupType'] | ChartConfigProps['barGroupType']
    ) => {
      if (selectedChartType === 'bar') {
        const barGroupType = value as ChartConfigProps['barGroupType'];
        onUpdateChartConfig({ barGroupType });
      } else {
        const lineGroupType = value as ChartConfigProps['lineGroupType'];
        onUpdateChartConfig({ lineGroupType });
      }
    };

    const onChangeGrouping = (value: string) => {
      setValue(value as ChartConfigProps['barGroupType']);
      onChangeGroupType(value as ChartConfigProps['barGroupType']);
    };

    return (
      <>
        <LabelAndInput label="Stacking">
          <Select items={options} value={selectedValue} onChange={onChangeGrouping} />
        </LabelAndInput>
        {showTotal && <StackTotals value={barShowTotalAtTop} onChange={onChangeStackTotals} />}
      </>
    );
  }
);
EditGrouping.displayName = 'EditGrouping';

const StackTotals: React.FC<{
  value: boolean;
  onChange: (value: boolean) => void;
}> = React.memo(({ value, onChange }) => {
  return (
    <LabelAndInput label="Stack totals">
      <div className="flex justify-end">
        <Switch checked={value} onCheckedChange={onChange} />
      </div>
    </LabelAndInput>
  );
});
StackTotals.displayName = 'StackTotals';
