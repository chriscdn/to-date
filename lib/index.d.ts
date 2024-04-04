declare const isDate: (object: unknown) => object is Date;
declare enum ToDateNumberUnit {
    BESTGUESS = 0,
    MILLISCONDS = 1,
    MICROSECONDS = 2
}
declare const toDate: (value: Date | string | number | null | undefined, numberUnit?: ToDateNumberUnit) => Date | undefined;
export { toDate, isDate, ToDateNumberUnit };
