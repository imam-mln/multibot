const Axios = require('axios')
const { RSU } = require('./RandomShortURL')
const { CSU } = require('./CustomShortURL')

async function InstaDown(url) {
    try {
        const host = "https://reelsaver.net/api/instagram",
        dataReel = { via: "form", ref: "download-reel-instagram", url: url},
        dataAud = { via: "form", ref: "download-audio-instagram", url: url},
        headers = {'Content-Type' : 'application/x-www-form-urlencoded'},
        resReel = await Axios.post(host, dataReel, {headers}),
        resAud = await Axios.post(host, dataAud, {headers})
        
        // console.log(resReel.data);
        if (resReel.data.success === true && resAud.data.success === true) {
            const result = {
                status : "success",
                DL_igReel : resReel.data.data.medias[0].src,
                DL_igAud : resAud.data.data.medias[0].src,
                SL_igReel : await RSU(resReel.data.data.medias[0].src),
                SL_igAud : await CSU(resAud.data.data.medias[0].src)
            }
            // console.log(result);
            return result
        } else if (resReel.data.success === false && resAud.data.success === false) {
            const result = {
                status : "failed",
                message : "*Mohon Masukan Link Instagram Reel dengan Benar!*"
            }
            // console.log(result);
            return result
        } else {
            const result = {
                status : "error",
                message : "*.reelsave error!*"
            }
            // console.log(result);
            return result
        }
    
    } catch (error) {
        console.log(error);
    }
}

// const url = "https://www.instagram.com/reel/CxCWwfEMMor/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
// const url = "https://vt.tiktok.com/ZSLGRCTy5/"
// const url = "hasbihbiu"
// DEBUG FUNCTION
// InstaDown(url)

// DEBUG RETURN VALUE
// (async () => { console.log(await InstaDown(url))})()

module.exports = { InstaDown }