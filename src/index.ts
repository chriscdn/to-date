// const isLikelyMilliseconds = (n: number) => log10(n) < 13;
const isLikelyMicroseconds = (n: number) => Math.log10(n) >= 13;

const isDate = (object: unknown): object is Date =>
  object instanceof Date && !isNaN(object.getTime());

enum ToDateNumberUnit {
  BESTGUESS,
  MILLISCONDS,
  MICROSECONDS,
}

type TValue = Date | string | number | null | undefined;
type TReturnValue<T> = T extends Date | number ? Date
  : Date | undefined;

const toDate = <T extends TValue>(
  value: T,
  numberUnit = ToDateNumberUnit.BESTGUESS,
): TReturnValue<T> => {
  if (isDate(value)) {
    return value;
  } else if (typeof value === "string") {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
    const _d = new Date(value);
    return (isDate(_d) ? _d : undefined) as TReturnValue<T>;
  } else if (typeof value === "number") {
    let baseValue: number;

    switch (numberUnit) {
      case ToDateNumberUnit.BESTGUESS:
        baseValue = isLikelyMicroseconds(value) ? value / 1000 : value;
        break;
      case ToDateNumberUnit.MILLISCONDS:
        baseValue = value;
        break;
      case ToDateNumberUnit.MICROSECONDS:
        baseValue = value / 1000;
        break;
    }

    return new Date(baseValue);
  } else {
    return undefined as TReturnValue<T>;
  }
};

export { isDate, toDate, ToDateNumberUnit };
