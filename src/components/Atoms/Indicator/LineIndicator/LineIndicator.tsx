import { cn } from "@/lib/utils";

interface LineIndicator {
  count: number;
  selected: number;
  color: "adaptive" | "white";
  className: string;
}

const selectStyle = (selected: number, index: number) => {
  return selected === index ? "bg-color-alias-label-normal" : "bg-transparent";
};

function LineIndicator({
  count,
  selected,
  color = "adaptive",
  className,
}: LineIndicator) {
  const colorStyle = {
    adaptive: "bg-color-alias-label-normal/[0.16]",
    white: "bg-white",
  };

  return (
    <div
      className={cn(
        "bg-color-alias-label-normal/[0.16] w-full h-[2px] flex",
        colorStyle[color],
        className
      )}
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={cn(
            "flex-1 h-[2px] transition-all duration-300",
            selectStyle(selected, index)
          )}
        />
      ))}
    </div>
  );
}

export default LineIndicator;
