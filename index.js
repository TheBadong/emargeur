const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //moodle home logged out
  await page.goto('https://extra.u-picardie.fr/moodle/upjv/');

  await page.screenshot({path: 'current.png'})
  await page.click('.usermenu .login a')
  //moodle choose login page
  await page.click('.loginpanel div:nth-child(1) a ');
  await page.screenshot({path: 'current.png'})

  //moodle login page
  console.log(process.env.USERNAME)
  await (await page.$('input#username')).type(process.env.MOODLE_USERNAME, {delay: 5});
  await (await page.$('input#password')).type(process.env.MOODLE_PASSWORD);

  await page.screenshot({path: 'current.png'})

  await page.click('.btn-submit');
  //moodle logged in
  await page.waitForNavigation();
  await page.screenshot({path: 'current.png'})
  //moodle mes cours
  await page.click('.frontpage.container-fluid .row .col-sm-4.col-xs-12:nth-child(3) a');
  await page.screenshot({path: 'current.png'})

  await browser.close();
})();
