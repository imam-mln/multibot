const axios = require('axios');
const { RSU } = require('./RandomShortURL') 
const { CSU } = require('./CustomShortURL') 
const cheerio = require('cheerio');

async function ttdown(ttlink) {
    const host = "https://tikcd.com/en/video/info",
    data = {"url": ttlink},
    headers = {'Content-Type' : 'application/x-www-form-urlencoded'},
    res = await axios.post(host, data, {headers})

    let $ = cheerio.load(res.data), downLink = []
    $('.tiktok-downloader-button:not([target="_blank"])').each( (i, value) => {
        let link = $(value).attr('href');
        downLink.push(link)
    });
    

    const result = {
        DL_ttVid : downLink[0],
        DL_ttAud : downLink[2],
        SL_ttVid : await RSU(downLink[0]),
        SL_ttAud : await CSU(downLink[2])
    }
    // console.log(DL_ttVid, DL_ttAud)
    // console.log(SL_ttVid, SL_ttAud);

    return result
}

// ttdown("https://vt.tiktok.com/ZSLGRCTy5/")
// 
module.exports = { ttdown }