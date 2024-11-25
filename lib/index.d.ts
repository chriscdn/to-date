declare const isDate: (object: unknown) => object is Date;
declare enum EpochUnit {
    BESTGUESS = 0,
    SECONDS = 1,
    MILLISCONDS = 2,
    MICROSECONDS = 3
}
type TValue = Date | string | number | null | undefined;
type TReturnValue<T> = T extends Date | number ? Date : Date | undefined;
declare const toDate: <T extends TValue>(value: T, epochUnit?: EpochUnit) => TReturnValue<T>;
export { EpochUnit, isDate, toDate };
