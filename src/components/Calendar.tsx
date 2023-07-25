/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getMonthsToRender,
  getNextMonthYear,
  getPrevMonthYear,
  getShortDateString,
  isSameDay,
} from "../utils/helpers";
import { MonthComponent } from "./Month";
import "../css/calendar.css";
import { LocaleContext } from "../context/localeContext";
import { BlockedContext } from "../context/blockedContext";
import { CaptionsContext } from "../context/captionsContext";
import React, { FC, useEffect, useMemo, useState } from "react";
import { initTheme } from "../utils/theme";
import { WARNING_BOTH_AVAIL_BLOCKED_DEFINED } from "../utils/constants";
import { Month, SelectedDates, Theme, Year } from "../types";
import { CalendarProps } from "../../calendar";
import { ArrowButtons, ArrowButtonsProps } from "./parcials/ArrowButtons";

const Calendar: FC<CalendarProps> = ({
  numberOfMonths = 2, // TODO - find out how to manage default props. optional?
  arrows = false,
  startDate,
  endDate,
  onChange: setDates,
  locale = "en-US",
  theme,
  clearDatesBtn = true,
  vertical = false,
  blockedDates, // to keep undefined as default
  availableDates,
  weekendsBlocked = false,
  weekendsStyled = false,
  captions,
  singleDate = false,
  disablePast = false,
}) => {
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
    theme && initTheme(theme);
    blockedDates &&
      availableDates &&
      console.warn(WARNING_BOTH_AVAIL_BLOCKED_DEFINED);
  }, []);

  const handleDaySelect = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const day: Date = new Date(target.id);
    if (!day || isNaN(day.getTime())) return;
    // if same day is chosen
    if (singleDate) {
      setDates({ startDate: day });
      return;
    } else if (
      (startDate && isSameDay(day, startDate)) || // TODO maybe allow same day choice?
      (endDate && isSameDay(day, endDate))
    ) {
      return;
    } else if (startDate && !endDate) {
      startDate.getTime() > day.getTime()
        ? setDates({ startDate: day, endDate: startDate })
        : setDates({ startDate, endDate: day });
    } else if (!startDate && endDate) {
      endDate.getTime() > day.getTime()
        ? setDates({ startDate: day, endDate })
        : setDates({ startDate: endDate, endDate: day });
    }
    // either both defined or both undefined
    else setDates({ startDate: day, endDate: undefined });
  };

  const arrowBtnsProps: ArrowButtonsProps = {
    disablePast,
    currentBox,
    numberOfMonths,
    setCurrentBox,
    setMonthsToRender,
  };

  return (
    <LocaleContext.Provider value={locale}>
      <BlockedContext.Provider value={blockedDates}>
        <CaptionsContext.Provider value={captions}>
          <div className="calendar" data-testid="calendar">
            {arrows && !vertical ? <ArrowButtons {...arrowBtnsProps} /> : null}
            <div
              className={
                vertical ? "calendar__body vertical" : "calendar__body"
              }
            >
              {monthsToRender.map(({ month, year }) => (
                <MonthComponent
                  key={month.toString() + year.toString() + Date.now()}
                  month={month}
                  year={year}
                  availableDates={blockedDates ? undefined : availableDates}
                  handleDaySelect={handleDaySelect}
                  startDate={startDate && getShortDateString(startDate)}
                  endDate={endDate && getShortDateString(endDate)}
                  weekendsBlocked={weekendsBlocked}
                  weekendsStyled={weekendsStyled}
                  disablePast={disablePast}
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
        </CaptionsContext.Provider>
      </BlockedContext.Provider>
    </LocaleContext.Provider>
  );
};

export default Calendar;
