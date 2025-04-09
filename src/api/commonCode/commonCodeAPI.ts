import API from "@/api/API";
import { ApiResType } from "@/api/common/commonType";
import { COMMON_GROUP_CODE_UNION_TYPE } from "@/Constants/CommonGroupCode";

export interface DetailCodeType {
  addInfo: null;
  commDetailCode: string;
  commGroupCode: string;
  createdBy: number;
  createdDt: string;
  detailCodeDesc: string;
  detailCodeName: string;
  isUsed: boolean;
  sortOrd: number;
  updatedBy: number;
  updatedDt: string;
}

export interface DetailCodeUpdateReq {
  commDetailCode: string;
  commGroupCode?: string;
  detailCodeName: string;
  detailCodeDesc: string;
  addInfo: string;
  sortOrd?: number;
  isUsed?: boolean;
  createdBy: number;
  updatedBy: number;
}

export interface DetailCodeAddReq {
  commDetailCode?: string;
  commGroupCode: string;
  detailCodeName: string;
  detailCodeDesc: string;
  addInfo?: string;
  sortOrd?: number;
  isUsed?: boolean;
  createdBy: number;
  updatedBy: number;
}

export interface GetDetailGroupCodeRes {
  addInfo: string;
  commDetailCode: string;
  commGroupCode: string;
  createdBy: number;
  createdDt: string;
  detailCodeDesc: string;
  detailCodeName: string;
  isUsed: boolean;
  sortOrd: number;
  updatedBy: number;
  updatedDt: string;
}

export interface GetAllGroupCodeRes {
  commGroupCode: string;
  groupCodeName: string;
  groupCodeDesc: string;
  isUsed: boolean;
}

export const getGroupCode = (groupCode: COMMON_GROUP_CODE_UNION_TYPE) => {
  const data = API.get(`/common/group-code/${groupCode}`);

  return data;
};

export interface GetGroupCodesReq {
  status: number;
  success: boolean;
  message: string;
  data: { [key in COMMON_GROUP_CODE_UNION_TYPE]: DetailCodeType[] };
}

export interface GetAllGroupCodesReq {
  status: number;
  success: boolean;
  message: string;
  data: GetAllGroupCodeRes[];
}

export const getGroupCodes = (groupCodes: string[]) => {
  const qs = groupCodes
    .map((code, index) => `${index === 0 ? "" : "&"}groupCodes=${code}`)
    .join("");

  const data = API.get<GetGroupCodesReq>(
    `/common/group-codes/detail-codes?${qs}`
  );

  return data;
};

//그룹코드의 전체 상세 코드 조회
export const getDetailGroupCodes = (groupCode: string) => {
  const data = API.get<ApiResType<GetDetailGroupCodeRes[]>>(
    `/common/group-code/${groupCode}/detail-code`
  );

  return data;
};

//모든 그룹코드 조회
export const getAllGroupCodes = () => {
  const data = API.get<GetAllGroupCodesReq>(`/common/group-code`);

  return data;
};

//상세 코드 수정
export const updateDetailCode = (payload: {
  groupCode: string;
  data: DetailCodeUpdateReq;
}) => {
  const data = API.patch<GetDetailGroupCodeRes>(
    `/common/group-code/${payload.groupCode}/detail-code/${payload.data.commDetailCode}`,
    payload.data
  );

  return data;
};

//상세 코드 여러개 수정
export const updateDetailCodes = (payload: DetailCodeUpdateReq[]) => {
  const groupCode = payload[0].commGroupCode ?? "";
  const data = API.patch<GetDetailGroupCodeRes>(
    `/common/group-code/${groupCode}/detail-codes`,
    payload
  );

  return data;
};

//상세 코드 추가
export const addDetailCode = (payload: DetailCodeAddReq) => {
  console.log(payload);
  const data = API.post<DetailCodeType>(
    `/common/group-code/${payload.commGroupCode}/detail-code`,
    payload
  );

  return data;
};
