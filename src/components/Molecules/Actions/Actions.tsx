import React from "react";
import { cn } from "@/lib/utils";

interface ActionsProps {
  priority?: "strong" | "neutral" | "compact" | "single";
  isGradient?: boolean;
  caption?: string;
  children: React.ReactNode;
  className?: string;
}

function Actions({
  priority = "strong",
  caption,
  children,
  isGradient,
  className,
  ...props
}: ActionsProps) {
  if (priority === "single" && React.Children.count(children) > 1) {
    throw new Error(
      "Actions 컴포넌트의 priority가 'single'일 때는 버튼을 하나만 넣어야 합니다."
    );
  }
  const gradientStyle =
    "relative after:content-[''] after:absolute after:bottom-full after:left-0 after:right-0 after:h-5 after:bg-gradient-to-b after:from-transparent after:to-white after:pointer-events-none after:transition-opacity after:duration-300";

  return (
    <div
      className={cn(
        "flex flex-col gap-[8px]",
        (priority === "compact" || priority === "single") &&
          "mx-content-horizon-margin",
        isGradient && gradientStyle,
        className
      )}
      {...props}
    >
      {caption && (
        <div className="text-label-alternative text-center">{caption}</div>
      )}

      <div
        className={cn(
          "flex gap-[8px]",
          priority === "strong" && "flex-col *:w-full",
          priority === "neutral" && "*:flex-1",
          priority === "compact" && "justify-end",
          priority === "single" && "*:w-full"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Actions;

// Todo: 부모태그의 길이에 따라서 그라데이션을 구현
