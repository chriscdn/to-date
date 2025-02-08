const isLikelyMilliseconds = (n: number) => Math.log10(n) >= 10;
const isLikelyMicroseconds = (n: number) => Math.log10(n) >= 13;

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
type TReturnValue<T> = T extends Date | number ? Date : Date | undefined;

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

/**
 * This method handles a specific parsing scenario when string dates are given
 * without a time zone, e.g., 2025-02-07T15:00:00.
 *
 * When passed to `new Date()`, the date is assumed to be in the local device's
 * time zone. As a result, devices in different time zones will interpret the
 * value differently.
 *
 * This isn't always a problem. For example, the `Intl.DateTimeFormat` date
 * formatter will format the value in the local time zone. Parsed and processed
 * on the same client is usually fine.
 *
 * However, this can be an issue if a server (e.g., ssr) is located in a different time
 * zone than the client.
 */
const toDateUTC = (value: string): TReturnValue<string> => {
  const theDate = toDate(value);

  if (isDate(theDate)) {
    return toDate(
      Date.UTC(
        theDate.getFullYear(),
        theDate.getMonth(),
        theDate.getDate(),
        theDate.getHours(),
        theDate.getMinutes(),
        theDate.getSeconds(),
      ),
    );
  } else {
    return undefined;
  }
};

export { EpochUnit, isDate, toDate, toDateUTC };
