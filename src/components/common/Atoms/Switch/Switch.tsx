import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface SwitchProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  disable?: boolean;
  size?: "small" | "large";
  className?: string;
}

function Switch({
  active = false,
  setActive,
  disable = false,
  size = "large",
  className,
}: SwitchProps) {
  const disableStyle = disable && "opacity-[.43]";

  // 크기 설정
  const buttonSize =
    size === "small" ? "w-[34px] h-[18px]" : "w-[52px] h-[32px]";
  const circleSize = size === "small" ? "size-[14px]" : "size-[24px]";
  const translateX =
    size === "small" ? "translate-x-[14px]" : "translate-x-[20px]";

  return (
    <button
      className={cn(
        "relative w-[52px] h-[32px] bg-fill-strong rounded-full p-[4px] transition-all duration-300",
        active ? "bg-primary-normal" : "",
        buttonSize,
        disableStyle,
        className
      )}
      onClick={!disable ? () => setActive((prev) => !prev) : undefined}
    >
      <div
        className={cn(
          "bg-white size-[24px] rounded-full absolute top-1/2 -translate-y-1/2 transition-all duration-300",
          circleSize,
          active ? translateX : "translate-x-0"
        )}
      />
    </button>
  );
}

export default Switch;
