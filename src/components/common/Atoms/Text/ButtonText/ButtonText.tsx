import { cn } from "@/lib/utils";

interface TextProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: "primary" | "assistive";
  size?: "medium" | "small";
  disable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function ButtonText({
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
  const interactiveTypeStyle = {
    primary:
      "hover:bg-primary-normal/normal-hover focus:bg-primary-normal/normal-focus active:bg-primary-normal/normal-active",
    assistive:
      "hover:bg-label-alternative/normal-hover focus:bg-label-alternative/normal-focus active:bg-label-alternative/normal-active",
  };
  const sizeStyle = {
    medium: "text-body1-normal-bold",
    small: "text-label1-normal-bold",
  };
  const disableStyle = {
    "text-label-disable": disable,
  };
  return (
    <button
      className={cn(
        "text-body1-normal-regular flex gap-[4px] w-fit py-[4px] px-[7px] rounded-radius-admin",
        !disable && interactiveTypeStyle[type],
        typeStyle[type],
        sizeStyle[size],
        disableStyle,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonText;
