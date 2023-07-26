import { createContext } from "react";
import { CalendarProps } from "../../calendar";

export const CalendarContext = createContext<CalendarProps | undefined>(
  undefined
);
