import { cn } from "@/lib/utils";
import React, { ReactElement } from "react";
import Content from "../Content/Content";
import Skeleton from "@/components/common/Atoms/Skeleton/Skeleton";
import Label from "@/components/common/Atoms/Label/Label";
import Text from "@/components/common/Atoms/Text/NormalText/NormalText";
import RightArrow from "@/assets/svg/common/ChevronRightArrow.svg";

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
      large: "",
      small: "",
    },
  };

  return (
    <div
      className={cn(
        "w-fit border-[1px] border-line-solid-normal rounded-[4px] overflow-hidden flex flex-col",
        sizeStyle.container[size],
        slot.containerClassName
      )}
    >
      <div
        className={cn(
          `bg-primary-normal/[0.08] py-[10px] px-content-horizon-margin flex justify-between border-b-[1px] border-line-solid-normal flex-shrink-0 ${
            hasMultiChildren ? "justify-center relative" : ""
          }`,
          sizeStyle.header[size],
          slot.headClassName
        )}
      >
        <div className={cn("text-subtitle2-bold text-label-neutral truncate")}>
          {title}
        </div>
        {isButton && (
          <Text
            className={cn(
              "h-[24px] cursor-pointer",
              hasMultiChildren ? "absolute right-content-horizon-margin" : ""
            )}
          >
            <button
              className={cn(
                `flex-none text-label-alternative text-label1-normal-bold flex justify-center items-center gap-[4px]`
              )}
              onClick={buttonOnClick ? () => buttonOnClick() : undefined}
            >
              {size === "large" && "자세히"}{" "}
              <RightArrow className="w-[8px] h-[16px] text-label-alternative" />
            </button>
          </Text>
        )}
      </div>

      <div
        className={cn(
          "relative py-[20px] px-content-horizon-margin flex justify-center items-center gap-[8px] flex-wrap flex-grow",
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
              <Label className="text-caption1-bold py-[4px] px-[8px] w-[38px] h-[24px] bg-primary-normal/15 text-primary-normal">
                오늘
              </Label>
            )}

            {Array.isArray(children)
              ? children.map((child, index) => (
                  <React.Fragment key={index}>
                    {child}
                    {index !== children.length - 1 && (
                      <span className="text-label-alternative font-bold">
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
