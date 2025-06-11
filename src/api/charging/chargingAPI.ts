import API from "@/api/API";
import {
  ApiResType,
  TableQueryStringType,
  TableResType,
} from "@/api/common/commonType";

export interface CreatePointListReq {
  chargeAmount: number;
  paidAmount: number;
}

//충전소 목록 생성
export const createPointList = (payload: CreatePointListReq) => {
  return API.post<ApiResType<{}>>(`/admin/ebook/charge/setting`, payload);
};

export interface UpdatePointListReq {
  id: number;
  chargeAmount: number;
  paidAmount: number;
}

//충전소 목록 수정
export const updatePointList = (payload: UpdatePointListReq[]) => {
  return API.put<ApiResType<{}>>(`/admin/ebook/charge/setting`, payload);
};

export interface PointListRes {
  id: number;
  chargeAmount: number;
  paidAmount: number;
}

//충전소 목록 조회
export const getPointList = () => {
  return API.get<ApiResType<PointListRes[]>>(`/admin/ebook/charge/setting`);
};

export interface PointQueryStringType extends Omit<TableQueryStringType, ""> {
  status: string;
}

export interface MyPointListRes {
  id: number;
  description: string;
  createdAt: string;
  orderAmount: number;
  pointAmount: number;
  transactionType: string;
  merchantUid: string;
  status: string;
}

//회원의 포인트 내역 조회
export const getMyPointList = (
  queryStringObj: PointQueryStringType,
  userId: number
) => {
  const { sortOrder, fromDt, toDt, status, keyword, take, page } =
    queryStringObj;

  let qs = "/point/admin/history?";

  qs += `userId=${userId}&`;

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

  const data = API.get<TableResType<MyPointListRes>>(qs);

  return data;
};
