import React from "react";
import { cn } from "@/lib/utils";
import Check from "@/assets/svg/check.svg";
import Dash from "@/assets/svg/partialCheck.svg";

/**
 * Checkbox 컴포넌트
 *
 * 체크박스 기능을 제공하는 커스텀 버튼 컴포넌트입니다.
 *
 * @example
 * // 기본 사용법
 * <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
 *
 * // 비활성화 상태
 * <Checkbox checked={true} disable={true} />
 *
 * // 부분 체크 상태 (대시 표시)
 * <Checkbox checked={true} checkIconType="partial" />
 *
 * // 작은 크기
 * <Checkbox checked={isChecked} size="small" />
 *
 * // 둥근 모양
 * <Checkbox checked={isChecked} isRound={true} />
 */
interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 체크 상태 여부 */
  checked: boolean;
  /** 체크박스 크기 (normal: 18x18px, small: 16x16px) */
  size?: "normal" | "small";
  /** 비활성화 여부 */
  disable?: boolean;
  /** 체크 아이콘 타입 (check: 체크표시, partial: 대시표시) */
  checkIconType?: "check" | "partial";
  /** 둥근 모양 사용 여부 */
  isRound?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 체크박스 컴포넌트
 *
 * 상태와 스타일을 커스터마이징할 수 있는 체크박스입니다.
 *
 * @param props - CheckboxProps
 * @returns React 컴포넌트
 */
function Checkbox({
  checked,
  size = "normal",
  disable = false,
  checkIconType = "check",
  isRound = false,
  className,
  ...props
}: CheckboxProps) {
  const computedSizeStyle = {
    normal: isRound ? "w-[20px] h-[20px] rounded-full" : "w-[18px] h-[18px]",
    small: isRound ? "w-[18px] h-[18px] rounded-full" : "w-[16px] h-[16px]",
  };

  const checkStyle = {
    "bg-color-alias-primary-normal": checked,
    "border-2 border-color-alias-line-normal-normal/[0.22]": !checked,
  };

  const disableStyle = {
    "opacity-[.43]": disable,
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center p-[7px] rounded-full",
        "hover:bg-color-alias-label-normal/normal-hover focus:bg-color-alias-label-normal/normal-focus active:bg-color-alias-label-normal/normal-active",
        disable && "cursor-not-allowed"
      )}
      disabled={disable}
      {...props}
    >
      <span
        className={cn(
          "rounded-[3px] border-2 border-transparent",
          disableStyle,
          computedSizeStyle[size],
          checkStyle,
          className
        )}
      >
        {checkIconType === "check" && checked && <Check fill="#fff" />}
        {checkIconType === "partial" && checked && <Dash />}
      </span>
    </button>
  );
}

export default Checkbox;
