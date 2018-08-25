/**
 * Created by zhangdianjun on 17-10-18
 */

'use strict'
var fs = require('nodejs/fs');

//异步读取文件
fs.readFile('sample.txt', 'utf-8', function(err, data){
    if(err){
        console.log(err);
    } else {
        console.log(data);
    }
});

//同步读取文件
try{
    var data = fs.readFileSync('sample.txt','utf-8');
    console.log('sync' + data);
} catch (err) {
    console.log(err);
}

//异步写文件
var data = 'Hello, Node.js'
fs.writeFile('output.txt', data, function (err){
    if (err){
        console.log(err)
    } else {
        console.log('ok.')
    }
})
//同步写文件
var data = 'hello, Node.js';
fs.writeFileSync('output1.txt', data);

fs.stat('sample.txt', function (err, stat){
    if (err){
        console.log(err)
    } else {
        //是否是文件：
        console.log('isFile:' + stat.isFile());
        //是否是目录：
        console.log('isDirectory:' + stat.isDirectory());
        if (stat.isFile()){
            //文件大小：
            console.log('size: ' + stat.size);
            //创建时间，Date对象
            console.log('birth time: ' + stat.birthtime.toLocaleString());
            //修改时间，Date对象
            console.log('modified time: ' + stat.mtime.toLocaleString());
        }
    }
})

/*
在fs模块中，提供同步方法是为了方便使用。那我们到底是应该用异步方法还是同步方法呢？

由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。
*/




