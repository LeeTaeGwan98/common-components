import { cn } from "@/lib/utils";
import { Dispatch, ReactNode, SetStateAction, ReactElement } from "react";
import Radio from "../Radio/Radio";

interface InputRadioProps {
  onChecked: Dispatch<SetStateAction<boolean>>;
  disable?: boolean;
  children?: ReactElement<typeof Radio> | ReactNode; // Radio컴포넌트만 children에 들어올 수 있도록 강제
  Radio?: ReactNode;
  className?: string;
}

function InputRadio({
  onChecked,
  disable = false,
  children,
  Radio,
  className,
  ...props
}: InputRadioProps) {
  const disableStyle = disable && "text-label-disable/[.16]";

  const interactiveTypeStyle = `
  [&>*:first-child]:relative
  [&>*:first-child]:after:content-['']
  [&>*:first-child]:after:absolute
  [&>*:first-child]:after:top-[-6px]
  [&>*:first-child]:after:right-[-6px]
  [&>*:first-child]:after:bottom-[-6px]
  [&>*:first-child]:after:left-[-6px]
  [&>*:first-child]:after:rounded-full
  [&>*:first-child]:after:transition-colors
  [&>*:first-child]:after:-z-10
  [&>*:first-child]:after:hover:bg-label-normal/normal-hover
  [&>*:first-child]:after:focus:bg-label-normal/normal-focus
  [&>*:first-child]:after:active:bg-label-normal/normal-active
`;

  return (
    <div
      className={cn(
        "text-body2-normal-regular cursor-pointer",
        interactiveTypeStyle,
        disableStyle,
        className
      )}
      onClick={!disable ? () => onChecked((prev) => !prev) : undefined}
      {...props}
    >
      {Radio && Radio}
      {children}
    </div>
  );
}

export default InputRadio;
