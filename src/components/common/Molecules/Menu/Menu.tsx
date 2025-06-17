import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import Label from "@/components/common/Atoms/Label/Label";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";

interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "slot"> {
  labelText?: string;
  rightIcon?: ReactNode;
  arrowIcon?: ReactNode;
  children: ReactNode;
  onArrowIconClick?: (e: React.MouseEvent) => void;
  slot?: {
    containerClassName?: string;
    labelClassName?: string;
    labelVariant?: "filled" | "outlined";
  };
  className?: string;
}

function Menu({
  labelText,
  rightIcon,
  arrowIcon,
  children,
  className,
  onArrowIconClick,
  slot,
  ...props
}: MenuProps) {
  const [isIconHovered, setIsIconHovered] = useState(false);

  // 아이콘 영역 호버 상태 처리
  const handleIconMouseEnter = () => {
    setIsIconHovered(true);
  };

  const handleIconMouseLeave = () => {
    setIsIconHovered(false);
  };

  // 화살표 아이콘 클릭 처리
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onArrowIconClick?.(e);
  };

  return (
    <div
      className={cn(
        "flex justify-between rounded-radius-admin",
        !isIconHovered && "hover:bg-label-normal/light-hover",
        className
      )}
      {...props}
    >
      <div className="flex items-center flex-1">
        {arrowIcon && (
          <IconButton
            icon={arrowIcon}
            onClick={handleIconClick}
            onMouseEnter={handleIconMouseEnter}
            onMouseLeave={handleIconMouseLeave}
          />
        )}
        <div className="flex w-full items-center">
          <span className="w-full">{children}</span>
        </div>
      </div>

      {(labelText || rightIcon) && (
        <div className="flex gap-[4px] items-center">
          {labelText && (
            <Label
              variant={slot?.labelVariant ? slot.labelVariant : "outlined"}
              size="xSmall"
              className={cn(slot?.labelClassName)}
            >
              {labelText}
            </Label>
          )}
          {rightIcon}
        </div>
      )}
    </div>
  );
}

export default Menu;
