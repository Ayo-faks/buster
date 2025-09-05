import type { DataResult } from '@buster/server-shared/metrics';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { IndeterminateLinearLoader } from '@/components/ui/loaders/IndeterminateLinearLoader';
import { AppDataGrid } from '@/components/ui/table/AppDataGrid';
import type { TanStackDataGridProps } from '@/components/ui/table/AppDataGrid/TanStackDataGrid';
import { cn } from '@/lib/classMerge';

export const DataContainer: React.FC<{
  data: DataResult | null;
  fetchingData: boolean;
  className?: string;
  columnWidths?: TanStackDataGridProps['columnWidths'];
  onResizeColumns?: TanStackDataGridProps['onResizeColumns'];
}> = React.memo(({ data, fetchingData, className, columnWidths, onResizeColumns }) => {
  const hasData = data && !isEmpty(data);

  return (
    <div
      className={cn(
        'bg-background relative h-full w-full overflow-hidden rounded border shadow',
        className
      )}
    >
      <IndeterminateLinearLoader
        className={cn(
          'absolute top-0 left-0 z-10 w-full',
          fetchingData && hasData ? 'block' : 'hidden!'
        )}
      />

      {hasData ? (
        <AppDataGrid rows={data} columnWidths={columnWidths} onResizeColumns={onResizeColumns} />
      ) : (
        <div className="flex h-full items-center justify-center">
          {fetchingData ? 'Loading data...' : 'No data returned'}
        </div>
      )}
    </div>
  );
});

DataContainer.displayName = 'DataContainer';
