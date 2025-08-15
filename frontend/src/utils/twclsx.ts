import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that combines clsx with Tailwind class merging
 * @param inputs - Class values to merge
 * @returns A string of merged class names
 */
export const twclsx = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(...inputs));
};
