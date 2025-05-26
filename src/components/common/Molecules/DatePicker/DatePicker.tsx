import React, { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import CalendarIcon from "@/assets/svg/common/calendar.svg";
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
  setDate: Dispatch<SetStateAction<Date | undefined>> | ((date: Date) => void);
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
            "!gap-[6px] !rounded-radius-admin justify-start text-left text-body2-normal-regular py-0 px-[12px] hover:bg-line-normal-normal/light-hover focus:bg-line-normal-normal/light-focus active:bg-line-normal-normal",
            !date && "text-muted-foreground",
            sizeStyle[size],
            pickerClassName
          )}
          disabled={disable}
        >
          <CalendarIcon className="!size-[20px] text-label-normal" />
          <span className="text-line-normal-neutral">|</span>
          {date ? (
            <span className="text-label-normal text-body2-normal-regular">
              {koFormat(date)}
            </span>
          ) : (
            <span className="text-label-normal text-body2-normal-regular">
              {koFormat(new Date())}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date === undefined ? new Date() : date} // Calendar최초 로드시 초기 값은 undefined이기 때문에 오늘날짜로 초기화
          autoFocus
          onSelect={setDate}
          required
        />
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
