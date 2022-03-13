import { getMonthsToRender } from "../utils/helpers";
import Month from "./Month";
import '../sass/calendar.scss';
import { LocaleContext } from "../context/localeContext";
import { useState } from "react";

const Calendar = props => {

    const locale = 'es';

    const { numberOfMonths } = props;
    
    const today = new Date();
    const [ year, month, day ] = today.toISOString().split('T')[0].split('-');

    const monthsToRender = getMonthsToRender(month, year, numberOfMonths);

    const [ startDate, setStartDate ] = useState(props.startDate);
    const [ endDate, setEndDate ] = useState(props.endDate)

    const handleMonthSelect = (e) => {
        const dayStr = e.target.id;
        if (startDate && endDate) {
            setStartDate(dayStr); 
            setEndDate('');
        }
        else if (!startDate) {
            setStartDate(dayStr)
        }
        else setEndDate(dayStr);
        
    }

    console.log('start', startDate, 'end', endDate)
    return(
        <LocaleContext.Provider value={locale}>
            <div className="calendar">
                {
                    monthsToRender.map(({ month, year }) => <Month 
                                                                key={month+year} 
                                                                month={month} 
                                                                year={year} 
                                                                handleMonthSelect={handleMonthSelect}
                                                                startDate={startDate}
                                                                endDate={endDate}
                                                                />)
                }
            </div>
        </LocaleContext.Provider>
    )
}

export default Calendar;