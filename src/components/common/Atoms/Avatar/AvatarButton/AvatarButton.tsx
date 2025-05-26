import Avatar from "@/components/common/Atoms/Avatar/Avatar/Avatar";
import { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface AvatarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement<typeof Avatar>; // Avatar만 허용
  className?: string;
}

function AvatarButton({ children, className, ...props }: AvatarButtonProps) {
  return (
    <button
      type="button"
      className={cn("relative group", className)} // 그룹화하여 hover 감지
      onMouseUp={(e) => e.currentTarget.blur()} // 클릭 후 포커스 해제
      {...props}
    >
      {/* Hover, Focus, Active 시 8px 바깥쪽 효과 적용 */}
      <span className="absolute -inset-[8px] rounded-full bg-label-normal/0 transition-all duration-200 group-hover:bg-label-normal/normal-hover group-focus:bg-label-normal/normal-focus group-active:bg-label-normal/normal-active" />

      {/* Avatar */}
      <div className="relative z-10">{children}</div>
    </button>
  );
}

export default AvatarButton;
