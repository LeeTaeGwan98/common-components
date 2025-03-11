import React, { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import CalendarIcon from "@/assets/svg/calendar.svg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  size?: "large" | "small";
  disable?: boolean;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  pickerClassName?: string;
}

function DatePicker({
  size = "large",
  disable = false,
  date,
  setDate,
  pickerClassName,
  ...props
}: DatePickerProps) {
  const koFormat = (date: Date) => format(date, "yyyy.MM.dd", { locale: ko });
  const sizeStyle = {
    large: "h-[50px]",
    small: "h-[42px]",
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-regular py-0 px-[12px] hover:bg-color-alias-line-normal-normal/light-hover focus:bg-color-alias-line-normal-normal/light-focus active:bg-color-alias-line-normal-normal",
            !date && "text-muted-foreground",
            sizeStyle[size],
            pickerClassName
          )}
          disabled={disable}
        >
          <CalendarIcon className="size-[20px]" />
          <span className="text-color-alias-line-normal-neutral">|</span>
          {date ? (
            <span className="text-color-alias-label-normal text-body-2-normal">
              {koFormat(date)}
            </span>
          ) : (
            <span className="text-color-alias-label-normal text-body-2-normal">
              {koFormat(new Date())}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} autoFocus onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;

/**
 * Todo: setDate를 직접 받지않고 ...props로 Calendar컴포넌트로 넘겨주기
 * Calendar 스타일 커스텀하는 방법 찾아보기
 * 오늘 날짜 밑에 "오늘" 텍스트 넣기
 * ...props 누구한테 줘야하지
 */
