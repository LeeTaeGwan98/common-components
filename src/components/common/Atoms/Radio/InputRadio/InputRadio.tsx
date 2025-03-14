import { cn } from "@/lib/utils";
import { Dispatch, ReactNode, SetStateAction, ReactElement } from "react";
import Radio from "../Radio/Radio";

interface InputRadioProps {
  onChecked: Dispatch<SetStateAction<boolean>>;
  disable?: boolean;
  children: ReactElement<typeof Radio> | ReactNode; // Radio컴포넌트만 children에 들어올 수 있도록 강제
  className?: string;
}

function InputRadio({
  onChecked,
  disable = false,
  children,
  className,
  ...props
}: InputRadioProps) {
  const disableStyle =
    disable &&
    "text-label-disable/[.16] *:hover:bg-transparent *:focus:bg-transparent *:active:bg-transparent *:opacity-[.43]";

  return (
    <div
      className={cn(
        "text-body2-normal-regular cursor-pointer flex items-center w-fit gap-[8px] *:hover:bg-label-normal/normal-hover *:focus:bg-label-normal/normal-focus *:active:bg-label-normal/normal-active",
        disableStyle,
        className
      )}
      onClick={!disable ? () => onChecked((prev) => !prev) : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export default InputRadio;
