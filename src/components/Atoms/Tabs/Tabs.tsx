import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface TabsProps {
  variant?: "filled" | "fixed";
  items: string[] | number[];
  currentItem: string | number;
  onClick: Dispatch<SetStateAction<number | string>>;
  className?: string;
  tableItemClassName?: string;
}

function Tabs({
  variant = "filled",
  items = [],
  currentItem = 1,
  onClick,
  className,
  tableItemClassName,
}: TabsProps) {
  return (
    <div
      className={cn(
        "flex border-b-[1px] border-b-color-alias-line-normal-normal transition-all duration-300",
        className
      )}
    >
      {items.map((item) => {
        return (
          <Tabs.TabItem
            key={item}
            item={item}
            variant={variant}
            onClick={() => onClick(item)}
            currentItem={currentItem}
            tableItemClassName={tableItemClassName}
          />
        );
      })}
    </div>
  );
}

type TabItemProps = Omit<TabsProps, "className" | "items"> & {
  item: string | number;
};

Tabs.TabItem = (({
  variant = "filled",
  item,
  currentItem,
  onClick,
  tableItemClassName,
}: TabItemProps) => {
  const variantStyle = {
    filled: "flex-1",
    fixed: "w-fit p-[12px]",
  };
  const currentItemStyle = {
    "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[2px] after:bg-color-alias-primary-normal text-color-alias-primary-normal":
      currentItem === item,
  };
  const interactiveTypeStyle =
    "hover:bg-color-alias-label-normal/normal-hover focus:bg-color-alias-label-normal/normal-focus active:bg-color-alias-label-normal/normal-active";

  return (
    <button
      onClick={() => onClick(item)}
      className={cn(
        "py-[12px] rounded-radius-admin",
        interactiveTypeStyle,
        currentItemStyle,
        variantStyle[variant],
        tableItemClassName
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
    >
      {item}
    </button>
  );
}) as React.FC<TabItemProps>;
Tabs.TabItem.displayName = "TabItem";

export default Tabs;
