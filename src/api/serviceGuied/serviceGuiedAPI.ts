import API from "@/api/API";
import {
  TableQueryStringType,
  type TableResSuccessType,
} from "@/api/common/commonType";
import { COMMON_GROUP_CODE_UNION_TYPE } from "@/Constants/CommonGroupCode";

//서비스 가이드 목록 조회
export interface ServiceGuideQueryStringType
  extends Omit<TableQueryStringType, ""> {
  isVisible: boolean | null;
}

//서비스 가이드 목록 조회 응답
interface ServiceGuideRes {
  id: 1;
  serviceCode: COMMON_GROUP_CODE_UNION_TYPE;
  categoryCode: string;
  isVisible: boolean;
  title: string;
  createdAt: string;
}

//서비스 가이드 생성
export interface AddGuiedPayload {
  serviceCode: string;
  categoryCode: string;
  title: string;
  content: string;
  createdBy: number;
  updatedBy: number;
}

//서비스 가이드 응답 데이터
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

//서비스 가이드 목록
export const getServiceGuide = (
  queryStringObj: ServiceGuideQueryStringType
) => {
  const { sortOrder, fromDt, toDt, isVisible, keyword, take, page } =
    queryStringObj;

  let qs = "/admin/guide?";

  if (sortOrder) {
    qs += `sortOrder=${sortOrder}&`;
  }
  if (fromDt) {
    qs += `fromDt=${fromDt}&`;
  }
  if (toDt) {
    qs += `toDt=${toDt}&`;
  }
  if (isVisible !== null) {
    qs += `isVisible=${isVisible}&`;
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

  const data = API.get<TableResSuccessType<ServiceGuideRes>>(qs);

  return data;
};

//서비스 가이드 생성
export const addGuide = (payload: AddGuiedPayload) => {
  console.log(payload);
  const data = API.post<TableResSuccessType<AddGuiedRes>>(
    "/admin/guide",
    payload
  );

  return data;
};
