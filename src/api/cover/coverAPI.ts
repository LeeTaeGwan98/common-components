import API from "@/api/API";
import {
  ApiResType,
  FileUploadRes,
  type TableQueryStringType,
  type TableResType,
} from "@/api/common/commonType";

//표지목록 응답
export interface GetCoverRes {
  id: number;
  registeredAt: string;
  soldAt: string;
  title: string;
  coverNo: string;
  price: string;
  isVisible: boolean;
  buyerName: string;
}

//표지 목록 가져오기
export const getCover = (
  queryStringObj: TableQueryStringType & { isVisible: boolean | null }
) => {
  const { sortOrder, fromDt, toDt, isVisible, keyword, take, page } =
    queryStringObj;

  let qs = "/admin/cover?";

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

  const data = API.get<TableResType<GetCoverRes>>(qs);

  return data;
};

//표지 등록 요청
export interface CoverCreateReq {
  title: string;
  author: string;
  price: number;
  isVisible: boolean;
  description: string;
  coverSampleUploadId?: number;
  coverDesignUploadId?: number;
}

//표지 등록
export const coverCreate = (payload: CoverCreateReq) => {
  const data = API.post<ApiResType<{}>>("/admin/cover", payload);
  return data;
};

//표지 샘플 이미지
export const coverSamplelUpload = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const data = API.post<ApiResType<FileUploadRes>>(
    `/admin/cover/upload/sample`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

//표지 디자인 파일
export const coverDesignUpload = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const data = API.post<ApiResType<FileUploadRes>>(
    `/admin/cover/upload/design`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

//표지 상세 응답
export interface GetCoverDetailRes {
  id: number;
  title: string;
  coverNo: string;
  price: string;
  author: string;
  isVisible: boolean;
  coverSampleUploadId: number;
  coverDesignUploadId: number;
  coverSampleMimeType: string;
  coverDesignMimeType: string;
  coverSampleUploadName: string;
  coverDesignUploadName: string;
  coverSampleUploadUrl: string;
  coverDesignUploadUrl: string;
  description: string;
  buyerId: number;
  buyerName: string;
  registeredAt: string;
  soldAt: null | string;
}

//표지 상세 조회
export const getCoverDetail = (id: number) => {
  const data = API.get<ApiResType<GetCoverDetailRes>>(`/admin/cover/${id}`);

  return data;
};

//표지 미리보기 응답
export interface GetCoverPreviewRes {
  file: File;
}

//표지 미리보기
export const getCoverPreview = (id: number) => {
  const queryString = `/admin/cover/${id}/preview`;

  const data = API.get<Blob>(queryString, { responseType: "blob" });

  return data;
};

//표지 수정 요청
export interface CoverUpdateReq {
  title: string;
  author: string;
  price: number;
  isVisible: boolean;
  description: string;
  coverSampleUploadId?: number;
  coverDesignUploadId?: number;
}

//표지 수정
export const coverUpdate = (payload: { id: number; data: CoverUpdateReq }) => {
  const data = API.patch<ApiResType<{}>>(
    `/admin/cover/${payload.id}`,
    payload.data
  );
  return data;
};

//표지 삭제
export const coverDelete = (id: number) => {
  const data = API.delete<ApiResType<{}>>(`/admin/cover/${id}`);
  return data;
};
