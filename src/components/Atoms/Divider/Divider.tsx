import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 구분선의 두께 스타일을 지정합니다.
   * - normal: 기본 얇은 구분선 (1px)
   * - thick: 두꺼운 구분선 (12px)
   * @default "normal"
   */
  variant?: "normal" | "thick";

  /**
   * 구분선의 방향을 지정합니다.
   * - false: 가로 방향 구분선
   * - true: 세로 방향 구분선 (기본 높이 32px)
   * @default false
   */
  vertical?: boolean;

  /**
   * 추가적인 CSS 클래스를 지정합니다.
   */
  className?: string;
}

const styles = {
  normal: {
    horizontal: "bg-color-alias-line-normal-normal w-full h-[1px]",
    vertical: "bg-color-alias-line-normal-neutral w-[1px] h-[32px]",
  },
  thick: {
    horizontal: "bg-color-alias-line-normal-alternative w-full h-[12px]",
    vertical: "bg-color-alias-line-normal-normal w-[12px] h-[32px]",
  },
};

/**
 * 레이아웃이나 콘텐츠를 구분하기 위한 구분선 컴포넌트
 *
 * @param variant - 구분선의 두께 스타일 ("normal" | "thick")
 * @param vertical - 구분선의 방향 (false: 가로, true: 세로)
 * @param className - 추가적인 CSS 클래스
 *
 * @example
 * // 기본 가로 구분선
 * <Divider />
 *
 * // 두꺼운 가로 구분선
 * <Divider variant="thick" />
 *
 * // 세로 구분선
 * <Divider vertical />
 *
 * // 두꺼운 세로 구분선에 마진 적용
 * <Divider vertical variant="thick" className="mx-4" />
 */
function Divider({
  variant = "normal",
  vertical = false,
  className,
}: DividerProps) {
  const style = vertical
    ? styles[variant].vertical
    : styles[variant].horizontal;

  return <div className={cn(style, className)} />;
}

export default Divider;
