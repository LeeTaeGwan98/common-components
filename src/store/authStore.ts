import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserInfoRes } from "@/api/auth/auth";

// 인증 상태 타입
interface AuthState {
  user: UserInfoRes | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLogin: boolean;
  setUserInfo: (userResponse: UserInfoRes) => void;
  delUserInfo: () => void;
  updateUser: (userData: Partial<UserInfoRes>) => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLogin: false,

      // 로그인시 발동
      setUserInfo: (userResponse: UserInfoRes) => {
        console.log(userResponse);
        set({
          user: userResponse,
          isLogin: true,
        });
      },

      // 로그아웃시 발동
      delUserInfo: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLogin: false,
        });
      },

      // 사용자 정보 업데이트
      updateUser: (userData: Partial<UserInfoRes>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      // 토큰 업데이트 액션
      updateTokens: (accessToken: string, refreshToken: string) => {
        set({
          accessToken,
          refreshToken,
        });
      },
    }),

    {
      name: "auth-storage", // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // localStorage 사용
    }
  )
);
