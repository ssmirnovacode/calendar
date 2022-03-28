import { getMonthsToRender, getNextMonthYear, getPrevMonthYear, getShortDateString } from "../utils/helpers";
import Month from "./Month";
import '../sass/calendar.scss';
import { LocaleContext } from "../context/localeContext";
import { useEffect, useMemo, useState } from "react";

const Calendar = props => {

    const { numberOfMonths, arrows, startDate, endDate, onChange: setDates, locale='en-US' } = props;
    
    const initialDate = startDate ? startDate : new Date();
    const [ year, month, day ] = initialDate.toISOString().split('T')[0].split('-');

    const [ currentBox, setCurrentBox ] = useState({ month, year});

    const initialMonthsToRender = useMemo(() => getMonthsToRender(month, year, numberOfMonths), [month, year, numberOfMonths] ) ;

    const [ monthsToRender, setMonthsToRender ] = useState(initialMonthsToRender);

    useEffect(() => {
        //console.log(startDate)
    })

    const handleDaySelect = (e) => {
        const day = new Date(e.target.id);
        startDate && endDate ? setDates({ startDate: day, endDate: undefined}) :
        !startDate ? setDates(state => ({ startDate: day, endDate: state.endDate})) :
        setDates(state => ({ startDate: state.startDate, endDate: day}));
    }

    const handlePrevBtnClick = () => {
        const { month: prevMonth, year: prevYear } = getPrevMonthYear(currentBox.month, currentBox.year);
        setCurrentBox({ month: prevMonth, year: prevYear})
        setMonthsToRender(getMonthsToRender(prevMonth, prevYear, numberOfMonths));
    }

    const handleNextBtnClick = () => {
        const { month: nextMonth, year: nextYear } = getNextMonthYear(currentBox.month, currentBox.year);
        
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
                                                                    handleDaySelect={handleDaySelect}
                                                                    startDate={getShortDateString(startDate)}
                                                                    endDate={getShortDateString(endDate)}
                                                                    />)
                    }
                </div>
            </div>
        </LocaleContext.Provider>
    )
}

export default Calendar;