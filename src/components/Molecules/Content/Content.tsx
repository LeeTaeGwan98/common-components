import { cn } from "@/lib/utils";
import React, { cloneElement, ReactElement } from "react";
import Label from "@/stories/Atoms/Label/Label";

interface ContentProps {
  size?: "large" | "small";
  summary?: string;
  label?: string;
  icon?: ReactElement<{ className?: string }>;
  slot?: {
    labelClassName?: string;
    summaryClassName?: string;
    childrenClassName?: string;
    iconClassName?: string;
  };
  children?: string;
}

function Content({
  size = "large",
  summary,
  label,
  icon,
  slot = {},
  children,
  ...props
}: ContentProps) {
  const sizeStyle = {
    large: {
      label: "text-caption-1 font-bold",
      summary: "text-body-1-normal font-bold",
      children: "text-heading-3 font-bold",
      icon: "size-[24px]",
    },
    small: {
      label: "text-caption-2 font-bold",
      summary: "text-label-1-normal font-bold",
      children: "text-subtitle-1 font-bold",
      icon: "size-[20px]",
    },
  };

  return (
    <div className={cn("w-fit flex flex-col items-center")} {...props}>
      <div className="flex items-center gap-[4px]">
        {label && (
          <Label
            className={cn(
              "bg-color-alias-primary-normal/15 text-color-alias-primary-normal",
              sizeStyle[size].label,
              slot.labelClassName
            )}
          >
            {label}
          </Label>
        )}
        {summary && (
          <span
            className={cn(
              "text-body-1-normal font-bold text-color-alias-label-alternative",
              sizeStyle[size].summary,
              slot.summaryClassName
            )}
          >
            {summary}
          </span>
        )}
        {icon &&
          cloneElement(icon, {
            className: cn(
              icon.props?.className,
              sizeStyle[size].icon,
              slot.iconClassName
            ),
          })}
      </div>

      <span className="text-heading-3 font-bold text-color-alias-primary-normal">
        {children}
      </span>
    </div>
  );
}

export default Content;
