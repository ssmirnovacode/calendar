import { addZeroToStart, getDaysArray, getDaysInMonth, 
    getFullDateByLocale,  getMonthByLocale, 
    getMonthMatrix, getMonthsToRender,
    getNextMonthYear, getPrevMonthYear, 
    getWeekdaysByLocale } from "../utils/helpers";

    const DAYS_ARRAY = [28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3];

test('addZeroToStart naive use', () => {
    const str = addZeroToStart(1);
    expect(str).toBe('01');

    const str1 = addZeroToStart('02');
    expect(str1).toBe('02');

    const str12 = addZeroToStart('12');
    expect(str12).toBe('12');

    const strNum = addZeroToStart(11);
    expect(strNum).toBe(11);
});

test('addZeroToStart invalid use', () => {
    const str = addZeroToStart();
    expect(str).toBe(undefined);
});

test( 'getDaysArray naive use', () => {
    const daysArr = getDaysArray('03', 2022); // [28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3]
    expect(daysArr[0]).toBe(28);
    expect(daysArr[daysArr.length-1]).toBe(3);
});

test( 'getDaysArray invalid use', () => {
    const daysArr = getDaysArray(); 
    expect(daysArr[0]).toBe(undefined);

    const daysArr1 = getDaysArray(3); 
    expect(daysArr1[0]).toBe(undefined);

    const daysArr2 = getDaysArray(undefined, 2022); 
    expect(daysArr2[0]).toBe(undefined);

    const daysArr3 = getDaysArray(16, 2022); 
    expect(daysArr3[0]).toBe(undefined);
});

test('getDaysInMonth naive use', () => {
    const days = getDaysInMonth(3, 2022);
    expect(days).toBe(31);

    const daysApril = getDaysInMonth('04', 2022);
    expect(daysApril).toBe(30);
});

test('getDaysInMonth invalid use', () => {
    const days = getDaysInMonth();
    expect(days).toBe(undefined);

    const days1 = getDaysInMonth('14', 2022);
    expect(days1).toBe(undefined);

    const days2 = getDaysInMonth(undefined, 2022);
    expect(days2).toBe(undefined);

    const days3 = getDaysInMonth('03');
    expect(days3).toBe(undefined);
});

test('getFullDateByLocale naive use', () => {
    const date = getFullDateByLocale(new Date('2022-03-21'), 'es');
    expect(date).toBe('lunes, 21 de marzo de 2022');
    const dateDefaultLocale = getFullDateByLocale(new Date('2022-03-21'));
    expect(dateDefaultLocale).toBe('Monday, March 21, 2022')
});

test('getFullDateByLocale invalid use', () => {
    const date = getFullDateByLocale(new Date('2022-03-34'), 'es');
    expect(date).toBe(undefined);

    const dateObj = getFullDateByLocale(undefined, 'es');
    expect(dateObj).toBe(undefined);

    const date2 = getFullDateByLocale();
    expect(date2).toBe(undefined);
});

test('getMonthByLocale naive use', () => {
    const month = getMonthByLocale('03', '2022', 'es');
    expect(month).toBe('marzo');

    const monthEn = getMonthByLocale('03', '2022');
    expect(monthEn).toBe('March');
});

test('getMonthByLocale invalid use', () => {
    const month = getMonthByLocale();
    expect(month).toBe(undefined);

    const month2 = getMonthByLocale('03');
    expect(month2).toBe(undefined);

    const month3 = getMonthByLocale(undefined, '2022');
    expect(month3).toBe(undefined);
});

test('getMonthMatrix naive use', () => {
    const matrix = getMonthMatrix(DAYS_ARRAY);
    expect(matrix.length).toBe(DAYS_ARRAY.length/7);
    expect(matrix[0][0]).toBe(DAYS_ARRAY[0])
});

test('getMonthMatrix invalid use', () => {
    const matrix = getMonthMatrix(DAYS_ARRAY.slice(-2));
    expect(matrix.length).toBe(0);

    const matrix1 = getMonthMatrix();
    expect(matrix1.length).toBe(0);
});

