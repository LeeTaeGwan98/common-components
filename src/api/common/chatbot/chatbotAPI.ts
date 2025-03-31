import API from "@/api/API";
import {
  ResSuccessType,
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

//챗봇 수정 페이로드
export interface UpdateChatBotPayload {
  categoryCode: string;
  question: string;
  isVisible: boolean;
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
  extends Omit<TableQueryStringType, "fromDt" | "toDt" | "sortOrder"> {
  isVisible: boolean | null;
}

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

//챗봇 상세 조회
export const getChatBotDetail = (id: number) => {
  const queryString = `/admin/chatbot/${id}`;

  const data = API.get<ResSuccessType<ResChatBotDataType>>(queryString);

  return data;
};

//챗봇 수정
export const updateChatBot = (payload: {
  id: number;
  data: UpdateChatBotPayload;
}) => {
  const data = API.patch<CreateChatBotRes>(
    `/admin/chatbot/${payload.id}`,
    payload.data
  );

  return data;
};

//챗봇 삭제
export const deleteChatBot = (id: number) => {
  const queryString = `/admin/chatbot/${id}`;

  const data = API.delete<ResSuccessType<{}>>(queryString);

  return data;
};
