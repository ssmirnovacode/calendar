import { getDaysArray,  getMonthMatrix, getFullDateByLocale, addZeroToStart } from "../utils/helpers";
import { weekdays } from "../utils/weekdays";
import { months } from "../utils/months";
import '../sass/month.scss';

const Month = props => {

    const { month, year } = props;

    const daysArray = getDaysArray(month, year);

    const monthMatrix = getMonthMatrix(daysArray);

    const getTableCellClass = (week, day, j) => {
        return week.indexOf(1) > j && monthMatrix.indexOf(week) === 0 ||
        day < 7 && monthMatrix.indexOf(week) === monthMatrix.length-1 ? 
        'table__td disabled' : 'table__td'
    }

    return(
        <div className="month">
            <div className="month__header">
                { months[addZeroToStart(month.toString())] }
            </div>
            <table className='table'>
                <thead className='table__header'>
                    <tr>
                        { Object.values(weekdays).map(wd => <th key={wd}>{wd.slice(0,3)}</th>) }
                    </tr>
                </thead>

                <tbody className='table__body'>
                {
                    monthMatrix.map((week) => {
                        return(
                            <tr key={Math.random()+week[0]}>
                                {
                                    week.map((day, j) => <td className={getTableCellClass(week, day, j)} key={month+day+year}>{day}</td>)
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