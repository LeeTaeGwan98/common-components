// 외부에서 state를 주입받는 컴포넌트
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface SegmentProps {
  size?: "large" | "medium" | "small";
  selected?: boolean; // true면 왼쪽이 활성화 / false면 오른쪽이 활성화
  setSelected: Dispatch<SetStateAction<boolean>>;
  textList: [string | number, string | number]; // 배열크기 2개로 제한
  className?: string;
  itemClassName?: string;
}

function Segement({
  size = "medium",
  selected = true,
  textList,
  setSelected,
  className,
  itemClassName,
}: SegmentProps) {
  const sizeStyle = {
    large: "w-[284px]",
    medium: "w-[158px]",
    small: "w-[124px]",
  };

  return (
    <div className={cn("flex", sizeStyle[size], className)}>
      {textList.map((item: string | number, idx) => {
        const index = idx as 0 | 1;
        return (
          <Segement.SegementItem
            key={idx}
            flag={index}
            size={size}
            selected={selected}
            itemClassName={itemClassName}
            setSelected={setSelected}
          >
            {item}
          </Segement.SegementItem>
        );
      })}
    </div>
  );
}

type SegementItem = Pick<
  SegmentProps,
  "selected" | "itemClassName" | "size" | "setSelected"
> & {
  children: React.ReactNode;
  flag: 0 | 1;
};

Segement.SegementItem = (({
  selected,
  children,
  flag,
  itemClassName,
  setSelected,
  size = "medium",
}: SegementItem) => {
  const isSelected = !!flag === selected;

  const sizeStyle = {
    large: "text-body-1-normal font-bold py-[12px]",
    medium: "text-body-2-normal font-bold py-[9px]",
    small: "text-label-2 font-medium py-[7px]",
  };
  const flagStyle = {
    "rounded-tl-[24px] rounded-bl-[24px]": flag === 0, // 왼쪽 기본 스타일
    "rounded-tr-[24px] rounded-br-[24px]": flag === 1, // 오른쪽 기본 스타일
  };
  const selectedStyle = isSelected
    ? "bg-color-alias-primary-normal/[0.08] text-color-alias-primary-normal border-[1px] border-transparent"
    : "border-[1px] border-color-alias-line-normal-normal";

  const interactiveTypeStyle = {
    "hover:bg-color-alias-label-normal/light-hover focus:bg-color-alias-label-normal/light-focus active:bg-color-alias-label-normal/light-active":
      !isSelected,
  };

  return (
    <button
      className={cn(
        "flex-1 text-center",
        interactiveTypeStyle,
        flagStyle,
        selectedStyle,
        sizeStyle[size],
        itemClassName
      )}
      onClick={() => setSelected(!!flag)}
    >
      {children}
    </button>
  );
}) as React.FC<SegementItem>;

export default Segement;
