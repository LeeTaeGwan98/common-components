import API from "@/api/API";
import {
  ApiResType,
  FileUploadRes,
  TableQueryStringType,
  TableResType,
} from "@/api/common/commonType";

//튜토리얼 목록 조회
export interface TutorialQueryStringType
  extends Omit<TableQueryStringType, ""> {
  isVisible: boolean | null;
}

//튜토리얼 목록 응답값
interface TutoralListRes {
  id: number;
  title: string;
  categoryCode: string;
  isVisible: boolean;
  createdAt: string;
}

//튜토리얼 생성 요청값
export interface TutorialCreateReq {
  title: string;
  categoryCode: string;
  isVisible: boolean;
  videoUploadId: number;
  thumnailUploadId: number;
}
//튜토리얼 생성 응답값
interface TutoralCreateRes {
  id: number;
  title: string;
  categoryCode: string;
  isVisible: boolean;
  createDt: string;
}
//튜토리얼 상세 응답값
interface TutoralDetailRes {
  id: number;
  title: string;
  categoryCode: string;
  isVisible: boolean;
  createDt: string;
  videoUploadId: number;
  thumnailUploadId: number;
  videoUploadName: string;
  thumnailUploadName: string;
  videoUploadUrl: string;
  thumnailUploadUrl: string;
}

//튜토리얼 목록
export const getTutorial = (queryStringObj: TutorialQueryStringType) => {
  const { sortOrder, fromDt, toDt, isVisible, keyword, take, page } =
    queryStringObj;

  let qs = "/admin/video/tutorial?";

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

  const data = API.get<TableResType<TutoralListRes>>(qs);

  return data;
};

//튜토리얼 생성
export const tutorialCreate = (payload: TutorialCreateReq) => {
  const data = API.post<ApiResType<TutoralCreateRes>>(
    "/admin/video/tutorial",
    payload
  );
  return data;
};

//튜토리얼 영상 업로드
export const tutorialVideoUpload = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const data = API.post<ApiResType<FileUploadRes>>(
    `/admin/video/tutorial/upload/video`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

//튜토리얼 썸네일
export const tutorialThumbnailUpload = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const data = API.post<ApiResType<FileUploadRes>>(
    `/admin/video/tutorial/upload/thumnail`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

//튜토리얼 상세 조회
export const getTutorialDetail = (id: number) => {
  const queryString = `/admin/video/tutorial/${id}`;

  const data = API.get<ApiResType<TutoralDetailRes>>(queryString);

  return data;
};

//튜토리얼 수정
export const tutorialUpdate = (payload: {
  id: number;
  data: TutorialCreateReq;
}) => {
  const data = API.patch<ApiResType<TutoralCreateRes>>(
    `/admin/video/tutorial/${payload.id}`,
    payload.data
  );
  return data;
};

//튜토리얼 삭제
export const tutorialDelete = (id: number) => {
  const data = API.delete<ApiResType<{}>>(`/admin/video/tutorial/${id}`);
  return data;
};

//튜토리얼 영상 스트리밍
export const tutoriaVideoGet = (id: number) => {
  const data = API.get<Blob>(`/admin/video/tutorial/${id}/stream`, {
    responseType: "blob",
  });
  return data;
};
