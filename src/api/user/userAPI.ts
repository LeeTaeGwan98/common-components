import API from "@/api/API";
import { type TableResSuccessType } from "@/api/common/commonType";
import { TableQueryStringType } from "@/api/common/commonType";

// export interface UserQueryStringType
//   extends Omit<TableQueryStringType, "isVisible"> {
//   // todo: isActive 서버에 보내명 500에러남
//   isActive?: boolean;
// }

export interface UserListData {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  planName: string;
  publishedEbookCount: number;
  point: number;
  isActive: boolean;
}

//모든 회원 목록 가져오기
export const getUserList = (queryStringObj: TableQueryStringType) => {
  const {
    sortOrder,
    fromDt,
    toDt,
    isVisible,
    keyword = "",
    take,
    page,
  } = queryStringObj;

  const getActiveQueryParam = (isActive: boolean | null): string => {
    if (isActive === true) return "&isActive=true";
    if (isActive === false) return "&isActive=false";
    return "";
  };

  const queryString = `/admin/user?sortOrder=${sortOrder}&fromDt=${fromDt}&toDt=${toDt}${getActiveQueryParam(
    isVisible
  )}${keyword ? `&keyword=${keyword}` : ""}&take=${take}&page=${page}`;

  const data = API.get<TableResSuccessType<UserListData>>(queryString);

  return data;
};
