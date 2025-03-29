import API from "@/api/API";
import { type TableResSuccessType } from "@/api/common/commonType";

export interface CreateChatBotPayload {
  categoryCode: string;
  question: string;
  isVisible: boolean;
  createdBy: number;
  updatedBy: number;
}

export interface CreateChatBotRes {
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
