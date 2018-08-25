/**
 * Created by zhangdianjun on 17-10-22
 */

function foo(){
    "use strict";
    function  bar(a){
        var i = 3;//i = 3;加不加var区别
        console.log(a+i);
    }

    for (var i = 0; i < 10; i++){
        bar(i * 2);
    }
}

// foo();
function hello() {
    function foo() {
        function hello (){
            var a = 3;
            // let a = 3;
        }

        console.log('foo:' + a);//正常通过
    }
    foo();
    console.log('hello:' + a);//a is not defined, var a声明只能跳出一层
}

// hello()

'use strict';

function foo() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
    console.log(i);
}

// foo()

{
    for (let i = 0; i < 10; i++){

    }
    console.log(i);
}
