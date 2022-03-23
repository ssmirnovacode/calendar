import { addZeroToStart, getFullDateByLocale,  getNextMonthYear, getPrevMonthYear } from "../utils/helpers";

test('addZeroToStart naive use', () => {
    const str = addZeroToStart(1);
    expect(str).toBe('01');
    const str12 = addZeroToStart('12');
    expect(str12).toBe('12');
    const strNum = addZeroToStart(11);
    expect(strNum).toBe(11);
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
});


test('getPrevMonthYear invalid use', () => {
    const { month, year } = getPrevMonthYear(0, '2022') || {};
    expect(month).toBe(undefined);
    expect(year).toBe(undefined);
    const { m, y } = getNextMonthYear(null, '2023') || {};
    expect(m).toBe(undefined);
    expect(y).toBe(undefined);
});

test('getPrevMonthYear naive use', () => {
    const { month, year } = getPrevMonthYear(1, '2023');
    expect(month).toBe(12);
    expect(year).toBe(2022);
});

