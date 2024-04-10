var express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

puppeteerExtra.use(Stealth());


const sleep = ms => new Promise(r => setTimeout(r, ms));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const url = "https://www.zillow.com/homes/"

// app.get('/', async function(req, res, next) {
//    const html = await getPageHTML(url);
//    res.status(200).send(html);
//   }
// );

require("./routes/index")(app);


// const getPageHTML = async (pageUrl) => {
//   const browserObj = await puppeteerExtra.launch();
//   const newpage = await browserObj.newPage();

//   await newpage.setViewport({ width: 1280, height: 720 });

//   await newpage.setUserAgent(
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');


//   await newpage.goto(pageUrl);
//   let outbodyHTML = await newpage.evaluate(() => document.body.outerHTML);
//   // await newpage.waitForTimeout(20000); // Wait for 20 seconds
//     await sleep(3000)
    

//     await browserObj.close();

//     const rawLinks = outbodyHTML.match(/"(https:\/\/www.zillow.com\/homedetails\/.*?)"/g);
//     const links = [...new Set(rawLinks)]
  
//     return {links,outbodyHTML}
 
// }

module.exports = app;