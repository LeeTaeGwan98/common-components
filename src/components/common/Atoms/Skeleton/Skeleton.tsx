import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  /**
   * 부모 요소를 꽉 채우도록 설정하는 옵션
   * true로 설정 시, 부모 요소에 position: relative가 필요합니다.
   */
  fullSize?: boolean;
}

/**
 * 로딩 상태를 표시하기 위한 스켈레톤 UI 컴포넌트
 *
 * @param className - 추가적인 스타일 클래스
 * @param fullSize - true로 설정하면 부모 요소를 꽉 채웁니다. 이 경우 부모 요소에 position: relative가 필요합니다.
 * @param props - 기타 div 요소에 전달할 속성들
 *
 * @example
 * // 기본 사용법
 * <Skeleton className="w-20 h-4" />
 *
 * // 부모 요소를 꽉 채우는 방식 부모요소에 relative필요
 * <div className="relative">
 *   <Skeleton fullSize />
 * </div>
 */
function Skeleton({ className, fullSize = false, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-radius-admin bg-fill-normal",
        fullSize && "absolute inset-0", // 부모를 꽉 채우는 스타일 (부모는 position: relative 필요)
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
