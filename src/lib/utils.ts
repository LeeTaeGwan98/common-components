import { extendTailwindMerge } from "tailwind-merge";
import typography from "@/styles/typography";
import clsx, { ClassValue } from "clsx";

const customTwMerge = extendTailwindMerge({
  override: {
    classGroups: {
      "font-size": Object.keys(typography).map((key) => `text-${key}`),
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(...inputs));
};
