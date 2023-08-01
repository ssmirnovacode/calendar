import { DAYS_ARRAY } from "../constants";
import {
  addZeroToStart,
  getDaysArray,
  getDaysInMonth,
  getFullDateByLocale,
  getMonthByLocale,
  getMonthMatrix,
  getMonthsToRender,
  getNextMonthYear,
  getPrevMonthYear,
  getWeekdaysByLocale,
} from "../helpers";

test("addZeroToStart naive use", () => {
  const str = addZeroToStart("1");
  expect(str).toBe("01");

  const str1 = addZeroToStart("02");
  expect(str1).toBe("02");

  const str12 = addZeroToStart("12");
  expect(str12).toBe("12");

  const strNum = addZeroToStart("11");
  expect(strNum).toBe("11");
});

test("getDaysArray naive use", () => {
  const daysArr = getDaysArray("3", "2022"); // [28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3]
  expect(daysArr[0]).toBe("28");
  expect(daysArr[daysArr.length - 1]).toBe("3");
});

test("getDaysInMonth naive use", () => {
  const days = getDaysInMonth("3", "2022");
  expect(days).toBe(31);

  const daysApril = getDaysInMonth("4", "2022");
  expect(daysApril).toBe(30);
});

test("getFullDateByLocale naive use", () => {
  const date = getFullDateByLocale(new Date("2022-03-21"), "es");
  expect(date).toBe("lunes, 21 de marzo de 2022");
  const dateDefaultLocale = getFullDateByLocale(new Date("2022-03-21"));
  expect(dateDefaultLocale).toBe("Monday, March 21, 2022");
});

test("getFullDateByLocale invalid use", () => {
  const date = getFullDateByLocale(new Date("2022-03-34"), "es");
  expect(date).toBe(undefined);
});

test("getMonthByLocale naive use", () => {
  const month = getMonthByLocale("3", "2022", "es");
  expect(month).toBe("marzo");

  const monthEn = getMonthByLocale("3", "2022");
  expect(monthEn).toBe("March");
});

test("getMonthMatrix naive use", () => {
  const matrix = getMonthMatrix(DAYS_ARRAY);
  expect(matrix.length).toBe(DAYS_ARRAY.length / 7);
  expect(matrix[0]![0]).toBe(DAYS_ARRAY[0]);
});

test("getMonthsToRender naive use", () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const monthsArr = getMonthsToRender("3", "2022");
  expect(monthsArr.length).toBe(1);
  expect(monthsArr[0]!["month"]).toBe("3");
  expect(monthsArr[0]!["year"]).toBe("2022");

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const monthsArr1 = getMonthsToRender("12", "2022", 2);
  expect(monthsArr1.length).toBe(2);
  expect(monthsArr1[1]!!["month"]).toBe("1");
  expect(monthsArr1[1]!!["year"]).toBe("2023");

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const monthsArr2 = getMonthsToRender("1", "2023", 4);
  expect(monthsArr2.length).toBe(4);
  expect(monthsArr2[3]!["month"]).toBe("4");
  expect(monthsArr2[3]!["year"]).toBe("2023");

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const monthsArr3 = getMonthsToRender("8", "2022", 6);
  expect(monthsArr3[5]!["month"]).toBe("1");
  expect(monthsArr3[5]!["year"]).toBe("2023"); // 2024

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const monthsArr4 = getMonthsToRender("12", "2022", 6);
  expect(monthsArr4[2]!["month"]).toBe("2");
  expect(monthsArr4[2]!["year"]).toBe("2023");
});

test("getNextMonthYear naive use", () => {
  const { month, year } = getNextMonthYear("12", "2022");
  expect(month).toBe("1");
  expect(year).toBe("2023");
});

test("getPrevMonthYear naive use", () => {
  const { month, year } = getPrevMonthYear("1", "2023");
  expect(month).toBe("12");
  expect(year).toBe("2022");
});

test("getWeekDaysByLocale naive use", () => {
  const weekdays = getWeekdaysByLocale(
    ["7", "8", "9", "10", "11", "12", "13"],
    "3",
    "2022",
    "es"
  );
  expect(weekdays[0]).toBe("lun"); // ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']
  expect(weekdays.length).toBe(7);

  const wds = getWeekdaysByLocale(
    ["7", "8", "9", "10", "11", "12", "13"],
    "3",
    "2022"
  );
  expect(wds[1]).toBe("Tue");
  expect(wds.length).toBe(7);
});