test('getMonthsToRender naive use', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const monthsArr = getMonthsToRender('03', 2022, 2);
    expect(monthsArr[1]['month']).toBe(4);
    expect(monthsArr[1]['year']).toBe(2022);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const monthsArr1 = getMonthsToRender(12, 2022, 2);
    expect(monthsArr1[1]['month']).toBe(1);
    expect(monthsArr1[1]['year']).toBe(2023);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const monthsArr2 = getMonthsToRender(1, 2023, 4);
    expect(monthsArr2[3]['month']).toBe(4);
    expect(monthsArr2[3]['year']).toBe(2023);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const monthsArr3 = getMonthsToRender(8, 2022, 6);
    expect(monthsArr3[5]['month']).toBe(1);
    expect(monthsArr3[5]['year']).toBe(2023); // 2024

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const monthsArr4 = getMonthsToRender(12, 2022, 6);
    expect(monthsArr4[2]['month']).toBe(2);
    expect(monthsArr4[2]['year']).toBe(2023); // 2022
});

test('getMonthsToRender invalid use', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const monthsArr = getMonthsToRender();
    expect(monthsArr[0]).toBe(undefined);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const monthsArr1 = getMonthsToRender(12, 2022);
    expect(monthsArr1[0]).toBe(undefined);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const monthsArr2 = getMonthsToRender(14, 2023, 4);
    expect(monthsArr2[0]).toBe(undefined);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const monthsArr3 = getMonthsToRender(undefined, 2023, 4);
    expect(monthsArr3[0]).toBe(undefined);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const monthsArr4 = getMonthsToRender(1, undefined, 4);
    expect(monthsArr4[0]).toBe(undefined);
});

test('getNextMonthYear naive use', () => {
    const { month, year } = getNextMonthYear('12', '2022');
    expect(month).toBe(1);
    expect(year).toBe(2023);
});

test('getNextMonthYear invalid use', () => {
    const { month, year } = getNextMonthYear('13', '2022') || {};
    expect(month).toBe(undefined);
    expect(year).toBe(undefined);

    const { m, y } = getNextMonthYear('11') || {};
    expect(m).toBe(undefined);
    expect(y).toBe(undefined);

    const { m1, y1 } = getNextMonthYear() || {};
    expect(m1).toBe(undefined);
    expect(y1).toBe(undefined);
});


test('getPrevMonthYear invalid use', () => {
    const { month, year } = getPrevMonthYear(0, '2022') || {};
    expect(month).toBe(undefined);
    expect(year).toBe(undefined);

    const { m, y } = getNextMonthYear(undefined, '2023') || {};
    expect(m).toBe(undefined);
    expect(y).toBe(undefined);

    const { m2, y2 } = getNextMonthYear() || {};
    expect(m2).toBe(undefined);
    expect(y2).toBe(undefined);
});

test('getPrevMonthYear naive use', () => {
    const { month, year } = getPrevMonthYear(1, '2023');
    expect(month).toBe(12);
    expect(year).toBe(2022);
});

test('getWeekDaysByLocale naive use', () => {
    const weekdays = getWeekdaysByLocale( [7, 8, 9, 10, 11, 12, 13], '03', '2022', 'es');
    expect(weekdays[0]).toBe('lun'); // ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']
    expect(weekdays.length).toBe(7);

    const wds = getWeekdaysByLocale( [7, 8, 9, 10, 11, 12, 13], '03', '2022');
    expect(wds[1]).toBe('Tue');
    expect(wds.length).toBe(7);
});

test('getWeekDaysByLocale invalid use', () => {
    const weekdays = getWeekdaysByLocale( [7, 8, 9, 10, 11], '03', '2022', 'es');
    expect(weekdays[0]).toBe(undefined); 

    const wds = getWeekdaysByLocale( [7, 8, 9, 10, 11, 12, 13], undefined, '2022', 'es');
    expect(wds[0]).toBe(undefined); 

    const wds1 = getWeekdaysByLocale( [7, 8, 9, 10, 11, 12, 13], '03', undefined, 'es');
    expect(wds1[0]).toBe(undefined); 

    const wds2 = getWeekdaysByLocale();
    expect(wds2[0]).toBe(undefined); 
});
