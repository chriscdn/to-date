import { describe, expect, test } from "vitest";
import { isDate, toDate, toDateUTC } from "../src/index";

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
    seconds: now.getTime() / 1000,
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

  test("toDate (seconds)", () => {
    const { date, seconds } = setup();
    const toDateValue = toDate(seconds);

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

describe("toDate UTC", () => {
  test("UTC1", () => {
    const z = toDateUTC("2024-04-09T00:00:00");
    expect(z.toISOString()).toBe("2024-04-09T00:00:00.000Z");
  });

  test("UTC2", () => {
    const d1 = toDate(1738917445239);
    const d2 = toDateUTC(1738917445239);

    console.log("d1: ", d1);
    console.log("d2: ", d2);

    expect(d1.getTime()).equals(d2.getTime());
  });
});
