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


/// Отправка html кода///Отправка api кода 
// bot.on('message', msg => {
  
//   const html = `
//    <strong>Hello ${msg.from.first_name}</strong>
//    <pre>
//      ${debug(msg)}
//    </pre>

//   `
//     if(msg.text === 'api') {
//       bot.sendMessage(msg.chat.id, `https://core.telegram.org/bots/api`)
//     }else {
//       bot.sendMessage(msg.chat.id, html, {
//         parse_mode: 'HTML'
//       })
//     }
// })

bot.on('message', msg => {
  const chatId = msg.chat.id

if (msg.text === 'Закрыть') {
  bot.sendMessage(chatId, 'Закрываю клавиатуру', {
    reply_markup: {
     remove_keyboard: true 
    }
  })
}else if (msg.text === 'Ответить') {
  bot.sendMessage(chatId, 'Отвечаю',{
    reply_markup: {
      force_reply: true
    }
  })
}else{
  bot.sendMessage(chatId, 'Клавиатура', {
    reply_markup: {
      keyboard: [
        [{
          text: 'Отправить местороложение',
          request_location:true
        }],
        ['Ответить', 'Закрыть'],
        [{
          text:'Отправить контакт',
          request_contact: true
        }]
      ]
    }
  })
}

 
})