/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from "react";
import Calendar from "./components/Calendar";
import { DARK_THEME as THEME } from "./mockups/dark-theme";
import { CAPTIONS } from "./mockups/captions";
import { SelectedDates } from "./types";

const App: FC = () => {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: new Date(2023, 6, 18),
    endDate: new Date(),
  });

  //const [date, setDate] = useState(new Date());

  const LOCALE = "es-ES";

  const BLOCKED_DATES = [
    "2023-08-14",
    "2023-08-15",
    " 2023-08-16",
    "2023-09-17",
    "2023-09-01",
    "2023-09-02",
  ];

  const AVAILABLE_DAYS = [
    "2023-08-14",
    "2023-08-15",
    " 2023-08-16",
    "2023-09-17",
    "2023-09-01",
    "2023-09-02",
  ];

  return (
    <>
      {/* <div>Start: {selectedDates.startDate?.toISOString()} </div>
        <div>End: {selectedDates.endDate?.toISOString()} </div> */}

      {/* <div>{date?.toDateString()}</div> */}

      <Calendar
        numberOfMonths={2}
        arrows={true}
        //startDate={date}
        //startDate={selectedDates.startDate}
        //singleDate
        //endDate={selectedDates.endDate}
        //onChange={setDate}
        onChange={setSelectedDates}
        locale={LOCALE}
        theme={THEME}
        clearDatesBtn
        blockedDates={BLOCKED_DATES}
        //availableDates={AVAILABLE_DAYS}
        weekendsBlocked
        disablePast={true}
        // weekendsStyled
        //vertical
        captions={CAPTIONS}
      />
    </>
  );
};

export default App;
