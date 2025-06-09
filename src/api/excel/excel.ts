import { GetAccountType } from "@/api/account";
import API from "@/api/API";
import { MyPointListRes } from "@/api/charging/chargingAPI";
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
type ExcelDataMap = {
  user: UserListData[];
  userPay: any;
  userPoint: MyPointListRes[];
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
export const getExcelSearch = <T extends ExcelKey>(key: T, userId?: number) => {
  let qs = `/common/excel/search?key=${key}`;

  if (userId) {
    qs = qs + `&userId=${userId}`;
  }
  return API.get<{ data: ExcelType<T> }>(qs);
};
