import { cn } from "@/lib/utils";
import { useRef } from "react";

interface TextBoxProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  label?: string;
  className?: string;
  count?: boolean;
}

function TextBox({ value, label, className, count, ...props }: TextBoxProps) {
  const disableStyle =
    "disabled:bg-interaction-disable border-line-normal-neutral";
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const interactiveTypeStyle =
    "hover:border-coolNeutral-50/[.52] focus:border-primary-normal";

  return (
    <div className="flex flex-col gap-[4px]">
      {label && (
        <span className="text-label-1-normal text-label-neutral font-medium">
          {label}
        </span>
      )}
      <textarea
        value={value}
        ref={textAreaRef}
        className={cn(
          "h-[180px] p-[12px] appearance-none bg-transparent outline-none resize-none w-full border-[1px] border-line-normal-normal rounded-[12px] text-body-1-normal placeholder:text-label-assistive",
          interactiveTypeStyle,
          disableStyle,
          className
        )}
        {...props}
      />
      {count ? (
        <div className="w-full font-medium text-end *:text-caption-1 flex justify-end items-center">
          <span className="text-primary-normal">
            {textAreaRef.current?.value.length ?? 0}
          </span>
          <span className="text-label-alternative">/</span>
          <span className="text-label-alternative">50</span>
        </div>
      ) : null}
    </div>
  );
}

export default TextBox;
