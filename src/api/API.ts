import axios, { AxiosResponse, isAxiosError } from "axios";

export default class API {
  static instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  static async get<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof axios.get<T, R, D>>
  ): Promise<R> {
    return this.instance.get<T, R, D>(...params).catch((error: unknown) => {
      alert(error);
      throw Error;
    });
  }

  static async post<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof axios.post<T, R, D>>
  ): Promise<R> {
    return this.instance.post<T, R, D>(...params).catch((error: unknown) => {
      alert(error);
      throw Error;
    });
  }

  static async put<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof axios.put<T, R, D>>
  ): Promise<R> {
    return this.instance.put<T, R, D>(...params).catch((error: unknown) => {
      alert(error);
      throw Error;
    });
  }

  static async patch<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof axios.patch<T, R, D>>
  ): Promise<R> {
    return this.instance.patch<T, R, D>(...params).catch((error: unknown) => {
      alert(error);
      throw Error;
    });
  }

  static async delete<T = any, R = AxiosResponse<T>, D = any>(
    ...params: Parameters<typeof axios.delete<T, R, D>>
  ): Promise<R> {
    return this.instance.delete<T, R, D>(...params).catch((error: unknown) => {
      alert(error);
      throw Error;
    });
  }
}
