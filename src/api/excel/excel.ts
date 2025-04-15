import { GetAccountType } from "@/api/account";
import API from "@/api/API";
import { GetCoverRes } from "@/api/cover/coverAPI";
import { EbookRes } from "@/api/ebook";
import { InquiryRes } from "@/api/inquiry/inquiryAPI";
import { UserListData, UserWithdrawlListRes } from "@/api/user/userAPI";

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
  | "admin";

//키에 따라 데이터 타입을 매핑
type ExcelDataMap = {
  user: UserListData[];
  userPay: any;
  userPoint: any;
  userPublish: any;
  pay: any;
  withdrawal: UserWithdrawlListRes[];
  publish: EbookRes[];
  cover: GetCoverRes[];
  inquiry: InquiryRes[];
  admin: GetAccountType[];
};

type ExcelType<T extends ExcelKey> = ExcelDataMap[T];

//엑셀 다운로드 조회
export const getExcelSearch = <T extends ExcelKey>(key: T) => {
  return API.get<{ data: ExcelType<T> }>(`/common/excel/search?key=${key}`);
};
