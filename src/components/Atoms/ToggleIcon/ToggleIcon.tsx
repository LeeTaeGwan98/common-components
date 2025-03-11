import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, cloneElement } from "react";

interface ToggleIconProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: React.ReactElement<{ className?: string }>;
  className?: string;
}

function ToggleIcon({
  active,
  setActive,
  children,
  className,
}: ToggleIconProps) {
  return (
    <button
      className={cn(
        "p-[4px] rounded-full hover:bg-color-alias-label-normal/normal-hover focus:bg-color-alias-label-normal/normal-focus active:bg-color-alias-label-normal/normal-active",
        className
      )}
      onClick={() => setActive((prev) => !prev)}
    >
      {cloneElement(children, {
        className: active ? "" : "opacity-50",
      })}
    </button>
  );
}

export default ToggleIcon;
