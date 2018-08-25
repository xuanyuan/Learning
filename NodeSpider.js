/**
 * Created by zhangdianjun on 17-10-27
 */

let cheerio = require("cheerio");
let request = require("request");
let Iconv = require("iconv-lite");

var options = {
    url: 'http://129.1.1.5/commonList.jsp?pxh=13&progbh=13',
    encoding: null
}
function callback(error, response, body) {

    if (!error && response.statusCode == 200) {
        // console.log(Iconv.decode(body, "gb2312").toString());
        let htmlStr = Iconv.decode(body, "gb2312").toString();
        let $ = cheerio.load(htmlStr);
        let tables = $('html').find('table');
        let tableAll = tables.nextAll()

        console.log($(tableAll[13]).html());

    }
}
request(options, callback);
// body > table:nth-child(11) > tbody > tr > td:nth-child(2) > table:nth-child(3)


