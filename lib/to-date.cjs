var e,t=function(e){return e instanceof Date&&!isNaN(e.getTime())};exports.EpochUnit=void 0,(e=exports.EpochUnit||(exports.EpochUnit={}))[e.BESTGUESS=0]="BESTGUESS",e[e.SECONDS=1]="SECONDS",e[e.MILLISCONDS=2]="MILLISCONDS",e[e.MICROSECONDS=3]="MICROSECONDS",exports.isDate=t,exports.toDate=function(e,S){if(void 0===S&&(S=exports.EpochUnit.BESTGUESS),t(e))return e;if("string"==typeof e){var o=new Date(e);return t(o)?o:void 0}if("number"==typeof e){var r;switch(S){case exports.EpochUnit.BESTGUESS:r=Math.log10(e)>=13?e/1e3:Math.log10(e)>=10?e:1e3*e;break;case exports.EpochUnit.SECONDS:r=1e3*e;break;case exports.EpochUnit.MILLISCONDS:r=e;break;case exports.EpochUnit.MICROSECONDS:r=e/1e3}return new Date(r)}};
//# sourceMappingURL=to-date.cjs.map
