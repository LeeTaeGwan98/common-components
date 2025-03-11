import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/stories/Atoms/Button/Solid/Button";
import OutlinedButton from "@/stories/Atoms/Button/Outlined/OutlinedButton";
import Divider from "@/stories/Atoms/Divider/Divider";

interface DialogProps {
  fixed?: boolean;
  illustrationSrc?: string;
  bottomSpace?: boolean;
  heading?: string;
  subTitle?: string;
  summary?: string;
  description?: string;
  children?: ReactNode; // contents대신 children으로 contents를 받아옴
}

function Dialog({
  fixed,
  illustrationSrc,
  bottomSpace,
  heading,
  subTitle,
  summary,
  description,
  children,
}: DialogProps) {
  return (
    <DialogContent
      className={cn("min-w-[360px] w-fit p-0 border-none rounded-[12px] gap-0")}
    >
      <DialogHeader
        className={cn(
          "pt-content-vertical-margin px-content-horizon-margin",
          fixed && "pb-content-vertical-margin"
        )}
      >
        <DialogTitle>
          <img src={illustrationSrc} className="w-[100px] h-[100px] mx-auto" />

          <div
            className={cn(
              "flex flex-col items-start",
              bottomSpace && "pb-[20px]"
            )}
          >
            {heading && (
              <h1
                className={cn(
                  "text-heading-5 font-bold text-color-alias-label-normal"
                )}
              >
                제목
              </h1>
            )}

            {/* Todo subfont로 적용 */}
            {subTitle && (
              <div
                className={cn(
                  "text-heading-2 font-bold text-color-alias-label-normal mb-[12px]"
                )}
              >
                타이틀
              </div>
            )}

            {summary && (
              <div
                className={cn(
                  "text-body-2-normal font-regular text-color-alias-label-alternative mb-[16px]"
                )}
              >
                요약
              </div>
            )}
            {description && (
              <p
                className={cn(
                  "text-body-1-normal text-color-alias-label-normal"
                )}
              >
                설명
              </p>
            )}
          </div>
        </DialogTitle>
      </DialogHeader>

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
        <OutlinedButton type="assistive" size="large" className="flex-[1]">
          텍스트
        </OutlinedButton>
        <Button className="flex-[2]">텍스트</Button>
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
