import { cn } from "@/lib/utils";

interface AdminTableDescriptionPops {
  className?: string;
  text: string;
}

function AdminTableDescription({ text, className }: AdminTableDescriptionPops) {
  return (
    <div
      className={cn(
        "max-w-[300px] text-label1-normal-regular text-label-normal whitespace-normal overflow-ellipsis line-clamp-2",
        className
      )}
    >
      {text}
    </div>
  );
}

export default AdminTableDescription;
