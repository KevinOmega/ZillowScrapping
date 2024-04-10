const express = require("express");
const router = express.Router({ mergeParams: true });


const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const fakeHtml = "[https://photos.zillowstatic.com/fp/288deff7395d3be97595138a3f0570d6-p_e.jpg] [https://www.zillow.com/homedetails/304-Reachcliff-Dr-Shepherdstown-WV-25443/63190810_zpid/]304 Reachcliff Dr, Shepherdstown, WV 25443 [https://photos.zillowstatic.com/fp/9393ca396fd4f293a41ad2f8224d1f0a-p_e.jpg] [https://www.zillow.com/homedetails/304-Reachcliff-Dr-Shepherdstown-WV-25443/63190810_zpid/]304 Reachcliff Dr, Shepherdstown, WV 25443 [https://photos.zillowstatic.com/fp/7b90431e253de9a2897febc48080ebe7-p_e.jpg] [https://www.zillow.com/homedetails/304-Reachcliff-Dr-Shepherdstown-WV-25443/63190810_zpid/]Use arrow keys to navigateImage 1 of 89 [https://photos.zillowstatic.com/fp/eb13c87749392d5665c2913fe8dff828-p_e.jpg] [https://www.zillow.com/homedetails/42089-Trengwinton-Pl-Leesburg-VA-20176/123978266_zpid/]42089 Trengwinton Pl, Leesburg, VA 20176 [https://photos.zillowstatic.com/fp/b886b6626efd6804bf04851cf99bfc94-p_e.jpg] [https://www.zillow.com/homedetails/42089-Trengwinton-Pl-Leesburg-VA-20176/123978266_zpid/]42089 Trengwinton Pl, Leesburg, VA 20176 [https://photos.zillowstatic.com/fp/14441c88534282531df7cad554b07b80-p_e.jpg] [https://www.zillow.com/homedetails/42089-Trengwinton-Pl-Leesburg-VA-20176/123978266_zpid/]Use arrow keys to navigateImage 1 of 82* LoadingLoading..."

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