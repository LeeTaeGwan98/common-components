import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface RadioProps {
  checked: boolean;
  onChecked?: Dispatch<SetStateAction<boolean>>;
  size?: "large" | "medium" | "small";
  disable?: boolean;
  className?: string;
}

function Radio({
  checked = true,
  onChecked,
  size = "medium",
  disable = false,
  className,
}: RadioProps) {
  const sizeStyle = {
    large: "w-[24px] h-[24px]",
    medium: "w-[20px] h-[20px]",
    small: "w-[16px] h-[16px]",
  };
  const checkedStyle = checked ? "bg-primary-normal relative" : "";
  const disableStyle = disable && "opacity-[.43]";
  return (
    <button
      className="w-fit p-[6px] rounded-full hover:bg-label-normal/normal-hover focus:bg-label-normal/normal-focus active:bg-label-normal/normal-active cursor-pointer"
      onClick={onChecked ? () => onChecked((prev) => !prev) : undefined}
    >
      <div
        className={cn(
          "border-[2px] border-line-normal-normal rounded-full",
          disableStyle,
          checkedStyle,
          sizeStyle[size]
        )}
      >
        {checked && (
          <div className="w-[8px] h-[8px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        )}
      </div>
    </button>
  );
}

export default Radio;
