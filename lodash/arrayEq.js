/**
 * Created by zhangdianjun on 17-11-1
 */
'use strict'
module.exports = function arrayEq(array, other) {

    // 两个参数不是数组
    if (!Array.isArray(array) || !Array.isArray(other)) {
        return false;
    }

    // 两个数组长度不相等
    if (array.length !== other.length) {
        return false;
    }

    // 两个数组长度同时为0
    if (array.length === 0 && other.length === 0) {
        return true;
    }

    //两个数组相等但不为0
    let index   = -1,
        length  = array.length

    while (++index < length) {
        if (array[index] !== other[index]) {
            return false
        }
    }
    return true;
}