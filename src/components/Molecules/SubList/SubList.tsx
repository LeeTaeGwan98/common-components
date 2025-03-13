import { cn } from "@/lib/utils";

interface SubListProps {
  className?: string;
  children: string;
}

function SubList({ children, className }: SubListProps) {
  const interactiveTypeStyle =
    "hover:bg-label-neutral/light-hover focus:bg-label-neutral/light-focus active:bg-label-neutral/light-active";
  return (
    <li
      className={cn(
        "rounded-[5px] pl-[32px] py-[9px] text-label-neutral text-label1-normal-medium",
        interactiveTypeStyle,
        className
      )}
    >
      {children}
    </li>
  );
}

export default SubList;
