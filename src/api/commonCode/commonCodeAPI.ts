import API from "@/api/API";
import { APIResponse } from "@/api/common/commonType";
import { COMMON_GROUP_CODE_UNION_TYPE } from "@/Constants/CommonGroupCode";

export interface DetailCodeType {
  addInfo: null;
  commDetailCode: string;
  commGroupCode: COMMON_GROUP_CODE_UNION_TYPE;
  createdBy: number;
  createdDt: string;
  detailCodeDesc: string;
  detailCodeName: string;
  isUsed: boolean;
  sortOrd: number;
  updatedBy: number;
  updatedDt: string;
}

export interface GetDetailGroupCodeRes {
  commDetailCode: string;
  commGroupCode: string;
  detailCodeName: boolean;
  detailCodeDesc: boolean;
  addInfo: null;
  sortOrd: number;
  isUsed: boolean;
  createdBy: number;
  createdDt: string;
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

export const getDetailGroupCodes = (
  groupCodes: COMMON_GROUP_CODE_UNION_TYPE[]
) => {
  const qs = groupCodes
    .map((code, index) => `${index === 0 ? "" : "&"}${code}`)
    .join("");

  const data = API.get<APIResponse<GetDetailGroupCodeRes>>(
    `/common/group-code/${qs}/detail-code`
  );

  return data;
};

//모든 그룹코드 조회
export const getAllGroupCodes = () => {
  const data = API.get<GetAllGroupCodesReq>(`/common/group-code`);

  return data;
};
