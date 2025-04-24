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
    assistive:
      "border-line-normal-normal text-label1-normal-regular text-label-normal",
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
      large: "text-body1-normal-bold",
      medium: "text-body2-normal-bold",
      small: "text-label2-bold",
    },
    secondary: {
      large: "text-body1-normal-bold",
      medium: "text-body2-normal-bold",
      small: "text-label2-bold",
    },
    assistive: {
      large: "text-body1-normal-medium",
      medium: "text-body2-normal-medium",
      small: "text-label2-medium",
    },
  };

  return (
    <button
      className={cn(
        "min-w-[98px] flex justify-center items-center gap-[6px] rounded-[4px] border-[1px]",
        typeStyle[type],
        !disable && interactiveTypeStyle[type],
        sizeStyle[size],
        fontStyle[type][size],
        className,
        disableStyle
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      {children}
    </button>
  );
}

export default OutlinedButton;
