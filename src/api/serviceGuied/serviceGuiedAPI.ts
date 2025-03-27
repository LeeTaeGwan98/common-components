import API from "@/api/API";
import { type TableResSuccessType } from "@/api/common/commonType";
import { COMMON_GROUP_CODE_UNION_TYPE } from "@/Constants/CommonGroupCode";

export interface AddGuiedPayload {
  serviceCode: string;
  categoryCode: string;
  title: string;
  content: string;
  createdBy: number;
  updatedBy: number;
}

export interface AddGuiedRes {
  id: 1;
  serviceCode: COMMON_GROUP_CODE_UNION_TYPE;
  categoryCode: string;
  title: string;
  content: string;
  isVisible: boolean;
  createdBy: 1;
  createdAt: string;
  updatedBy: 1;
  updatedAt: string;
}

export const addGuide = (payload: AddGuiedPayload) => {
  console.log(payload);
  const data = API.post<TableResSuccessType<AddGuiedRes>>(
    "/admin/guide",
    payload
  );

  return data;
};
