import { Month, Year } from "../types";

export const getShortDateString = (date: Date) =>
  date && !isNaN(date.getTime()) ? date.toISOString().slice(0, 10) : undefined;

export const addZeroToStart = (str: string) =>
  !str ? undefined : +str > 9 ? str : "0" + +str;

export const getDateString = (year: number, month: number, day: number) =>
  `${year}-${addZeroToStart(month.toString())}-${addZeroToStart(
    day.toString()
  )}`;

export const getNextMonthYear = (month: Month, year: Year) =>
  +month === 12
    ? { month: "1", year: (+year + 1).toString() }
    : { month: (+month + 1).toString(), year };

export const getPrevMonthYear = (month: Month, year: Year) =>
  +month === 1
    ? { month: "12", year: (+year - 1).toString() }
    : { month: (+month - 1).toString(), year };

export const getFullDateByLocale = (dateObj: Date, locale = "en") => {
  if (!dateObj || isNaN(dateObj.getTime())) return undefined;

  return dateObj.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
//  getting weekday names for tabe header
export const getWeekdaysByLocale = (
  week: string,
  month: Month,
  year: Year,
  locale = "en"
) => {
  if (!week || week.length !== 7) return [];
  const weekdays = [];
  for (let i = 0; i < week.length; i++) {
    const date = new Date(`${year}-${month}-${week[i]}`);
    weekdays.push(date.toLocaleDateString(locale, { weekday: "short" }));
  }
  return weekdays;
};

export const getMonthByLocale = (month: Month, year: Year, locale = "en") => {
  const dateObj = new Date(`${year}-${month}-01`);
  return dateObj.toLocaleDateString(locale, { month: "long" });
};

export const getDaysInMonth = (month: Month, year: Year) =>
  new Date(+year, +month, 0).getDate();

export const getDaysArray = (month: Month, year: Year) => {
  const { month: prevMonth, year: prevYear } = getPrevMonthYear(
    month,
    year
  ) as { month: Month; year: Year };
  const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear); // getDaysInMonth(month-1, year);
  const daysInMonth = getDaysInMonth(month, year);
  const firstDayWeekday = new Date(`${year}-${month}-01`).getDay();
  const lastDayWeekday = new Date(
    `${year}-${month}-${daysInMonth.toString()}`
  ).getDay();
  const daysArray = [];
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }
  if (firstDayWeekday > 1 || firstDayWeekday === 0) {
    const diff = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;
    for (let d = daysInPrevMonth; d > daysInPrevMonth - diff; d--) {
      daysArray.unshift(d);
    }
  }
  if (lastDayWeekday !== 0) {
    const diff = 7 - lastDayWeekday;
    for (let d = 1; d <= diff; d++) {
      daysArray.push(d);
    }
  }
  return daysArray;
};

export const getMonthMatrix = (arr: string[]) => {
  if (!arr || arr.length < 28 || arr.length % 7 > 0) return [];
  const matrix = [];

  for (let i = 0; i < arr.length; i += 7) {
    const chunk = arr.slice(i, i + 7);
    matrix.push(chunk);
  }

  return matrix;
};

export const getMonthsToRender = (
  currentMonth: Month,
  currentYear: Year,
  monthsToRender: number
) => {
  if (!monthsToRender) return [];

  const monthsArr = [{ month: +currentMonth, year: +currentYear }];
  let nextMonth = currentMonth;
  let nextYear = currentYear;
  let i = 1;
  while (i < monthsToRender) {
    const { month, year } = getNextMonthYear(nextMonth, nextYear) as {
      month: Month;
      year: Year;
    };
    monthsArr.push({ month: +month, year: +year });
    nextMonth = month;
    nextYear = year;
    i++;
  }
  return monthsArr;
};

export const isWeekend = (dateString: string) =>
  new Date(dateString).getDay() === 0 || new Date(dateString).getDay() === 6
    ? true
    : false;

export const isPast = (dateString: string) =>
  getDateString(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  ) > dateString
    ? true
    : false;

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
