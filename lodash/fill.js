/**
 * Created by zhangdianjun on 17-11-1
 */

module.exports = function fill(array, value, start, end) {
    "use strict";


    if (start == null){
        start = 0;
    }

    if (Array.isArray(array)) {

        if (end == null) {
            end = array.length;
        }

        if (array.length === 0) {
            return []
        } else {
            for (let i = start; i < end; i++) {
                array[i] = value
            }
            return array
        }
    } else {
        return [];
    }
}