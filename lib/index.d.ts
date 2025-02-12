declare const isDate: (object: unknown) => object is Date;
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
declare const toDateUTC: <T extends TValue>(value: T) => TReturnValue<T>;
export { EpochUnit, isDate, toDate, toDateUTC };
