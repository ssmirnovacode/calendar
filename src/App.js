import { useState } from "react";
import Calendar from "./components/Calendar";

const App = () => {

    const [ selectedDates, setSelectedDates ] = useState({});

    const LOCALE = 'es-ES'

    return(
        <>
        <div>Start: {selectedDates.startDate?.toISOString()} </div>
        <div>End: {selectedDates.endDate?.toISOString()} </div>

        <Calendar 
            numberOfMonths={2} 
            arrows={true} 
            startDate={selectedDates.startDate} 
            endDate={selectedDates.endDate} 
            onChange={setSelectedDates} 
            locale={LOCALE}
            />
        </>
    )
};

export default App;