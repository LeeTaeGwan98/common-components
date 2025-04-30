import { cn } from "@/lib/utils";

interface TextBoxProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  label?: string;
  className?: string;
  bodyClassName?: string;
  count?: boolean;
}

function TextBox({
  value,
  label,
  className,
  bodyClassName,
  count,
  maxLength = 300,
  ...props
}: TextBoxProps) {
  const { readOnly } = props;
  const disableStyle =
    "disabled:bg-interaction-disable border-line-normal-neutral";

  const interactiveTypeStyle =
    !readOnly &&
    "hover:border-coolNeutral-50/[.52] focus:border-primary-normal";

  // 값이 있는지 확인
  const hasValue = value && value.length > 0;

  return (
    <div className={cn(`flex flex-col gap-[4px]`, bodyClassName)}>
      {label && (
        <span className=" text-label1-normal-bold text-label-alternative">
          {label}
        </span>
      )}
      <textarea
        value={value}
        className={cn(
          "h-[180px] p-[12px] appearance-none bg-transparent outline-none resize-none w-full border-[1px] border-line-normal-normal rounded-large-input text-body-1-normal placeholder:text-label-assistive",
          interactiveTypeStyle,
          disableStyle,
          className
        )}
        maxLength={maxLength}
        {...props}
      />
      {count && hasValue ? (
        <div className="w-full text-end *:text-caption1-medium flex justify-end items-center">
          <span className="text-primary-normal">{value.length}</span>
          <span className="text-label-alternative">/</span>
          <span className="text-label-alternative">{maxLength}</span>
        </div>
      ) : null}
    </div>
  );
}

export default TextBox;
