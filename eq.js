/**
 * Created by zhangdianjun on 17-11-1
 */

console.log(undefined == null) //true
console.log(void 0 == null) //true
console.log(undefined == void 0) //true

var a  = [1,34,1,34,34,2,34,2,342]

var max = Math.max.apply(null, a);

var min = Math.min.apply(null, a);

console.log(max + '= ' + min)