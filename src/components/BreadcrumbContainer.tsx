import { cloneElement, ReactElement, ReactNode } from "react";
import Divider from "@/components/common/Atoms/Divider/Divider";
import { cn } from "@/lib/utils";

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
    <div className="w-full px-[48px] pt-[64px] pb-[48px]">
      <div className="relative flex w-full justify-between">
        <div className="flex items-center text-heading3-bold text-label-normal">
          북카롱
          <Divider vertical className="h-[20px] mx-[12px]" />
          {breadcrumbNode}
        </div>
        {button &&
          cloneElement(button, {
            className: cn(
              `${button.props.className} absolute right-0 bottom-0`
            ),
          })}
      </div>
      <Divider className="mt-[12px] mb-gutter-vertical" />
      {children}
    </div>
  );
}

export default BreadcrumbContainer;
