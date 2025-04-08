import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface DropDownMenuProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

function DropDownMenu({ className, children }: DropDownMenuProps) {
  return (
    <div
      className={cn(
        "w-[100px] shadow-style-alias-shadow-emphasize rounded-[4px] overflow-clip",
        className
      )}
    >
      <div>{children}</div>
    </div>
  );
}

export default DropDownMenu;
