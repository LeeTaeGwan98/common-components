import { cloneElement, ReactElement, ReactNode } from "react";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Button from "@/components/common/Atoms/Button/Solid/Button";

interface BreadcrumbContainerProps {
  breadcrumbNode: ReactNode;
  children: ReactNode;
  button?: ReactElement<{ className?: string }>;
}

function BreadcrumbContainer({
  breadcrumbNode,
  children,
  button,
}: BreadcrumbContainerProps) {
  return (
    <div className="w-full  px-[48px] pt-[64px] pb-[48px]">
      <div className="relative flex w-full justify-between">
        <div className="flex items-center text-heading3-bold text-label-normal">
          북카롱
          <Divider vertical className="h-[20px] mx-[12px]" />
          {breadcrumbNode}
        </div>
        {button &&
          cloneElement(button, {
            className: "absolute right-0 bottom-0",
          })}
      </div>
      <Divider className="mt-[12px] mb-[32px]" />
      {children}
    </div>
  );
}

export default BreadcrumbContainer;
