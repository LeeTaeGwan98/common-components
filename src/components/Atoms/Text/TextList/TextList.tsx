import { cn } from "@/lib/utils";

interface TextListProps {
  size?: "large" | "medium" | "small";
  disable?: boolean;
  textFixed?: boolean;
  label?: string;
  leftIcons?: React.ReactNode[];
  RightIcon?: React.ReactNode | "radio" | "checkbox" | "check";
  marginFixed?: boolean;
  children?: string | number;
  className?: string;
}

function TextList({
  size = "medium",
  disable,
  textFixed,
  label,
  leftIcons = [],
  RightIcon,
  marginFixed = false,
  children,
  className,
}: TextListProps) {
  const sizeStyle = {
    large: "py-[12px] px-[24px] text-body2-normal-regular",
    medium: "py-[10px] px-[16px] text-label2-regular",
    small: "py-[6px] pl-[12px] pr-[8px] text-caption1-regular",
  };
  const interactiveTypeStyle =
    "hover:bg-label-normal/light-hover focus:bg-label-normal/light-focus active:bg-label-normal/light-active";

  const disableStyle = {
    text: {
      "text-label-disable": disable,
    },
    label: {
      "label-alternative bg-fill-normal": disable,
    },
  };
  const textField = {
    "max-w-[328px]": textFixed,
  };
  const marginFixedStyle = marginFixed && "p-[16px]";
  return (
    <div
      className={cn(
        "flex justify-between w-fit rounded-radius-admin",
        !disable && interactiveTypeStyle,
        textField,
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-[6px] text-label1-normal-regular",
          sizeStyle[size],
          disableStyle.text,
          marginFixedStyle
        )}
      >
        {leftIcons &&
          leftIcons.map((Icon, idx) => {
            return <span key={idx}>{Icon}</span>;
          })}
        {children}
        {label && (
          <div
            className={cn(
              "rounded-radius-admin py-[3px] px-[4px] text-label-alternative bg-fill-alternative",
              disableStyle.label
            )}
          >
            {label}
          </div>
        )}
      </div>

      {RightIcon && <span>{RightIcon}</span>}
    </div>
  );
}

export default TextList;

// Todo: normal hover focus active 추후 구현
// disable했을 때 아이콘색도 변경되도록 구현
// 요소들 분리 필요
// 구현한 Icon컴포넌트를 사용하도록
