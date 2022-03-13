import { getDaysArray,  getMonthMatrix } from "../utils/helpers";
import { weekdays } from "../utils/weekdays";
import '../sass/month.scss';

const Month = props => {

    const { month, year } = props;

    const daysArray = getDaysArray(month, year);

    const monthMatrix = getMonthMatrix(daysArray);

    return(
        <table className='table'>
            <thead className='table__header'>
                <tr>
                    { Object.values(weekdays).map(wd => <th key={wd}>{wd.slice(0,3)}</th>) }
                </tr>
            </thead>

            <tbody className='table__body'>
            {
                monthMatrix.map(week => {
                    return(
                        <tr key={Math.random()+week[0]}>
                            {
                                week.map(day => <td className='table__td' key={month+day}>{day}</td>)
                            }
                        </tr>
                    )
                })
            }
            </tbody>
            
        </table>
    )
};

export default Month;