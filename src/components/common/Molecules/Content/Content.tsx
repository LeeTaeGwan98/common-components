import Label from "@/components/common/Atoms/Label/Label";
import { cn } from "@/lib/utils";
import React, { cloneElement, ReactElement } from "react";

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
      label: "text-caption1-bold",
      summary: "text-body1-normal-bold",
      children: "text-heading3-bold",
      icon: "size-[24px]",
    },
    small: {
      label: "text-caption2-bold",
      summary: "text-label1-reading-bold",
      children: "text-subtitle1-bold",
      icon: "size-[20px]",
    },
  };

  return (
    <div className={cn("w-fit flex flex-col items-center")} {...props}>
      <div className="flex items-center gap-[4px]">
        {label && (
          <Label
            className={cn(
              "bg-primary-normal/[0.08] text-primary-normal",
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
              "text-body1-normal-bold text-label-alternative",
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

      <span className="text-heading3-bold text-primary-normal">{children}</span>
    </div>
  );
}

export default Content;
