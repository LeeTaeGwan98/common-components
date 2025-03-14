import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/base/Sidebar";
import Content from "@/components/base/Content";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isIndex = location.pathname === "/";

  return isIndex ? (
    <main>{children}</main>
  ) : (
    <main className="flex">
      <Sidebar />
      <Content>{children}</Content>
    </main>
  );
}

export default Layout;
