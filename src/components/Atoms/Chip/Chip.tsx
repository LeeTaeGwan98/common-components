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
    small: "py-[4px] px-[9px] text-caption1-regular rounded-[12px]",
    medium: "py-[6px] px-[12px] text-label1-normal-regular rounded-[16px]",
    large:
      "py-[9px] px-[16px] text-body2-normal-regular rounded-[20px] gap-[5px]",
  };
  const interactiveTypeStyle = {
    fill: "hover:bg-label-normal/normal-hover focus:bg-label-normal/normal-focus active:bg-label-normal/normal-active",
    outline:
      "hover:bg-line-normal-normal/light-hover focus:bg-line-normal-normal/light-focus active:bg-line-normal-normal/light-active",
    pressing:
      "bg-primary-normal/[0.08] hover:bg-[#EDE7FE] focus:bg-[#E9E1FE] active:bg-[#E4DAFE]",
  };
  const variantStyle = {
    fill: "",
    outline: "ring-1 ring-line-normal-normal bg-white",
    pressing: "border-none text-primary-normal",
  };
  const disableStyle = {
    "text-label-assistive": disable,
  };
  return (
    <div
      className={cn(
        "w-fit flex items-center font-medium gap-[4px] bg-fill-alternative text-label-normal",
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
