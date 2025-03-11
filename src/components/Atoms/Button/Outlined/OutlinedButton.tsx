import { cn } from "@/lib/utils";

interface OutlinedButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: "primary" | "secondary" | "assistive";
  size?: "large" | "medium" | "small";
  disable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function OutlinedButton({
  type = "primary",
  size = "medium",
  disable = false,
  children,
  className,
  ...props
}: OutlinedButtonProps) {
  const typeStyle = {
    primary: "border-primary-normal text-primary-normal",
    secondary: "border-line-normal-normal text-primary-normal",
    assistive: "border-line-normal-normal text-label-1-normal",
  };

  const interactiveTypeStyle = {
    primary:
      "hover:bg-primary-normal/normal-hover focus:bg-primary-normal/normal-focus active:bg-primary-normal/normal-active",
    secondary:
      "hover:bg-label-normal/normal-hover focus:bg-label-normal/normal-focus active:bg-label-normal/normal-active",
    assistive:
      "hover:bg-label-normal/normal-hover focus:bg-label-normal/normal-focus active:bg-label-normal/normal-active",
  };

  const sizeStyle = {
    large: "py-[12px] px-[28px]",
    medium: "py-[9px] px-[20px]",
    small: "py-[7px] px-[14px]",
  };

  const disableStyle = {
    "text-label-disable border-line-normal-normal": disable,
  };

  const fontStyle = {
    primary: {
      large: "text-body-1-normal font-bold",
      medium: "text-body-2-normal font-bold",
      small: "text-label-2 font-bold",
    },
    secondary: {
      large: "text-body-1-normal font-bold",
      medium: "text-body-2-normal font-bold",
      small: "text-label-2 font-bold",
    },
    assistive: {
      large: "text-body-1-normal font-medium",
      medium: "text-body-2-normal font-medium",
      small: "text-label-2 font-medium",
    },
  };

  return (
    <button
      className={cn(
        "min-w-[98px] flex justify-center items-center gap-[6px] rounded-large-button border-[1px]",
        typeStyle[type],
        !disable && interactiveTypeStyle[type],
        sizeStyle[size],
        disableStyle,
        fontStyle[type][size],
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      {children}
    </button>
  );
}

export default OutlinedButton;
