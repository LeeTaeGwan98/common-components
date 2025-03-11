import { cn } from "@/lib/utils";
import { cloneElement, ReactElement } from "react";

interface CardRowDataType {
  title?: string;
  content?: string;
  shortcut?: ReactElement<{ className: string }>;
}

interface CardRowProps {
  data?: CardRowDataType;
  className?: string;
}

function CardRow({ data = {}, className }: CardRowProps) {
  const { title, content, shortcut } = data;
  return (
    <div className={cn("flex flex-col gap-[2px]", className)}>
      <div className="text-label-2 font-bold text-label-normal">{title}</div>
      <div className="flex justify-between">
        <span className="text-body-2-normal font-regular text-label-neutral">
          {content}
        </span>
        {shortcut && (
          <span>{cloneElement(shortcut, { className: "size-[48px]" })}</span> // 기본 사이즈 48px
        )}
      </div>
    </div>
  );
}

export default CardRow;
