/**
 * Created by zhangdianjun on 17-11-12
 */

const nodemailer = require('nodemailer');

function sendmail(targetMail, subject, html) {
    "use strict";

    nodemailer.createTestAccount((err, account) => {

        let transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            secureConnection: true, // use SSL
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                //user: 'betterlifeforever@126.com',
                user: '390805461@qq.com',
                // pass: 'Caiyun84'
                // pass: 'andbckpjzwcwbhei'
                // pass: 'zivoptrdswxibjgg'

                pass: 'arzgcbucnsmicaej'
            }
        });

        let mailOptions = {
            // from: "betterlifeforever@126.com",
            from: 'QQ390805461<390805461@qq.com>',
            to: targetMail,
            subject: subject,
            text: '考勤通知',
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }

            console.log('Message sent %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });

}

module.exports = sendmail;
