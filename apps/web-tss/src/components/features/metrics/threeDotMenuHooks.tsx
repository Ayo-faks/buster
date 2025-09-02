import { useNavigate } from '@tanstack/react-router';
import React, { useCallback, useMemo, useState } from 'react';
import { useGetMetric, useGetMetricData } from '@/api/buster_rest/metrics';
import {
  createDropdownItem,
  DropdownContent,
  type IDropdownItem,
  type IDropdownItems,
} from '@/components/ui/dropdown';
import { Download4, History, Pencil, SquareChart, Star, WandSparkle } from '@/components/ui/icons';
import { Star as StarFilled } from '@/components/ui/icons/NucleoIconFilled';
import type { BusterMetric } from '../../../api/asset_interfaces/metric';
import { useBusterNotifications } from '../../../context/BusterNotifications';
import { ensureElementExists } from '../../../lib/element';
import { downloadElementToImage } from '../../../lib/exportUtils';
import { FollowUpWithAssetContent } from '../assets/FollowUpWithAsset';
import { useFavoriteStar } from '../favorites';
import { useListMetricVersionDropdownItems } from '../versionHistory/useListMetricVersionDropdownItems';
import { METRIC_CHART_CONTAINER_ID } from './MetricChartCard/config';
import { METRIC_CHART_TITLE_INPUT_ID } from './MetricChartCard/MetricViewChartHeader';

export const useMetricVersionHistorySelectMenu = ({
  metricId,
}: {
  metricId: string;
}): IDropdownItem => {
  const { data } = useGetMetric(
    { id: metricId },
    {
      select: useCallback(
        (x: BusterMetric) => ({
          versions: x.versions,
          version_number: x.version_number,
        }),
        []
      ),
    }
  );
  const { versions = [], version_number } = data || {};

  const versionHistoryItems: IDropdownItems = useListMetricVersionDropdownItems({
    versions,
    selectedVersion: version_number,
  });

  return useMemo(
    () => ({
      label: 'Version history',
      value: 'version-history',
      icon: <History />,
      selectType: 'none',
      items: [
        <React.Fragment key="version-history-sub-menu">
          <DropdownContent items={versionHistoryItems} selectType="single-selectable-link" />
        </React.Fragment>,
      ],
    }),
    [versionHistoryItems]
  );
};

export const useFavoriteMetricSelectMenu = ({ metricId }: { metricId: string }) => {
  const { data: name } = useGetMetric({ id: metricId }, { select: (x) => x.name });
  const { isFavorited, onFavoriteClick } = useFavoriteStar({
    id: metricId,
    type: 'metric',
    name: name || '',
  });

  const item: IDropdownItem = useMemo(
    () =>
      createDropdownItem({
        label: isFavorited ? 'Remove from favorites' : 'Add to favorites',
        value: 'add-to-favorites',
        icon: isFavorited ? <StarFilled /> : <Star />,
        onClick: () => onFavoriteClick(),
        closeOnSelect: false,
      }),
    [isFavorited, onFavoriteClick]
  );

  return item;
};

export const useMetricDrilldownItem = ({ metricId }: { metricId: string }): IDropdownItem => {
  return useMemo(
    () => ({
      value: 'drilldown',
      label: 'Drill down & filter',
      items: [
        <FollowUpWithAssetContent
          key="drilldown-and-filter"
          assetType="metric"
          assetId={metricId}
          placeholder="Describe how you want to drill down or filter..."
          buttonText="Submit request"
        />,
      ],
      icon: <WandSparkle />,
    }),
    [metricId]
  );
};

export const useRenameMetricOnPage = ({
  metricId,
  metricVersionNumber,
}: {
  metricId: string;
  metricVersionNumber: number | undefined;
}) => {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      label: 'Rename metric',
      value: 'rename-metric',
      icon: <Pencil />,
      onClick: async () => {
        await navigate({
          unsafeRelative: 'path',
          to: '../chart' as '/app/metrics/$metricId/chart',
          params: (prev) => ({ ...prev, metricId }),
          search: metricVersionNumber ? { metric_version_number: metricVersionNumber } : undefined,
        });
        const input = await ensureElementExists(
          () => document.getElementById(METRIC_CHART_TITLE_INPUT_ID) as HTMLInputElement
        );
        if (input) {
          input.focus();
          input.select();
        }
      },
    }),
    [navigate, metricId, metricVersionNumber]
  );
};

export const useDownloadMetricDataCSV = ({
  metricId,
  metricVersionNumber,
}: {
  metricId: string;
  metricVersionNumber: number | undefined;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { data: metricData } = useGetMetricData(
    { id: metricId, versionNumber: metricVersionNumber },
    { enabled: false }
  );
  const { data: name } = useGetMetric({ id: metricId }, { select: (x) => x.name });

  return useMemo(
    () => ({
      label: 'Download as CSV',
      value: 'download-csv',
      icon: <Download4 />,
      loading: isDownloading,
      onClick: async () => {
        const data = metricData?.data;
        if (data && name) {
          setIsDownloading(true);
          const exportJSONToCSV = await import('@/lib/exportUtils').then(
            (mod) => mod.exportJSONToCSV
          );
          await exportJSONToCSV(data, name);
          setIsDownloading(false);
        }
      },
    }),
    [metricData, isDownloading, name]
  );
};

export const useDownloadPNGSelectMenu = ({
  metricId,
  metricVersionNumber,
}: {
  metricId: string;
  metricVersionNumber: number | undefined;
}) => {
  const { openErrorMessage } = useBusterNotifications();
  const { data: name } = useGetMetric(
    { id: metricId, versionNumber: metricVersionNumber },
    { select: (x) => x.name }
  );
  const { data: selectedChartType } = useGetMetric(
    { id: metricId },
    { select: (x) => x.chart_config?.selectedChartType }
  );

  const canDownload = selectedChartType && selectedChartType !== 'table';

  return useMemo(
    () => ({
      label: 'Download as PNG',
      value: 'download-png',
      disabled: true,
      icon: <SquareChart />,
      onClick: async () => {
        const node = document.getElementById(METRIC_CHART_CONTAINER_ID(metricId)) as HTMLElement;
        if (node) {
          try {
            return await downloadElementToImage(node, `${name}.png`);
          } catch (error) {
            console.error(error);
          }
        }

        openErrorMessage('Failed to download PNG');
      },
    }),
    [canDownload, metricId, name, openErrorMessage]
  );
};
