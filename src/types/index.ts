import { CalendarProps } from "../../calendar";

export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] };
export type Theme = {
  color: string;
  bgc: string;
  borderColor: string;
  hoverColor: string;
  hoverBg: string;
  selectedColor: string;
  selectedBg: string;
  betweenColor: string;
  betweenBg: string;
  hiddenColor: string;
  hiddenBg: string;
  blockedColor: string;
  blockedBg: string;
  weekendColor: string;
  weekendBg: string;
  danger: string;
  fontFamily: string;
  fz: string;
  maxWidth: string;
  padding: string;
  gap: string;
};

export type SelectedDates = {
  startDate?: Date;
  endDate?: Date;
};

export type Month =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

export type Year = `${number}`;

export type MonthProps = {
  month: Month;
  year: Year;
};

// type predicates
export function isMonth(month: string): month is Month {
  return [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ].includes(month);
}

export function isYear(year: string): year is Year {
  return /^\d+$/.test(year);
}

export function areCalendarPropsValid(value: any): value is CalendarProps {
  let isValid = true;
  if (typeof value !== "object" || value === null) {
    console.warn(
      "INVALID PROPS: No properties were passed to <Calendar /> component"
    );
    isValid = false;
  }
  // Check each property using the individual type predicate functions
  if (value.numberOfMonths && typeof value.numberOfMonths !== "number") {
    console.warn("INVALID PROPS: numberOfMonths must be numeric");
    isValid = false;
  }

  if (value.arrows && typeof value.arrows !== "boolean") {
    console.warn("INVALID PROPS: arrows must be boolean");
    isValid = false;
  }

  if (value.startDate && !(value.startDate instanceof Date)) {
    console.warn("INVALID PROPS: startDate must be an instance of Date");
    isValid = false;
  }

  if (value.endDate && !(value.endDate instanceof Date)) {
    console.warn("INVALID PROPS: endDate must be an instance of Date");
    isValid = false;
  }

  if (typeof value.onChange !== "function") {
    // TODO specify further
    console.warn("INVALID PROPS: onChange must be a function");
    // TODO add params validation
    isValid = false;
  }

  if (value.locale && typeof value.locale !== "string") {
    // TODO get locale list, check invalid locale
    console.warn("INVALID PROPS: locale must be a string");
    isValid = false;
  }

  if (value.theme && typeof value.theme !== "object") {
    // TODO check passing invalid keys
    console.warn(
      "INVALID PROPS: theme must be an object (check the documentation for applicable keys"
    );
    isValid = false;
  }

  if (value.clearDatesBtn && typeof value.clearDatesBtn !== "boolean") {
    console.warn("INVALID PROPS: clearDatesBtn must be a boolean");
    isValid = false;
  }

  if (value.vertical && typeof value.vertical !== "boolean") {
    console.warn("INVALID PROPS: vertical must be a boolean");
    isValid = false;
  }

  if (
    (value.blockedDates && !Array.isArray(value.blockedDates)) ||
    (Array.isArray(value.blockedDates) &&
      ((value.blockedDates.length &&
        typeof value.blockedDates[0] !== "string") ||
        isNaN(new Date(value.blockedDates[0]).getTime())))
  ) {
    console.warn(
      'INVALID PROPS: blockedDates must be an array of strings with dates formatted "YYYY-MM-DD" '
    );
    isValid = false;
  }

  if (
    (value.availableDates && !Array.isArray(value.availableDates)) ||
    (Array.isArray(value.availableDates) &&
      ((value.availableDates.length &&
        typeof value.availableDates[0] !== "string") ||
        isNaN(new Date(value.availableDates[0]).getTime())))
  ) {
    console.warn(
      'INVALID PROPS: availableDates must be an array of strings with dates formatted "YYYY-MM-DD" '
    );
    isValid = false;
  }

  if (value.weekendsBlocked && typeof value.weekendsBlocked !== "boolean") {
    console.warn("INVALID PROPS: weekendsBlocked must be a boolean");
    isValid = false;
  }

  if (value.weekendsStyled && typeof value.weekendsStyled !== "boolean") {
    console.warn("INVALID PROPS: weekendsStyled must be a boolean");
    isValid = false;
  }

  if (
    value.captions &&
    (typeof value.captions !== "object" ||
      (Object.keys(value.captions).length &&
        typeof Object.keys(value.captions)[0] !== "string"))
  ) {
    console.warn(
      'INVALID PROPS: captions must be an object with keys formatted "YYYY-MM-DD" '
    );
    isValid = false;
  }

  if (value.singleDate && typeof value.singleDate !== "boolean") {
    console.warn("INVALID PROPS: singleDate must be a boolean");
    isValid = false;
  }

  if (value.disablePast && typeof value.disablePast !== "boolean") {
    console.warn("INVALID PROPS: disablePast must be a boolean");
    isValid = false;
  }

  if (!value.singleDate && (!value.startDate || !value.endDate)) {
    console.warn(
      "INVALID PROPS: You need to specify startDate and endDate props (only startDate in case of singleDate=true)"
    );
    isValid = false;
  }

  return isValid;
}

// type assertions
export function assertMonth(month: string): asserts month is Month {
  if (!isMonth(month))
    throw new Error(
      "Month value is invalid (has to be a string between 1 and 12)"
    );
}

export function assertYear(year: string): asserts year is Year {
  if (!isYear(year))
    throw new Error(
      "Year value is invalid (has to be a string with numeric characters)"
    );
}

export function assertCalendarProps(
  props: any
): asserts props is CalendarProps {
  if (!areCalendarPropsValid(props))
    throw new Error(
      "Invalid props provided to the <Calendar /> component. Please review the console warnings for details and check the documentation for further guidance"
    );
}
