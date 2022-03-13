export const cutZeroFromTheStart = str =>  +str > 9 ? str : str[1];

export const addZeroToStart = str => +str > 9 ? str : '0'+str;

export const getNextMonthYear = (month, year) =>  month === 12 ? { month: 1, year: year + 1 } : { month: month + 1, year };

export const getPrevMonthYear = (month, year) => month === 1 ? { month: 12, year: year - 1 } : { month: month -1 , year };

export const getFullDateByLocale = (dateObj, locale) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString(locale, options)
}

export const getWeekdaysByLocale = (week, month, year, locale) => {
    const weekdays = [];
    for (let i=0; i < week.length; i++) {
        const date = new Date(`${year}-${month}-${week[i]}`);
        weekdays.push(date.toLocaleDateString(locale, { weekday: 'short'}))
    }
    return weekdays;
}

export const getMonthByLocale = (month, year, locale) => {
    const dateObj = new Date(`${year}-${month}-01`);
    return dateObj.toLocaleDateString(locale, { month: 'long'})
}

export const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

export const getDaysArray = (month, year) => {
    const prevMonth = getPrevMonthYear(month, year).month;
    const prevYear = getPrevMonthYear(month, year).year;
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear) // getDaysInMonth(month-1, year);
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayWeekday = new Date(`${year}-${month}-01`).getDay();
    const lastDayWeekday = new Date(`${year}-${month}-${daysInMonth.toString()}`).getDay();
    const daysArray = [];
    for (let d=1; d <= daysInMonth; d++) {
        daysArray.push(d)
    }
    if (firstDayWeekday > 1 || firstDayWeekday === 0) {
        const diff = firstDayWeekday === 0 ? 6 : firstDayWeekday-1;
        for (let d=daysInPrevMonth; d >daysInPrevMonth-diff; d--) {
            daysArray.unshift(d)
        }
    }
    if (lastDayWeekday !== 0) {
        const diff = 7 - lastDayWeekday;
        for (let d=1; d <=diff; d++) {
            daysArray.push(d)
        }
    }
    return daysArray;
}

export const getMonthMatrix = (arr) => {
    const matrix = [];
    
    for (let i = 0; i < arr.length; i += 7) {
        const chunk = arr.slice(i, i+7);
        matrix.push(chunk);
    }

    return matrix;
}


export const getMonthsToRender = (currentMonth, currentYear, monthsToRender) => {
    const monthsArr = [{ month: +currentMonth, year: +currentYear}];
    let nextMonth = +currentMonth;
    let nextYear = +currentYear
    let i=1;
    while( i < monthsToRender ) {
        monthsArr.push(getNextMonthYear(nextMonth, nextYear));
        nextMonth = getNextMonthYear(nextMonth, nextYear).month;
        nextYear = getNextMonthYear(nextMonth, nextYear).year;
        i++;
    }
    return monthsArr
}