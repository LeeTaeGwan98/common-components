import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isIndex = location.pathname === "/";

  return isIndex ? (
    <main>{children}</main>
  ) : (
    <main className="bg-red-600">{children}</main>
  );
}

export default Layout;
