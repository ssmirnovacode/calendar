import React, { useContext } from "react";
import {
  getDaysArray,
  getMonthByLocale,
  getMonthMatrix,
  getShortDateString,
  getWeekdaysByLocale,
  isSameDay,
} from "../utils/helpers";
import { CalendarContext } from "../context/calendarContext";
import { Day } from "./Day";
import { MonthContext } from "../context/monthContext";
import { getTableCellClass } from "../utils/utils";

export const MonthComponent: React.FC = () => {
  const calendarProps = useContext(CalendarContext);
  const { month, year } = useContext(MonthContext);
  const {
    endDate,
    locale,
    onChange: setDates,
    startDate,
    singleDate,
  } = calendarProps!; // TODO - check if it is ok

  const monthMatrix = getMonthMatrix(getDaysArray(month, year));
  const weekdays = getWeekdaysByLocale(monthMatrix[1]!, month, year, locale);

  const getDayClass = (week: string[], day: number, j: number) =>
    getTableCellClass({
      ...calendarProps,
      startDate: startDate && getShortDateString(startDate),
      endDate: endDate && getShortDateString(endDate),
      monthMatrix,
      month,
      year,
      week,
      day: +day,
      j,
    });

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
    else {
      setDates({ startDate: day, endDate: undefined });
      console.log("change", { startDate: day, endDate: undefined });
    }
  };

  const renderMonth = (week: string[]) =>
    week.map((day, j) => {
      const dayClass = getDayClass(week, +day, j);
      const props = { dayClass, day, month, year, handleDaySelect };
      return <Day key={day + j} {...props} />;
    });

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
              <tr key={week.reduce((a, b) => a + b) + i}>
                {renderMonth(week)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
