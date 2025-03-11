import { ReactElement } from "react";
import { cn } from "@/lib/utils";
import Avatar from "@/components/Atoms/Avatar/Avatar/Avatar";

interface KeyboardTextFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  avatar: ReactElement<typeof Avatar>;
  button: ReactElement;
  className?: string;
}

function KeyboardTextField({
  value,
  avatar,
  button,
  className,
  ...props
}: KeyboardTextFieldProps) {
  const focusStyle = "focus:border-color-alias-primary-normal";
  return (
    <div
      className={cn(
        "px-content-horizon-margin flex gap-[8px] items-center max-h-[100px] py-[4px] bg-color-background-elevated-alternative",
        className
      )}
    >
      {avatar}
      <textarea
        value={value}
        className={cn(
          "h-[38px] py-[8px] px-[12px] appearance-none bg-transparent outline-none resize-none w-full border-[1px] border-color-alias-line-normal-normal rounded-[12px] text-body-1-normal placeholder:text-color-alias-label-assistive overflow-hidden flex-1 leading-[20px]",
          focusStyle
        )}
        {...props}
      />
      {button}
    </div>
  );
}

export default KeyboardTextField;
