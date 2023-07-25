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

export type Year = string & { __numericStringBrand: never };

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
