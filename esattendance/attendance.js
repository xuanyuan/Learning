/**
 * Created by zhangdianjun on 17-11-12
 */
const puppeteer = require('puppeteer');
const sendmail = require('./sendmail');
const {timeout} = require('./tools.js');
const memberlist = require('./dare2dieCorps');
const isNoExist = require('./redis');


let run = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://129.1.1.5/commonList.jsp?pxh=13&progbh=13');
    let aTags = await page.evaluate(() => {
        let as = [...document.querySelectorAll('body > table:nth-child(11) > tbody > tr > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(n) > td:nth-child(2) > a')];
        return as.map((a) => {
            return {
                href: a.href.trim(),
                name: a.text.trim()
            }
        });
    });
    let firstContent = aTags[0].name + aTags[0].href;
    let ret = await isNoExist(firstContent);
    console.log(ret);
    if (ret) {
        if (aTags.length) {
            let page = await browser.newPage();
            let a = aTags[0];
            await page.goto(a.href);

            let tableTag = await page.evaluate(() => {
                let tab = [...document.querySelectorAll('body > table:nth-child(11) > tbody > tr > td:nth-child(2) > table:nth-child(4)')];
                return tab[0].outerHTML.trim()
            });
            let arr = Object.keys(memberlist);
            for (var value of arr) {
                if (tableTag.indexOf(value + '') !== -1) {
                    await sendmail(memberlist[value], a.name, tableTag);
                    console.log(memberlist[value], a.name);
                }
                timeout(5000);
            }
            page.close();
        }
    }
    // console.log(firstContent);
};

setInterval(() => {
    console.log('start run %s', new Date().toLocaleString());
    run();
}, 5 * 60 * 1000);

