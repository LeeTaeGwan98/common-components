import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "dot" | "new" | "number";
  numberContent?: number | string;
  className?: string;
}

/**
 * 부모태그에 relative가 강제되는 컴포넌트
 * className의 position으로 위치를 잡아줘야함
 */

function Badge({ variant = "number", numberContent, className }: BadgeProps) {
  const variantStyle = {
    dot: "w-[4px] h-[4px]",
    new: "w-[20px] h-[20px]",
    number: "w-[20px] h-[20px]",
  };
  const content =
    variant === "dot" ? null : variant === "new" ? "N" : numberContent;
  // variant가 dot이면 null
  // variant가 new이면 "N"
  // variant가 number이면 children
  return (
    <div
      className={cn(
        "bg-color-alias-primary-normal rounded-full absolute text-white text-caption-2 flex justify-center items-center",
        variantStyle[variant],
        className
      )}
    >
      {content}
    </div>
  );
}

export default Badge;
