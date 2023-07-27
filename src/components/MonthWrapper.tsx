import {
  getDaysArray,
  getMonthMatrix,
  getMonthByLocale,
  getWeekdaysByLocale,
} from "../utils/helpers";
import "../css/month.css";
import React, { FC, useContext } from "react";
import { MonthComponent } from "./MonthComponent";
import { CalendarContext } from "../context/calendarContext";
import { MonthContext } from "../context/monthContext";

export const MonthWrapper: FC = () => {
  const { locale } = useContext(CalendarContext)!; // TODO - verify if defined
  const { month, year } = useContext(MonthContext)!;

  const monthMatrix = getMonthMatrix(getDaysArray(month, year));
  const weekdays = getWeekdaysByLocale(monthMatrix[1]!, month, year, locale); // add typing monthMatrix[1] to avoid !

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
          <MonthComponent />
        </tbody>
      </table>
    </div>
  );
};
