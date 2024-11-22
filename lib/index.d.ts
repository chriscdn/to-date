declare const isDate: (object: unknown) => object is Date;
declare enum EpochUnit {
    BESTGUESS = 0,
    MILLISCONDS = 1,
    MICROSECONDS = 2
}
type TValue = Date | string | number | null | undefined;
type TReturnValue<T> = T extends Date | number ? Date : Date | undefined;
declare const toDate: <T extends TValue>(value: T, numberUnit?: EpochUnit) => TReturnValue<T>;
export { EpochUnit, isDate, toDate };
