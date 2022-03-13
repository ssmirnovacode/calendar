import { getDaysArray,  getMonthMatrix, getFullDateByLocale, addZeroToStart, getMonthByLocale, getWeekdaysByLocale, getDateString } from "../utils/helpers";
import '../sass/month.scss';
import { useContext } from "react";
import { LocaleContext } from "../context/localeContext";

const Month = props => {

    const { month, year } = props;
    const locale = useContext(LocaleContext);

    const daysArray = getDaysArray(month, year);

    const monthMatrix = getMonthMatrix(daysArray);

    const weekdays = getWeekdaysByLocale(monthMatrix[1], month, year, locale)

    const getTableCellClass = (week, day, j) => {
        let classes = 'table__td';

        if (week.indexOf(1) > j && monthMatrix.indexOf(week) === 0 ||
        day < 7 && monthMatrix.indexOf(week) === monthMatrix.length-1) {
           classes += ' disabled' 
        }
        if (props.startDate === getDateString(year, month, day) || props.endDate === getDateString(year, month, day)) {
            classes += ' selected';
        }
        return classes;
    }

    return(
        <div className="month">
            <div className="month__header">
                { getMonthByLocale(month, year, locale)}
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
                                                            onClick={props.handleMonthSelect}
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