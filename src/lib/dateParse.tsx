import { format, parse, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import React from "react";

export const dateToString = (date: Date | undefined) => {
  return !date ? format(new Date(), "yyyy-MM-dd") : format(date, "yyyy-MM-dd");
};

export const stringToDate = (dateString?: string): Date | undefined => {
  if (!dateString) {
    // calendar UI에서 최초 값은 undefined이기 때문에 예외처리
    return undefined;
  }

  return parse(dateString, "yyyy-MM-dd", new Date());
};

//iso형식 날짜 문자열을 Date로 변경
export const isoStringToDate = (dateString: string): Date | undefined => {
  // ISO 문자열을 Date 객체로 변환
  const date = parseISO(dateString);

  // 9시간을 빼서 한국 시간(KST)으로 변환
  date.setHours(date.getHours() - 9);

  return date;
};

//iso형식 날짜 문자열을 'yyy-MM-dd'날짜 문자열로 변경
export const isoStringToDateString = (
  dateString?: string,
  type?: "yyyy-MM-dd HH:mm:ss" | "yyyy-MM-dd"
) => {
  if (dateString == null) return;
  // ISO 문자열을 Date 객체로 변환
  const date = parseISO(dateString);

  // 9시간을 빼서 한국 시간(KST)으로 변환
  date.setHours(date.getHours() - 9);

  // "yyyy-MM-dd HH:mm:ss" 형식으로 포맷
  const formattedDate = format(date, type ?? "yyyy-MM-dd");

  return formattedDate;
};

export const formatDateTimeToJSX = (dateString: string) => {
  const [date, time] = dateString.split(" ");

  return (
    <div>
      <span>{date}</span>
      <br />
      <span>{time}</span>
    </div>
  );
};

/**
 * UTC 기준으로 날짜를 포맷팅하는 함수
 * @param date
 * @param formatStr
 * @returns
 */
export function formatToUTCString(
  date: Date | string,
  formatStr: string = "yyyy-MM-dd HH:mm:ss"
): string {
  if (!date) return "";
  return formatInTimeZone(date, "UTC", formatStr);
}

//{formatDateTimeToJSX(formatToUTCString(item.withdrawalDay))}
//{formatToUTCString(item.inquiryAt)}
