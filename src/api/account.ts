import API from "@/api/API";
import {
  TableQueryStringType,
  TableResSuccessType,
} from "@/api/common/commonType";

export interface AccountType {
  id: number;
  email: string;
  name: string;
  rele: string;
  password: string;
  providerCode: string;
  providerId: string;
  socialAccessToken: string;
  phoneNumber: string;
  position: string;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
  lastLoginAt: string;
  isActive: boolean;
}

export interface GetAccountType {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  lastLoginAt: string;
  isActive: boolean;
}

export interface PostAccountType {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  position: string;
  isActive: boolean;
  permissions: string[];
  createdBy: number;
  updatedBy: number;
}

interface AccountPermission {
  id: number;
  userId: number;
  menuCode: string;
}

export interface GetDetailAccountType {
  id: number;
  email: string;
  name: string;
  role: string;
  providerCode: string | null;
  providerId: string | null;
  socialAccessToken: string | null;
  phoneNumber: string | null;
  position: string;
  createdBy: number;
  createdAt: string; // ISO 8601 날짜 포맷
  updatedBy: number;
  updatedAt: string; // ISO 8601 날짜 포맷
  lastLoginAt: string | null;
  isActive: boolean;
  permissions: AccountPermission[];
}

export interface PatchAccountType {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  position: string;
  isActive: boolean;
  permissions: string[];
  updatedBy: number;
}

//계정 목록
export const getAccountList = (queryStringObj: TableQueryStringType) => {
  const { fromDt, toDt, keyword, take, page } = queryStringObj;

  let qs = "/admin/account?";

  if (fromDt) {
    qs += `fromDt=${fromDt}&`;
  }
  if (toDt) {
    qs += `toDt=${toDt}&`;
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

  const data = API.get<TableResSuccessType<GetAccountType>>(qs);

  return data;
};

// 계정 생성
export const postAccountList = (body: any) => {
  const data = API.post<{ data: PostAccountType }>("/admin/account", body);
  return data;
};

// 계정 상세 조회
export const getDetailAccountList = (id: number) => {
  const data = API.get<{ data: GetDetailAccountType }>(`/admin/account/${id}`);
  return data;
};

// 계정 수정
export const patchAccountList = (payload: {
  id: number;
  data: PatchAccountType;
}) => {
  const data = API.patch<{ data: {} }>(
    `/admin/account/${payload.id}`,
    payload.data
  );
  return data;
};

// 계정 삭제
export const deleteAccountList = (id: number) => {
  const data = API.delete(`/admin/account/${id}`);
  return data;
};
