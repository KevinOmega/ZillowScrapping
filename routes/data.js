const express = require("express");
const { states } = require("../urls");
const router = express.Router({ mergeParams: true });


const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']


router.get("/links",(req,res) => {
    const baseLink = "https://www.zillow.com/"
    
    const links = []
     states.map((state) =>{
        for (let index = 0; index < 10; index++) {
            links.push(baseLink + state + "/" + (index + 1) + "_p/")
        }
     } );
     res.json({links : links});
})

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

 
    const price = html.match(/\$(\d{1,3},\d{3},\d{3}|\d{1,3},\d{3}| \d{1,3})/);
    console.log(price,"price");
    data.Price = price ? Number(price[1].replaceAll(",","")) : 50000;
    const baths = html.match(/(\d)baths/)
    console.log(baths);
    data.Baths = baths ? Number(baths[1]) : 0;
    const beds = html.match(/(\d)beds/);
    console.log(beds);
    data.Beds = beds ? Number(beds[1]) : 0;
    data.Address = url.match(/\/(\d+.*?)\//)[1];
    console.log(data.Address);
    data.State = data.Address.match(/-\w*-([A-Z][A-Z])-\d+$/)[1];
    data.City = data.Address.match(/-(\w+)-[A-Z][A-Z]-\d+$/)[1];
    const rawType = html.match(/pre-qualified([\w]+)Built/i);
    data.Type = rawType ? rawType[1] :"SINGLE FAMILY"
    data.Date_Scrapped = days[new Date().getDay()] + " " + new Date().toLocaleDateString();
    const sqft = html.match(/(\d{1,3},\d{3}|\d{1,3})sqft/)

    data.footage = sqft ? Number(sqft[1].replace(",","")): Math.round(data.Price /150);
    data.Price_per_sqft = Math.round(data.Price / data.footage);


    res.json(data);
});


module.exports = router;