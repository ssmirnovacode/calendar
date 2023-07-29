import { getMonthsToRender } from "../utils/helpers";
import "../css/calendar.css";
import React, { FC, useEffect, useMemo, useState } from "react";
import { initTheme } from "../utils/theme";
import { WARNING_BOTH_AVAIL_BLOCKED_DEFINED } from "../utils/constants";
import { Month, Year, assertCalendarProps } from "../types";
import { CalendarProps } from "../../calendar";
import { ArrowButtons, ArrowButtonsProps } from "./parcials/ArrowButtons";
import { DARK_THEME } from "../mockups/dark-theme";
import { CalendarContext } from "../context/calendarContext";
import { MonthContext } from "../context/monthContext";
import { MonthComponent } from "./MonthComponent";

const Calendar: FC<CalendarProps> = (props) => {
  const {
    numberOfMonths = 2,
    arrows = false,
    startDate,
    onChange: setDates,
    theme = DARK_THEME,
    clearDatesBtn = true,
    vertical = false,
    blockedDates,
    availableDates,
    disablePast = false,
  } = props;
  const initialDate: Date = startDate || new Date();

  const [, month, year]: [string, Month, Year] = initialDate
    .toLocaleDateString("es-ES")
    .split("/") as [string, Month, Year];

  const [currentBox, setCurrentBox] = useState<{ month: Month; year: Year }>({
    month,
    year,
  });

  const initialMonthsToRender = useMemo(
    () => getMonthsToRender(month, year, numberOfMonths),
    [month, year, numberOfMonths]
  );

  const [monthsToRender, setMonthsToRender] = useState<
    { month: Month; year: Year }[]
  >(initialMonthsToRender);

  useEffect(() => {
    assertCalendarProps(props);
    theme && initTheme({ ...theme, ...DARK_THEME }); // TODO create neutral default theme
    blockedDates &&
      availableDates &&
      console.warn(WARNING_BOTH_AVAIL_BLOCKED_DEFINED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrowBtnsProps: ArrowButtonsProps = {
    disablePast,
    currentBox,
    numberOfMonths,
    setCurrentBox,
    setMonthsToRender,
  };

  return (
    <CalendarContext.Provider value={props}>
      <MonthContext.Provider value={{ month, year }}>
        <div className="calendar" data-testid="calendar">
          {arrows && !vertical ? <ArrowButtons {...arrowBtnsProps} /> : null}
          <div
            className={vertical ? "calendar__body vertical" : "calendar__body"}
          >
            {monthsToRender.map(({ month, year }) => (
              <MonthComponent
                key={month.toString() + year.toString() + Date.now()}
              />
            ))}
          </div>
          <div className="calendar__footer">
            {clearDatesBtn && (
              <button
                className="calendar__footer--btn"
                data-testid="clear-btn"
                onClick={() =>
                  setDates({ startDate: undefined, endDate: undefined })
                }
              >
                <span>&times;</span> Clear dates
              </button>
            )}
          </div>
        </div>
      </MonthContext.Provider>
    </CalendarContext.Provider>
  );
};

export default Calendar;
