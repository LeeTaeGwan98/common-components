import API from "@/api/API";
import { TableQueryStringType, TableResType } from "@/api/common/commonType";

//템플릿 목록 조회
export interface TemplateQueryStringType
  extends Omit<TableQueryStringType, ""> {
  isVisible: boolean | null;
  category: string;
}

//템플릿 목록
export const getTemplateList = (queryStringObj: TemplateQueryStringType) => {
  const { sortOrder, fromDt, toDt, isVisible, keyword, take, page } =
    queryStringObj;

  let qs = "/admin/video/project/template?";

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

  const data = API.get<TableResType<{}>>(qs);

  return data;
};
