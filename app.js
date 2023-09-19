const {Client, LocalAuth, MessageMedia, Buttons} = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
// const { CSU } = require('./CustomShortURL')
const { Tinyurl } = require('./tinyurl') 
const { ttdown } = require("./ttdown")
const { InstaDown } = require('./InstaDown')

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  // headless: false,
  },
})

client.on("qr", (qr) => {
  qrcode.generate(qr, {small: true})
})

client.on("ready", () => {
  console.log("Client is ready!")
})

menu = {
  tiktoksave : [".tiktoksave", "_contoh:_ _*.tiktoksave https://tiktokLink.com*_"],
  reelsave : [".reelsave", "_contoh:_ _*.reelsave https://tiktokLink.com*_"],
  urlshort : [".urlshort", "_contoh:_ _*.urlshort https://yourlink.com LinkSaya*_"],
  sticker : [".sticker"]
}

client.on("message", async (message) => {

  console.log(`${message.from} : ${message.body}`);
  
  // MENU LIST
  if (message.body.startsWith(".menu")) {
    let reply_msg =
`Menu Fitur-Fitur yang tersedia :
🟢 *${menu.urlshort[0]}* (URL Shortener)
${menu.urlshort[1]}

🟢 *${menu.reelsave[0]}* (Instagram Reel Downloader)
${menu.reelsave[1]}

🟢 *${menu.tiktoksave[0]}* (Tiktok Video Downloader)
${menu.tiktoksave[1]}

🟢 *${menu.sticker[0]}* (Whatsaap Stiker Maker)`

    client.sendMessage(message.from, reply_msg)
  }
  // TIKTOK DOWNLOADER MP4 & MP3
  else if (message.body.startsWith(".tiktoksave")) {
    let reply_msg, msg = message.body.split(" ")
    if (msg.length == 2) {
      const result = await ttdown(msg[1])
      reply_msg = `Tiktok Video Downloader\nMP4 ▶ : ${result.SL_ttVid}\nMP3 🎵 : ${result.SL_ttAud}`
      
    } else {
      reply_msg = "_contoh:_ _*.tiktoksave https://tiktokLink.com*_"
    }
    client.sendMessage(message.from, reply_msg)
  }
  // TIKTOK TO VOICE NOTE
  
  // INSTAGRAM DOWNLOADER
  else if (message.body.startsWith(".reelsave")) {
    let reply_msg, msg = message.body.split(" ")
    // CORRECT MESSAGE
    if (msg.length == 2) {
      const result = await InstaDown(msg[1])
      // Status Success
      if (result.status === "success") {
        reply_msg = `Instagram Reel Downloader\nMP4 ▶ : ${result.SL_igReel}\nMP3 🎵 : ${result.SL_igAud}`        
      } 
      // Status Failed
      else if (result.status === "failed") {
        reply_msg = result.message
      }
      // Status Error
      else if (result.status === "error") {
        reply_msg = result.message
      }
    }
    // WRONG FORMAT MESSAGE
    else {
      reply_msg = "_contoh:_ _*.reelsave https://tiktokLink.com*_"
    }
    // SEND MESSAGE
    client.sendMessage(message.from, reply_msg)
  }
  // URL SHORTENER
  else if (message.body.startsWith(".urlshort")) {
    let reply_msg, msg = message.body.split(" ")
    if (msg.length == 3) {
      const link = await Tinyurl(msg[1], msg[2])
      if (link.status === "success") {
        reply_msg = `Link Anda : ${link.tiny_url}`
      } else {
        reply_msg = `Link Anda : ${link.message}`
      }
    } else if (msg.length == 2) {
      const link = await Tinyurl(msg[1])
      if (link.status === "success") {
        reply_msg = `Link Anda : ${link.tiny_url}`
      } else {
        reply_msg = `Link Anda : ${link.message}`
      }
    } else {
      reply_msg = "_contoh:_ _*.urlshort https://yourlink.com LinkSaya*_"
    }
    client.sendMessage(message.from, reply_msg)
  }
  // IMAGE TO STICKER
  else if(message.type === "image" && message.body.startsWith(".sticker")) {
    let media = await message.downloadMedia()
    // console.log(media);
    client.sendMessage(message.from, media, {sendMediaAsSticker: true})
  }
  // DEFAULT COMMAND
  else {
    
    client.sendMessage(message.from, "Halo bang!")
  
  }
})

client.initialize()
