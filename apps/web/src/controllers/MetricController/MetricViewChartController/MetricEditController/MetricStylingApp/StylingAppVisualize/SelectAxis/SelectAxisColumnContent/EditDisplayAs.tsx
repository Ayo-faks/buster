import type { ChartConfigProps } from '@buster/server-shared/metrics';
import { ChartType, type ColumnSettings } from '@buster/server-shared/metrics';
import React, { useMemo } from 'react';
import ChartBarAxisX from '@/components/ui/icons/NucleoIconOutlined/chart-bar-axis-x';
import ChartLine from '@/components/ui/icons/NucleoIconOutlined/chart-line';
import ChartScatter from '@/components/ui/icons/NucleoIconOutlined/chart-scatter';
import { AppSegmented, type SegmentedItem } from '@/components/ui/segmented';
import { AppTooltip } from '@/components/ui/tooltip';
import { LabelAndInput } from '../../../Common/LabelAndInput';

const options = [
  {
    icon: <ChartBarAxisX />,
    value: 'bar',
    tooltip: 'Bar',
  },
  {
    icon: <ChartLine />,
    value: 'line',
    tooltip: 'Line',
  },
  // {
  //   icon: <AppMaterialIcons icon="line_chart_area" data-value="area" />,
  //   value: 'area',
  //   tooltip: 'Area'
  // },
  {
    icon: <ChartScatter />,
    value: 'dot',
    tooltip: 'Dot',
  },
].map<SegmentedItem<string>>(({ tooltip, icon, ...option }) => ({
  ...option,
  icon: (
    <AppTooltip title={tooltip}>
      <span className="flex items-center justify-center">{icon}</span>
    </AppTooltip>
  ),
}));

export const EditDisplayAs: React.FC<{
  columnVisualization: Required<ColumnSettings>['columnVisualization'];
  onUpdateColumnSettingConfig: (columnSettings: Partial<ColumnSettings>) => void;
  selectedChartType: ChartConfigProps['selectedChartType'];
}> = React.memo(({ columnVisualization, onUpdateColumnSettingConfig, selectedChartType }) => {
  const selectedOption = useMemo(() => {
    if (selectedChartType === 'bar') return 'bar';
    if (selectedChartType === 'line') return 'line';
    return options.find((option) => option.value === columnVisualization)?.value || 'bar';
  }, [columnVisualization]);

  const onChange = (value: SegmentedItem<string>) => {
    onUpdateColumnSettingConfig({
      columnVisualization: value.value as Required<ColumnSettings>['columnVisualization'],
    });
  };

  return (
    <LabelAndInput label="Display as">
      <div className="flex justify-end">
        <AppSegmented options={options} type="button" value={selectedOption} onChange={onChange} />
      </div>
    </LabelAndInput>
  );
});
EditDisplayAs.displayName = 'EditDisplayAs';
