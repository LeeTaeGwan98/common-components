import { cn } from "@/lib/utils";

interface TextBoxProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  label?: string;
  className?: string;
  count?: boolean;
}

function TextBox({ value, label, className, count, ...props }: TextBoxProps) {
  const { readOnly } = props;
  const disableStyle =
    "disabled:bg-interaction-disable border-line-normal-neutral";

  const interactiveTypeStyle =
    !readOnly &&
    "hover:border-coolNeutral-50/[.52] focus:border-primary-normal";

  return (
    <div className="flex flex-col gap-[4px]">
      {label && (
        <span className=" text-label1-normal-bold text-label-alternative">
          {label}
        </span>
      )}
      <textarea
        value={value}
        className={cn(
          "h-[180px] p-[12px] appearance-none bg-transparent outline-none resize-none w-full border-[1px] border-line-normal-normal rounded-radius-admin text-body-1-normal placeholder:text-body1-normal-regular placeholder:text-label-assistive",
          interactiveTypeStyle,
          disableStyle,
          className
        )}
        maxLength={300}
        {...props}
      />
      {count ? (
        <div className="w-full text-end *:text-caption1-medium flex justify-end items-center">
          <span className="text-primary-normal">{value.length ?? 0}</span>
          <span className="text-label-alternative">/</span>
          <span className="text-label-alternative">300</span>
        </div>
      ) : null}
    </div>
  );
}

export default TextBox;
