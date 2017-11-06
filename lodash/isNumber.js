/**
 * Created by zhangdianjun on 17-11-1
 */


function isNumber(value) {
    "use strict";
    return typeof value === 'number'
}

console.log(isNumber('1'))
console.log(isNumber('1L'))
console.log(isNumber('12'))
console.log(isNumber(1))
console.log(isNumber(99999999999999999999999999999999999999999999999999))