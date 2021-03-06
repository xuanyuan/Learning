/**
 * Created by zhangdianjun on 17-10-19
 */

'use strict'

var fs = require('nodejs/fs');
var url = require('url');
var path = require('path');
var http = require('nodejs/http');

var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

var server = http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;
    console.log(pathname)
    var filepath = path.join(root, pathname);
    console.log(filepath)
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()){
            console.log('200' + request.url);

            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        } else {
            console.log('404' + request.url);

            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');