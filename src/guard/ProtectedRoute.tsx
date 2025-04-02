import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { LOGIN } from "@/Constants/ServiceUrl";

const ProtectedRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 전역상태에 accessToken과 isLogin을 받아옴
    const accessToken = useAuthStore.getState().accessToken;
    const isLogin = useAuthStore.getState().isLogin;

    // accessToken과 isLogin중 하나라도 없다면 로그인으로 리다이렉트
    if (!accessToken || !isLogin) {
      navigate(LOGIN);
    }

    // 이 로직은 페이지가 달라질 때마다 실행됨
  }, [location.pathname]);

  return <Outlet />;
};

export default ProtectedRoute;
