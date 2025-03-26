import { format, parse } from "date-fns";

export const dateToString = (date: Date | undefined) => {
  return !date ? format(new Date(), "yyyy-MM-dd") : format(date, "yyyy-MM-dd");
};

export const stringToDate = (dateString: string): Date => {
  return parse(dateString, "yyyy-MM-dd", new Date());
};
