const isLikelyMilliseconds = (n: number) => Math.log10(n) >= 10;
const isLikelyMicroseconds = (n: number) => Math.log10(n) >= 13;

const isDate = (item: unknown): item is Date =>
  item instanceof Date && !isNaN(item.getTime());

enum EpochUnit {
  BESTGUESS,
  SECONDS,
  MILLISCONDS,
  MICROSECONDS,
}

type TValue = Date | string | number | null | undefined;

// We're guaranteed a Date return value if the input is a number or Date.
type TReturnValue<T> = T extends Date | number ? Date : Date | null;

const toDate = <T extends TValue>(
  value: T,
  epochUnit = EpochUnit.BESTGUESS,
): TReturnValue<T> => {
  if (isDate(value)) {
    return new Date(value.getTime());
  } else if (typeof value === "string") {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
    const _d = new Date(value);
    return (isDate(_d) ? _d : undefined) as TReturnValue<T>;
  } else if (typeof value === "number") {
    let baseValue!: number;

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
    return null as TReturnValue<T>;
  }
};

const isISO8601WithoutTimeZone = (str: unknown) => {
  if (typeof str === "string") {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    return regex.test(str);
  } else {
    return false;
  }
};

/**
 * This method handles a specific parsing scenario when string dates are given
 * without a time zone, e.g., "2025-02-07T15:00:00".
 *
 * When passed to `new Date()`, such dates are interpreted as local time based
 * on the device's time zone. As a result, the same value may be interpreted
 * differently on devices in different time zones.
 *
 * This behavior is usually acceptable when the date is processed and displayed
 * on the same client. For example, `Intl.DateTimeFormat` will correctly format
 * the date in the local time zone.
 *
 * However, issues arise when environments in different time zones are involved.
 * For instance, a server (e.g., during server-side rendering) located in a
 * different time zone than the client may interpret and serialize the date
 * incorrectly, leading to inconsistencies.
 */
const toDateUTC = <T extends TValue>(value: T): TReturnValue<T> => {
  const theDate = toDate(value);

  if (isDate(theDate)) {
    // Dates such as "2025-01-01" are interpretted in UTC. So are dates with a
    // time zone specififer e.g., "2025-01-01T15:00:00Z" or
    // "2007-04-05T12:30−02:00".
    //
    // For this reason we explicitly check if the dates is iso8601 without a
    // time zone.

    if (isISO8601WithoutTimeZone(value)) {
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
      return theDate;
    }
  } else {
    return null as TReturnValue<T>;
  }
};

const getTimeZoneOffsetHours = (
  date: Date,
  timeZone: Intl.DateTimeFormatOptions["timeZone"],
) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone,
    timeZoneName: "shortOffset",
  });

  const parts = formatter.formatToParts(date);

  const timeZoneName = parts?.find(
    (part) => part.type === "timeZoneName",
  )?.value;

  if (timeZoneName === "GMT") {
    return 0;
  } else {
    const offsetMatch = timeZoneName?.match(/GMT([+-]\d+)/);

    if (offsetMatch) {
      const offsetHours = parseInt(offsetMatch[1], 10);
      // return offsetHours * 60; // Convert hours to minutes
      return offsetHours;
    } else {
      throw new Error(`Unable to determine offset for time zone: ${timeZone}`);
    }
  }
};

/**
 * Similar to `toDateUTC`, this method handles a specific parsing scenario when
 * string dates are provided without a time zone, e.g., "2025-02-07T15:00:00".
 *
 * This function differs from `toDate` by accepting a second parameter for the
 * time zone (e.g., "America/Toronto") and converting the date-time accordingly
 * to that time zone.
 *
 * Example: toDateInTimeZone('2025-06-27T14:00:00', 'America/Toronto')
 *
 * Interprets "2025-06-27 14:00:00" as occurring in the "America/Toronto" time
 * zone.
 *
 * This is useful for handling local date-times in a specific time zone without
 * assuming UTC.
 */
const toDateInTimeZone = <T extends TValue>(
  value: T,
  timeZone: Intl.DateTimeFormatOptions["timeZone"],
): TReturnValue<T> => {
  const theDate = toDateUTC(value);

  if (isDate(theDate)) {
    if (isISO8601WithoutTimeZone(value)) {
      const timeZoneOffsetHours = getTimeZoneOffsetHours(theDate, timeZone);

      /// theDate is a clone of value, so we can mutate it.
      theDate.setHours(theDate.getHours() - timeZoneOffsetHours);
    }

    return theDate;
  } else {
    return null as TReturnValue<T>;
  }
};

export {
  EpochUnit,
  isDate,
  toDate,
  toDateUTC,
  toDateInTimeZone,
  getTimeZoneOffsetHours,
};
