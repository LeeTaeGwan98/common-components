import API from "@/api/API";
import { COMMON_GROUP_CODE_UNION_TYPE } from "@/Constants/CommonGroupCode";

export interface DetailCodeType {
  addInfo: null;
  commDetailCode: string;
  commGroupCode: COMMON_GROUP_CODE_UNION_TYPE;
  createdBy: number;
  createdDt: string;
  detailCodeDesc: string;
  detailCodeName: boolean;
  isUsed: boolean;
  sortOrd: number;
  updatedBy: number;
  updatedDt: string;
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

export const getGroupCodes = (groupCodes: COMMON_GROUP_CODE_UNION_TYPE[]) => {
  const qs = groupCodes
    .map((code, index) => `${index === 0 ? "" : "&"}groupCodes=${code}`)
    .join("");

  const data = API.get<GetGroupCodesReq>(
    `/common/group-codes/detail-codes?${qs}`
  );

  return data;
};
