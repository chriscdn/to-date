import { describe, expect, it } from "vitest";
import { isDate, toDate, toDateInTimeZone, toDateUTC } from "../src/index";

describe("isDate Tests", () => {
  it("isDate 01", () => {
    expect(isDate(0)).toEqual(false);
  });

  it("isDate 02", () => {
    expect(isDate(100)).toEqual(false);
  });

  it("isDate 03", () => {
    expect(isDate("hello")).toEqual(false);
  });

  it("isDate 04", () => {
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
  it("toDate (date)", () => {
    const { date } = setup();
    const toDateValue = toDate(date);
    expect(toDateValue?.getTime()).toEqual(date.getTime());
  });

  it("toDate (seconds)", () => {
    const { date, seconds } = setup();
    const toDateValue = toDate(seconds);

    expect(toDateValue?.getTime()).toEqual(date.getTime());
  });

  it("toDate (milliseconds)", () => {
    const { date, milliseconds } = setup();
    const toDateValue = toDate(milliseconds);

    expect(toDateValue?.getTime()).toEqual(date.getTime());
  });

  it("toDate (microseconds)", () => {
    const { date, microseconds } = setup();
    const toDateValue = toDate(microseconds);
    expect(toDateValue?.getTime()).toEqual(date.getTime());
  });
});

describe("toDate UTC", () => {
  it("UTC1", () => {
    const z = toDateUTC("2025-12-09T00:00:00");
    expect(z?.toISOString()).toBe("2025-12-09T00:00:00.000Z");
  });

  it("UTC2", () => {
    const z = toDateUTC("2025-03-01");
    expect(z?.toISOString()).toBe("2025-03-01T00:00:00.000Z");
  });
});

describe("toDate TZ", () => {
  it("tz1", () => {
    // 5 hour diff in winter
    const s = "2025-02-27T14:00:00";
    const d = toDateInTimeZone(s, "America/Toronto");
    expect(d?.toISOString()).toBe("2025-02-27T19:00:00.000Z");
  });

  it("tz2", () => {
    // 4 hour diff in summer
    const s = "2025-06-27T14:00:00";
    const d = toDateInTimeZone(s, "America/Toronto");
    expect(d?.toISOString()).toBe("2025-06-27T18:00:00.000Z");
  });

  it("tz3", () => {
    // 4 hour diff in summer
    const s = "2025-06-27T14:00:00";
    const d = toDateInTimeZone(s, "UTC");
    expect(d?.toISOString()).toBe("2025-06-27T14:00:00.000Z");
  });
});
