import { useState } from "react";
import Calendar from "./components/Calendar";

const App = () => {

    const [ selectedDates, setSelectedDates ] = useState({});

    const LOCALE = 'es-ES';

    // or maybe just overriding theme.scss?.. (to be turned into just css perhaps)
    const SETTINGS = {
        color: 'black',
        bgc: 'white',
        borderColor: 'white',
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