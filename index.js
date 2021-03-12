const TelegramBot = require('node-telegram-bot-api')
const debug = require('./helpers')
console.log('Bot has been started ...')

const TOKEN = '1629315632:AAHgIslo_irJWSWVNVknMWJAjeHqtkCldes'
const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

///Обработка сообщений
// bot.on('message', (msg) => {
//   console.log(msg)
//   const {id} = msg.chat 

//   if (msg.text.toLocaleLowerCase() === 'hello'){
//     bot.sendMessage(id, `Hello ${msg.from.first_name}`)
//   }else{
//     bot.sendMessage(id,debug(msg))
//     .then(()=> {
//         console.log('Message has been send')
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   }
 
// })

bot.onText(/\/start/, msg => {
  const {id} = msg.chat
  bot.sendMessage(id, debug(msg))
})

bot.onText(/\/help (.+)/, (msg, [source, match]) => {
  const{id} = msg.chat
  bot.sendMessage(id, debug(match))
})

bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, 'Message!')
})