import { cn } from "@/lib/utils";
import Badge from "@/components/common/Atoms/Badge/Badge";

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  size?: "normal" | "small";
  icon: React.ReactNode;
  type?: "normal" | "background" | "outlined" | "solid";
  disable?: boolean;
  pushBadge?: boolean;
  className?: string;
}

function IconButton({
  size = "normal",
  icon,
  type = "normal",
  disable = false,
  pushBadge = false,
  className,
  ...props
}: IconButtonProps) {
  const sizeStyle = {
    normal: "p-[10px]",
    small: "p-[7px]",
  };
  const interactiveTypeStyle = {
    normal:
      "hover:bg-label-normal/light-hover focus:bg-label-normal/light-focus active:bg-label-normal/light-active",
    background:
      "hover:bg-label-normal/light-hover focus:bg-label-normal/light-focus active:bg-label-normal/light-active",
    outlined:
      "hover:bg-label-normal/light-hover focus:bg-label-normal/light-focus active:bg-label-normal/light-active",
    solid:
      "shadow-style-alias-shadow-strong hover:brightness-hover focus:brightness-focus active:brightness-active",
  };
  const typeStyle = {
    normal: "",
    background: "bg-line-solid-alternative",
    outlined: "ring-1 ring-line-normal-normal",
    solid: "bg-primary-normal",
  };
  const disableStyle = {
    "bg-fill-alternative": disable,
    "bg-fill-normal": disable && type === "solid",
  };
  return (
    <button
      className={cn(
        "w-fit p-[8px] rounded-full relative",
        !disable && interactiveTypeStyle[type],
        sizeStyle[size],
        typeStyle[type],
        disableStyle,
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      {pushBadge && <Badge variant="dot" className="top-[8px] right-[8px]" />}
      {icon}
    </button>
  );
}

export default IconButton;

// size는 svg에 width와 height를 current로 변경 후 사용 ex) <Logo width="30" height="30" />
// disable을 하면 icon도 disable하게 추후 구현
// size에 따라서 svg의 크기도 핸들링하도록 구현 (지금은 padding값만 바뀜)
// Button타입을 extends하고 ...props로 onClick달아버리게 구현
