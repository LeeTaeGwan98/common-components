import { cn } from "@/lib/utils";

interface FloatingActionProps extends React.HTMLAttributes<HTMLDivElement> {
  disable?: boolean;
  icon: React.ReactNode;
  className?: string;
}

function FloatingAction({ disable, icon, className }: FloatingActionProps) {
  const disableStyle = {
    "bg-interaction-disable": disable,
  };
  const interactiveTypeStyle =
    "hover:brightness-hover focus:brightness-focus active:brightness-active";
  return (
    <div
      className={cn(
        "shadow-style-alias-shadow-strong w-fit bg-primary-normal rounded-full p-[16px]",
        !disable && interactiveTypeStyle,
        disableStyle,
        className
      )}
    >
      {icon}
    </div>
  );
}

export default FloatingAction;
