const axios = require('axios');
const cheerio = require('cheerio');

const RSU = async (link) => {
    const host = "https://www.shorturl.at/shortener.php",
    data = {'u' : link},
    headers = {'Content-Type' : 'application/x-www-form-urlencoded'},
    res = await axios.post(host, data, { headers })

    const $ = cheerio.load(res.data),
    shortenUrl = $('#shortenurl').attr('value');

    // console.log(shortenUrl);
    return shortenUrl;
}

// RSU("http://hello.com")

module.exports = { RSU }