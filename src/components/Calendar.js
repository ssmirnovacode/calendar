import { getMonthsToRender, getNextMonthYear, getPrevMonthYear, getShortDateString } from "../utils/helpers";
import Month from "./Month";
import '../css/calendar.css';
import { LocaleContext } from "../context/localeContext";
import { BlockedContext } from "../context/blockedContext";
import { CaptionsContext } from "../context/captionsContext";
import React, { useEffect, useMemo, useState } from "react";
import { initTheme } from "../utils/theme";
import { WARNING_BOTH_AVAIL_BLOCKED_DEFINED } from "../utils/constants";

const Calendar = props => {

    const { 
        numberOfMonths=2, 
        arrows=false, 
        startDate, 
        endDate, 
        onChange: setDates, 
        locale='en-US', 
        theme,
        clearDatesBtn=true,
        vertical=false,
        blockedDates, // to keep undefined as default
        availableDates,
        weekendsBlocked=false,
        weekendsStyled=false,
        captions,
        singleDate=false 
    } = props;
    
    const initialDate = startDate ? startDate : new Date();
    const [ year, month, day ] = initialDate.toISOString().split('T')[0].split('-');

    const [ currentBox, setCurrentBox ] = useState({ month, year});

    const initialMonthsToRender = useMemo(() => getMonthsToRender(month, year, numberOfMonths), [month, year, numberOfMonths] ) ;

    const [ monthsToRender, setMonthsToRender ] = useState(initialMonthsToRender);

    useEffect(() => {
        theme && initTheme(theme);
        blockedDates && availableDates && console.warn(WARNING_BOTH_AVAIL_BLOCKED_DEFINED)
    }, [])

    const handleDaySelect = (e) => {
        const day = new Date(e.target.id);
        if (!day || isNaN(day.getTime())) return;
        // if same day is chosen
        if (singleDate) {
            setDates(day);
            return
        }
        else if ( day - startDate === 0 || day - endDate === 0) {
            return
        }
        else if (startDate && !endDate) {
            startDate - day > 0 ? setDates(state => ({ startDate: day, endDate: state.startDate})) : 
            setDates(state => ({ startDate: state.startDate, endDate: day}))
        }
        else if (!startDate && endDate) {
            endDate - day > 0 ? setDates(state => ({ startDate: day, endDate: state.endDate})) : 
            setDates(state => ({ startDate: state.endDate, endDate: day}))
        }
        // either both defined or both undefined
        else setDates({ startDate: day, endDate: undefined}); 
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
        if (arrows && !vertical) {
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
            <BlockedContext.Provider value={ availableDates ? undefined : blockedDates}>
                <CaptionsContext.Provider value={captions}>
                <div className="calendar">
                    { renderArrows() }
                    <div className={ vertical? "calendar__body vertical" : "calendar__body"}>
                        {
                            monthsToRender.map(({ month, year }) => <Month 
                                                                        key={month.toString()+year.toString()+Date.now()} 
                                                                        month={month} 
                                                                        year={year} 
                                                                        availableDates={blockedDates ? undefined : availableDates}
                                                                        handleDaySelect={handleDaySelect}
                                                                        startDate={startDate && getShortDateString(startDate)}
                                                                        endDate={endDate && getShortDateString(endDate)}
                                                                        weekendsBlocked={weekendsBlocked}
                                                                        weekendsStyled={weekendsStyled}
                                                                        />)
                        }
                        
                    </div>
                    <div className="calendar__footer">
                        { clearDatesBtn &&
                            <button className="calendar__footer--btn" 
                                onClick={() => setDates({ startDate: undefined, endDate: undefined})}
                            >
                                <span>&times;</span> Clear dates
                            </button>
                        }
                        </div>
                </div>
                </CaptionsContext.Provider>
            </BlockedContext.Provider>
        </LocaleContext.Provider>
    )
}

export default Calendar;