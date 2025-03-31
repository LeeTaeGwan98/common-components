import { cn } from "@/lib/utils";
import Divider from "@/components/common/Atoms/Divider/Divider";
import CompanyIcon from "@/assets/svg/Sidebar/Company.svg";
import SIDEBAR_MENU_ITEM from "@/Constants/SidebarMenuItem";
import { Link, useLocation } from "react-router-dom";
import React, { cloneElement } from "react";
import BottomArrowIcon from "@/assets/svg/Sidebar/Bottom.svg";
import RightArrowIcon from "@/assets/svg/Sidebar/Right.svg";
import Menu from "@/components/common/Molecules/Menu/Menu";
import { SIDEBAR_WIDTH } from "@/Constants/UIMagicNumber";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth/auth";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "@/Constants/ServiceUrl";
import { useAuthStore } from "@/store/authStore";

interface SideBarProps {}

function Sidebar({}: SideBarProps) {
  const delUserInfo = useAuthStore((state) => state.delUserInfo);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;

  const { mutate: handleLogoutMutation } = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      delUserInfo();
      navigate(LOGIN);
    },
  });

  return (
    <div
      className="fixed h-screen pt-[64px] border-r-[1px] border-line-normal-normal"
      style={{ width: SIDEBAR_WIDTH }}
    >
      <div className="px-[30px] text-body2-normal-bold flex items-center gap-[8px]">
        <CompanyIcon />
        Admin999
      </div>

      <Divider className="my-[12px]" />

      <div className="flex flex-col px-[16px]">
        {SIDEBAR_MENU_ITEM.map((item, idx) => {
          const isActive =
            currentPathname.startsWith(item.path) ||
            item.child.some((child) => currentPathname.startsWith(child.path));
          const hasChildItem = !!item.child.length;

          return (
            <React.Fragment key={item.path}>
              <Link to={item.path} className={cn("w-full flex gap-[4px]")}>
                <Menu
                  className={cn(
                    !hasChildItem && "pl-[20px]",
                    "w-full text-body2-normal-bold"
                  )}
                  icon={cloneElement(item.icon, {
                    className: isActive
                      ? "fill-primary-normal"
                      : "fill-label-normal",
                  })}
                  arrowIcon={
                    hasChildItem &&
                    (isActive ? (
                      <BottomArrowIcon className="fill-primary-normal" />
                    ) : (
                      <RightArrowIcon />
                    ))
                  }
                  {...(item.title === "게시판 관리" && {
                    labelText: "텍스트",
                    slot: { labelClassName: "mr-[34px]" },
                  })}
                >
                  <span className={cn(isActive && "text-primary-normal")}>
                    {item.title}
                  </span>
                </Menu>
              </Link>

              {item.child.map((child) => {
                const isChildActive = currentPathname.startsWith(child.path);
                return (
                  isActive && (
                    <Link to={child.path} key={child.path}>
                      <Menu className="pl-[44px] py-[8px] text-label1-normal-medium">
                        <span
                          className={cn(isChildActive && "text-primary-normal")}
                        >
                          {child.title}
                        </span>
                      </Menu>
                    </Link>
                  )
                );
              })}
            </React.Fragment>
          );
        })}
        <button
          className="mx-auto mt-[24px] font-semibold text-[14px] text-label-alternative underline"
          onClick={() => handleLogoutMutation()}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
