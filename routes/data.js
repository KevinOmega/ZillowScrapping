const express = require("express");
const router = express.Router({ mergeParams: true });


const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

router.post("/links",(req,res) => {
    console.log("here")
    const {html} = req.body;
    console.log(html);

    const regex = /\[(https:\/\/www.zillow.com\/homedetails\/.*?)]/g;
    const rawLinks = html.match(regex);
    const links = [...new Set(rawLinks)]

    res.json({links : links.map((link) => link.replace(/\[|\]/g,""))});
});

router.post("/",(req,res) => {
    const {html,url} = req.body;

    console.log(url);

    const data = {};

    // const priorityRawData = html.split(",");
    // console.log(priorityRawData);
    const price = html.match(/\$(\d{1,3},\d{3},\d{1,3}|\d{3},\d{3}|\d{1,3})/)[1].replaceAll(",","");
    console.log(price);
    data.Price = Number(price);
    // data.Price = Number(price.split(",").join(""));
    data.Baths = Number(html.match(/(\d)baths/)[1]);
    data.Beds = Number(html.match(/(\d)beds/)[1]);
    data.Address = url.match(/\/(\d+.*?)\//)[1];
    data.State = data.Address.match(/-\w*-([A-Z][A-Z])-\d+$/)[1];
    data.City = data.Address.match(/-(\w+)-[A-Z][A-Z]-\d+$/)[1];
    const rawType = html.match(/pre-qualified([\w]+)Built/i);
    data.Type = rawType ? rawType[1] :"SINGLE FAMILY"
    data.Date_Scrapped = days[new Date().getDay()] + " " + new Date().toLocaleDateString();
    const sqft = Number(html.match(/(\d{1,3},\d{3}|\d{1,3})sqft/)[1].replace(",",""));

    data.footage = sqft;
    data.Price_per_sqft = Math.round(data.Price / sqft);


    res.json(data);
});


module.exports = router;