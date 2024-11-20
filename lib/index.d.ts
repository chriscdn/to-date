declare const isDate: (object: unknown) => object is Date;
declare enum ToDateNumberUnit {
    BESTGUESS = 0,
    MILLISCONDS = 1,
    MICROSECONDS = 2
}
type TValue = Date | string | number | null | undefined;
type TReturnValue<T> = T extends Date | number ? Date : Date | undefined;
declare const toDate: <T extends TValue>(value: T, numberUnit?: ToDateNumberUnit) => TReturnValue<T>;
export { isDate, toDate, ToDateNumberUnit };
