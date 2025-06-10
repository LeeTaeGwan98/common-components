import API from "@/api/API";
import {
  ApiResType,
  TableQueryStringType,
  TableResType,
} from "@/api/common/commonType";

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

//템플릿 상세
export const getTemplateDetail = (id: string) => {
  const data = API.get<ApiResType<{}>>(`/admin/video/project/template/${id}`);
  return data;
};

export interface UpdateTmplateReq {
  userId: number;
  templateId: number;
  categoryCode: string;
  title: string;
}

//템플릿 수정
export const updateTemplate = (payload: UpdateTmplateReq) => {
  const data = API.patch<ApiResType<{}>>(
    `/admin/video/project/template/${payload.templateId}`,
    payload
  );
  return data;
};
