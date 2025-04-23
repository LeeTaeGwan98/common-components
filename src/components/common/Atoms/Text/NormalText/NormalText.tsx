import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  type?: "primary" | "assistive";
  size?: "medium" | "small";
  disable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function Text({
  type = "primary",
  size = "medium",
  disable = false,
  children,
  className,
  ...props
}: TextProps) {
  const typeStyle = {
    primary: "text-primary-normal",
    assistive: "text-label-alternative",
  };
  const interactiveStyle = `after:content-['']
  after:absolute
  after:rounded-radius-admin
  after:transition-colors
  after:-z-10`;

  const interactiveTypeStyle = {
    primary:
      "after:hover:bg-primary-normal/normal-hover after:focus:bg-primary-normal/normal-focus after:active:bg-primary-normal/normal-active",
    assistive:
      "after:hover:bg-label-alternative/normal-hover after:focus:bg-label-alternative/normal-focus after:active:bg-label-alternative/normal-active",
  };
  const sizeStyle = {
    medium: "text-body1-normal-bold",
    small: "text-label1-normal-bold",
  };
  const disableStyle = {
    "text-label-disable": disable,
  };
  return (
    <div
      className={cn(
        "relative text-body1-normal-regular flex gap-[4px] w-fit  after:top-[-4px] after:bottom-[-4px] after:right-[-7px] after:left-[-7px]",
        !disable && interactiveTypeStyle[type],
        interactiveStyle,
        typeStyle[type],
        sizeStyle[size],
        disableStyle,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Text;
