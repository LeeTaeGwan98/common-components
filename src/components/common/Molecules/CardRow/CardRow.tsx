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
  slot?: {
    containerClassName?: string;
    titleClassname?: string;
    contentClassName?: string;
    shortcutClassName?: string;
  };
}

function CardRow({ data = {}, slot = {} }: CardRowProps) {
  const { title, content, shortcut } = data;
  return (
    <div className={cn("flex flex-col gap-[2px]", slot.containerClassName)}>
      <div className="flex items-center justify-between">
        <div>
          <div
            className={cn(
              "text-label2-bold text-label-normal",
              slot.titleClassname
            )}
          >
            {title}
          </div>
          <span
            className={cn(
              "text-body2-normal-regular text-label-neutral",
              slot.contentClassName
            )}
          >
            {content}
          </span>
        </div>
        {shortcut && (
          <span>
            {cloneElement(shortcut, {
              className: cn("size-[48px]", slot.shortcutClassName),
            })}
          </span> // 기본 사이즈 48px
        )}
      </div>
    </div>
  );
}

export default CardRow;
