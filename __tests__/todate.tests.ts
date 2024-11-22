import { isDate, toDate } from "../src/index";

describe("isDate Tests", () => {
  test("isDate 02", () => {
    expect(isDate(0)).toEqual(false);
  });

  test("isDate 02", () => {
    expect(isDate(100)).toEqual(false);
  });

  test("isDate 03", () => {
    expect(isDate("hello")).toEqual(false);
  });

  test("isDate 04", () => {
    expect(isDate(new Date())).toEqual(true);
  });
});

const setup = () => {
  const now = new Date();

  return {
    date: now,
    milliseconds: now.getTime(),
    microseconds: now.getTime() * 1000,
  };
};

describe("toDate Tests", () => {
  test("toDate (date)", () => {
    const { date } = setup();
    const toDateValue = toDate(date);
    expect(toDateValue?.getTime()).toEqual(date.getTime());
  });

  test("toDate (milliseconds)", () => {
    const { date, milliseconds } = setup();
    const toDateValue = toDate(milliseconds);

    expect(toDateValue?.getTime()).toEqual(date.getTime());
  });

  test("toDate (microseconds)", () => {
    const { date, microseconds } = setup();
    const toDateValue = toDate(microseconds);
    expect(toDateValue?.getTime()).toEqual(date.getTime());
  });
});
