var e,t=function(e){return e instanceof Date&&!isNaN(e.getTime())};exports.EpochUnit=void 0,(e=exports.EpochUnit||(exports.EpochUnit={}))[e.BESTGUESS=0]="BESTGUESS",e[e.SECONDS=1]="SECONDS",e[e.MILLISCONDS=2]="MILLISCONDS",e[e.MICROSECONDS=3]="MICROSECONDS";var n=function(e,n){if(void 0===n&&(n=exports.EpochUnit.BESTGUESS),t(e))return new Date(e.getTime());if("string"==typeof e){var r=new Date(e);return t(r)?r:void 0}if("number"==typeof e){var o;switch(n){case exports.EpochUnit.BESTGUESS:o=Math.log10(e)>=13?e/1e3:Math.log10(e)>=10?e:1e3*e;break;case exports.EpochUnit.SECONDS:o=1e3*e;break;case exports.EpochUnit.MILLISCONDS:o=e;break;case exports.EpochUnit.MICROSECONDS:o=e/1e3}return new Date(o)}return null},r=function(e){var r=n(e);return t(r)?n(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours(),r.getMinutes(),r.getSeconds())):null};exports.isDate=t,exports.toDate=n,exports.toDateInTimeZone=function(e,n){var o=r(e);if(t(o)){var i=function(e,t){var n,r=new Intl.DateTimeFormat("en-US",{timeZone:t,timeZoneName:"shortOffset"}).formatToParts(e),o=null==r||null==(n=r.find(function(e){return"timeZoneName"===e.type}))?void 0:n.value;if("GMT"===o)return 0;var i=null==o?void 0:o.match(/GMT([+-]\d+)/);if(i)return 60*parseInt(i[1],10);throw new Error("Unable to determine offset for time zone: "+t)}(o,n);return o.setMinutes(o.getMinutes()-i),o}return null},exports.toDateUTC=r;
//# sourceMappingURL=to-date.cjs.map
