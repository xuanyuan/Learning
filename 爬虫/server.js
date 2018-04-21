
// https://www.cnblogs.com/coco1s/p/4954063.html
var http = require("http"),
    url = require('url'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    async = require('async'),
    eventproxy = require('eventproxy');

var ep = new eventproxy(),
    urlsArray = [],
    pageUrls = [],
    catchDate = [],	//存放爬取数据
    pageNum = 200;

for (var i = 1; i <= pageNum; i++) {
    pageUrls.push({
        "CategoryType":"SiteHome",
        "ParentCategoryId":0,
        "CategoryId":808,
        "PageIndex":i,
        "TotalPostCount":4000,
        "ItemListActionName": "PostList"
    });
}

// 抓取昵称、入园年龄、粉丝数、关注数
function personInfo(url){
    var infoArray = {};
    superagent.get(url)
        .end(function(err,ares){
            if (err) {
                console.log(err);
                return;
            }

            var $ = cheerio.load(ares.text),
                info = $('#profile_block a'),
                len = info.length,
                age = "",
                flag = false,
                curDate = new Date();

            // 小概率异常抛错
            try{
                age = "20"+(info.eq(1).attr('title').split('20')[1]);
            }
            catch(err){
                console.log(err);
                age = "2012-11-06";
            }

            infoArray.name = info.eq(0).text();
            infoArray.age = parseInt((new Date() - new Date(age))/1000/60/60/24);

            if(len == 4){
                infoArray.fans = info.eq(2).text();
                infoArray.focus = info.eq(3).text();
            }else if(len == 5){// 博客园推荐博客
                infoArray.fans = info.eq(3).text();
                infoArray.focus = info.eq(4).text();
            }
            //console.log('用户信息:'+JSON.stringify(infoArray));
            catchDate.push(infoArray);
        });
}

// 判断作者是否重复
function isRepeat(authorName){
    if(deleteRepeat[authorName] == undefined){
        deleteRepeat[authorName] = 1;
        return 0;
    }else if(deleteRepeat[authorName] == 1){
        return 1;
    }
}

// main start
function start() {
    function onRequest(req, res) {
        pageUrls.forEach(function (pageUrl) {
            superagent.post('https://www.cnblogs.com/mvc/AggSite/PostList.aspx', pageUrl).end(function (err, pres) {
                var $ = cheerio.load(pres.text);
                var curPageUrls = $('.titlelnk');
                for (var i = 0; i < curPageUrls.length; i++) {
                    var articleUrl = curPageUrls.eq(i).attr('href');
                    urlsArray.push(articleUrl);
                    //
                    ep.emit('BlogArticleHtml', articleUrl);
                }
            });
        });
        // ep.after('BlogArticleHtml', pageUrls.length * 20, function (articleUrls) {
        // //
        //     res.write('<br/>');
        //     res.write('articleUrls.length is ' + articleUrls.length + '<br/>');
        //     for (var i = 0; i < articleUrls.length; i++) {
        //         res.write('articleUrl is ' + articleUrls[i] + '<br/>');
        //     }
        // });
        ep.after('BlogArticleHtml',pageUrls.length*20,function(articleUrls){
            // 当所有 'BlogArticleHtml' 事件完成后的回调触发下面事件
            // 控制并发数
            var curCount = 0;
            var reptileMove = function(url,callback){
                //延迟毫秒数
                var delay = parseInt((Math.random() * 30000000) % 1000, 10);
                curCount++;
                console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');

                superagent.get(url)
                    .end(function(err,sres){
                        // sres.text 里面存储着请求返回的 html 内容
                        var $ = cheerio.load(sres.text);
                        // 收集数据
                        // 拼接URL
                        var currentBlogApp = url.split('/p/')[0].split('/')[3],
                            appUrl = "http://www.cnblogs.com/mvc/blog/news.aspx?blogApp="+ currentBlogApp;
                        // 具体收集函数
                        personInfo(appUrl);
                    });

                setTimeout(function() {
                    curCount--;
                    callback(null,url +'Call back content');
                }, delay);
            };

            // 使用async控制异步抓取
            // mapLimit(arr, limit, iterator, [callback])
            // 异步回调
            async.mapLimit(articleUrls, 5 ,function (url, callback) {
                reptileMove(url, callback);
            }, function (err,result) {
                // 4000 个 URL 访问完成的回调函数
                // ...
            });
        });
    }
    http.createServer(onRequest).listen(3000);
}
exports.start = start;

