import API from "@/api/API";
import { type TableResSuccessType } from "@/api/common/commonType";

export interface AddNoticePayload {
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

export const addNotice = (payload: AddNoticePayload) => {
  console.log(payload);
  const data = API.post<TableResSuccessType<AddNoticeRes>>(
    "/admin/notice",
    payload
  );

  return data;
};

export interface ReqNoticeQueryStringType {
  sortOrder?: "DESC" | "ASC";
  fromDt?: string;
  toDt?: string;
  isVisible?: boolean | null;
  keyword?: string;
  take?: number;
  page?: number;
}

export interface ResNoticeDataType {
  id: number;
  createdAt: string;
  title: string;
  isPinned: boolean;
  isVisible: boolean;
}

export const getNotice = (queryStringObj: ReqNoticeQueryStringType) => {
  const {
    sortOrder,
    fromDt,
    toDt,
    isVisible = true,
    keyword = "",
    take,
    page,
  } = queryStringObj;

  const getVisibleQueryParam = (isVisible: boolean | null): string => {
    if (isVisible === true) return "&isVisible=true";
    if (isVisible === false) return "&isVisible=false";
    return "";
  };

  const queryString = `/admin/notice?
  sortOrder=${sortOrder}
  &fromDt=${fromDt}
  &toDt=${toDt}
  ${getVisibleQueryParam(isVisible)}
  ${keyword ? `&keyword=${keyword}` : ""}
  &take=${take}
  &page=${page}`;

  const data = API.get<TableResSuccessType<ResNoticeDataType>>(queryString);

  return data;
};
