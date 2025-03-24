import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import Divider from "@/components/common/Atoms/Divider/Divider";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import X from "@/assets/svg/common/X.svg";
import { useModalStore } from "@/store/modalStore";

interface DialogProps {
  className?: string;
  fixed?: boolean;
  illustrationSrc?: string;
  bottomSpace?: boolean;
  heading?: string;
  subTitle?: string;
  summary?: string;
  description?: string;
  close?: boolean;
  children?: ReactNode; // contents대신 children으로 contents를 받아옴
  buttonElements?: ReactNode;
}

function Dialog({
  className,
  fixed,
  illustrationSrc,
  bottomSpace,
  heading,
  subTitle,
  summary,
  description,
  children,
  close,
  buttonElements,
}: DialogProps) {
  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className={cn(
        "min-w-[360px] w-fit p-0 border-none rounded-[12px] gap-0 [&>button]:hidden",
        className
      )}
    >
      <div
        className={cn(
          "pt-content-vertical-margin px-content-horizon-margin",
          fixed && "pb-content-vertical-margin"
        )}
      >
        <DialogTitle>
          {illustrationSrc && (
            <img
              src={illustrationSrc}
              className="w-[100px] h-[100px] mx-auto"
            />
          )}

          <div className="flex gap-[12px] items-center justify-between">
            <div
              className={cn(
                "flex flex-col items-start",
                bottomSpace && "pb-[20px]"
              )}
            >
              {heading && (
                <h1 className={cn("text-heading5-bold text-label-normal")}>
                  {heading}
                </h1>
              )}

              {/* Todo subfont로 적용 */}
              {subTitle && (
                <div
                  className={cn(
                    "text-heading2-bold text-label-normal mb-[12px]"
                  )}
                >
                  {subTitle}
                </div>
              )}

              {summary && (
                <div
                  className={cn(
                    "text-body2-normal-regular text-label-alternative mb-[16px]"
                  )}
                >
                  {summary}
                </div>
              )}
              {description && (
                <p
                  className={cn("text-body1-normal-regular text-label-normal")}
                >
                  {description}
                </p>
              )}
            </div>

            {close && (
              <div className="flex items-center h-[28px]">
                <IconButton
                  onClick={() => useModalStore.getState().closeModal()}
                  icon={<X width={20} height={20} fill="text-label-neutral" />}
                />
              </div>
            )}
          </div>
        </DialogTitle>
      </div>

      {fixed && <Divider />}

      {children && (
        <div className={cn(fixed && "h-[274px] overflow-auto scrollbar-hide")}>
          {children}
        </div>
      )}

      <div
        className={cn(
          "flex px-content-horizon-margin gap-[8px] pb-content-vertical-margin",
          "relative", // 그라디언트 효과
          "after:content-[''] after:absolute after:bottom-full after:left-0 after:right-0 after:h-5",
          "after:bg-gradient-to-b after:from-transparent after:to-white after:pointer-events-none",
          "after:transition-opacity after:duration-300",
          fixed ? "after:opacity-100" : "after:opacity-0"
        )}
      >
        {buttonElements && buttonElements}
      </div>
    </DialogContent>
  );
}

export default Dialog;

/**
 * Todo: 버튼에 onClick달아주는거
 * 사용법
 * <DefaultDialog>
    <DialogTrigger>다이얼로그 열기</DialogTrigger>
    <Dialog>contents</Dialog>
  </DefaultDialog>
 */
