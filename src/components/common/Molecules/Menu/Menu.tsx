import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import Label from "@/components/common/Atoms/Label/Label";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";

interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "slot"> {
  labelText?: string;
  rightIcon?: ReactNode;
  arrowIcon?: ReactNode;
  children: ReactNode;
  path?: string;
  icon?: ReactNode;
  onArrowIconClick?: (e: React.MouseEvent) => void;
  slot?: {
    containerClassName?: string;
    labelClassName?: string;
  };
  className?: string;
}

function Menu({
  labelText,
  rightIcon,
  arrowIcon,
  children,
  className,
  icon,
  onArrowIconClick,
  path,
  slot,
  ...props
}: MenuProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false); // ⭐️ 추가

  const handleMouseEnter = () => {
    if (!isIconHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = () => {
    if (!isIconHovered && !isHovered) {
      setIsHovered(true);
    }
  };

  const handleIconMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsIconHovered(true);
    setIsHovered(false);
  };

  const handleIconMouseLeave = () => {
    setIsIconHovered(false);
  };

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onArrowIconClick && onArrowIconClick(e);
  };

  return (
    <div
      className={cn(
        "flex justify-between rounded-radius-admin",
        isHovered && "bg-label-normal/light-hover",
        className
      )}
      {...props}
    >
      <div className="flex items-center flex-1">
        <IconButton
          icon={arrowIcon}
          onMouseEnter={(e) => handleIconMouseEnter(e)}
          onMouseLeave={handleIconMouseLeave}
          onClick={handleIconClick}
        />
        <div
          className="flex w-full items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {icon}
          <span className="ml-[4px] w-full">{children}</span>
        </div>
      </div>

      <div className="flex gap-[4px] items-center ">
        {labelText && (
          <Label
            variant="outlined"
            size="xSmall"
            className={cn(slot?.labelClassName)}
          >
            {labelText}
          </Label>
        )}
        {rightIcon}
      </div>
    </div>
  );
}

export default Menu;
