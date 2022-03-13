import { getFullDateByLocale } from "../utils/helpers";
import Month from "./Month";

const Calendar = props => {

    const { locale } = props;

    const today = new Date();
    const [ year, month, day ] = today.toISOString().split('T')[0].split('-');

    return(
        <div>
            <h2>{getFullDateByLocale(today, 'ru')}</h2>
            <Month month={month} year={year} />
        </div>
    )
}

export default Calendar;