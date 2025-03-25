import API from "@/api/API";

export interface TermsType {
  id: number;
  title: string;
  content: string;
  isRequired: boolean;
  effectiveDate: string;
  isActive: boolean;
  sortOrd: number;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
}

export interface PatchTermsType {
  title: string;
  content: string;
  isRequired: boolean;
  effectiveDate: string;
  sortOrd: number;
  createdBy: number;
  updatedBy: number;
}

// 모든 약관 조회
export const getTermsList = () => {
  const data = API.get<{ data: TermsType[] }>("/admin/term");
  return data;
};

// 약관 상세 조회
export const getDetailTermsList = (id: string | undefined) => {
  const data = API.get<{ data: TermsType }>(`/admin/term/${id}`);
  return data;
};

// 약관 생성
export const postTermsList = (body: any) => {
  const data = API.post("/admin/term", body);
  return data;
};

// 약관 수정
export const patchTermsList = (body: any, id: string | undefined) => {
  const data = API.patch<{ data: PatchTermsType }>(`/admin/term/${id}`, body);
  return data;
};
