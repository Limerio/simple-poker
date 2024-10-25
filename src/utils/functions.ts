import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const shuffle = <T>(array: T[]) => {
  let currentIndex;
  for (currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    const randIndex = Math.floor(Math.random() * (currentIndex + 1));
    const temp = array[currentIndex];
    array[currentIndex] = array[randIndex];
    array[randIndex] = temp;
  }
  return array;
};

export const cn = (...classes: string[]) => clsx(twMerge(classes));
