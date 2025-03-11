import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface RadioProps {
  checked: boolean;
  onChecked?: Dispatch<SetStateAction<boolean>>;
  size?: "normal" | "small";
  disable?: boolean;
  className?: string;
}

function Radio({
  checked = true,
  onChecked,
  size = "normal",
  disable = false,
  className,
}: RadioProps) {
  const sizeStyle =
    size === "normal" ? "w-[20px] h-[20px]" : "w-[18px] h-[18px]";
  const checkedStyle = checked ? "bg-color-alias-primary-normal relative" : "";
  const disableStyle = disable && "opacity-[.43]";
  return (
    <button
      className="w-fit p-[6px] rounded-full hover:bg-color-alias-label-normal/normal-hover focus:bg-color-alias-label-normal/normal-focus active:bg-color-alias-label-normal/normal-active cursor-pointer"
      onClick={onChecked ? () => onChecked((prev) => !prev) : undefined}
    >
      <div
        className={cn(
          "border-[2px] border-color-alias-line-normal-normal rounded-full",
          disableStyle,
          checkedStyle,
          sizeStyle
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
