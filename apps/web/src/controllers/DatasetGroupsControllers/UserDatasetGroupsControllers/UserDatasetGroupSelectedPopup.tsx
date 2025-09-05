import React from 'react';
import { useUpdateUserDatasetGroups } from '@/api/buster_rest/users/permissions';
import { PermissionAssignedButton } from '@/components/features/permissions';
import { BusterListSelectedOptionPopupContainer } from '@/components/ui/list';

export const UserDatasetGroupSelectedPopup: React.FC<{
  selectedRowKeys: string[];
  onSelectChange: (selectedRowKeys: string[]) => void;
  userId: string;
}> = React.memo(({ selectedRowKeys, onSelectChange, userId }) => {
  const { mutateAsync: updateUserDatasetGroups } = useUpdateUserDatasetGroups({ userId });

  return (
    <BusterListSelectedOptionPopupContainer
      selectedRowKeys={selectedRowKeys}
      onSelectChange={onSelectChange}
      buttons={[
        <PermissionAssignedButton
          key="assign"
          text="assigned"
          selectedRowKeys={selectedRowKeys}
          onSelectChange={onSelectChange}
          onUpdate={updateUserDatasetGroups}
        />,
      ]}
    />
  );
});

UserDatasetGroupSelectedPopup.displayName = 'UserDatasetGroupSelectedPopup';
