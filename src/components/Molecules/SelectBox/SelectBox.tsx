import { cn } from "@/lib/utils";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReactNode } from "react";
import { SelectProps } from "@radix-ui/react-select";

interface SelectBoxProps extends SelectProps {
  label?: string;
  placeholder?: string;
  size?: "large" | "medium";
  className?: string;
  children?: ReactNode;
}

function SelectBox({
  size = "medium",
  label,
  placeholder,
  className,
  children,
  ...props
}: SelectBoxProps) {
  const sizeStyle = {
    large: "p-[12px] h-[48px]",
    medium: "py-[9px] px-[12px]",
  };
  return (
    <div className="flex flex-col gap-[4px]">
      {label && (
        <div className="text-label-1-normal font-medium text-color-alias-label-neutral">
          {label}
        </div>
      )}

      <Select {...props}>
        <SelectTrigger
          className={cn(
            "hover:border-color-alias-label-alternative w-full focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-body-1-normal data-[placeholder]:text-color-alias-label-assistive font-regular rounded-[12px] disabled:bg-color-alias-interaction-disable text-color-alias-label-normal",
            sizeStyle[size],
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        {children}
      </Select>
    </div>
  );
}

export default SelectBox;

/**
 * 사용법
  <SelectBox placeholder="placeholder">
    <SelectContent>
      <SelectGroup>
        <SelectLabel>asdf</SelectLabel>
        <SelectItem value="asdf">asdf</SelectItem>
        <SelectItem value="asdf1">asdf1</SelectItem>
        <SelectItem value="asdf2">asdf2</SelectItem>
        <SelectItem value="asdf3">asdf3</SelectItem>
        <SelectItem value="asdf4">asdf4</SelectItem>
      </SelectGroup>
    </SelectContent>
  </SelectBox>
 */
