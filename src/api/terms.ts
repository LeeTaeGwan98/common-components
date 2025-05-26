import API from "@/api/API";
import { TableResType, TermsQueryStringType } from "@/api/common/commonType";

//약관 정보
export interface TermsType {
  id: number;
  type: string;
  title: string;
  content: string;
  name: string;
  effectiveDate: string;
  updatedAt: string;
}

//약관 생성
export interface CreateTermsType {
  type: string;
  title: string;
  content: string;
  isRequired: boolean;
  isMarketing: boolean;
  effectiveDate: string;
  createdBy: number;
  updatedBy: number;
}

//약관 수정
export interface PatchTermsType {
  type: string;
  title: string;
  content: string;
  isRequired: boolean;
  isMarketing: boolean;
  effectiveDate: string;
  updatedBy: number;
}

// 모든 약관 조회
export const getTermsList = (queryStringObj: TermsQueryStringType) => {
  const { take, page } = queryStringObj;

  let qs = "admin/term?";

  if (take !== null) {
    qs += `take=${take}&`;
  }
  if (page !== null) {
    qs += `page=${page}&`;
  }
  if (qs.endsWith("&")) {
    qs = qs.slice(0, -1);
  }

  const data = API.get<TableResType<TermsType>>(qs);
  return data;
};

// 약관 상세 조회
export const getDetailTermsList = (id: number) => {
  const data = API.get<{ data: TermsType }>(`/admin/term/${id}`);
  return data;
};

// 약관 생성
export const postTermsList = (body: CreateTermsType) => {
  const data = API.post("/admin/term", body);
  return data;
};

// 약관 수정
export const patchTermsList = (payload: {
  id: number;
  data: PatchTermsType;
}) => {
  const data = API.patch<TermsType>(`/admin/term/${payload.id}`, payload.data);
  return data;
};
