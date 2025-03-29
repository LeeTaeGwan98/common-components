import { format, parse } from "date-fns";

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
