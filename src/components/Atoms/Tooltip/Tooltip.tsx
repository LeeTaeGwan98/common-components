import { cn } from "@/lib/utils";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 툴팁의 화살표가 표시될 방향을 지정합니다.
   * - top: 위쪽에 화살표 표시
   * - bottom: 아래쪽에 화살표 표시
   * - left: 왼쪽에 화살표 표시
   * - right: 오른쪽에 화살표 표시
   * @default "top"
   */
  variant?: "top" | "bottom" | "left" | "right";

  /**
   * 화살표의 위치를 지정합니다.
   * - 1: 시작 위치 (왼쪽 또는 상단)
   * - 2: 중앙 위치
   * - 3: 끝 위치 (오른쪽 또는 하단)
   * @default 2
   */
  order?: 1 | 2 | 3;

  /**
   * 툴팁에 표시될 텍스트 내용입니다.
   */
  text?: string;

  /**
   * 추가적인 CSS 클래스를 지정합니다.
   */
  className?: string;
}

/**
 * 사용자에게 추가 정보를 제공하는 툴팁 컴포넌트
 *
 * @param variant - 툴팁 화살표의 방향 ("top" | "bottom" | "left" | "right")
 * @param order - 화살표의 위치 (1 | 2 | 3)
 * @param text - 툴팁에 표시될 텍스트
 * @param className - 추가적인 CSS 클래스
 *
 * @example
 * // 기본 툴팁 (위쪽 화살표, 중앙 위치)
 * <Tooltip text="도움말 텍스트" />
 *
 * // 아래쪽 화살표, 왼쪽 위치의 툴팁
 * <Tooltip variant="bottom" order={1} text="아래쪽 화살표" />
 *
 * // 왼쪽 화살표, 중앙 위치의 툴팁 (추가 스타일 적용)
 * <Tooltip variant="left" text="왼쪽 화살표" className="bg-red-500" />
 */
function Tooltip({
  variant = "top",
  order = 2,
  text,
  className,
}: TooltipProps) {
  return (
    <div
      className={cn(
        "absolute min-w-[54px] min-h-[40px] w-fit py-[8px] px-[12px] rounded-radius-admin text-static-white bg-material-toast text-body-1-normal font-medium shadow-style-alias-shadow-emphasize",
        className
      )}
    >
      {text}
      <Tooltip.TooltipTail variant={variant} order={order} />
    </div>
  );
}

/**
 * 툴팁 화살표의 위치를 계산하기 위한 매핑 테이블
 * 각 방향(top, bottom, left, right)과 위치(1, 2, 3)에 따른 CSS 클래스를 정의합니다.
 */
const tailPosition = {
  top: {
    1: "-top-[28px] left-[8px]",
    2: "-top-[28px] left-1/2 -translate-x-1/2",
    3: "-top-[28px] right-[8px]",
  },
  bottom: {
    1: "-bottom-[28px] left-[8px]",
    2: "-bottom-[28px] left-1/2 -translate-x-1/2",
    3: "-bottom-[28px] right-[8px]",
  },
  left: {
    1: "top-[0px] -left-[24px]",
    2: "top-[6px] -left-[24px]",
    3: "top-[12px] -left-[24px]",
  },
  right: {
    1: "top-[0px] -right-[24px]",
    2: "top-[6px] -right-[24px]",
    3: "top-[12px] -right-[24px]",
  },
};

/**
 * 툴팁 화살표의 방향에 따른 회전 각도를 계산하는 함수
 *
 * @param variant - 툴팁 화살표 방향
 * @returns 회전 각도에 대한 CSS 클래스
 */
const rotateSet = (variant: TooltipProps["variant"]) => {
  switch (variant) {
    case "top":
      return "rotate-[0deg]";

    case "bottom":
      return "rotate-[180deg]";

    case "left":
      return "rotate-[270deg]";

    case "right":
      return "rotate-[90deg]";
    default:
  }
};

/**
 * 툴팁의 화살표를 렌더링하는 서브컴포넌트
 * 방향과 위치에 따라 화살표의 모양과 위치를 조정합니다.
 */
Tooltip.TooltipTail = (({ variant = "top", order = 2 }) => {
  const position = tailPosition[variant][order];
  const rotate = rotateSet(variant);

  return (
    <div
      className={`w-0 h-0
        absolute
        border-t-[14px] border-t-transparent
        border-l-[10px] border-l-transparent
        border-r-[10px] border-r-transparent
        border-b-[14px]
        border-b-material-toast
        ${position}
        ${rotate}
        `}
    />
  );
}) as React.FC<Omit<TooltipProps, "text" | "className">>;

Tooltip.TooltipTail.displayName = "TooltipTail";

export default Tooltip;

// Todo: TooltipTail에 round적용
// tooltip을 쓰는곳에서 부모요소에 relative가 강제됨
// className으로 위치를 잡아주는데 이게 맞을까
// tailPosition에 px값으로 위치를 지정해주거 리팩토링 필요
// TooltipTail을 path-clip으로 리팩토링
