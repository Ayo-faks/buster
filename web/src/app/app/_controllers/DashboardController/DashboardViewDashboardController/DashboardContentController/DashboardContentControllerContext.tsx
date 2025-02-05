import React, { useState } from 'react';
import { useMemoizedFn } from 'ahooks';

import {
  createContext,
  ContextSelector,
  useContextSelector
} from '@fluentui/react-context-selector';
import { BusterDashboard } from '@/api/asset_interfaces';

interface DashboardMetricMetadata {
  initialAnimationEnded: boolean;
  hasBeenScrolledIntoView?: boolean;
}

export const useDashboardContent = ({ dashboard }: { dashboard: BusterDashboard }) => {
  const [metricMetadata, setMetricMetadata] = useState<Record<string, DashboardMetricMetadata>>({});

  const setInitialAnimationEnded = useMemoizedFn((id: string) => {
    setMetricMetadata((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        initialAnimationEnded: true
      }
    }));
  });

  const setHasBeenScrolledIntoView = useMemoizedFn((id: string) => {
    setMetricMetadata((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        hasBeenScrolledIntoView: true
      }
    }));
  });

  return {
    metricMetadata,
    dashboard,
    setInitialAnimationEnded,
    setHasBeenScrolledIntoView
  };
};

export const DashboardContentControllerContext = createContext<
  ReturnType<typeof useDashboardContent>
>({} as ReturnType<typeof useDashboardContent>);

export const DashboardContentControllerProvider = ({
  children,
  dashboard
}: {
  children: React.ReactNode;
  dashboard: BusterDashboard;
}) => {
  const value = useDashboardContent({ dashboard });

  return (
    <DashboardContentControllerContext.Provider value={value}>
      {children}
    </DashboardContentControllerContext.Provider>
  );
};

export const useDashboardContentControllerContextSelector = <T,>(
  selector: ContextSelector<ReturnType<typeof useDashboardContent>, T>
) => useContextSelector(DashboardContentControllerContext, selector);
