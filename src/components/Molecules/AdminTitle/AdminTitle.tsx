import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import Down from "@/assets/svg/down.svg";
import Divider from "@/components/Atoms/Divider/Divider";

interface ItemList {
  value: string;
  title: string;
}

interface AdminTitleProps extends SelectProps {
  size?: "large" | "small";
  divider?: boolean;
  isButton?: boolean;
  itemList?: ItemList[];
  className?: string;
}

function AdminTitle({
  size = "large",
  divider = true,
  isButton = true,
  itemList,
  className,
  ...props
}: AdminTitleProps) {
  const sizeStyle = {
    text: {
      large: "text-heading-3 font-bold",
      small: "text-heading-5 font-bold",
    },
    button: {
      large: "size-[32px] p-[7px]",
      small: "size-[28px] p-[6px]",
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
    <Select {...props}>
      <SelectTrigger
        className={cn(
          "p-0 w-fit h-fit flex gap-[8px] border-none [&>svg]:hidden text-color-alias-label-normal",
          sizeStyle.text[size]
        )}
      >
        <SelectValue placeholder="타이틀" className="" />

        {isButton && (
          <div
            className={cn(
              "rounded-radius-admin w-[32px] h-[32px] border-[1px] border-color-alias-line-normal-normal flex justify-center items-center",
              sizeStyle.button[size]
            )}
          >
            <Down className={cn(sizeStyle.icon[size])} />
          </div>
        )}

        {divider && (
          <Divider
            vertical
            className={cn("relative left-[3px]", sizeStyle.divider[size])}
          />
        )}
      </SelectTrigger>

      <SelectContent className="">
        {itemList?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default AdminTitle;
