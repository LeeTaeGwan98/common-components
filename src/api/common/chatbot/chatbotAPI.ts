import API from "@/api/API";
import {
  TableQueryStringType,
  TableResSuccessType,
} from "@/api/common/commonType";

//챗봇 생성 페이로드
export interface CreateChatBotPayload {
  categoryCode: string;
  question: string;
  isVisible: boolean;
  createdBy: number;
  updatedBy: number;
}

//챗봇 생성 응답
export interface CreateChatBotRes {
  id: number;
  categoryCode: string;
  question: string;
  isVisible: boolean;
}

//챗봇 목록 조회
export interface ChatBotQueryStringType
  extends Omit<TableQueryStringType, "fromDt" | "toDt" | "sortOrder"> {}

//챗봇 목록 조회 응답
export interface ResChatBotDataType {
  id: number;
  categoryCode: string;
  question: string;
  isVisible: boolean;
}

//챗봇 생성
export const createChatBot = (payload: CreateChatBotPayload) => {
  console.log(payload);
  const data = API.post<CreateChatBotRes>("/admin/chatbot", payload);

  return data;
};

//챗봇 목록 조회
export const getChatBotList = (queryStringObj: ChatBotQueryStringType) => {
  const { isVisible = true, keyword = "", take, page } = queryStringObj;

  const getVisibleQueryParam = (isVisible: boolean | null): string => {
    if (isVisible === true) return "&isVisible=true";
    if (isVisible === false) return "&isVisible=false";
    return "";
  };

  const queryString = `/admin/chatbot?${getVisibleQueryParam(isVisible)}${
    keyword ? `&keyword=${keyword}` : ""
  }&take=${take}&page=${page}`;

  const data = API.get<TableResSuccessType<ResChatBotDataType>>(queryString);

  return data;
};
