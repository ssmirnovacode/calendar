import { getDaysArray,  getMonthMatrix, getMonthByLocale, getWeekdaysByLocale, getDateString } from "../utils/helpers";
import '../css/month.css';
import React, { useContext } from "react";
import { LocaleContext } from "../context/localeContext";
import { BlockedContext } from "../context/blockedContext";

const Month = props => {

    const { month, year, startDate, endDate } = props;
    const locale = useContext(LocaleContext);
    const blockedDates = useContext(BlockedContext);

    const daysArray = getDaysArray(month, year);

    const monthMatrix = getMonthMatrix(daysArray);

    const weekdays = getWeekdaysByLocale(monthMatrix[1], month, year, locale)

    const getTableCellClass = (week, day, j) => {
        let classes = 'table__td';

        const currentDate = getDateString(year, month, day);

        if (week.indexOf(1) > j && monthMatrix.indexOf(week) === 0 ||
        day < 7 && monthMatrix.indexOf(week) === monthMatrix.length-1) {
           classes += ' hidden' 
        }
        else if (blockedDates.includes(currentDate)) {
            classes += ' blocked' 
        }
        else if (startDate === currentDate || endDate === currentDate) {
            classes += ' selected';
        }
        else if (currentDate > startDate && currentDate < endDate) {
            classes += ' between'
        }
        return classes;
    }


    return(
        <div className="month">
            <div className="month__header">
                 <span>{getMonthByLocale(month, year, locale)}</span> <span>{year}</span> 
            </div>
            <table className='table'>
                <thead className='table__header'>
                    <tr>
                        { weekdays.map(wd => <th key={wd}>{wd}</th>) }
                    </tr>
                </thead>

                <tbody className='table__body'>
                {
                    monthMatrix.map((week,i) => {
                        return(
                            <tr key={week+i}>
                                {
                                    week.map((day, j) => <td className={getTableCellClass(week, day, j)} 
                                                            id={getDateString(year, month, day)} 
                                                            key={month+day+year}
                                                            onClick={(getTableCellClass(week, day, j).indexOf('hidden') > 0 ||
                                                                getTableCellClass(week, day, j).indexOf('blocked') > 0) ? 
                                                                    () => {} : props.handleDaySelect}
                                                            >
                                                                {day}
                                                            </td>)
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
                
            </table>
        </div>
    )
};

export default Month;