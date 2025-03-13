import { cn } from "@/lib/utils";

interface DotIndicatorProps {
  count: number;
  selected: number;
  type: "activated" | "inactive";
  size: "normal" | "small";
  color: "adaptive" | "white";
  changeSelected: () => void;
  className?: string;
}

function DotIndicator({
  count,
  selected,
  type,
  size,
  color,
  changeSelected,
  className,
}: DotIndicatorProps) {
  return (
    <div className={cn("flex gap-[6px] items-center", className)}>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={cn(getDotStyle(index, selected, type, color, size))}
          onClick={changeSelected}
        />
      ))}
    </div>
  );
}

export default DotIndicator;

const getInactiveSize = (
  index: number,
  selected: number,
  size: "normal" | "small"
) => {
  const offset = size === "small" ? 2 : 0;
  let base: number;
  if (index === selected || index === selected - 1 || index === selected + 1) {
    base = 10;
  } else if (index === selected - 2 || index === selected + 2) {
    base = 8;
  } else if (index === selected - 3 || index === selected + 3) {
    base = 6;
  } else {
    base = 4;
  }
  const finalSize = base - offset;
  return `w-[${finalSize}px] h-[${finalSize}px]`;
};

const getDotStyle = (
  index: number,
  selected: number,
  type: "activated" | "inactive",
  color: "adaptive" | "white",
  size: "normal" | "small"
) => {
  const isSelected = selected === index;
  const offset = size === "small" ? 2 : 0;

  // 사이즈 클래스 결정
  let sizeClass = "";
  if (isSelected) {
    if (type === "activated") {
      const activatedWidth = 20 - offset;
      const activatedHeight = 10 - offset;
      sizeClass = `w-[${activatedWidth}px] h-[${activatedHeight}px]`;
    } else {
      const normalDotSize = 10 - offset;
      sizeClass = `w-[${normalDotSize}px] h-[${normalDotSize}px]`;
    }
  } else {
    if (type === "inactive") {
      sizeClass = getInactiveSize(index, selected, size);
    } else {
      const normalDotSize = 10 - offset;
      sizeClass = `w-[${normalDotSize}px] h-[${normalDotSize}px]`;
    }
  }

  // 색상 클래스 결정 (color가 white이면 항상 ring 스타일 적용)
  let colorClass = "";
  if (color === "white") {
    colorClass = isSelected
      ? "ring-2 ring-[#ECECED] bg-transparent"
      : "ring-2 ring-[#F4F4F5] bg-transparent";
  } else {
    colorClass = isSelected ? "bg-black" : "bg-gray-300";
  }

  return cn("rounded-full transition-all duration-300", sizeClass, colorClass);
};
