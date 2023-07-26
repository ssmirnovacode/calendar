import React, { useContext } from "react";
import { Month, Year } from "../types";
import { getDateString } from "../utils/helpers";
import { CalendarContext } from "../context/calendarContext";

type DayProps = {
  dayClass: string;
  day: string;
  month: Month;
  year: Year;
  handleDaySelect: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Day: React.FC<DayProps> = ({
  dayClass,
  day,
  month,
  year,
  handleDaySelect,
}) => {
  const { captions } = useContext(CalendarContext)!;
  const getDayContent = (day: number) => {
    const dateString = getDateString(+year, +month, day);
    if (!captions) return day;
    return captions[dateString] ? (
      <>
        {day} <div className="caption">{captions[dateString]}</div>
      </>
    ) : (
      <>
        {day} <div className="caption"></div>
      </>
    );
  };

  return (
    <td
      className={dayClass}
      data-testid={`day-${day}.${month}`}
      id={getDateString(+year, +month, +day)}
      key={month + day + year}
      onClick={
        dayClass.indexOf("hidden") > 0 || dayClass.indexOf("blocked") > 0
          ? () => {}
          : (e) => handleDaySelect(e)
      }
    >
      {dayClass.indexOf("hidden") > 0 ? "" : getDayContent(+day)}
    </td>
  );
};
