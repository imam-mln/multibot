const axios = require('axios');

function expDate() {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    const datetime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    time = date.toLocaleTimeString("id-ID", {hour12: false}),
    exp = `${datetime} ${time}`
    return exp
}

const Tinyurl = async (link, alias = "") => {
    try {
        const token = "hKPYj1js1XAjAE0XRM6zkLvgjwAUeVcm43RXZgM5gs9lsp8ltVzBSFg7VUya",
        host = "https://api.tinyurl.com/create/",
        data = {
            url : link,
            alias : alias,
            // expires_at : await expDate()
        },
        headers = {
            "Content-Type" : 'application/json',
            "Authorization" : `Bearer ${token}`
        },
        res = await axios.post(host, data, { headers })
        // console.log(res);
        const result = {
            status : "success",
            tiny_url : res.data.data.tiny_url
        }
        // console.log(result);
        return result
    } catch (err) {
        const e = err.response.data.errors[0]
        if (e.search("Invalid" !== -1)) {
            const result = {
                status : "failed",
                message : "*Gagal Membuat Link!*\n*Harap Masukkan Format Link yang Benar!*"
            }
            // console.log(result);
            return result
        } else {
            const result = {
                status : "failed",
                message : "*Gagal Membuat Link!*\n*Custom URL sudah Digunakan!*"
            }
            // console.log(result);
            return result

        }
    }
}

// const link = "cdn.tikcd.com/download/aHR-cHM5Ly81MTZtLWRlZmF0bHQuYWthbWFpemVkLm4ldC8jMTQ4NTYzOTc2MDE1NTBlMjg4ODc1OTQ0MTc1ZDE4Yi71NTAzNTg-Yy81aWRlby8-b2MvdXNlYXN-MmEvdG8zLXVzZWFzdDJhLXB1ZS-wMDY3L17wRERCOGR0SWZBRUpkMEJuUUduYkJhUkpKQWVPUlBRTDE3a-VtLz8hPTAmY1g8MCZjcj-wJmRyPTAmbHI8YWxsJmNkPTAlN-MwJTdDMCU2QzAmY2Y8MSZicj-1MzYmYnQ8MzE3JmJ-aT0PSFlwT0RZMFppazdPemxtT1-wMU05RTZaQzR3TURvJTNEJmNzPTAmZHM8NiZmdD0pSk8HLnlHMFpnfjBQRDFKejhSeGc4d--tT-lQdkVlQ23mbWltZV8-eXBlPXZpZGVvX10wNCZxcz-0JnJjPU8HVnBOMms2T-dRM-4UTTJPRHMwTzBCcE05bzRjek-1Wm03cGJUTXpOemN5TTBCaU0XSXROUzR4WGpJeFlUTXdZREF-WVNOaGIyUmpjalJmTVRWZ-xTMWtNVFp5Y2clM-QlM-QmbD-yMDIzMDkxNDEzMDAwMzk4RkZDODc3NEM-M-QzMDc2QjA-JmJ-YWc8ZTAwMDg3MDAw"
const link = "dbiuf"

Tinyurl(link)


module.exports = { Tinyurl }