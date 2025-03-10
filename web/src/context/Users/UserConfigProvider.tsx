'use client';

import type { BusterUserResponse } from '@/api/asset_interfaces/users';
import React, { PropsWithChildren } from 'react';
import { useFavoriteProvider } from './useFavoriteProvider';
import { useGetMyUserInfo } from '@/api/buster_rest/users';
import { useSupabaseContext } from '../Supabase';
import { createContext, useContextSelector } from 'use-context-selector';
import { useUserOrganization } from './useUserOrganization';
import { useInviteUser } from './useInviteUser';
import { checkIfUserIsAdmin } from '@/lib/user';

export const useUserConfigProvider = ({ userInfo }: { userInfo: BusterUserResponse | null }) => {
  const isAnonymousUser = useSupabaseContext((state) => state.isAnonymousUser);

  const { data: userResponseData, refetch: refetchUserResponse } = useGetMyUserInfo();
  const userResponse = userResponseData || userInfo;

  const favoriteConfig = useFavoriteProvider();

  const inviteUsers = useInviteUser();

  const { onCreateUserOrganization } = useUserOrganization({
    userResponse,
    refetchUserResponse
  });

  const user = userResponse?.user;
  const userTeams = userResponse?.teams || [];
  const userOrganizations = userResponse?.organizations?.[0];
  const userRole = userOrganizations?.role;
  const isUserRegistered =
    !!userResponse && !!userResponse?.organizations?.[0]?.id && !!userResponse?.user?.name;

  const isAdmin = checkIfUserIsAdmin(userResponse);

  return {
    onCreateUserOrganization,
    userTeams,
    user,
    userRole,
    isAdmin,
    userOrganizations,
    isUserRegistered,
    isAnonymousUser,
    ...inviteUsers,
    ...favoriteConfig
  };
};

const BusterUserConfig = createContext<ReturnType<typeof useUserConfigProvider>>(
  {} as ReturnType<typeof useUserConfigProvider>
);

export const BusterUserConfigProvider = React.memo<
  PropsWithChildren<{ userInfo: BusterUserResponse | undefined }>
>(({ children, userInfo }) => {
  const userConfig = useUserConfigProvider({
    userInfo: userInfo || null
  });

  return <BusterUserConfig.Provider value={userConfig}>{children}</BusterUserConfig.Provider>;
});
BusterUserConfigProvider.displayName = 'BusterUserConfigProvider';

export const useUserConfigContextSelector = <T,>(
  selector: (state: ReturnType<typeof useUserConfigProvider>) => T
) => useContextSelector(BusterUserConfig, selector);
