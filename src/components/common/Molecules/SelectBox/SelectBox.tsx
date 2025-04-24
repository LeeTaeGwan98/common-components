import { cn } from "@/lib/utils";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReactNode } from "react";
import { SelectProps } from "@radix-ui/react-select";

interface SelectBoxProps extends SelectProps {
  label?: string;
  placeholder?: string;
  size?: "large" | "medium" | "small";
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
    small: "py-[7px] h-[32px]",
  };
  return (
    <div className="flex flex-col gap-[8px]">
      {label && (
        <div className="text-label1-normal-bold text-label-alternative">
          {label}
        </div>
      )}

      <Select {...props}>
        <SelectTrigger
          className={cn(
            "hover:border-label-alternative w-full focus:ring-0 text-body1-normal-regular focus:ring-offset-0 data-[placeholder]:text-body1-normal-regular data-[placeholder]:text-label-assistive !rounded-large-input disabled:bg-interaction-disable text-label-normal",
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
