/**
 * Created by zhangdianjun on 17-10-19
 */

module.exports = function (...rest) {
    var sum = 0;
    for (let n of rest){
        sum += n;
    }
    return sum;
}