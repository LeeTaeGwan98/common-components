import { cn } from "@/lib/utils";
import { ReactElement, ReactNode } from "react";
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

  /** children에 Checkbox만 허용 */
  children?: ReactElement<typeof Checkbox> | ReactNode;
  /** 별도로 Checkbox만 따로 분리해서 넘길 수 있게 */
  Checkbox?: ReactNode;

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
  Checkbox,
  onClick,
  ...props
}: InputCheckboxProps) {
  const boldStyle = bold
    ? "text-body2-normal-bold"
    : "text-body2-normal-regular";

  const disableStyle =
    disable && "text-label-disable/[.16]  cursor-not-allowed";

  // hover/focus/active가 Checkbox에만 적용되게
  const interactiveTypeStyle = `
    [&>*:first-child]:relative
    [&>*:first-child]:after:content-['']
    [&>*:first-child]:after:absolute
    [&>*:first-child]:after:top-[-1px]
    [&>*:first-child]:after:right-[-1px]
    [&>*:first-child]:after:bottom-[-1px]
    [&>*:first-child]:after:left-[-1px]
    [&>*:first-child]:after:rounded-full
    [&>*:first-child]:after:transition-colors
    [&>*:first-child]:after:-z-10
    [&>*:first-child]:after:hover:bg-label-normal/normal-hover
    [&>*:first-child]:after:focus:bg-label-normal/normal-focus
    [&>*:first-child]:after:active:bg-label-normal/normal-active
  `;

  return (
    <div
      className={cn(
        "w-fit flex items-center  cursor-pointer",
        boldStyle,
        disableStyle,
        interactiveTypeStyle,
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      onClick={disable ? undefined : onClick}
      {...props}
    >
      {Checkbox && Checkbox}
      {children}
    </div>
  );
}

export default InputCheckbox;
