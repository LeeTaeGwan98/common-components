import { cn } from "@/lib/utils";
import { createElement, HTMLAttributes } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | React.FC;
  DefaultIcon: string | React.FC;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  className?: string;
}

// 사이즈 스타일 매핑
const sizeStyle = {
  xsmall: "w-[24px] h-[24px]",
  small: "w-[32px] h-[32px]",
  medium: "w-[40px] h-[40px]",
  large: "w-[48px] h-[48px]",
  xlarge: "w-[56px] h-[56px]",
};

// 이미지 URL 유효성 검사 함수
const isValidImageUrl = (value: unknown): value is string =>
  typeof value === "string" &&
  /^(https?:\/\/|\/|data:image\/(png|jpg|jpeg|gif|svg\+xml);base64,)/.test(
    value
  );

// SVG 또는 React 컴포넌트인지 확인하는 함수
const isReactComponent = (value: unknown): value is React.FC =>
  typeof value === "function";

/**
 * 사용법
 * <Avatar src={"이미지 URL"} DefaultIcon={"이미지 URL"} />
 * 현재 svg처리는 컴포넌트로 오는것을 기본으로 구현함
 */
function Avatar({
  src,
  size = "medium",
  DefaultIcon,
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-full relative flex items-center justify-center",
        sizeStyle[size],
        isValidImageUrl(src) && "ring-1 ring-line-normal-alternative",
        className
      )}
      {...props}
    >
      {isValidImageUrl(src) ? (
        <img
          src={src}
          alt="user"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : isReactComponent(src) ? (
        createElement(src)
      ) : null}

      {!src &&
        (isValidImageUrl(DefaultIcon) ? (
          <img
            src={DefaultIcon}
            alt="default icon"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : isReactComponent(DefaultIcon) ? (
          <DefaultIcon />
        ) : null)}
    </div>
  );
}

export default Avatar;
