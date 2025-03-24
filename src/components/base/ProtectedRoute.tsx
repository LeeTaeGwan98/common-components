import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookie } from "@/lib/cookie";
import { useEffect } from "react";
import { LOGIN } from "@/Constants/ServiceUrl";

const ProtectedRoute = () => {
  const { isLogin, setIsLogin } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // 페이지 이동할 때마다 쿠키에서 accessToken을 확인하여 상태 업데이트
    const token = getCookie("accessToken");
    setIsLogin(!!token);
  }, [location.pathname]);

  // 로그인되지 않은 사용자는 로그인 페이지로 리디렉트
  if (!isLogin) {
    alert("로그인이 필요합니다.");
    return <Navigate to={LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
