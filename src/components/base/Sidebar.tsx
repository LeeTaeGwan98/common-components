import { cn } from "@/lib/utils";
import Divider from "@/components/common/Atoms/Divider/Divider";
import CompanyIcon from "@/assets/svg/Sidebar/Company.svg";
import SIDEBAR_MENU_ITEM from "@/Constants/SidebarMenuItem";
import { Link, useLocation } from "react-router-dom";
import React, { cloneElement, useState, useEffect } from "react";
import BottomArrowIcon from "@/assets/svg/Sidebar/Bottom.svg";
import RightArrowIcon from "@/assets/svg/common/RightArrow.svg";
import Menu from "@/components/common/Molecules/Menu/Menu";
import { SIDEBAR_WIDTH } from "@/Constants/UIMagicNumber";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { logout } from "@/api/auth/auth";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "@/Constants/ServiceUrl";
import { useAuthStore } from "@/store/authStore";

interface SideBarProps {}

function Sidebar({}: SideBarProps) {
  const delUserInfo = useAuthStore((state) => state.delUserInfo);
  const userName = useAuthStore((state) => state.user?.name);
  const permissions = useAuthStore((state) => state.permissions);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;

  // 열린 메뉴 상태를 관리하는 상태 추가
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // 초기 로딩 시 현재 경로에 해당하는 메뉴를 자동으로 열기
  useEffect(() => {
    const initialOpenMenus = SIDEBAR_MENU_ITEM.filter((item) =>
      item.child.some((child) => currentPathname.startsWith(child.path))
    ).map((item) => item.path);

    setOpenMenus(initialOpenMenus);
  }, []);

  // 메뉴 토글 함수
  const toggleMenu = (
    menuPath: string,
    hasChildren: boolean,
    event: React.MouseEvent
  ) => {
    if (hasChildren) {
      event.preventDefault(); // 기본 링크 동작 방지

      setOpenMenus((prev) => {
        if (prev.includes(menuPath)) {
          // 이미 열려있으면 닫기
          return [];
        } else {
          // 닫혀있으면 열고 다른 모든 메뉴는 닫기
          return [menuPath];
        }
      });
    }
  };

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
        {userName}
      </div>

      <Divider className="my-[12px]" />

      <div className="flex flex-col px-[16px]">
        {SIDEBAR_MENU_ITEM.filter((menu) => {
          if (!permissions) return;
          if (menu.title === "관리자") return true;
          if (menu.title === "메인") return true;
          return permissions.includes(menu.code!);
        }).map((item) => {
          const isActive =
            currentPathname.startsWith(item.path) ||
            item.child.some((child) => currentPathname.startsWith(child.path));
          const hasChildItem = !!item.child.length;
          const isOpen = openMenus.includes(item.path);

          // 메뉴가 활성화되어 있고, 자식 항목이 표시되어야 하는지 확인
          const shouldShowChildren = isOpen;

          const menuContent = (
            <>
              <div
                className={cn("w-full flex gap-[4px] cursor-pointer")}
                onClick={(e) => toggleMenu(item.path, hasChildItem, e)}
              >
                <Link to={item.path} className="w-full flex">
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
                      (isOpen ? (
                        <BottomArrowIcon className="fill-primary-normal" />
                      ) : (
                        <BottomArrowIcon
                          className={`rotate-[270deg] ${
                            isActive && "fill-primary-normal"
                          }`}
                        />
                      ))
                    }
                    {...(item.title === "게시판 관리" && {
                      labelText: "텍스트",
                      slot: { labelClassName: "mr-[34px] " },
                    })}
                  >
                    <span className={cn(isActive && "text-primary-normal")}>
                      {item.title}
                    </span>
                  </Menu>
                </Link>
              </div>

              {item.child.map((child) => {
                const isChildActive = currentPathname.startsWith(child.path);
                const childCode = "code" in child ? child.code : null;

                if (childCode && !permissions?.includes(childCode)) {
                  return null;
                }

                return (
                  shouldShowChildren && (
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
            </>
          );

          // 게시판 관리일 경우만 구분선으로 감싼다
          if (item.title === "게시판 관리") {
            return (
              <div
                key={item.path}
                className="border-y border-line-normal-normal py-[12px]"
              >
                {menuContent}
              </div>
            );
          }

          // 나머지는 기본 프래그먼트로
          return <React.Fragment key={item.path}>{menuContent}</React.Fragment>;
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
