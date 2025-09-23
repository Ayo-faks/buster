import type { DataResult } from '@buster/server-shared/metrics';
import { forwardRef, useMemo } from 'react';
import {
  AppSplitter,
  type AppSplitterRef,
  type LayoutSize,
} from '@/components/ui/layouts/AppSplitter';
import { useMemoizedFn } from '@/hooks/useMemoizedFn';
import { DataContainer } from './DataContainer';
import { SQLContainer } from './SQLContainer';

export interface AppVerticalCodeSplitterProps {
  sql: string;
  setSQL: (sql: string) => void;
  runSQLError: string | undefined;
  data: DataResult;
  fetchingData: boolean;
  defaultLayout: LayoutSize;
  initialLayout: LayoutSize | null;
  autoSaveId: string;
  topHidden?: boolean;
  gapAmount?: number;
  className?: string;
  readOnly?: boolean;
  saveButton:
    | false
    | {
        label?: string;
        icon?: React.ReactNode;
        loading?: boolean;
        disabled?: boolean;
        onClick: () => Promise<void>;
        tooltip?: string;
      };
  runButton:
    | false
    | {
        label?: string;
        suffix?: React.ReactNode;
        loading?: boolean;
        disabled?: boolean;
        onClick: () => Promise<void>;
        tooltip?: string;
      };
}

const MIN_LEFT_SIZE = 120;
const MIN_RIGHT_SIZE = 80;
const AUTO_BUST_STORAGE_ON_INIT_SIZE = 800;

export const AppVerticalCodeSplitter = forwardRef<AppSplitterRef, AppVerticalCodeSplitterProps>(
  (
    {
      sql,
      setSQL,
      runSQLError,
      runButton,
      saveButton,
      data,
      readOnly = false,
      fetchingData,
      defaultLayout,
      initialLayout,
      autoSaveId,
      topHidden = false,
      gapAmount = 3,
      className,
    },
    ref
  ) => {
    //tailwind might not like this, but yolo
    const sqlContainerClassName = !topHidden ? `pb-${gapAmount}` : '';
    const dataContainerClassName = !topHidden ? `pt-${gapAmount}` : '';

    const bustStorageOnInit = useMemoizedFn(
      (preservedSideValue: number | null, refSize: number) => {
        return (
          !preservedSideValue ||
          preservedSideValue < MIN_LEFT_SIZE ||
          refSize < MIN_LEFT_SIZE + MIN_RIGHT_SIZE ||
          preservedSideValue > AUTO_BUST_STORAGE_ON_INIT_SIZE ||
          preservedSideValue > refSize - MIN_RIGHT_SIZE ||
          !refSize
        );
      }
    );

    return (
      <AppSplitter
        ref={ref}
        leftPanelClassName={sqlContainerClassName}
        leftChildren={useMemo(
          () => (
            <SQLContainer
              sql={sql}
              setDatasetSQL={setSQL}
              error={runSQLError}
              runButton={runButton}
              saveButton={saveButton}
              readOnly={readOnly}
            />
          ),
          [sql, setSQL, runSQLError, runButton, saveButton, readOnly]
        )}
        rightPanelClassName={dataContainerClassName}
        rightChildren={useMemo(
          () => <DataContainer data={data} fetchingData={fetchingData} />,
          [data, fetchingData]
        )}
        split="horizontal"
        defaultLayout={defaultLayout}
        initialLayout={initialLayout}
        autoSaveId={autoSaveId}
        preserveSide="left"
        rightPanelMinSize={`${MIN_RIGHT_SIZE}px`}
        leftPanelMinSize={`${MIN_LEFT_SIZE}px`}
        leftHidden={topHidden}
        className={className}
      />
    );
  }
);

AppVerticalCodeSplitter.displayName = 'AppVerticalCodeSplitter';
