import { useAuthStore } from "@/store/authStore";
import { ApiResType } from "@/api/common/commonType";
import axios, { AxiosResponse } from "axios";

export const APIInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// API헤더의 Authorization에 accessToken을 심어주는 인터셉터
APIInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

APIInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error.config;
    const { response } = error;

    // refresh 요청 자체는 제외
    if (originalReq.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (response && response.status === 401) {
      console.log("🔴 액세스 토큰 만료됨, 재발급 시도...");

      try {
        const data = await APIInstance.post<
          ApiResType<{ accessToken: string }>
        >("/auth/refresh");

        const { accessToken: newAccessToken } = data.data.data;

        if (newAccessToken) {
          originalReq.headers = {
            ...originalReq.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          useAuthStore.getState().updateAccessToken(newAccessToken);

          return APIInstance(originalReq);
        }
      } catch (refreshError) {
        console.log("🔴 리프레시 토큰도 만료됨, 로그아웃 처리");
        useAuthStore.getState().delUserInfo();
        await APIInstance.post("/auth/logout");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default class API {
  static instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });
  static async get<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.get<T, R, D>>
  ): Promise<R> {
    return APIInstance.get<T, R, D>(...params).catch((error: unknown) => {
      console.log(error);
      throw error;
    });
  }

  static async post<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.post<T, R, D>>
  ): Promise<R> {
    return APIInstance.post<T, R, D>(...params).catch((error: unknown) => {
      console.log(error);
      throw error;
    });
  }

  static async put<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.put<T, R, D>>
  ): Promise<R> {
    return APIInstance.put<T, R, D>(...params).catch((error: unknown) => {
      console.log(error);
      throw error;
    });
  }

  static async patch<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.patch<T, R, D>>
  ): Promise<R> {
    return APIInstance.patch<T, R, D>(...params).catch((error: unknown) => {
      console.log(error);
      throw error;
    });
  }

  static async delete<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.delete<T, R, D>>
  ): Promise<R> {
    return APIInstance.delete<T, R, D>(...params).catch((error: unknown) => {
      console.log(error);
      throw error;
    });
  }
}
