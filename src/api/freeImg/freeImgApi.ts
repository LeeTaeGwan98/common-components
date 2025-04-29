import API from "@/api/API";
import { ApiResType } from "@/api/common/commonType";
import { TableQueryStringType } from "@/api/common/commonType";

interface RegistFreeImgRes {
  id: number;
  categoryCode: string;
  title: string;
  fileName: string;
  mimeType: string;
  createdDt: string;
}

export const registFreeImg = (formData: FormData) => {
  return API.post<ApiResType<RegistFreeImgRes>>("/admin/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

interface GetFreeImgRes {
  id: number;
  categoryCode: string;
  title: string;
  fileName: string;
  mimeType: string;
  createdAt: string;
}

export const getFreeImg = (qs: TableQueryStringType) => {
  const { sortOrder, fromDt, toDt, keyword, take, page } = qs;
  let qsUrl = "/admin/image";

  if (sortOrder) {
    qsUrl += `sortOrder=${sortOrder}&`;
  }
  if (fromDt) {
    qsUrl += `fromDt=${fromDt}&`;
  }
  if (toDt) {
    qsUrl += `toDt=${toDt}&`;
  }
  if (keyword) {
    qsUrl += `keyword=${keyword}&`;
  }
  if (take !== null) {
    qsUrl += `take=${take}&`;
  }
  if (page !== null) {
    qsUrl += `page=${page}&`;
  }
  if (qsUrl.endsWith("&")) {
    qsUrl = qsUrl.slice(0, -1);
  }

  const data = API.get<ApiResType<GetFreeImgRes[]>>(qsUrl);

  return data;
};

export const getFreeImgDetail = (id: number) => {
  const data = API.get<ApiResType<GetFreeImgRes>>(`/admin/image/${id}`);
  return data;
};

interface PatchFreeImgPayload {
  categoryCode: string;
  title: string;
  fileName: string;
  file: File;
}

interface PatchFreeImgRes {
  id: number;
  categoryCode: string;
  title: string;
  fileName: string;
  mimeType: string;
  createdDt: string;
}

export const patchFreeImg = (id: number, payload: PatchFreeImgPayload) => {
  const data = API.patch<ApiResType<PatchFreeImgRes>>(
    `/admin/image/${id}`,
    payload
  );

  return data;
};

export const DeleteFreeImg = (id: number) => {
  const data = API.delete(`/admin/image/${id}`);
  return data;
};
