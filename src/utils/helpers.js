export const cutZeroFromTheStart = str =>  +str > 9 ? str : str[1];

export const addZeroToStart = str => +str > 9 ? str : '0'+str;

export const getFullDateByLocale = (dateObj, locale) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString(locale, options)
}

export const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

export const getDaysArray = (month, year) => {
    const daysInPrevMonth = getDaysInMonth(month-1, year);
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayWeekday = new Date(`${year}-${month}-01`).getDay();
    const lastDayWeekday = new Date(`${year}-${month}-${daysInMonth}`).getDay();
    const daysArray = [];
    for (let d=1; d <= daysInMonth; d++) {
        daysArray.push(d)
    }
    if (firstDayWeekday > 1) {
        const diff = firstDayWeekday-1;
        for (let d=daysInPrevMonth; d >daysInPrevMonth-diff; d--) {
            daysArray.unshift(d)
        }
    }
    if (lastDayWeekday < 7) {
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

export const getNextMonthYear = (month, year) =>  month === 12 ? { month: 1, year: year + 1 } : { month: month + 1, year };

export const getPrevMonthYear = (month, year) => month === 1 ? { month: 12, year: year - 1 } : { month: month -1 , year };

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