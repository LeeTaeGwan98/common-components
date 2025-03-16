import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentProps {
  children: ReactNode;
}

function Content({ children }: ContentProps) {
  return (
    <div className={cn("min-h-svh min-w-[calc(100%-320px)] ml-[320px]")}>
      {children}
    </div>
  );
}

export default Content;
