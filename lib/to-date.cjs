var t,e=function(t){return t instanceof Date&&!isNaN(t.getTime())};exports.EpochUnit=void 0,(t=exports.EpochUnit||(exports.EpochUnit={}))[t.BESTGUESS=0]="BESTGUESS",t[t.SECONDS=1]="SECONDS",t[t.MILLISCONDS=2]="MILLISCONDS",t[t.MICROSECONDS=3]="MICROSECONDS";var o=function(t,o){if(void 0===o&&(o=exports.EpochUnit.BESTGUESS),e(t))return t;if("string"==typeof t){var r=new Date(t);return e(r)?r:void 0}if("number"==typeof t){var n;switch(o){case exports.EpochUnit.BESTGUESS:n=Math.log10(t)>=13?t/1e3:Math.log10(t)>=10?t:1e3*t;break;case exports.EpochUnit.SECONDS:n=1e3*t;break;case exports.EpochUnit.MILLISCONDS:n=t;break;case exports.EpochUnit.MICROSECONDS:n=t/1e3}return new Date(n)}return null};exports.isDate=e,exports.toDate=o,exports.toDateUTC=function(t){var r=o(t);return e(r)?o(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours(),r.getMinutes(),r.getSeconds())):null};
//# sourceMappingURL=to-date.cjs.map
