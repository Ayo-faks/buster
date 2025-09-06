import React, { useMemo, useState } from 'react';
import { useGetDatasets } from '@/api/buster_rest/datasets';
import { Select, type SelectItem } from '@/components/ui/select';
import { SelectMultiple } from '@/components/ui/select/SelectMultiple';

export const SelectedDatasetInput: React.FC<{
  onSetDatasetId: (datasetIds: string[]) => void;
  mode?: 'multiple' | 'single';
}> = React.memo(({ onSetDatasetId, mode = 'multiple' }) => {
  const { data: datasets, isFetched } = useGetDatasets();
  const [value, setValue] = useState<string[]>([]);

  const onChangePreflight = (value: string[]) => {
    setValue(value);
    onSetDatasetId(value);
  };

  const onChangeSinglePreflight = (value: string) => {
    const newValue = [value];
    onChangePreflight(newValue);
  };

  const options: SelectItem[] = useMemo(() => {
    return datasets?.map((dataset) => ({
      label: dataset.name,
      value: dataset.id,
    }));
  }, [datasets]);

  if (mode === 'single') {
    return (
      <Select
        items={options}
        onChange={onChangeSinglePreflight}
        value={value[0]}
        placeholder="Select a dataset"
        disabled={!isFetched}
      />
    );
  }

  return (
    <SelectMultiple
      placeholder="Select a dataset"
      items={options}
      onChange={onChangePreflight}
      value={value}
    />
  );
});

SelectedDatasetInput.displayName = 'SelectedDatasetInput';
