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
  isVisible?: boolean | null;
  keyword?: string;
  take: number;
  page: number;
}
