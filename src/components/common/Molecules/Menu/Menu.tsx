import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Label from "@/components/common/Atoms/Label/Label";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string;
  rightIcon?: ReactNode;
  arrowIcon?: ReactNode;
  children: ReactNode;
  path?: string;
  icon?: ReactNode;
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
  path,
  slot,
  ...props
}: MenuProps) {
  const interactiveTypeStyle =
    "hover:bg-label-normal/light-hover focus:bg-label-normal/light-focus active:bg-label-normal/light-active";
  return (
    <div
      className={cn(
        "flex justify-between py-[13px] rounded-radius-admin",
        interactiveTypeStyle,
        className
      )}
      {...props}
    >
      <div className={cn("flex items-center")}>
        {arrowIcon}
        {icon}
        <span className="ml-[4px]">{children}</span>
      </div>

      <div className={cn("flex gap-[4px] items-center")}>
        {labelText && (
          <Label
            variant="outlined"
            size="xSmall"
            className={cn(slot?.labelClassName)}
          >
            {labelText}
          </Label>
        )}
        {rightIcon && rightIcon}
      </div>
    </div>
  );
}

export default Menu;

/**
 * Todo: asChild 패턴으로 버튼태그로 구현
 */
