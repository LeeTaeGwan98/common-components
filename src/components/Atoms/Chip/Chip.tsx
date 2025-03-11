import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium" | "large";
  variant?: "fill" | "outline" | "pressing";
  disable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function Chip({
  size = "medium",
  variant = "fill",
  disable = false,
  children,
  className,
}: ChipProps) {
  const sizeStyle = {
    small: "py-[4px] px-[9px] text-caption-1 rounded-[12px]",
    medium: "py-[6px] px-[12px] text-label-1-normal rounded-[16px]",
    large: "py-[9px] px-[16px] text-body-2-normal rounded-[20px] gap-[5px]",
  };
  const interactiveTypeStyle = {
    fill: "hover:bg-color-alias-label-normal/normal-hover focus:bg-color-alias-label-normal/normal-focus active:bg-color-alias-label-normal/normal-active",
    outline:
      "hover:bg-color-alias-line-normal-normal/light-hover focus:bg-color-alias-line-normal-normal/light-focus active:bg-color-alias-line-normal-normal/light-active",
    pressing:
      "bg-color-alias-primary-normal/[0.08] hover:bg-[#EDE7FE] focus:bg-[#E9E1FE] active:bg-[#E4DAFE]",
  };
  const variantStyle = {
    fill: "",
    outline: "ring-1 ring-color-alias-line-normal-normal bg-white",
    pressing: "border-none text-color-alias-primary-normal",
  };
  const disableStyle = {
    "text-color-alias-label-assistive": disable,
  };
  return (
    <div
      className={cn(
        "w-fit flex items-center font-medium gap-[4px] bg-color-component-fill-alternative text-color-alias-label-normal",
        !disable && interactiveTypeStyle[variant],
        sizeStyle[size],
        variantStyle[variant],
        disableStyle,
        className
      )}
    >
      {children}
    </div>
  );
}

export default Chip;
