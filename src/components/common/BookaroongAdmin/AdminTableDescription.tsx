import { cn } from "@/lib/utils";

interface AdminTableDescriptionPops {
  className?: string;
  textClassName?: string;
  text: string;
}

function AdminTableDescription({
  text,
  className,
  textClassName,
}: AdminTableDescriptionPops) {
  return (
    <div
      className={cn(
        "justify-center max-w-[300px] text-label1-normal-regular text-label-normal whitespace-normal overflow-ellipsis line-clamp-2 break-all",
        className
      )}
      style={{ display: "flex" }}
    >
      <div className={cn("w-fit", textClassName)}>{text}</div>
    </div>
  );
}

export default AdminTableDescription;
