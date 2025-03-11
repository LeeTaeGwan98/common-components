import { cn } from "@/lib/utils";

interface LabelProps {
  size?: "xSmall" | "small" | "medium";
  variant?: "filled" | "outlined";
  children?: React.ReactNode;
  className?: string;
}

function Label({
  size = "medium",
  variant = "filled",

  children,
  className,
}: LabelProps) {
  const sizeStyle = {
    xSmall: "py-[3px] px-[4px] text-caption-2 font-bold gap-[2px]",
    small: "py-[4px] px-[8px] text-caption-1 font-bold gap-[3px]",
    medium: "py-[6px] px-[12px] text-label-1-normal font-bold gap-[4px]",
  };
  const variantStyle = {
    filled: "",
    outlined: "ring-1 ring-color-alias-line-normal-normal bg-white",
  };

  return (
    <div
      className={cn(
        "bg-color-component-fill-normal w-fit rounded-radius-admin text-color-alias-label-alternative flex items-center",
        sizeStyle[size],
        variantStyle[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export default Label;
