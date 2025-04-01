import axios, { AxiosResponse } from "axios";
import { useAuthStore } from "@/store/authStore";
import { refreshAccessToken } from "@/api/auth/auth";

export const APIInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "http://localhost:5173",  테스트용
  withCredentials: true,
});

// API헤더의 Authorization에 accessToken을 심어주는 인터셉터
APIInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  document.cookie = // 테스트용
    "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiYWRtaW5AbmF2ZXIuY29tIiwibmFtZSI6Iuq0gOumrOyekDIiLCJwcm92aWRlckNvZGUiOm51bGwsImlhdCI6MTc0MzQ4MjY0MywiZXhwIjoxNzQ0MDg3NDQzfQ.NDVLl8ZOaTOEGYFatZ8QjGidb31Jwu7jY0KlrS4wv_Y";

  return config;
});

// APIInstance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const { request, response, config: originalReq } = error;

//     // 401에러 발생
//     if (response && response.status === 401) {
//       console.log("🔴 액세스 토큰 만료됨, 재발급 시도...");

//       try {
//         // 전역상태에 저장된 refreshToken을 가져옴
//         const refreshToken = useAuthStore.getState().refreshToken;

//         document.cookie = `refreshToken=${refreshToken}`;
//         const a = document.cookie;
//         console.log(a);

//         if (refreshToken) {
//           // 새 토큰 발급 요청

//           return axios(originalReq); // 요청 재시도
//         }
//       } catch (refreshError) {
//         console.log("🔴 리프레시 토큰도 만료됨, 로그아웃 처리");
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

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
