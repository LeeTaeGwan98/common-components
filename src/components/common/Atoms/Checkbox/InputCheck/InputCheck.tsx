import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ReactNode, Dispatch, SetStateAction, ReactElement } from "react";

interface InputCheckProps {
  onChecked: Dispatch<SetStateAction<boolean>>;
  disable?: boolean;
  children?: ReactNode | ReactElement<typeof Check>;
  className?: string;
}

function InputCheck({
  onChecked,
  disable = false,
  children,
  className,
  ...props
}: InputCheckProps) {
  const disableStyle = {
    "text-label-disable/[.16] *:hover:bg-transparent *:focus:bg-transparent *:active:bg-transparent *:opacity-[.43]":
      disable,
  };

  return (
    <button
      className={cn(
        "w-fit flex items-center text-body2-normal-regular *:hover:bg-label-normal/normal-hover *:focus:bg-label-normal/normal-focus *:active:bg-label-normal/normal-active",
        disableStyle,
        className
      )}
      onClick={!disable ? () => onChecked((prev) => !prev) : undefined}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      {children}
    </button>
  );
}

export default InputCheck;
