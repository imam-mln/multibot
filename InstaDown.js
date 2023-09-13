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
        
        const result = {
            DL_igReel : resReel.data.data.medias[0].src,
            DL_igAud : resAud.data.data.medias[0].src,
            SL_igReel : await RSU(resReel.data.data.medias[0].src),
            SL_igAud : await CSU(resAud.data.data.medias[0].src)
        }

        // console.log(DL_igReel + "\n" + DL_igAud + "\n" + SL_igReel + "\n" + SL_igAud);

        return result

    } catch (error) {
        console.log(error);
    }
}

// const url = "https://www.instagram.com/reel/CxCWwfEMMor/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
// InstaDown(url)

module.exports = { InstaDown }