import { CalendarProps } from "../../calendar";
import { Month, Resolve, Year } from "../types";
import { getDateString, isPast, isWeekend } from "./helpers";

type TableCellsClassProps = Resolve<
  Omit<CalendarProps, "startDate" | "endDate" | "onChange"> & {
    startDate: string | undefined;
    endDate: string | undefined;
    monthMatrix: string[][];
    week: string[];
    month: Month;
    year: Year;
    day: number;
    j: number;
  }
>;

export const getTableCellClass = ({
  availableDates,
  blockedDates,
  captions,
  day,
  disablePast,
  endDate,
  j,
  monthMatrix,
  month,
  startDate,
  year,
  week,
  weekendsBlocked,
  weekendsStyled,
}: TableCellsClassProps) => {
  let classes = captions ? "table__td with_captions" : "table__td";

  const currentDateString = getDateString(+year, +month, day);

  if (disablePast && isPast(currentDateString)) {
    classes += " blocked";
  }
  if (
    (week.indexOf("1") > j && monthMatrix.indexOf(week) === 0) ||
    (day < 7 && monthMatrix.indexOf(week) === monthMatrix.length - 1)
  ) {
    classes += " hidden";
  } else if (
    (!availableDates &&
      blockedDates &&
      blockedDates?.includes(currentDateString)) ||
    (weekendsBlocked && isWeekend(currentDateString)) ||
    (!blockedDates &&
      availableDates &&
      !availableDates.includes(currentDateString))
  ) {
    classes += " blocked";
  } else if (
    (startDate && startDate === currentDateString) ||
    (endDate && endDate === currentDateString)
  ) {
    classes += " selected";
  } else if (
    startDate &&
    endDate &&
    currentDateString > startDate &&
    currentDateString < endDate
  ) {
    classes += " between";
  } else if (weekendsStyled && isWeekend(currentDateString)) {
    classes += " weekend";
  }
  return classes;
};
