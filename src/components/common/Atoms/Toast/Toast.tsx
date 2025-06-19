/* eslint-disable react/jsx-no-useless-fragment */
import { cn } from "@/lib/utils";
import { toast as sonnerToast } from "sonner";

interface ToastProps {
  id: string | number;
  title?: string;
  icon?: React.ReactNode;
  action?: boolean;
  className?: string;
}

export function customToast({
  title,
  icon,
  action,
  className,
}: Omit<ToastProps, "id">) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={title}
      action={action}
      icon={icon}
      className={className}
    />
  ));
}

export function Toast({ id, title, icon, action, className }: ToastProps) {
  return (
    <div
      className={cn(
        "bg-material-toast w-[312px] h-[54px] rounded-[8px] p-[16px] flex justify-between items-center text-white overflow-hidden",
        className
      )}
    >
      <div className="flex gap-[10px] items-center">
        {icon}
        <span className="flex-1">{title}</span>
      </div>
      {action && (
        <button
          className="text-inverse-primary"
          onClick={() => sonnerToast.dismiss(id)}
        >
          닫기
        </button>
      )}
    </div>
  );
}

/**
 * 사용법
 * import { customToast } from "@/components/Atoms/Toast/Toast";
      <button
        onClick={() =>
          customToast({
            title: "qtet",
            action: true,
            icon: <CheckIcon className="size-[24px]" />,
          })
        }
      >
        asdf
      </button>
 */
