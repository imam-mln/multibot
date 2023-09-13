const axios = require("axios")
const cheerio = require('cheerio');

const CSU = async (link, prefik="") => {
  try {
    const host = "https://www.shortlink.net/create.php",
      form = {
        "longurl": link,
        "cust": prefik,
        "message": "",
        "name": "",
        "email": "",
      },
      res = await axios.postForm(host, form)
    
    const $ = cheerio.load(res.data)
    const shortlink = $('#urlbox').attr("value")
    if (shortlink !== undefined) {
      return shortlink
    } else {
      const error = $('h3').text()
      if (error.indexOf("duplicated") !== -1) {
        return "Custom link tersebut sudah pernah digunakan!!"
      } else if (error.indexOf("Invalid URL") !== -1) {
        return "Anda memasukkan format link yang salah!!"
      } else {
        return "Program Error!!"
      }
    }

  } catch (e) {
    console.log({msg: e.message, res: e.response})
  }
}

// (async () => console.log(await CSU("https://www.facebook.id/")))();


module.exports = { CSU }