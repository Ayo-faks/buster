import type { ShareAssetType } from '@buster/server-shared/share';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import type { BusterSearchResult } from '@/api/asset_interfaces/search';
import {
  useAddAndRemoveAssetsFromCollection,
  useGetCollection,
} from '@/api/buster_rest/collections';
import { useSearch } from '@/api/buster_rest/search';
import { ASSET_ICONS } from '@/components/features/icons/assetIcons';
import { Button } from '@/components/ui/buttons';
import type { BusterListRowItem } from '@/components/ui/list/BusterList';
import {
  InputSelectModal,
  type InputSelectModalProps,
} from '@/components/ui/modal/InputSelectModal';
import { Text } from '@/components/ui/typography';
import { useDebounce } from '@/hooks/useDebounce';
import { useMemoizedFn } from '@/hooks/useMemoizedFn';
import { formatDate } from '@/lib/date';

type SelectedAsset = { id: string; type: ShareAssetType };

export const AddToCollectionModal: React.FC<{
  open: boolean;
  onClose: () => void;
  collectionId: string;
}> = React.memo(({ open, onClose, collectionId }) => {
  const { data: collection, isFetched: isFetchedCollection } = useGetCollection(collectionId);
  const { mutateAsync: addAndRemoveAssetsFromCollection } = useAddAndRemoveAssetsFromCollection();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, { wait: 200 });

  const { data: searchResults } = useSearch({
    query: debouncedSearchTerm,
    asset_types: ['metric', 'dashboard'],
    num_results: 100,
  });

  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([]);
  const selectedAssetIds = useMemo(() => {
    return selectedAssets.map((asset) => asset.id);
  }, [selectedAssets]);

  const columns = useMemo<InputSelectModalProps<BusterSearchResult>['columns']>(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (name, data) => {
          const Icon = data.type === 'metric' ? ASSET_ICONS.metrics : ASSET_ICONS.dashboards;
          return (
            <div className="flex items-center gap-1.5">
              <span className="text-icon-color">
                <Icon />
              </span>
              <Text>{name}</Text>
            </div>
          );
        },
      },
      {
        title: 'Updated',
        dataIndex: 'updated_at',
        width: 140,
        render: (value: string) => {
          return formatDate({
            date: value,
            format: 'lll',
          });
        },
      },
    ],
    []
  );

  const rows: BusterListRowItem<BusterSearchResult>[] = useMemo(() => {
    return (
      searchResults?.map((asset) => ({
        id: asset.id,
        data: asset,
      })) || []
    );
  }, [searchResults]);

  const createKeySearchResultMap = useMemoizedFn(() => {
    const map = new Map<string, SelectedAsset>();
    rows.forEach((asset) => {
      if (asset.data?.type) map.set(asset.id, { type: asset.data?.type, id: asset.id });
    });
    return map;
  });

  const handleAddAndRemoveMetrics = useMemoizedFn(async () => {
    await addAndRemoveAssetsFromCollection({
      collectionId,
      assets: selectedAssets,
    });
    onClose();
  });

  const handleSelectChange = useMemoizedFn((assets: string[]) => {
    const selectedAssets: SelectedAsset[] = [];
    const keySearchResultMap = createKeySearchResultMap();
    assets.forEach((assetId) => {
      const asset = keySearchResultMap.get(assetId);
      if (asset) selectedAssets.push({ id: assetId, type: asset.type });
    });
    setSelectedAssets(selectedAssets);
  });

  const originalIds = useMemo(() => {
    return collection?.assets?.map((asset) => asset.id) || [];
  }, [collection?.assets]);

  const isSelectedChanged = useMemo(() => {
    const newIds = selectedAssetIds;
    return originalIds.length !== newIds.length || originalIds.some((id) => !newIds.includes(id));
  }, [originalIds, selectedAssetIds]);

  const removedAssetCount = useMemo(() => {
    return originalIds.filter((id) => !selectedAssetIds.includes(id)).length;
  }, [originalIds, selectedAssetIds]);

  const addedAssetCount = useMemo(() => {
    return selectedAssetIds.filter((id) => !originalIds.includes(id)).length;
  }, [originalIds, selectedAssetIds]);

  const primaryButtonText = useMemo(() => {
    if (!isFetchedCollection) {
      return 'Loading assets...';
    }

    const hasRemovedItems = removedAssetCount > 0;
    const hasAddedItems = addedAssetCount > 0;

    if (hasRemovedItems && hasAddedItems) {
      return 'Update collection';
    }

    if (hasRemovedItems) {
      return 'Remove assets';
    }

    if (hasAddedItems) {
      return 'Add assets';
    }

    return 'Update collection';
  }, [isFetchedCollection, removedAssetCount, addedAssetCount]);

  const primaryButtonTooltipText = useMemo(() => {
    if (!isFetchedCollection) {
      return '';
    }

    const hasRemovedItems = removedAssetCount > 0;
    const hasAddedItems = addedAssetCount > 0;
    const returnText: string[] = [];

    if (!hasRemovedItems && !hasAddedItems) {
      return 'No changes to update';
    }

    if (hasRemovedItems) {
      returnText.push(`Removing ${removedAssetCount}`);
    }

    if (hasAddedItems) {
      returnText.push(`Adding ${addedAssetCount}`);
    }

    return returnText.join(', ');
  }, [isFetchedCollection, addedAssetCount, removedAssetCount]);

  const emptyState = useMemo(() => {
    if (rows.length === 0) {
      return 'No assets found';
    }
    return undefined;
  }, [rows.length]);

  const footer: NonNullable<InputSelectModalProps['footer']> = useMemo(() => {
    return {
      left:
        selectedAssets.length > 0 ? (
          <Button variant="ghost" onClick={() => setSelectedAssets([])}>
            Clear selected
          </Button>
        ) : undefined,
      secondaryButton: {
        text: 'Cancel',
        onClick: onClose,
      },
      primaryButton: {
        text: primaryButtonText,
        onClick: handleAddAndRemoveMetrics,
        disabled: !isSelectedChanged,
        tooltip: primaryButtonTooltipText,
      },
    };
  }, [
    selectedAssets.length,
    isSelectedChanged,
    handleAddAndRemoveMetrics,
    primaryButtonText,
    primaryButtonTooltipText,
  ]);

  useLayoutEffect(() => {
    if (isFetchedCollection) {
      const assets = collection?.assets?.map((asset) => ({
        id: asset.id,
        type: asset.asset_type,
      }));
      setSelectedAssets(assets || []);
    }
  }, [isFetchedCollection, collection?.assets]);

  return (
    <InputSelectModal
      width={665}
      open={open}
      onClose={onClose}
      columns={columns}
      rows={rows}
      onSelectChange={handleSelectChange}
      selectedRowKeys={selectedAssetIds}
      footer={footer}
      emptyState={emptyState}
      searchText={searchTerm}
      handleSearchChange={setSearchTerm}
    />
  );
});

AddToCollectionModal.displayName = 'AddToCollectionModal';
