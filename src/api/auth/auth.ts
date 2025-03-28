import API from "@/api/API";

interface LoginParams {
  email: string;
  password: string;
}

export interface UserInfoRes {
  id: number;
  email: string;
  name: string;
  position: string;
  phoneNumber: string;
  role: string;
  providerCode: string;
  permissions: {
    permissions: string[];
  };
  accessToken: string;
  refreshToken: string;
}

export const login = (userInfo: LoginParams) => {
  const data = API.post<{ data: UserInfoRes }>("/auth/login", userInfo);

  return data;
};

export const logout = () => {
  const data = API.post("/auth/logout");

  return data;
};

export const getUserInfo = () => {
  const data = API.post<UserInfoRes>("/auth/profile");

  return data;
};
