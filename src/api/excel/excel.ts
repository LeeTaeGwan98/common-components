import { GetAccountType } from "@/api/account";
import API from "@/api/API";
import { GetCoverRes } from "@/api/cover/coverAPI";
import { EbookRes } from "@/api/ebook";
import { GetFreeImgRes } from "@/api/freeImg/freeImgApi";
import { InquiryRes } from "@/api/inquiry/inquiryAPI";
import {
  UserListData,
  UserPublishRes,
  UserWithdrawlListRes,
} from "@/api/user/userAPI";

//엑셀 다운로드 조회 키 목록
export type ExcelKey =
  | "user"
  | "userPay"
  | "userPoint"
  | "userPublish"
  | "pay"
  | "withdrawal"
  | "publish"
  | "cover"
  | "inquiry"
  | "admin"
  | "freeImage";

//키에 따라 데이터 타입을 매핑
//todo: any로 되어있는 페이지는 현재 엑셀 연동 안됨. 엑셀 연동 해야함
type ExcelDataMap = {
  user: UserListData[];
  userPay: any;
  userPoint: any;
  userPublish: UserPublishRes[];
  pay: any;
  withdrawal: UserWithdrawlListRes[];
  publish: EbookRes[];
  cover: GetCoverRes[];
  inquiry: InquiryRes[];
  admin: GetAccountType[];
  freeImage: GetFreeImgRes[];
};

type ExcelType<T extends ExcelKey> = ExcelDataMap[T];

//엑셀 다운로드 조회
export const getExcelSearch = <T extends ExcelKey>(key: T) => {
  return API.get<{ data: ExcelType<T> }>(`/common/excel/search?key=${key}`);
};
