import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import Divider from "@/components/common/Atoms/Divider/Divider";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import X from "@/assets/svg/common/X.svg";
import { useModalStore } from "@/store/modalStore";

interface DialogProps {
  fixed?: boolean;
  illustrationSrc?: string;
  bottomSpace?: boolean;
  heading?: string;
  subTitle?: string;
  summary?: string;
  description?: string;
  close?: boolean;
  children?: ReactNode; // contents대신 children으로 contents를 받아옴
  childrenClassName?: string;
  buttonElements?: ReactNode;
}

function DialogDetailContent({
  fixed,
  illustrationSrc,
  bottomSpace,
  heading,
  subTitle,
  summary,
  description,
  children,
  childrenClassName,
  close,
  buttonElements,
}: DialogProps) {
  return (
    <>
      <div
        className={cn(
          "pt-detail-content-vertical-margin px-detail-content-horizon-margin",
          fixed && "pb-detail-content-vertical-margin"
        )}
      >
        <DialogTitle>
          {illustrationSrc && (
            <img
              src={illustrationSrc}
              className="w-[100px] h-[100px] mx-auto"
            />
          )}

          <div className="flex gap-[12px] justify-between">
            <div
              className={cn(
                "flex flex-col gap-[12px] items-start",
                bottomSpace && "pb-[20px]"
              )}
            >
              {heading && (
                <h1
                  className={cn(
                    "text-heading5-bold text-label-normal whitespace-pre-line"
                  )}
                >
                  {heading}
                </h1>
              )}

              {/* Todo subfont로 적용 */}
              {subTitle && (
                <div className={cn("text-heading2-bold text-label-normal")}>
                  {subTitle}
                </div>
              )}

              {summary && (
                <div
                  className={cn(
                    "text-body2-normal-regular text-label-alternative"
                  )}
                >
                  {summary}
                </div>
              )}
              {description && (
                <p
                  className={cn(
                    "text-body1-reading-regular text-label-normal whitespace-pre-line"
                  )}
                >
                  {description}
                </p>
              )}
            </div>

            {close && (
              <div className="flex items-center w-[28px] h-[28px]">
                <IconButton
                  onClick={() => useModalStore.getState().closeModal()}
                  icon={<X className="w-[20px] h-[20px] text-label-neutral" />}
                />
              </div>
            )}
          </div>
        </DialogTitle>
      </div>

      {fixed && <Divider />}

      {children && (
        <div
          className={cn(
            fixed && "h-[274px] overflow-auto scrollbar-hide",
            childrenClassName
          )}
        >
          {children}
        </div>
      )}

      <div
        className={cn(
          "flex px-detail-content-horizon-margin gap-[8px] pb-detail-content-vertical-margin",
          "relative", // 그라디언트 효과
          "after:content-[''] after:absolute after:bottom-full after:left-0 after:right-0 after:h-5",
          "after:bg-gradient-to-b after:from-transparent after:to-white after:pointer-events-none",
          "after:transition-opacity after:duration-300",
          fixed ? "after:opacity-100" : "after:opacity-0"
        )}
      >
        {buttonElements && buttonElements}
      </div>
    </>
  );
}

export default DialogDetailContent;
