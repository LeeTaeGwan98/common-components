import { AxiosResponse } from "axios";

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
