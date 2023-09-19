const axios = require('axios');
const { RSU } = require('./RandomShortURL') 
const { CSU } = require('./CustomShortURL') 
const { Tinyurl } = require('./tinyurl')
const cheerio = require('cheerio');

async function ttdown(ttlink) {
    try {
        const host = "https://tikcd.com/en/video/info",
        data = {"url": ttlink},
        headers = {'Content-Type' : 'application/x-www-form-urlencoded'},
        res = await axios.post(host, data, {headers})
    
        // console.log(`${res.status} : ${res.data}`);
    
        let $ = cheerio.load(res.data), downLink = []
        
        try {
            const desc = $('.description').text()
            // 
            if (desc.search("not available!") === -1 && desc !== "") {
                $('.tiktok-downloader-button:not([target="_blank"])').each( (i, value) => {
                    let link = $(value).attr('href');
                    downLink.push(link)
                });
            
                const SLvid = await Tinyurl(downLink[0]),
                SLaud = await Tinyurl(downLink[2]),
                result = {
                    status : "success",
                    DL_ttVid : downLink[0],
                    DL_ttAud : downLink[2],
                    SL_ttVid : SLvid.tiny_url,
                    SL_ttAud : SLaud.tiny_url
                }
                
                // console.log(result);
                return result
            } 
            else if (desc.search("not available!") !== -1 || desc === "") {
                const result = {
                    status : "failed",
                    message : "*Gagal Mengunduh!*\n*Mohon Masukan Link dengan Benar!*"
                }

                // console.log(result);
                return result
            }
            else {
                const result = {
                    status : "error",
                    message : "*Gagal Mengunduh!*\n*.tiktoksave error!*"
                }

                // console.log(result);
                return result

            }
        } catch (e) {
            console.log(e);
        }

    } catch (e) {
        console.log(e);
    }
}
const url = "https://vt.tiktok.com/ZSLEREV8b/" // FOTO
// const url = "https://vt.tiktok.com/ZSLGRCTy5/"
// const url = "https://www.instagram.com/reel/CxCWwfEMMor/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
// const url = "aihvsbasuicgi"

ttdown(url)
// 
module.exports = { ttdown }