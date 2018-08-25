/**
 * Created by zhangdianjun on 17-12-28
 */
const redis = require('redis');
const crypto = require('crypto');


function isNoExist(content) {

    const client = redis.createClient('6379', '127.0.0.1');
    client.on('error', function (error) {
        console.log(error);
    })

    let md5 = crypto.createHash('md5');
    md5.update(content);

    let newdata = md5.digest('hex');
    console.log('newdata', content, newdata);

    let olddata = undefined;
    let result = false;

    return new Promise((resolve, reject) => {
        client.get("attendance", function (err, reply) {
            console.log('get',err,reply);
            if (err) {
                console.log(err);
            } else {
                resolve(reply);
            }
        });
    }).then(function(reply) {
        return new Promise((resolve, reject) => {
            olddata = reply;
            console.log(newdata, olddata);
            if (newdata !== olddata || !reply) {
                client.set("attendance", newdata, (err, reply)=>{
                    if (err) {
                        console.log('set', err,reply);
                    } else {
                        resolve(true);
                    }
                });
            } else {
                resolve(false);
            }
        })

    }).then(function (bool) {
        result = bool;
        client.quit();
        return result;
    });

}

module.exports = isNoExist