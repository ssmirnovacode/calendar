import { useState } from "react";
import Calendar from "./components/Calendar";

const App = () => {

    const [ selectedDates, setSelectedDates ] = useState({});

    const LOCALE = 'es-ES';

    const SETTINGS = {
        color: 'black',
        bgc: 'white',
        borderColor: 'grey',
        hoverColor: 'white',
        hoverBg: 'grey'
    }

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
            theme={SETTINGS}
            />
        </>
    )
};

export default App;