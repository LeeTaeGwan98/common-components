import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface TabItemType {
  title: string;
  value: string;
}

interface TabsProps {
  variant?: "filled" | "fixed";
  items: TabItemType[];
  currentItem: string | number;
  onClick: Dispatch<SetStateAction<string>>;
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
        "flex border-b-[1px] border-b-line-normal-normal transition-all duration-300",
        className
      )}
    >
      {items.map((item) => {
        return (
          <Tabs.TabItem
            key={item.value}
            item={item}
            variant={variant}
            onClick={() => onClick(item.value)}
            currentItem={currentItem}
            tableItemClassName={tableItemClassName}
          />
        );
      })}
    </div>
  );
}

type TabItemProps = Omit<TabsProps, "className" | "items"> & {
  item: TabItemType;
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
    "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[2px] after:bg-primary-normal text-primary-normal":
      currentItem === item.value,
  };
  const interactiveTypeStyle =
    "hover:bg-label-normal/normal-hover focus:bg-label-normal/normal-focus active:bg-label-normal/normal-active";

  return (
    <button
      onClick={() => onClick(item.value)}
      className={cn(
        "py-[12px] rounded-radius-admin",
        interactiveTypeStyle,
        currentItemStyle,
        variantStyle[variant],
        tableItemClassName
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
    >
      {item.title}
    </button>
  );
}) as React.FC<TabItemProps>;
Tabs.TabItem.displayName = "TabItem";

export default Tabs;
