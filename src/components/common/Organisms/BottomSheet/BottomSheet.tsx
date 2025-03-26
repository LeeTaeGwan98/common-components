import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import X from "@/assets/svg/common/X.svg";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Button from "@/components/common/Atoms/Button/Solid/Button";

interface BottomSheetProps {
  fixed?: boolean;
  title?: string;
  scrollDivider?: boolean;
  actions?: boolean;
  children?: ReactNode;
  slot?: {
    contentClassName?: string;
  };
}

function BottomSheet({
  fixed = true,
  title = "제목",
  scrollDivider = true,
  actions = true,
  children,
  slot = {},
}: BottomSheetProps) {
  return (
    <DrawerContent className="pb-[32px]">
      {title && (
        <>
          <DrawerHeader className="flex items-center justify-between px-[24px] pb-[12px]">
            <DrawerTitle className="text-label-strong text-body1-normal-bold">
              제목
            </DrawerTitle>
            <DrawerClose asChild className="cursor-pointer">
              <X className="fill-label-neutral size-[20px]" />
            </DrawerClose>
          </DrawerHeader>
          {(scrollDivider || fixed) && <Divider />}
        </>
      )}
      <div
        className={cn(
          "flex flex-col min-h-[240px]",
          fixed && "h-[274px] overflow-auto scrollbar-hide",
          slot.contentClassName
        )}
      >
        {children}
      </div>

      {actions && (
        <DrawerFooter className="px-content-horizon-margin pt-0">
          <DrawerClose asChild className="cursor-pointer">
            <Button
              className={cn(
                "relative", // 그라디언트 효과
                "after:content-[''] after:absolute after:bottom-full after:left-0 after:right-0 after:h-5",
                "after:bg-gradient-to-b after:from-transparent after:to-white after:pointer-events-none",
                "after:transition-opacity after:duration-300",
                fixed ? "after:opacity-100" : "after:opacity-0"
              )}
            >
              완료
            </Button>
          </DrawerClose>
        </DrawerFooter>
      )}
    </DrawerContent>
  );
}

export default BottomSheet;

/**
 * 사용법
  <Drawer>
    <DrawerTrigger>Open</DrawerTrigger>
    <BottomSheet title="제목">
      <button className="flex py-[12px] px-[24px]">asdf</button>
      <button className="flex py-[12px] px-[24px]">asdf</button>
      <button className="flex py-[12px] px-[24px]">asdf</button>
      <button className="flex py-[12px] px-[24px]">asdf</button>
      <button className="flex py-[12px] px-[24px]">asdf</button>
    </BottomSheet>
  </Drawer>
 */
