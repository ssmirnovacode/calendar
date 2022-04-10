import { useState } from "react";
import Calendar from "./components/Calendar";
import { DARK_THEME as THEME } from "./mockups/dark-theme";
import { CAPTIONS } from "./mockups/captions";

const App = () => {

    const [ selectedDates, setSelectedDates ] = useState({
        startDate: new Date(2022, 2, 21),
        // endDate: new Date()
    });

    const LOCALE = 'es-ES';

    const BLOCKED_DATES = [ '2022-04-14', '2022-04-15',' 2022-04-16', '2022-04-17', '2022-05-01', '2022-05-02']

    return(
        <>
        {/* <div>Start: {selectedDates.startDate?.toISOString()} </div>
        <div>End: {selectedDates.endDate?.toISOString()} </div> */}

        <Calendar 
            numberOfMonths={2} 
            arrows={true} 
            startDate={selectedDates.startDate} 
            singleDate
            endDate={selectedDates.endDate} 
            onChange={setSelectedDates} 
            locale={LOCALE}
            theme={THEME}
            clearDatesBtn
            blockedDates={BLOCKED_DATES}
            //weekendsBlocked
            weekendsStyled
            //vertical
            captions={CAPTIONS}
            />
        </>
    )
};

export default App;