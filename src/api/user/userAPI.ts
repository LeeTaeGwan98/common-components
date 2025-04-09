import API from "@/api/API";
import {
  ApiResType,
  FileUploadRes,
  type TableResType,
} from "@/api/common/commonType";
import { TableQueryStringType } from "@/api/common/commonType";
import { data } from "react-router-dom";

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
  isActive: boolean;
  isDeleted: boolean;
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

//회원 상세 기본 정보 조회 응답
export interface UserDefaultRes {
  id: number;
  name: string;
  planName: string;
  pointBalance: number;
  publishedEbookCount: string;
  memberType: string;
  businessLicenseNumber: string;
  phoneNumber: string;
  accountHolder: string;
  bankCode: string;
  accountNumber: string;
}

//회원 상세 기본 정보 조회
export const getUserDefaultInfo = (id: number) => {
  const data = API.get<{ data: UserDefaultRes }>(
    `/admin/user/${id}/detail/default`
  );
  return data;
};

//회원 상태 활성화
export const userActivate = (id: number) => {
  const data = API.patch<{ data: {} }>(`/admin/user/${id}/activate`);
  return data;
};

//회원 상태 비활성화
export const userDeactivate = (id: number) => {
  const data = API.patch<{ data: {} }>(`/admin/user/${id}/deactivate`);
  return data;
};

//회원 닉네임 수정
export const userNickChange = (payload: {
  id: number;
  data: { nickname: string };
}) => {
  const data = API.patch<{ data: ApiResType<{}> }>(
    `/account/${payload.id}/profile/nickname`,
    payload.data
  );
  return data;
};

//주민등록증 사본 미리보기
export const getIdCardPreview = (id: number) => {
  const queryString = `/admin/user/${id}/idcard/preview`;

  const data = API.get<Blob>(queryString, { responseType: "blob" });

  return data;
};

//사업자등록증 사본 미리보기
export const getBusCertifPreview = (id: number) => {
  const queryString = `/admin/user/${id}/business-certificate/preview`;

  const data = API.get<Blob>(queryString, { responseType: "blob" });

  return data;
};

//통장 사본 미리보기
export const getBankStatePreview = (id: number) => {
  const queryString = `/api/v1/admin/user/${id}/bank-statement/preview`;

  const data = API.get<Blob>(queryString, { responseType: "blob" });

  return data;
};
