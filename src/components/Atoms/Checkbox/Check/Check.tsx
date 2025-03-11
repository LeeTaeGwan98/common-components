import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import CheckIcon from "@/assets/svg/check.svg";

/**
 * Check 컴포넌트
 *
 * 체크 아이콘을 표시하는 버튼 컴포넌트입니다.
 * 체크 상태에 따라 색상이 변경됩니다.
 *
 * @example
 * // 기본 사용법
 * <Check checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
 *
 * // 체크 해제 상태
 * <Check checked={false} />
 *
 * // 체크 상태
 * <Check checked={true} />
 *
 * // 작은 크기
 * <Check checked={isChecked} size="small" />
 *
 * // 비활성화 상태
 * <Check checked={isChecked} disabled={true} />
 */
interface CheckProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 체크 상태 여부 */
  checked: boolean;
  /** 체크 아이콘 크기 (normal: 24px, small: 20px) */
  size?: "normal" | "small";
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 체크 아이콘 버튼 컴포넌트
 *
 * 체크 상태에 따라 색상이 변경되는 체크 아이콘 버튼입니다.
 * checked=true: 기본 색상, checked=false: 보조 색상으로 표시됩니다.
 *
 * @param props - CheckProps
 * @returns React 컴포넌트
 */
function Check({ checked, size = "normal", className, ...props }: CheckProps) {
  const sizeStyle = {
    normal: "24",
    small: "20",
  };
  const checkedStyle = {
    "fill-color-alias-primary-normal": checked,
    "fill-color-alias-label-assistive": !checked,
  };

  return (
    <button
      className={cn(
        "w-fit rounded-full p-[4px] hover:bg-color-alias-label-normal/normal-hover focus:bg-color-alias-label-normal/normal-focus active:bg-color-alias-label-normal/normal-active",
        "disabled:opacity-[.43] disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <CheckIcon
        width={sizeStyle[size]}
        height={sizeStyle[size]}
        className={cn("disabled:opacity-[.43]", checkedStyle)}
      />
    </button>
  );
}

export default Check;
