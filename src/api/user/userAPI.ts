import API from "@/api/API";
import { type TableResType } from "@/api/common/commonType";
import { TableQueryStringType } from "@/api/common/commonType";

export interface UserQueryStringType
  extends Omit<TableQueryStringType, "isVisible"> {
  isActive: "TRUE" | "FALSE" | "WITHDRAWAL" | null;
}

export interface UserListData {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  planName: string;
  publishedEbookCount: number;
  point: number;
  isActive: string;
}

export interface UserDetailSideRes {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  providerCode: string;
  marketingConsent: string;
  firstPaymentDate: string;
  nextBillingDate: string;
  marketingConsentAt: string;
}

//모든 회원 목록 가져오기
export const getUserList = (queryStringObj: UserQueryStringType) => {
  const {
    sortOrder,
    fromDt,
    toDt,
    isActive,
    keyword = "",
    take,
    page,
  } = queryStringObj;

  let qs = "/admin/user?";

  if (sortOrder) {
    qs += `sortOrder=${sortOrder}&`;
  }
  if (fromDt) {
    qs += `fromDt=${fromDt}&`;
  }
  if (toDt) {
    qs += `toDt=${toDt}&`;
  }
  if (isActive !== null) {
    qs += `isActive=${isActive}&`;
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

  const data = API.get<TableResType<UserListData>>(qs);

  return data;
};

//회원 상세 왼쪽 사이드 패널 정보 조회
export const getUserDetailSide = (id: number) => {
  const data = API.get<{ data: UserDetailSideRes }>(
    `/admin/user/${id}/detail/side`
  );
  return data;
};
