import type { DataResult } from '@buster/server-shared/metrics';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { useIsUserAdmin } from '@/api/buster_rest/users/useGetUserInfo';
import { AppDataGrid } from '@/components/ui/table/AppDataGrid';
import { Text } from '@/components/ui/typography';
import { ShimmerText } from '@/components/ui/typography/ShimmerText';
import { useMemoizedFn } from '@/hooks/useMemoizedFn';

export const OverviewData: React.FC<{
  datasetId: string;
  data: DataResult;
  isFetchedDatasetData: boolean;
}> = React.memo(({ data, isFetchedDatasetData }) => {
  const isAdmin = useIsUserAdmin();

  const defaultCellFormatter = useMemoizedFn((value: unknown): string => {
    return String(value);
  });

  return (
    <div className="scrollbar-thin h-full max-h-[70vh] w-full overflow-auto rounded border">
      {!isFetchedDatasetData ? (
        <LoadingState />
      ) : !isEmpty(data) ? (
        <AppDataGrid
          rows={data || []}
          headerFormat={isAdmin ? stableHeaderFormat : undefined}
          cellFormat={defaultCellFormatter}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
});

OverviewData.displayName = 'OverviewData';

const EmptyState = () => {
  return (
    <div className="bg-background flex justify-center py-24">
      <Text variant="tertiary">No data available</Text>
    </div>
  );
};

const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center py-24">
      <ShimmerText text="Loading data..." />
    </div>
  );
};

const stableHeaderFormat = (value: string | number | Date | null): string => {
  return String(value);
};
