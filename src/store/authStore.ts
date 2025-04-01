import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserInfoRes } from "@/api/auth/auth";

// 인증 상태 타입
interface AuthState {
  user: UserInfoRes | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLogin: boolean;
  permissions: string[] | null;
  setUserInfo: (userResponse: UserInfoRes) => void;
  delUserInfo: () => void;
  updateUser: (userData: Partial<UserInfoRes>) => void;
  updateAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLogin: false,
      permissions: null,

      // 로그인시 발동
      setUserInfo: (userResponse: UserInfoRes) => {
        console.log(userResponse);
        set({
          user: userResponse,
          accessToken: userResponse.accessToken,
          refreshToken: userResponse.refreshToken,
          isLogin: true,
          permissions: userResponse.permissions || null,
        });
      },

      // 로그아웃시 발동
      delUserInfo: () => {
        localStorage.removeItem("auth-storage");
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLogin: false,
          permissions: null,
        });
      },

      // 사용자 정보 업데이트
      updateUser: (userData: Partial<UserInfoRes>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      // 토큰 업데이트 액션
      updateAccessToken: (accessToken: string) => {
        set({
          accessToken,
        });
      },

      // 메뉴권한 업데이트
      updatePermissions: (permissions: string[]) => {
        set({ permissions });
      },
    }),

    {
      name: "auth-storage", // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // localStorage 사용
    }
  )
);
