import axios, { AxiosResponse } from "axios";
import { useAuthStore } from "@/store/authStore";
import { ApiResType } from "@/api/common/commonType";

export const APIInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// API헤더의 Authorization에 accessToken을 심어주는 인터셉터
// APIInstance.interceptors.request.use((config) => {
//   const accessToken = useAuthStore.getState().accessToken;
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// });

APIInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { request, response, config: originalReq } = error;

    // 401에러 발생(엑세스토큰 만료)
    // 무한루프를 방지하기 위한 방법으로 retryFlag속성을 추가
    // originalReq에 retryFlag라는 속성은 원래 존재하지않음
    // 그렇기 때문에 originalReq.retryFlag가 undefined면 최초 실행이라는 것이 보장됨
    if (response && response.status === 401 && !originalReq.retryFlag) {
      // retryFlag를 true로 변경함
      originalReq.retryFlag = true;
      console.log("🔴 액세스 토큰 만료됨, 재발급 시도...");
      try {
        // 엑세스토큰을 다시 받아오는 API호출
        const data = await APIInstance.post<
          ApiResType<{ accessToken: string }>
        >("/auth/refresh");

        const { accessToken: newAccessToken } = data.data.data;

        if (newAccessToken) {
          // 기존 요청에 새로 발급한 accessToken으로 교체
          originalReq.headers.Authorization = `Bearer ${newAccessToken}`;

          // localStorage와 전역상태로 관리되는 accessToken을 새로운것으로 교체
          useAuthStore.getState().updateAccessToken(newAccessToken);

          return APIInstance(originalReq); // 요청 재시도
        }
      } catch (refreshError) {
        console.log("🔴 리프레시 토큰도 만료됨, 로그아웃 처리");
        // 로컬스토리지와 전역상태로 관리되던 유저정보 삭제
        useAuthStore.getState().delUserInfo();
        // 로그아웃 API 호출
        APIInstance.post("/auth/logout");
        // 로그인 페이지로 이동
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
      // console.log(error);
      throw Error;
    });
  }

  static async post<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.post<T, R, D>>
  ): Promise<R> {
    return APIInstance.post<T, R, D>(...params).catch((error: unknown) => {
      console.log(error);
      throw Error;
    });
  }

  static async put<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.put<T, R, D>>
  ): Promise<R> {
    return APIInstance.put<T, R, D>(...params).catch((error: unknown) => {
      console.log(error);
      throw Error;
    });
  }

  static async patch<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.patch<T, R, D>>
  ): Promise<R> {
    return APIInstance.patch<T, R, D>(...params).catch((error: unknown) => {
      console.log(error);
      throw Error;
    });
  }

  static async delete<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof APIInstance.delete<T, R, D>>
  ): Promise<R> {
    return APIInstance.delete<T, R, D>(...params).catch((error: unknown) => {
      console.log(error);
      throw Error;
    });
  }
}
