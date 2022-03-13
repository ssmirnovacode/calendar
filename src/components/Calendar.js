import { getFullDateByLocale, getMonthsToRender } from "../utils/helpers";
import Month from "./Month";
import '../sass/calendar.scss';

const Calendar = props => {

    const { numberOfMonths } = props;

    const today = new Date();
    const [ year, month, day ] = today.toISOString().split('T')[0].split('-');

    const monthsToRender = getMonthsToRender(month, year, numberOfMonths);

    return(
        <div className="calendar">
            {/* <h2>{getFullDateByLocale(today, 'ru')}</h2> */}
            {
                monthsToRender.map(({ month, year }) => <Month key={month+year} month={month} year={year} />)
            }
        </div>
    )
}

export default Calendar;