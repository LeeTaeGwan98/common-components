// 참고 문서 https://mynaui.com/components/avatar-groups
import { cn } from "@/lib/utils";
import React, { cloneElement, HTMLAttributes } from "react";
import { AvatarProps } from "@/components/common/Atoms/Avatar/Avatar/Avatar";

interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<
    Omit<AvatarProps, "style"> & { style?: React.CSSProperties }
  >[];
  className?: string;
}

function AvatarGroup({ children, className }: AvatarGroupProps) {
  return (
    <div className={cn("flex -space-x-2 *:ring-1 *:ring-white", className)}>
      {children.map((avatar, index) =>
        cloneElement(avatar, {
          key: index,
          style: { zIndex: children.length - index },
        })
      )}
    </div>
  );
}

export default AvatarGroup;
