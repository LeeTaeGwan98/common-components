import { cn } from "@/lib/utils";
import RightArrow from "@/assets/svg/RightArrow.svg";
import BottomArrow from "@/assets/svg/BottomArrow.svg";
import Home from "@/assets/svg/home.svg";
import Label from "@/stories/Atoms/Label/Label";
import { ReactNode } from "react";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string;
  rightIcon?: ReactNode;
  children: string;
  className?: string;
}

function Menu({
  labelText,
  rightIcon,
  children,
  className,
  ...props
}: MenuProps) {
  const interactiveTypeStyle =
    "hover:bg-color-alias-label-normal/light-hover focus:bg-color-alias-label-normal/light-focus active:bg-color-alias-label-normal/light-active";
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
        <RightArrow className="size-[20px]" />
        <Home className="size-[20px]" />
        <span className="ml-[4px]">{children}</span>
      </div>

      <div className={cn("flex gap-[4px] items-center")}>
        {labelText && (
          <Label variant="outlined" size="xSmall" className="">
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
