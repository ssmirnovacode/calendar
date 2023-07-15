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
import React, { useEffect, useMemo, useState } from "react";
import { initTheme } from "../utils/theme";
import { WARNING_BOTH_AVAIL_BLOCKED_DEFINED } from "../utils/constants";
import { Month, SelectedDates, Theme, Year } from "../types";

type CalendarProps = {
  numberOfMonths?: number;
  arrows?: boolean;
  startDate?: Date;
  endDate?: Date;
  onChange: (dates: SelectedDates) => void; // TODO - check singleDate funcitonality
  locale?: string; // TODO: add valid list
  theme: Theme;
  clearDatesBtn?: boolean;
  vertical?: boolean;
  blockedDates: string[]; // to keep undefined as default
  availableDates: string[];
  weekendsBlocked?: boolean;
  weekendsStyled?: boolean;
  captions: object; // TODO - switch to array of objects
  singleDate?: boolean;
  disablePast?: boolean;
};

const Calendar = (props: CalendarProps) => {
  const {
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
  } = props;

  const initialDate: Date = startDate || new Date();
  const [day, month, year]: [string, Month, Year] = initialDate
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

  const handleDaySelect = (e: { target: { id: string } }) => {
    const day: Date = new Date(e.target.id);
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

  const handlePrevBtnClick = () => {
    const { month: prevMonth, year: prevYear } = getPrevMonthYear(
      currentBox.month,
      currentBox.year
    ) as { month: Month; year: Year };
    setCurrentBox({ month: prevMonth, year: prevYear });
    setMonthsToRender(getMonthsToRender(prevMonth, prevYear, numberOfMonths));
  };

  const handleNextBtnClick = () => {
    const { month: nextMonth, year: nextYear } = getNextMonthYear(
      currentBox.month,
      currentBox.year
    ) as { month: Month; year: Year };

    setCurrentBox({ month: nextMonth, year: nextYear });
    setMonthsToRender(getMonthsToRender(nextMonth, nextYear, numberOfMonths));
  };

  const renderArrows = () => {
    if (arrows && !vertical) {
      return (
        <div className="calendar__arrows" data-testid="arrows">
          {(!disablePast ||
            +currentBox.month !== new Date().getMonth() + 1) && (
            <button
              className="calendar__arrows--prev"
              data-testid="prev"
              onClick={handlePrevBtnClick}
            >
              &#8592;
            </button>
          )}
          <button
            className="calendar__arrows--next"
            data-testid="next"
            onClick={handleNextBtnClick}
          >
            &#8594;
          </button>
        </div>
      );
    }
  };

  return (
    <LocaleContext.Provider value={locale}>
      <BlockedContext.Provider
        value={availableDates ? undefined : blockedDates}
      >
        <CaptionsContext.Provider value={captions}>
          <div className="calendar" data-testid="calendar">
            {renderArrows()}
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
