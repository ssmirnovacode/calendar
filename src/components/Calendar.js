import { getMonthsToRender, getNextMonthYear, getPrevMonthYear } from "../utils/helpers";
import Month from "./Month";
import '../sass/calendar.scss';
import { LocaleContext } from "../context/localeContext";
import { useEffect, useMemo, useState } from "react";

const Calendar = props => {

    const locale = 'es';

    const { numberOfMonths, arrows } = props;
    
    const today = new Date();
    const [ year, month, day ] = today.toISOString().split('T')[0].split('-');

    const [ currentBox, setCurrentBox ] = useState({ month, year});

    const initialMonthsToRender = useMemo(() => getMonthsToRender(month, year, numberOfMonths), [month, year, numberOfMonths] ) ;

    const [ monthsToRender, setMonthsToRender ] = useState(initialMonthsToRender);

    const [ startDate, setStartDate ] = useState(props.startDate);
    const [ endDate, setEndDate ] = useState(props.endDate);

    useEffect(() => {
        //console.log(currentBox)
    })

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

    const handlePrevBtnClick = () => {
        const prevMonth = getPrevMonthYear(currentBox.month, currentBox.year).month;
        const prevYear = getPrevMonthYear(currentBox.month, currentBox.year).year;
        setCurrentBox({ month: prevMonth, year: prevYear})
        setMonthsToRender(getMonthsToRender(prevMonth, prevYear, numberOfMonths));
    }

    const handleNextBtnClick = () => {
        const nextMonth = getNextMonthYear(currentBox.month, currentBox.year).month;
        const nextYear = getNextMonthYear(currentBox.month, currentBox.year).year;
        
        setCurrentBox({ month: nextMonth, year: nextYear})
        setMonthsToRender(getMonthsToRender(nextMonth, nextYear, numberOfMonths));
        
    }

    const renderArrows = () => {
        if (arrows) {
            return (
                <div className="calendar__arrows">
                    <button className="calendar__arrows--prev" onClick={handlePrevBtnClick}>&#8592;</button>
                    <button className="calendar__arrows--next" onClick={handleNextBtnClick}>&#8594;</button>
                </div>
            )
        }
    }

    /// console.log('start', startDate, 'end', endDate);

    return(
        <LocaleContext.Provider value={locale}>
            <div className="calendar">
                { renderArrows() }
                <div className="calendar__body">
                    {
                        monthsToRender.map(({ month, year }) => <Month 
                                                                    key={month.toString()+year.toString()+Date.now()} 
                                                                    month={month} 
                                                                    year={year} 
                                                                    handleMonthSelect={handleMonthSelect}
                                                                    startDate={startDate}
                                                                    endDate={endDate}
                                                                    />)
                    }
                </div>
            </div>
        </LocaleContext.Provider>
    )
}

export default Calendar;