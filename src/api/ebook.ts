import API from "@/api/API";
import {
  ApiResType,
  TableQueryStringType,
  TableResType,
} from "@/api/common/commonType";

export interface EbookQueryStringType extends Omit<TableQueryStringType, ""> {
  status: string;
}

export interface EbookRes {
  id: number;
  submittedAt: string;
  approvedAt: string;
  name: string;
  price: string;
  title: string;
  author: string;
  status: string;
  approveAdminId: any;
  approveAdminName: string;
}

interface EbookDetailRes {
  id: number;
  name: string;
  submittedAt: string;
  title: string;
  subTitle: string;
  author: string;
  categoryCode: string;
  price: string;
  creationMethod: string;
  coverImageFileName: string;
  coverImageFilePath: string;
  coverImageMimeType: string;
  menuscriptFileName: string;
  menuscriptFileSize: any;
  status: string;
}
export interface postEbookHoldProps {
  holdReason: any;
  adminId: number;
}

export interface getEbookHoldProps {
  id: number;
  ebookId: number;
  name: string;
  title: string;
  author: string;
  submittedAt: string;
  holdReason: string;
}

//전자책 모든 목록 가져오기
export const getEbookList = (queryStringObj: EbookQueryStringType) => {
  const { sortOrder, fromDt, toDt, status, keyword, take, page } =
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
  if (status !== null && status !== "ALL") {
    qs += `status=${status}&`;
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
  const data = API.get<ApiResType<EbookDetailRes>>(`/admin/ebook/${id}`);
  return data;
};

//관리자의 전자책 보류처리
export const postEbookHold = (id: number, body: postEbookHoldProps) => {
  const data = API.post(`/admin/ebook/${id}/hold`, body);
  return data;
};

//전자책 보류 사유 조회
export const getEbookHold = (id: number) => {
  const data = API.get<ApiResType<getEbookHoldProps>>(
    `/admin/ebook/${id}/hold`
  );
  return data;
};

//관리자의 전자책 승인처리
export const postEbookApprove = (id: number) => {
  const data = API.post(`/admin/ebook/${id}/approve`, {});
  return data;
};

//표지 미리보기
export const getEbookCoverPreview = (id: number) => {
  const queryString = `/admin/ebook/${id}/cover/preview`;

  const data = API.get<Blob>(queryString, { responseType: "blob" });

  return data;
};
