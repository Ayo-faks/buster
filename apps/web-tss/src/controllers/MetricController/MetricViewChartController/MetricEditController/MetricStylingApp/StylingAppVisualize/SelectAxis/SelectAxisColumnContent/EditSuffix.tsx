import type { ColumnLabelFormat } from '@buster/server-shared/metrics';
import React from 'react';
import { Input } from '@/components/ui/inputs';
import { LabelAndInput } from '../../../Common/LabelAndInput';

export const EditSuffix: React.FC<{
  suffix: ColumnLabelFormat['suffix'];
  onUpdateColumnConfig: (columnLabelFormat: Partial<ColumnLabelFormat>) => void;
}> = React.memo(({ suffix, onUpdateColumnConfig }) => {
  return (
    <LabelAndInput label="Suffix" dataTestId="edit-suffix-input">
      <Input
        className="w-full!"
        min={0}
        value={suffix}
        placeholder="dollars"
        onChange={(e) =>
          onUpdateColumnConfig({
            suffix: e.target.value ?? '',
          })
        }
      />
    </LabelAndInput>
  );
});
EditSuffix.displayName = 'EditSuffix';
