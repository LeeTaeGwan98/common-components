import { cn } from "@/lib/utils";
import Badge from "@/components/common/Atoms/Badge/Badge";

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  size?: "normal" | "small" | "custom";
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
    normal:
      type === "normal"
        ? "after:top-[-10px] after:right-[-10px] after:bottom-[-10px] after:left-[-10px]"
        : "p-[10px]",
    small:
      type === "normal"
        ? "after:top-[-7px] after:right-[-7px] after:bottom-[-7px] after:left-[-7px]"
        : "p-[7px]",
    custom:
      type === "normal"
        ? "after:top-[-8px] after:right-[-8px] after:bottom-[-8px] after:left-[-8px]"
        : "p-[6px]",
  };
  const interactiveTypeStyle = `
  relative
  after:content-['']
  after:absolute
  after:rounded-full
  after:transition-colors
  after:-z-10
  ${
    type === "solid"
      ? "shadow-style-alias-shadow-strong hover:brightness-hover focus:brightness-focus active:brightness-active"
      : type === "normal"
      ? "after:hover:bg-label-normal/light-hover after:focus:bg-label-normal/light-focus after:active:bg-label-normal/light-active"
      : "hover:bg-label-normal/light-hover focus:bg-label-normal/light-focus active:bg-label-normal/light-active"
  }
`;

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
        "w-fit rounded-full relative",
        !disable && interactiveTypeStyle,
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
