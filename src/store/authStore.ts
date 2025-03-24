import { create } from "zustand";
import { getCookie } from "@/lib/cookie";

interface AuthState {
  isLogin: boolean;
  checkLogin: () => void;
  setIsLogin: (auth: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: !!getCookie("accessToken"),
  checkLogin: () => {
    const token = getCookie("accessToken");
    set({ isLogin: !!token });
  },
  setIsLogin: (auth) => set({ isLogin: auth }),
}));
