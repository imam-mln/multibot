const {Client, LocalAuth, MessageMedia, Buttons} = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
const { CSU } = require('./CustomShortURL') 
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
    let reply_msg = `
    Menu Fitur-Fitur yang tersedia :
    🟢 URL Shortener (*${menu.urlshort[0]}*)
    ${menu.urlshort[1]}

    🟢 Instagram Reel Downloader (*${menu.reelsave[0]}*)
    ${menu.reelsave[1]}
    
    🟢 Tiktok Video Downloader (*${menu.tiktoksave[0]}*)
    ${menu.tiktoksave[1]}
    
    🟢 Whatsaap Stiker Maker (*${menu.sticker[0]}*)
    `
    client.sendMessage(message.from, reply_msg)
  }
  // TIKTOK DOWNLOADER MP4 & MP3
  else if (message.body.startsWith(".tiktoksave")) {
    let reply_msg, msg = message.body.split(" ")
    if (msg.length == 2) {
      const result = await ttdown(msg[1])
      reply_msg = `Tiktok Video Downloader\nMP4 ▶ : ${result.SL_ttVid}\nMP3 🎵 : ${result.SL_ttAud}`
      
      // reply_msg = new Buttons('Body text/ MessageMedia instance', [{id:'customId',body:'button1'},{body:'button2'},{body:'button3'},{body:'button4'}], 'Title here, doesn\'t work with media', 'Footer here')
    } else {
      reply_msg = "_contoh:_ _*.tiktoksave https://tiktokLink.com*_"
    }
    client.sendMessage(message.from, reply_msg)
  }
  // TIKTOK TO VOICE NOTE
  
  // INSTAGRAM DOWNLOADER
  else if (message.body.startsWith(".reelsave")) {
    let reply_msg, msg = message.body.split(" ")
    if (msg.length == 2) {
      const result = await InstaDown(msg[1])
      reply_msg = `Instagram Reel Downloader\nMP4 ▶ : ${result.SL_igReel}\nMP3 🎵 : ${result.SL_igAud}`
      
      // reply_msg = new Buttons('Body text/ MessageMedia instance', [{id:'customId',body:'button1'},{body:'button2'},{body:'button3'},{body:'button4'}], 'Title here, doesn\'t work with media', 'Footer here')
    } else {
      reply_msg = "_contoh:_ _*.reelsave https://tiktokLink.com*_"
    }
    client.sendMessage(message.from, reply_msg)
  }
  // URL SHORTENER
  else if (message.body.startsWith(".urlshort")) {
    let reply_msg, msg = message.body.split(" ")
    if (msg.length == 3) {
      reply_msg = `Link Anda : ${await CSU(msg[1], msg[2])}`
    } else if (msg.length == 2) {
      reply_msg = `Link Anda : ${await CSU(msg[1])}`
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
