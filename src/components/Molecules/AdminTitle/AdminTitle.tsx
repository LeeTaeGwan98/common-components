import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DownIcon from "@/assets/svg/common/down.svg";
import Divider from "@/components/Atoms/Divider/Divider";
import { cn } from "@/lib/utils";

interface AdminTitleProps {
  size?: "large" | "small";
  title?: string;
  isButton?: boolean;
  isDivider?: boolean;
  popoverContent?: React.ReactElement<typeof PopoverContent>;
}

function AdminTitle({
  title,
  size = "large",
  isButton = false,
  isDivider = true,
  popoverContent,
}: AdminTitleProps) {
  const sizeTitleStyle = {
    title: {
      large: "text-heading3-bold",
      small: "text-heading5-bold",
    },
    checkBox: {
      large: "size-[32px]",
      small: "size-[28px]",
    },
    icon: {
      large: "size-[18px]",
      small: "size-[16px]",
    },
    divider: {
      large: "h-[20px]",
      small: "h-[16px]",
    },
  };

  return (
    <div className="flex items-center gap-[8px]">
      <span className={cn(sizeTitleStyle.title[size])}>{title}</span>
      {isButton && (
        <Popover>
          <PopoverTrigger
            className={cn(
              "border-[1px] border-line-normal-normal rounded-radius-admin flex items-center justify-center",
              sizeTitleStyle.checkBox[size]
            )}
          >
            <DownIcon className={cn(sizeTitleStyle.icon[size])} />
          </PopoverTrigger>
          {popoverContent}
        </Popover>
      )}
      {isDivider && (
        <Divider
          vertical={true}
          className={cn("ml-[4px]", sizeTitleStyle.divider[size])}
        />
      )}
    </div>
  );
}

export default AdminTitle;
/**
 * 사용방법
 * import { PopoverContent } from "@/components/ui/popover";
 * <AdminTitle
        title="asdf"
        size="large"
        isButton
        popoverContent={
          <PopoverContent>
            <div>asdf</div>
          </PopoverContent>
        }
      />
 */
