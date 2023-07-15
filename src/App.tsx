import React, { FC, useState } from "react";
import Calendar from "./components/Calendar";
import { DARK_THEME as THEME } from "./mockups/dark-theme.ts";
import { CAPTIONS } from "./mockups/captions.ts";
import { SelectedDates } from "./types";

const App: FC = () => {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: new Date(2022, 2, 21),
    endDate: new Date(),
  });

  const [date, setDate] = useState(new Date());

  const LOCALE = "es-ES";

  const BLOCKED_DATES = [
    "2022-04-14",
    "2022-04-15",
    " 2022-04-16",
    "2022-04-17",
    "2022-05-01",
    "2022-05-02",
  ];

  const AVAILABLE_DAYS = [
    "2022-06-14",
    "2022-06-15",
    " 2022-06-16",
    "2022-06-17",
    "2022-07-01",
    "2022-07-02",
  ];

  return (
    <>
      {/* <div>Start: {selectedDates.startDate?.toISOString()} </div>
        <div>End: {selectedDates.endDate?.toISOString()} </div> */}

      <div>{date?.toDateString()}</div>

      <Calendar
        numberOfMonths={2}
        arrows={true}
        //startDate={date}
        startDate={selectedDates.startDate}
        //singleDate
        endDate={selectedDates.endDate}
        //onChange={setDate}
        onChange={setSelectedDates}
        locale={LOCALE}
        theme={THEME}
        clearDatesBtn
        blockedDates={BLOCKED_DATES}
        availableDates={AVAILABLE_DAYS}
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
