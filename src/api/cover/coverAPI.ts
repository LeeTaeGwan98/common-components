import API from "@/api/API";
import {
  type TableQueryStringType,
  type TableResType,
} from "@/api/common/commonType";

const COVER_BASE_URL = "/admin/cover";

export interface GetCoverRes {
  id: number;
  registeredAt: string;
  soldAt: string;
  title: string;
  coverNo: string;
  price: string;
  isVisible: boolean;
  buyerName: string;
}

export const getCover = (
  qsObj: TableQueryStringType & { isVisible: boolean | null }
) => {
  const { sortOrder, fromDt, toDt, isVisible, keyword, take, page } = qsObj;

  let qs = COVER_BASE_URL;

  const data = API.get<TableResType<GetCoverRes>>(qs);

  return data;
};
