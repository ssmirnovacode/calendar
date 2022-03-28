import { useState } from "react";
import Calendar from "./components/Calendar";

const App = () => {

    const [ selectedDates, setSelectedDates ] = useState({ })

    return(
        <>
        <div>Start: {selectedDates.startDate?.toISOString()} </div>
        <div>End: {selectedDates.endDate?.toISOString()} </div>

        <Calendar 
            numberOfMonths={6} 
            arrows={true} 
            startDate={selectedDates.startDate} 
            endDate={selectedDates.endDate} 
            onChange={setSelectedDates} 
            />
        </>
    )
};

export default App;