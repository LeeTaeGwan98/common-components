import { TableQueryStringType } from "@/api/common/commonType";

//무료 이미지 관리 목록 요청
export interface ImageQueryStringType
  extends Omit<TableQueryStringType, "isVisible"> {}
