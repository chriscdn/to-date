declare const isDate: (item: unknown) => item is Date;
declare enum EpochUnit {
    BESTGUESS = 0,
    SECONDS = 1,
    MILLISCONDS = 2,
    MICROSECONDS = 3
}
type TValue = Date | string | number | null | undefined;
type TReturnValue<T> = T extends Date | number ? Date : Date | null;
declare const toDate: <T extends TValue>(value: T, epochUnit?: EpochUnit) => TReturnValue<T>;
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
declare const toDateUTC: <T extends TValue>(value: T) => TReturnValue<T>;
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
 *  zone.
 *
 * This is useful for handling local date-times in a specific time zone without
 * assuming UTC.
 */
declare const toDateInTimeZone: <T extends TValue>(value: T, timeZone: string) => TReturnValue<T>;
export { EpochUnit, isDate, toDate, toDateUTC, toDateInTimeZone };
