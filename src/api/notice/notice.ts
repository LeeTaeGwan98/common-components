import API from "@/api/API";

export const addNotice = () => {
  const data = API.post("/admin/notice");

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

  const data = API.get<{ data: ResNoticeDataType }>(queryString);

  return data;
};
