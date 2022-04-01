import { useState } from "react";
import Calendar from "./components/Calendar";

const App = () => {

    const [ selectedDates, setSelectedDates ] = useState({
        startDate: new Date(2022, 2, 21),
        endDate: new Date()
    });

    const LOCALE = 'es-ES';

    const FONT_COLOR = '#E9A6A6';
    const BGC = '#1F1D36';
    const BGC_OTHER = '#3F3351';
    const ACCENT_COLOR = '#864879';

    const DARK_THEME = {
        color: FONT_COLOR, 
        bgc: BGC, 
        borderColor: BGC,
        hoverColor: BGC,
        hoverBg: FONT_COLOR,
        selectedColor: BGC, 
        selectedBg: ACCENT_COLOR,
        betweenColor: FONT_COLOR,
        betweenBg: BGC_OTHER, 
        disabledColor: BGC,
        disabledBg: BGC,
        danger: ACCENT_COLOR,
        fontFamily: '"Helvetica", sans-serif',
        fz: '16px',
        maxWidth: '800px',
        padding: '2rem',
        gap: '2rem'
    }

    return(
        <>
        <div>Start: {selectedDates.startDate?.toISOString()} </div>
        <div>End: {selectedDates.endDate?.toISOString()} </div>

        <Calendar 
            numberOfMonths={4} 
            //arrows={true} 
            startDate={selectedDates.startDate} 
            endDate={selectedDates.endDate} 
            onChange={setSelectedDates} 
            //locale={LOCALE}
            theme={DARK_THEME}
            clearDatesBtn
            //vertical
            />
        </>
    )
};

export default App;