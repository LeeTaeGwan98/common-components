import API from "@/api/API";
import {
  ApiResType,
  TableQueryStringType,
  TableResType,
} from "@/api/common/commonType";

//문의사항 목록 조회
export interface InquiryQueryStringType extends Omit<TableQueryStringType, ""> {
  isResponse: boolean | null;
}
//문의사항 목록 조회 응답
export interface InquiryRes {
  id: number;
  inquiryAt: string;
  name: string;
  serviceCode: string;
  type: string;
  isResponse: boolean;
  title: string;
  responseAdminName: string;
}

//문의사항 상세 응답
export interface ResGuideDetailType {
  id: number;
  inquiryAt: string;
  name: string;
  serviceCode: string;
  type: string;
  title: string;
  content: string;
  responseContent: string;
}

//문의사항 답변
export interface InquiryResponseType {
  responseContent: string;
  responseAdminId: number;
}

//문의사항 목록 조회
export const getInquiry = (queryStringObj: InquiryQueryStringType) => {
  const { sortOrder, fromDt, toDt, isResponse, keyword, take, page } =
    queryStringObj;

  let qs = "/admin/inquiry?";

  if (sortOrder) {
    qs += `sortOrder=${sortOrder}&`;
  }
  if (fromDt) {
    qs += `fromDt=${fromDt}&`;
  }
  if (toDt) {
    qs += `toDt=${toDt}&`;
  }
  if (isResponse !== null) {
    qs += `isResponse=${isResponse}&`;
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

  const data = API.get<TableResType<InquiryRes>>(qs);

  return data;
};

//문의 사항 상세
export const getInquiryDetail = (id: number) => {
  const queryString = `/admin/inquiry/${id}`;

  const data = API.get<ApiResType<ResGuideDetailType>>(queryString);

  return data;
};

//문의 사항 답변
export const inquiryResponse = (payload: {
  id: number;
  data: InquiryResponseType;
}) => {
  const data = API.post<{}>(
    `/admin/inquiry/${payload.id}/response`,
    payload.data
  );

  return data;
};

//문의 사항 수정
export const updateInquiryResponse = (payload: {
  id: number;
  data: InquiryResponseType;
}) => {
  const data = API.patch<{}>(
    `/admin/inquiry/${payload.id}/response`,
    payload.data
  );

  return data;
};

//문의 사항 삭제
export const deleteInquiry = (id: number) => {
  const data = API.delete(`/admin/inquiry/${id}`);

  return data;
};
