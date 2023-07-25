export interface CalendarProps {
  numberOfMonths?: number;
  arrows?: boolean;
  startDate: Date | undefined; // mandatory but can be undefined
  endDate: Date | undefined;
  onChange: (dates: SelectedDates) => void; // TODO - check singleDate funcitonality  | ((date: Date) => void
  locale?: string; // TODO: add valid list
  theme: Theme;
  clearDatesBtn?: boolean;
  vertical?: boolean;
  blockedDates?: string[]; // to keep undefined as default
  availableDates?: string[];
  weekendsBlocked?: boolean;
  weekendsStyled?: boolean;
  captions?: { [key: string]: string };
  singleDate?: boolean;
  disablePast?: boolean;
}
