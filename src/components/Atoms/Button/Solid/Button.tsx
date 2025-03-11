import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "large" | "medium" | "small";
  disable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Button = ({
  size = "medium",
  disable = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const sizeStyle = {
    large: "py-[12px] px-[28px] text-body-1-normal font-bold",
    medium: "py-[9px] px-[20px] text-body-2-normal font-bold",
    small: "py-[7px] px-[14px] text-label-2 font-bold",
  };
  const interactiveTypeStyle =
    "hover:brightness-hover focus:brightness-focus active:brightness-active";
  const disableStyle = {
    "bg-color-alias-interaction-disable text-color-alias-label-assistive":
      disable,
  };

  return (
    <button
      className={cn(
        "bg-color-alias-primary-normal text-white min-w-[98px] rounded-large-button flex justify-center gap-[6px] items-center",
        !disable && interactiveTypeStyle,
        disableStyle,
        sizeStyle[size],
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
