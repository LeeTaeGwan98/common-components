export interface PaginationMetaType {
  hasNextPage: boolean;
  page: number;
  take: number;
  totalCount: number;
  totalPage: number;
}

export interface TableResSuccessType<T> {
  data: {
    list: T[];
    meta: PaginationMetaType;
  };
  message: string;
  statue: number;
  success: boolean;
}

export interface TableQueryStringType {
  sortOrder: "DESC" | "ASC";
  fromDt: string;
  toDt: string;
  isVisible: boolean | null;
  keyword: string;
  take: number;
  page: number;
}

/**
 * 제네릭 객체 T의 각 속성(key)에 대한 액션 타입을 정의
 * 각 액션은 { type, value } 형태의 객체
 * - type: T의 속성 이름(key)
 * - value: 해당 속성의 값 타입(T[key])
 *
 * 이 타입은 리듀서를 사용시 상태 속성별 액션을 타입 정의하는 데 사용
 *
 * @example
 * interface UserState {
 *   name: string;
 *   age: number;
 * }
 * // { type: "name"; value: string; } | { type: "age"; value: number; }
 */
export type ActionType<T> = {
  [K in keyof T]: {
    type: K;
    value: T[K];
  };
}[keyof T];
