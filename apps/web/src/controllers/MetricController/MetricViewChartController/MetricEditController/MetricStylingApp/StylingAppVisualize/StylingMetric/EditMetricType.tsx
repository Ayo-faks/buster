import type { ChartConfigProps, ColumnLabelFormat } from '@buster/server-shared/metrics';
import last from 'lodash/last';
import React, { useMemo } from 'react';
import type { SelectItem } from '@/components/ui/select';
import { Select } from '@/components/ui/select';
import { isNumericColumnStyle, isNumericColumnType } from '@/lib/messages';
import { LabelAndInput } from '../../Common';

export const AGGREGATE_OPTIONS: SelectItem<ChartConfigProps['metricValueAggregate']>[] = [
  { label: 'Sum', value: 'sum' },
  { label: 'Average', value: 'average' },
  { label: 'Median', value: 'median' },
  { label: 'Count', value: 'count' },
  { label: 'Max', value: 'max' },
  { label: 'Min', value: 'min' },
  { label: 'First', value: 'first' },
];

export const EditMetricAggregate: React.FC<{
  aggregate: ChartConfigProps['metricValueAggregate'];
  onUpdateAggregate: (aggregate: ChartConfigProps['metricValueAggregate']) => void;
  columnLabelFormat: ColumnLabelFormat | undefined;
}> = React.memo(({ aggregate, onUpdateAggregate, columnLabelFormat }) => {
  const isNumberColumn = columnLabelFormat?.columnType
    ? isNumericColumnType(columnLabelFormat?.columnType)
    : false;
  const isNumericStyle = isNumericColumnStyle(columnLabelFormat?.style);
  const disableOptions = !isNumberColumn || !isNumericStyle;

  const selectedOption = useMemo(() => {
    if (!disableOptions) {
      return AGGREGATE_OPTIONS.find((option) => option.value === aggregate)?.value;
    }
    return last(AGGREGATE_OPTIONS)?.value;
  }, [aggregate, disableOptions]);

  const onUpdateMetricValueAggregate = (value: string) => {
    onUpdateAggregate(value as ChartConfigProps['metricValueAggregate']);
  };

  return (
    <LabelAndInput label={'Aggregation'}>
      <Select
        dataTestId="edit-metric-aggregate"
        items={AGGREGATE_OPTIONS}
        value={selectedOption}
        onChange={onUpdateMetricValueAggregate}
        disabled={disableOptions}
      />
    </LabelAndInput>
  );
});
EditMetricAggregate.displayName = 'EditMetricAggregate';
