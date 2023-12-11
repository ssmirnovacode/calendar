import React, { FC } from "react";
import { Month, Year } from "../../types";
import {
  getMonthsToRender,
  getNextMonthYear,
  getPrevMonthYear,
} from "../../utils/helpers";

export type ArrowButtonsProps = {
  disablePast: boolean;
  currentBox: { month: Month; year: Year };
  numberOfMonths: number;
  setCurrentBox: (box: { month: Month; year: Year }) => void;
  setMonthsToRender: (months: { month: Month; year: Year }[]) => void;
};

export const ArrowButtons: FC<ArrowButtonsProps> = ({
  disablePast,
  currentBox,
  numberOfMonths,
  setCurrentBox,
  setMonthsToRender,
}) => {
  const handlePrevBtnClick = () => {
    const { month: prevMonth, year: prevYear } = getPrevMonthYear(
      currentBox.month,
      currentBox.year
    );
    setCurrentBox({ month: prevMonth, year: prevYear });
    setMonthsToRender(getMonthsToRender(prevMonth, prevYear, numberOfMonths));
  };

  const handleNextBtnClick = () => {
    const { month: nextMonth, year: nextYear } = getNextMonthYear(
      currentBox.month,
      currentBox.year
    );

    setCurrentBox({ month: nextMonth, year: nextYear });
    setMonthsToRender(getMonthsToRender(nextMonth, nextYear, numberOfMonths));
  };

  return (
    <div className="calendar__arrows" data-testid="arrows">
      {!disablePast && (
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
};
