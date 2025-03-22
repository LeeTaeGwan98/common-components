import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SIDEBAR_WIDTH } from "@/Constants/UIMagicNumber";

interface ContentProps {
  children: ReactNode;
}

function Content({ children }: ContentProps) {
  return (
    <div
      className={cn("min-h-svh overflow-hidden")}
      style={{
        width: `calc(100% - ${SIDEBAR_WIDTH})`,
        marginLeft: SIDEBAR_WIDTH,
      }}
    >
      {children}
    </div>
  );
}

export default Content;
