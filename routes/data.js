const express = require("express");
const router = express.Router({ mergeParams: true });


const fakeHtml = "[https://photos.zillowstatic.com/fp/288deff7395d3be97595138a3f0570d6-p_e.jpg] [https://www.zillow.com/homedetails/304-Reachcliff-Dr-Shepherdstown-WV-25443/63190810_zpid/]304 Reachcliff Dr, Shepherdstown, WV 25443 [https://photos.zillowstatic.com/fp/9393ca396fd4f293a41ad2f8224d1f0a-p_e.jpg] [https://www.zillow.com/homedetails/304-Reachcliff-Dr-Shepherdstown-WV-25443/63190810_zpid/]304 Reachcliff Dr, Shepherdstown, WV 25443 [https://photos.zillowstatic.com/fp/7b90431e253de9a2897febc48080ebe7-p_e.jpg] [https://www.zillow.com/homedetails/304-Reachcliff-Dr-Shepherdstown-WV-25443/63190810_zpid/]Use arrow keys to navigateImage 1 of 89 [https://photos.zillowstatic.com/fp/eb13c87749392d5665c2913fe8dff828-p_e.jpg] [https://www.zillow.com/homedetails/42089-Trengwinton-Pl-Leesburg-VA-20176/123978266_zpid/]42089 Trengwinton Pl, Leesburg, VA 20176 [https://photos.zillowstatic.com/fp/b886b6626efd6804bf04851cf99bfc94-p_e.jpg] [https://www.zillow.com/homedetails/42089-Trengwinton-Pl-Leesburg-VA-20176/123978266_zpid/]42089 Trengwinton Pl, Leesburg, VA 20176 [https://photos.zillowstatic.com/fp/14441c88534282531df7cad554b07b80-p_e.jpg] [https://www.zillow.com/homedetails/42089-Trengwinton-Pl-Leesburg-VA-20176/123978266_zpid/]Use arrow keys to navigateImage 1 of 82* LoadingLoading..."

router.post("/",(req,res) => {
    console.log("here")
    const {html} = req.body;
    console.log(html);

    const regex = /\[(https:\/\/www.zillow.com\/homedetails\/.*?)]/g;
    const rawLinks = html.match(regex);
    const links = [...new Set(rawLinks)]

    res.json({links : links.map((link) => link.replace(/\[|\]/g,""))});
})


module.exports = router;