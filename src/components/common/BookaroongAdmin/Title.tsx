import { cn } from "@/lib/utils";

interface TitleProps {
  size?: "large" | "medium" | "small";
  label: string;
}

function Title({ size = "large", label }: TitleProps) {
  const sizeStyle = {
    large: "text-label1-normal-bold mb-[8px]",
    medium: "text-label2-bold mb-[9px]",
    small: "",
  };

  return (
    <div className={cn("text-label-alternative", sizeStyle[size])}>{label}</div>
  );
}

export default Title;
