import { cn } from "@/lib/utils";
import Divider from "@/components/common/Atoms/Divider/Divider";
import CompanyIcon from "@/assets/svg/Sidebar/Company.svg";
import SIDEBAR_MENU_ITEM, {
  type SidebarMenuItem,
} from "@/Constants/SidebarMenuItem";
import { Link, useLocation } from "react-router-dom";
import React, {
  cloneElement,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import BottomArrowIcon from "@/assets/svg/Sidebar/Bottom.svg";
import Menu from "@/components/common/Molecules/Menu/Menu";
import { SIDEBAR_WIDTH } from "@/Constants/UIMagicNumber";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth/auth";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "@/Constants/ServiceUrl";
import { useAuthStore } from "@/store/authStore";

function Sidebar() {
  const delUserInfo = useAuthStore((state) => state.delUserInfo);
  const userName = useAuthStore((state) => state.user?.name);
  const permissions = useAuthStore((state) => state.permissions);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  useEffect(() => {
    const parentMenu = SIDEBAR_MENU_ITEM.find((item) =>
      item.child.some((child) => currentPathname.startsWith(child.path))
    );

    if (parentMenu && !openMenus.includes(parentMenu.path)) {
      setOpenMenus((prev) => [...prev, parentMenu.path]);
    }
  }, [currentPathname]);

  const toggleMenu = (menuPath: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuPath)
        ? prev.filter((path) => path !== menuPath)
        : [...prev, menuPath]
    );
  };

  const hasPermission = (menuCode?: string) => {
    if (!menuCode || !permissions) return true;
    if (menuCode === "관리자") return true;
    if (menuCode === "메인") return true;
    return permissions.includes(menuCode);
  };

  const { mutate: handleLogout } = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      delUserInfo();
      navigate(LOGIN);
    },
  });

  const visibleMenuItems = SIDEBAR_MENU_ITEM.filter(
    (menu) => !menu.code || hasPermission(menu.code)
  );

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
        {visibleMenuItems.map((item) => {
          const isActive =
            currentPathname.startsWith(item.path) ||
            item.child.some((child) => currentPathname.startsWith(child.path));

          const isOpen = openMenus.includes(item.path);

          const visibleChildren = item.child.filter(
            (child) => !child.code || hasPermission(child.code)
          );

          return (
            <MenuItemWithChild
              key={item.path}
              item={item}
              isActive={isActive}
              isOpen={isOpen}
              setOpenMenus={setOpenMenus}
              visibleChildren={visibleChildren}
              currentPathname={currentPathname}
              toggleMenu={toggleMenu}
            />
          );
        })}

        <button
          className="mx-auto mt-[24px] font-semibold text-[14px] text-label-alternative underline"
          onClick={() => handleLogout()}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

interface MenuItemWithChildProps {
  item: SidebarMenuItem;
  isActive: boolean;
  isOpen: boolean;
  setOpenMenus: Dispatch<SetStateAction<string[]>>;
  visibleChildren: SidebarMenuItem["child"];
  currentPathname: string;
  toggleMenu: (menuPath: string) => void;
}

function MenuItemWithChild({
  item,
  isActive,
  isOpen,
  setOpenMenus,
  visibleChildren,
  currentPathname,
  toggleMenu,
}: MenuItemWithChildProps) {
  const hasChildren = visibleChildren.length > 0;

  const menuContent = (
    <>
      <div className={cn("w-full flex gap-[4px] cursor-pointer")}>
        <Menu
          className={cn(
            !hasChildren && "pl-[20px]",
            "w-full text-body2-normal-bold"
          )}
          arrowIcon={
            hasChildren && (
              <BottomArrowIcon
                className={cn(
                  "rotate-[270deg]",
                  isActive && "fill-primary-normal",
                  isOpen && "rotate-0"
                )}
              />
            )
          }
          onArrowIconClick={() => toggleMenu(item.path)}
          {...(item.title === "게시판 관리" && {
            labelText: "텍스트",
            slot: { labelClassName: "mr-[34px] " },
          })}
        >
          <Link
            to={item.path}
            className="w-full flex py-[13px]"
            onClick={(e) => {
              if (hasChildren) {
                setOpenMenus([item.path]);
              } else {
                setOpenMenus([]);
              }
            }}
          >
            <div className="mr-[4px]">
              {cloneElement(item.icon, {
                className: isActive
                  ? "fill-primary-normal"
                  : "fill-label-normal",
              })}
            </div>
            <span className={cn(isActive && "text-primary-normal")}>
              {item.title}
            </span>
          </Link>
        </Menu>
      </div>

      {isOpen &&
        visibleChildren.map((child) => {
          const isChildActive = currentPathname.startsWith(child.path);

          return (
            <Link
              to={child.path}
              key={child.path}
              onClick={() => {
                setOpenMenus([item.path]);
              }}
            >
              <Menu className="pl-[44px] py-[8px] text-label1-normal-medium">
                <span className={cn(isChildActive && "text-primary-normal")}>
                  {child.title}
                </span>
              </Menu>
            </Link>
          );
        })}
    </>
  );

  if (item.title === "게시판 관리") {
    return (
      <div className="border-y border-line-normal-normal py-[12px]">
        {menuContent}
      </div>
    );
  }

  return <React.Fragment>{menuContent}</React.Fragment>;
}

export default Sidebar;
