import { createContext } from "react";
import { CalendarProps } from "../../calendar";
import { DARK_THEME } from "../mockups/dark-theme";

export const CalendarContext = createContext<CalendarProps>({
  numberOfMonths: 2,
  arrows: false,
  startDate: undefined,
  endDate: undefined,
  onChange: ({}) => {},
  theme: DARK_THEME,
  clearDatesBtn: true,
  vertical: false,
  blockedDates: undefined,
  availableDates: [],
  disablePast: false,
});
