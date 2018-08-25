/**
 * Created by zhangdianjun on 17-10-18
 */

'use strict';

var fs = require('nodejs/fs');

var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function (chunk)  {
    console.log('DATA:');
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
})

var ws1 = fs.createWriteStream('output3.txt','utf-8');
ws1.write('写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('output4.txt');
ws2.write(new Buffer('写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();

var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);