import { cn } from "@/lib/utils";

interface TextProps {
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
}: TextProps) {
  const typeStyle = {
    primary: "text-color-alias-primary-normal",
    assistive: "text-color-alias-label-alternative",
  };
  const interactiveTypeStyle = {
    primary:
      "hover:bg-color-alias-primary-normal/normal-hover focus:bg-color-alias-primary-normal/normal-focus active:bg-color-alias-primary-normal/normal-active",
    assistive:
      "hover:bg-color-alias-label-alternative/normal-hover focus:bg-color-alias-label-alternative/normal-focus active:bg-color-alias-label-alternative/normal-active",
  };
  const sizeStyle = {
    medium: "text-body-1-normal font-bold",
    small: "text-label-1-normal font-bold",
  };
  const disableStyle = {
    "text-color-alias-label-disable": disable,
  };
  return (
    <div
      className={cn(
        "text-body-1-normal flex gap-[4px] w-fit py-[4px] px-[7px] rounded-radius-admin",
        !disable && interactiveTypeStyle[type],
        typeStyle[type],
        sizeStyle[size],
        disableStyle,
        className
      )}
    >
      {children}
    </div>
  );
}

export default Text;
