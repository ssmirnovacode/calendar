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
