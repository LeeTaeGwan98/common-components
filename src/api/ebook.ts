import API from "@/api/API";
import { TableQueryStringType, TableResType } from "@/api/common/commonType";

export interface EbookQueryStringType extends Omit<TableQueryStringType, ""> {
  isVisible: boolean | null;
}

interface EbookRes {
  id: number;
  submittedAt: string;
  approvedAt: string;
  name: string;
  price: string;
  title: string;
  author: string;
  status: string;
  approveAdminId: number;
}

//전자책 모든 목록 가져오기
export const getEbookList = (queryStringObj: EbookQueryStringType) => {
  const { sortOrder, fromDt, toDt, isVisible, keyword, take, page } =
    queryStringObj;

  let qs = "/admin/ebook?";

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

  const data = API.get<TableResType<EbookRes>>(qs);

  return data;
};

//전자책 상세
export const getEbookDetail = (id: number) => {
  const data = API.get(`/admin/ebook/${id}`);
  return data;
};
