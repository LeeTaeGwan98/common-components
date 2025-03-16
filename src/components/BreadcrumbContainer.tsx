import { ReactNode } from "react";
import Divider from "@/components/common/Atoms/Divider/Divider";

interface BreadcrumbContainerProps {
  breadcrumbNode: ReactNode;
  children: ReactNode;
}

function BreadcrumbContainer({
  breadcrumbNode,
  children,
}: BreadcrumbContainerProps) {
  return (
    <div className="w-full px-[48px] pt-[64px] pb-[48px]">
      <div className="flex items-center text-heading3-bold text-label-normal">
        북카롱
        <Divider vertical className="h-[20px] mx-[12px]" />
        {breadcrumbNode}
      </div>
      <Divider className="mt-[12px] mb-[32px]" />
      {children}
    </div>
  );
}

export default BreadcrumbContainer;
