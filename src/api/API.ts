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

    // 요청 재시도 플래그 확인 (무한 루프 방지)
    if (originalReq._retry) {
      return Promise.reject(error);
    }

    // refresh 요청 자체는 제외
    if (originalReq.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // 액세스 토큰 만료 케이스 (401) 또는 토큰 관련 에러 (403 등)일 경우
    if (response.status === 401) {
      console.log("🔴 액세스 토큰 만료됨, 재발급 시도...");

      // 재시도 플래그 설정
      originalReq._retry = true;

      try {
        // 리프레시 토큰으로 새 액세스 토큰 요청
        const data = await APIInstance.post<
          ApiResType<{ accessToken: string }>
        >("/auth/refresh");

        const { accessToken: newAccessToken } = data.data.data;

        // 새 액세스 토큰 적용
        originalReq.headers = {
          ...originalReq.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        // 상태 업데이트
        useAuthStore.getState().updateAccessToken(newAccessToken);
        console.log("🟢 액세스 토큰 갱신 성공");

        // 원래 요청 재시도
        return APIInstance(originalReq);
      } catch (refreshError: any) {
        console.log(
          "🔴 리프레시 토큰 오류:",
          refreshError?.message || refreshError
        );

        // 리프레시 토큰 오류 종류 확인
        const refreshResponse = refreshError?.response;

        if (refreshResponse.status === 401) {
          console.log("🔴 리프레시 토큰 만료됨, 로그아웃 처리");
          useAuthStore.getState().delUserInfo();
          await APIInstance.post("/auth/logout");
          window.location.href = "/";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default class API {
  static async get<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.get<T, R, D>>
  ): Promise<R> {
    return APIInstance.get<T, R, D>(...params).catch((error: unknown) => {
      throw error;
    });
  }

  static async post<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.post<T, R, D>>
  ): Promise<R> {
    return APIInstance.post<T, R, D>(...params).catch((error: unknown) => {
      throw error;
    });
  }

  static async put<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.put<T, R, D>>
  ): Promise<R> {
    return APIInstance.put<T, R, D>(...params).catch((error: unknown) => {
      throw error;
    });
  }

  static async patch<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.patch<T, R, D>>
  ): Promise<R> {
    return APIInstance.patch<T, R, D>(...params).catch((error: unknown) => {
      throw error;
    });
  }

  static async delete<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.delete<T, R, D>>
  ): Promise<R> {
    return APIInstance.delete<T, R, D>(...params).catch((error: unknown) => {
      throw error;
    });
  }
}
