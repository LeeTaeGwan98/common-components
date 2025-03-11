import { cn } from "@/lib/utils";
import { ReactElement } from "react";
import Checkbox from "../Checkbox/Checkbox";

/**
 * InputCheckbox 컴포넌트
 *
 * 체크박스를 포함한 클릭 가능한 영역을 생성합니다.
 *
 * @example
 * // 기본 사용법
 * <InputCheckbox>
 *   <Checkbox />
 *   <span className="ml-2">옵션 텍스트</span>
 * </InputCheckbox>
 *
 * // 비활성화 상태
 * <InputCheckbox disable={true}>
 *   <Checkbox />
 *   <span className="ml-2">비활성화된 옵션</span>
 * </InputCheckbox>
 *
 * // 굵은 텍스트로 표시
 * <InputCheckbox bold={true}>
 *   <Checkbox />
 *   <span className="ml-2">굵은 텍스트</span>
 * </InputCheckbox>
 */
interface InputCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 컴포넌트 비활성화 여부 */
  disable?: boolean;
  /** 텍스트를 굵게 표시할지 여부 */
  bold?: boolean;
  /** 체크박스와 함께 표시할 내용 */
  children?: React.ReactNode | ReactElement<typeof Checkbox>;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 체크박스와 라벨을 포함하는 클릭 가능한 컴포넌트입니다.
 * Checkbox 컴포넌트와 함께 사용하도록 설계되었습니다.
 *
 * @param props - InputCheckboxProps
 * @returns React 컴포넌트
 */
function InputCheckbox({
  disable = false,
  bold = false,
  children,
  className,
  onClick,
  ...props
}: InputCheckboxProps) {
  const boldStyle = bold ? "font-bold" : "font-regular";

  const disableStyle =
    disable &&
    "text-color-alias-label-disable/[.16] *:hover:bg-transparent *:focus:bg-transparent *:active:bg-transparent *:opacity-[.43] cursor-not-allowed";

  return (
    <div
      className={cn(
        "w-fit flex items-center text-body-2-normal *:hover:bg-color-alias-label-normal/normal-hover *:focus:bg-color-alias-label-normal/normal-focus *:active:bg-color-alias-label-normal/normal-active cursor-pointer",
        boldStyle,
        disableStyle,
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      onClick={disable ? undefined : onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export default InputCheckbox;
