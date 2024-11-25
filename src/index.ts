const isLikelyMicroseconds = (n: number) => Math.log10(n) >= 13;
const isLikelyMilliseconds = (n: number) => Math.log10(n) >= 10;

const isDate = (object: unknown): object is Date =>
  object instanceof Date && !isNaN(object.getTime());

enum EpochUnit {
  BESTGUESS,
  SECONDS,
  MILLISCONDS,
  MICROSECONDS,
}

type TValue = Date | string | number | null | undefined;

// We're guaranteed a Date return value if the input is a number or Date.
type TReturnValue<T> = T extends Date | number ? Date
  : Date | undefined;

const toDate = <T extends TValue>(
  value: T,
  epochUnit = EpochUnit.BESTGUESS,
): TReturnValue<T> => {
  if (isDate(value)) {
    return value;
  } else if (typeof value === "string") {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
    const _d = new Date(value);
    return (isDate(_d) ? _d : undefined) as TReturnValue<T>;
  } else if (typeof value === "number") {
    let baseValue!: number;

    // assert value > 0 ?

    switch (epochUnit) {
      case EpochUnit.BESTGUESS:
        baseValue = isLikelyMicroseconds(value)
          ? value / 1000
          : isLikelyMilliseconds(value)
          ? value
          : value * 1000;
        break;
      case EpochUnit.SECONDS:
        baseValue = value * 1000;
        break;
      case EpochUnit.MILLISCONDS:
        baseValue = value;
        break;
      case EpochUnit.MICROSECONDS:
        baseValue = value / 1000;
        break;
    }

    return new Date(baseValue);
  } else {
    return undefined as TReturnValue<T>;
  }
};

export { EpochUnit, isDate, toDate };
