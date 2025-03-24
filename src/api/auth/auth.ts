import API from "@/api/API";

interface LoginParams {
  email: string;
  password: string;
}

export const login = (userInfo: LoginParams) => {
  const data = API.post("/auth/login", userInfo);

  return data;
};

export const logout = () => {
  const data = API.post("/auth/logout");

  return data;
};
