import type {
  GetReportResponse,
  GetReportsListRequest,
  GetReportsListResponse,
  UpdateReportRequest,
  UpdateReportResponse,
} from '@buster/server-shared/reports';
import type { SharePostRequest, ShareUpdateRequest } from '@buster/server-shared/share';
import { mainApiV2 } from '../instances';

/**
 * Get a list of reports with optional filters
 */
export const getReportsList = async (params?: GetReportsListRequest) => {
  const { page = 1, page_size = 5000, ...allParams } = params || {};
  return mainApiV2
    .get<GetReportsListResponse>('/reports', { params: { page, page_size, ...allParams } })
    .then((res) => res.data);
};

/**
 * Get an individual report by ID
 */
export const getReportById = async (reportId: string) => {
  return mainApiV2.get<GetReportResponse>(`/reports/${reportId}`).then((res) => res.data);
};

/**
 * Update a report
 */
export const updateReport = async ({
  reportId,
  ...data
}: UpdateReportRequest & { reportId: string }) => {
  return mainApiV2
    .put<UpdateReportResponse>(`/reports/${reportId}`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      const IS_STAGING = window.location.hostname.includes('staging');
      if (IS_STAGING) {
        alert(
          'Look at the request payload and TELL NATE IMMEDIATELY. This error will only show up staging.'
        );
      }
      throw err;
    });
};

/**
 * Share a report with users
 */
export const shareReport = async ({ id, params }: { id: string; params: SharePostRequest }) => {
  return mainApiV2
    .post<GetReportResponse>(`/reports/${id}/sharing`, params)
    .then((res) => res.data);
};

/**
 * Unshare a report with users
 */
export const unshareReport = async ({ id, data }: { id: string; data: string[] }) => {
  return mainApiV2
    .delete<GetReportResponse>(`/reports/${id}/sharing`, { data })
    .then((res) => res.data);
};

/**
 * Update report sharing settings
 */
export const updateReportShare = async ({
  id,
  params,
}: {
  id: string;
  params: ShareUpdateRequest;
}) => {
  return mainApiV2.put<GetReportResponse>(`/reports/${id}/sharing`, params).then((res) => res.data);
};
