import { cn } from "@/lib/utils";

interface SubListProps {
  className?: string;
  children: string;
}

function SubList({ children, className }: SubListProps) {
  const interactiveTypeStyle =
    "hover:bg-color-alias-label-neutral/light-hover focus:bg-color-alias-label-neutral/light-focus active:bg-color-alias-label-neutral/light-active";
  return (
    <li
      className={cn(
        "rounded-[5px] pl-[32px] py-[9px] text-color-alias-label-neutral text-label-1-normal font-medium",
        interactiveTypeStyle,
        className
      )}
    >
      {children}
    </li>
  );
}

export default SubList;
