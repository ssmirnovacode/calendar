import {
  getDaysArray,
  getMonthMatrix,
  getMonthByLocale,
  getWeekdaysByLocale,
  getDateString,
  isWeekend,
  isPast,
} from "../utils/helpers";
import "../css/month.css";
import React, { useContext } from "react";
import { LocaleContext } from "../context/localeContext";
import { BlockedContext } from "../context/blockedContext";
import { CaptionsContext } from "../context/captionsContext";
import { Month, Year } from "../types";

type MonthProps = {
  month: Month;
  year: Year;
  startDate?: string;
  endDate?: string;
  handleDaySelect: (e: { target: { id: string } }) => void;
  weekendsBlocked: boolean;
  weekendsStyled: boolean;
  availableDates?: string[];
  disablePast: boolean;
};

export const MonthComponent = (props: MonthProps) => {
  const {
    month,
    year,
    startDate,
    endDate,
    weekendsBlocked,
    weekendsStyled,
    availableDates,
    disablePast,
  } = props;
  const locale = useContext(LocaleContext);
  const blockedDates = useContext(BlockedContext);
  const captions = useContext(CaptionsContext);

  const daysArray = getDaysArray(month, year);

  const monthMatrix = getMonthMatrix(daysArray);

  const weekdays = getWeekdaysByLocale(monthMatrix[1], month, year, locale);

  const getTableCellClass = (week, day, j) => {
    let classes = captions ? "table__td with_captions" : "table__td";

    const currentDateString = getDateString(year, month, day);

    if (disablePast && isPast(currentDateString)) {
      classes += " blocked";
    }
    if (
      (week.indexOf(1) > j && monthMatrix.indexOf(week) === 0) ||
      (day < 7 && monthMatrix.indexOf(week) === monthMatrix.length - 1)
    ) {
      classes += " hidden";
    } else if (
      (!availableDates &&
        blockedDates &&
        blockedDates.includes(currentDateString)) ||
      (weekendsBlocked && isWeekend(currentDateString)) ||
      (!blockedDates &&
        availableDates &&
        !availableDates.includes(currentDateString))
    ) {
      classes += " blocked";
    } else if (
      startDate === currentDateString ||
      endDate === currentDateString
    ) {
      classes += " selected";
    } else if (currentDateString > startDate && currentDateString < endDate) {
      classes += " between";
    } else if (weekendsStyled && isWeekend(currentDateString)) {
      classes += " weekend";
    }
    return classes;
  };

  const getDayContent = (day) =>
    captions && captions[getDateString(year, month, day)] ? (
      <>
        {day}{" "}
        <div className="caption">
          {captions[getDateString(year, month, day)]}
        </div>
      </>
    ) : captions && !captions[getDateString(year, month, day)] ? (
      <>
        {day} <div className="caption"></div>
      </>
    ) : (
      day
    );

  return (
    <div className="month" title="month" data-testid={`month-${month}`}>
      <div className="month__header">
        <span>{getMonthByLocale(month, year, locale)}</span> <span>{year}</span>
      </div>
      <table className="table">
        <thead className="table__header">
          <tr>
            {weekdays.map((wd) => (
              <th key={wd}>{wd}</th>
            ))}
          </tr>
        </thead>

        <tbody className="table__body">
          {monthMatrix.map((week, i) => {
            return (
              <tr key={week + i}>
                {week.map((day, j) => (
                  <td
                    className={getTableCellClass(week, day, j)}
                    data-testid={`day-${day}.${month}`}
                    id={getDateString(year, month, day)}
                    key={month + day + year}
                    onClick={
                      getTableCellClass(week, day, j).indexOf("hidden") > 0 ||
                      getTableCellClass(week, day, j).indexOf("blocked") > 0
                        ? () => {}
                        : props.handleDaySelect
                    }
                  >
                    {getTableCellClass(week, day, j).indexOf("hidden") > 0
                      ? ""
                      : getDayContent(day)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
