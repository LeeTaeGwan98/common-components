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
  onContentClick?: () => void;
}

function CardRow({ data = {}, slot = {}, onContentClick }: CardRowProps) {
  const { title, content, shortcut } = data;
  return (
    <div className={cn("flex flex-col gap-[2px]", slot.containerClassName)}>
      <div className="flex flex-col gap-[6px]">
        <span
          className={cn(
            "text-label2-bold text-label-alternative",
            slot.titleClassname
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "text-body2-reading-bold-regular text-label-normal",
            slot.contentClassName
          )}
          onClick={onContentClick}
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
  );
}

export default CardRow;
