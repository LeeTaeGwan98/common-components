import API from "@/api/API";
import { type TableResSuccessType } from "@/api/common/commonType";
import { TableQueryStringType } from "@/api/common/commonType";
import { APIResponse } from "@/api/common/commonType";

const NOTICE_BASE_URL = "/admin/notice";

export interface NoticeRes {
  title: string;
  content: string;
  isPinned: boolean;
  isVisible: boolean;
  createdBy: number;
  updatedBy: number;
}

export interface AddNoticeRes {
  id: number;
  title: string;
  content: string;
  isPinned: boolean;
  isVisible: boolean;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
}

export const addNotice = (payload: NoticeRes) => {
  const data = API.post<TableResSuccessType<AddNoticeRes>>(
    NOTICE_BASE_URL,
    payload
  );

  return data;
};

export interface NoticeDataTypeRes {
  id: number;
  createdAt: string;
  title: string;
  isPinned: boolean;
  isVisible: boolean;
}

export const getNotice = (
  queryStringObj: TableQueryStringType & { isVisible: boolean | null }
) => {
  const { sortOrder, fromDt, toDt, isVisible, keyword, take, page } =
    queryStringObj;

  let qs = "/admin/notice?";

  if (sortOrder) {
    qs += `sortOrder=${sortOrder}&`;
  }
  if (fromDt) {
    qs += `fromDt=${fromDt}&`;
  }
  if (toDt) {
    qs += `toDt=${toDt}&`;
  }
  if (isVisible !== null) {
    qs += `isVisible=${isVisible}&`;
  }
  if (keyword) {
    qs += `keyword=${keyword}&`;
  }
  if (take !== null) {
    qs += `take=${take}&`;
  }
  if (page !== null) {
    qs += `page=${page}&`;
  }
  if (qs.endsWith("&")) {
    qs = qs.slice(0, -1);
  }

  const data = API.get<TableResSuccessType<NoticeDataTypeRes>>(qs);

  return data;
};

export const getNoticeDetail = (id: number) => {
  const data = API.get<APIResponse<NoticeRes>>(`${NOTICE_BASE_URL}/${id}`);

  return data;
};

export interface UpdateNoticePayload {
  title: string;
  content: string;
  isPinned: boolean;
  isVisible: boolean;
  updatedBy: number;
}

export interface UpdateNoticeRes {
  id: number;
  title: string;
  content: string;
  isPinned: boolean;
  isVisible: boolean;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
}

export const updateNotice = (payloadWidthId: {
  payload: UpdateNoticePayload;
  id: number;
}) => {
  const {
    id,
    payload: { ...payload },
  } = payloadWidthId;

  const data = API.patch<APIResponse<UpdateNoticeRes>>(
    `${NOTICE_BASE_URL}/${id}`,
    payload
  );

  return data;
};

export const deleteNotice = (id: number) => {
  const data = API.delete(`${NOTICE_BASE_URL}/${id}`);

  return data;
};
