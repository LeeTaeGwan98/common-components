import { cn } from "@/lib/utils";
import React, { ReactElement } from "react";
import Content from "../Content/Content";
import Skeleton from "@/components/Atoms/Skeleton/Skeleton";
import Label from "@/components/Atoms/Label/Label";

interface CardProps {
  title?: string;
  size?: "large" | "small";
  isButton?: boolean;
  buttonOnClick?: () => void;
  isLabel?: boolean;
  slot?: {
    containerClassName?: string;
    headClassName?: string;
    bodyClassName?: string;
  };
  isSkeleton?: boolean;
  children?: ReactElement<typeof Content>[] | ReactElement<typeof Content>;
}

function Card({
  title,
  size = "large",
  isLabel = true,
  isButton = true,
  slot = {},
  isSkeleton,
  buttonOnClick,
  children,
}: CardProps) {
  const hasMultiChildren = Array.isArray(children) && children.length > 1;

  const sizeStyle = {
    container: {
      large: "min-h-[144px]",
      small: "min-h-[128px]",
    },
    header: {
      large: "",
      small: "",
    },
    body: {
      large: "min-w-[236px]",
      small: "",
    },
  };

  return (
    <div
      className={cn(
        "w-fit border-[1px] border-color-alias-line-solid-normal rounded-[4px] overflow-hidden",
        sizeStyle.container[size],
        slot.containerClassName
      )}
    >
      <div
        className={cn(
          `bg-color-alias-primary-normal/[0.08] py-[10px] px-content-horizon-margin flex justify-between border-b-[1px] border-color-alias-line-solid-normal ${
            hasMultiChildren ? "justify-center relative" : ""
          }`,
          sizeStyle.header[size],
          slot.headClassName
        )}
      >
        <div
          className={cn(
            "text-subtitle-2 font-bold text-color-alias-label-neutral"
          )}
        >
          {title}
        </div>
        {isButton && (
          <button
            className={cn(
              `text-color-alias-label-alternative text-label-1-normal font-bold flex justify-center items-center gap-[4px] ${
                hasMultiChildren
                  ? "absolute right-content-horizon-margin top-1/2 -translate-y-1/2"
                  : ""
              }`
            )}
            onClick={buttonOnClick ? () => buttonOnClick() : undefined}
          >
            {size === "large" && "자세히"} <span>&gt;</span>
          </button>
        )}
      </div>

      <div
        className={cn(
          "relative py-[20px] px-content-horizon-margin flex justify-center items-center gap-[8px] flex-wrap",
          sizeStyle.body[size],
          slot.bodyClassName
        )}
      >
        {isSkeleton ? (
          <Skeleton
            className="absolute top-[20px] w-[calc(100%-(--var-content-horizon-margin))] h-[56px]"
            style={{ width: "calc(100% - var(--content-horizon-margin))" }}
          />
        ) : (
          <>
            {hasMultiChildren && isLabel && (
              <Label className="text-caption-1 py-[4px] px-[8px] font-bold w-[38px] h-[24px] bg-color-alias-primary-normal/15 text-color-alias-primary-normal">
                오늘
              </Label>
            )}

            {Array.isArray(children)
              ? children.map((child, index) => (
                  <React.Fragment key={index}>
                    {child}
                    {index !== children.length - 1 && (
                      <span className="text-color-alias-label-alternative font-bold">
                        /
                      </span>
                    )}
                  </React.Fragment>
                ))
              : children}
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
