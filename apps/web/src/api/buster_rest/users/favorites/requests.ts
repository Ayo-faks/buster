import type { ShareAssetType } from '@buster/server-shared/share';
import type { UserFavoriteResponse } from '@buster/server-shared/user';
import { mainApi } from '../../instances';

export const getUserFavorites = async () => {
  return mainApi.get<UserFavoriteResponse>('/users/favorites').then((response) => response.data);
};

export const createUserFavorite = async (
  payload: {
    id: string;
    asset_type: ShareAssetType;
    index?: number;
    name: string; //just used for the UI for optimistic update
  }[]
) => {
  return mainApi
    .post<UserFavoriteResponse>('/users/favorites', payload)
    .then((response) => response.data);
};

export const deleteUserFavorite = async (data: string[]) => {
  return mainApi
    .delete<UserFavoriteResponse>('/users/favorites', { data })
    .then((response) => response.data);
};

export const updateUserFavorites = async (payload: string[]) => {
  return mainApi
    .put<UserFavoriteResponse>('/users/favorites', payload)
    .then((response) => response.data);
};
