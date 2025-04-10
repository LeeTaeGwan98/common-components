import { cn } from "@/lib/utils";

interface ButtonTextListProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "large" | "medium" | "small";
  children?: React.ReactNode;
}

function ButtonTextList({
  size = "small",
  children,
  ...props
}: ButtonTextListProps) {
  const sizeStyle = {
    large: "px-[24px] py-[12px]",
    medium: "px-[16px] py-[10px]",
    small: "pl-[12px] pr-[8px] py-[6px] ",
  };

  const interactiveTypeStyle = `
    hover:bg-label-normal/[0.0375] focus:bg-label-normal/[0.6] active:bg-label-normal/[0.09]
  `;

  return (
    <div
      className={cn(
        `w-full rounded-none cursor-pointer`,
        sizeStyle[size],
        interactiveTypeStyle
      )}
      {...props}
    >
      <div className="flex gap-[6px] items-center">{children}</div>
    </div>
  );
}

export default ButtonTextList;
