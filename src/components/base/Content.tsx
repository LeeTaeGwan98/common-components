import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentProps {
  children: ReactNode;
}

function Content({ children }: ContentProps) {
  return <div className={cn("h-svh")}>{children}</div>;
}

export default Content;
