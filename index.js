const TelegramBot = require('node-telegram-bot-api')
const debug = require('./helpers')
console.log('Bot has been started ...')
const fs = require('fs')

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

///keyboard/////////////////////////////////
// bot.on('message', msg => {
//   const chatId = msg.chat.id

// if (msg.text === 'Закрыть') {
//   bot.sendMessage(chatId, 'Закрываю клавиатуру', {
//     reply_markup: {
//      remove_keyboard: true 
//     }
//   })
// }else if (msg.text === 'Ответить') {
//   bot.sendMessage(chatId, 'Отвечаю',{
//     reply_markup: {
//       force_reply: true
//     }
//   })
// }else{
//   bot.sendMessage(chatId, 'Клавиатура', {
//     reply_markup: {
//       keyboard: [
//         [{
//           text: 'Отправить местороложение',
//           request_location:true
//         }],
//         ['Ответить', 'Закрыть'],
//         [{
//           text:'Отправить контакт',
//           request_contact: true
//         }]
//       ]
//     }
//   })
// } 
// })

/////inline keyboard////////
// bot.on('message', msg => {
//   const chatId = msg.chat.id

//   bot.sendMessage(chatId, 'Inline keyboard',{
//     reply_markup: {
//       inline_keyboard: [
//         [
//           {
//             text: 'Google',
//             url: 'https://google.com'
//           }
//         ],
//         [
//           {
//             text:'Replay',
//             callback_data: 'replay'
//           }, 
//           {
//             text: 'Forward',
//             callback_data: 'forward'
//           }
//         ]
//       ]
//     }
//   })
// })

// bot.on('callback_query', query => {
//   bot.sendMessage(query.message.chat.id, debug(query))
// })

//////////inline query//////

// bot.on('inline_query', query => {

//   const results = []
//   for(let i = 0; i < 5; i++){
//     results.push({
//       type:'article',
//       id: i.toString(),
//       title: 'Title' + i,
//       input_message_content: {
//         message_text: `Article #${i + 1}`
//       }
//     })
//   }


//   bot.answerInlineQuery(query.id, results, {
//     cache_time: 0
//   })
// })
///////////////////////////////////////////////////////

/////////////////Перенаправление сообщений ////////////////////

// const inline_keyboard = [
//   [
//     {
//       text: 'Forward',
//       callback_data: 'forward'
//     },
   
//     {
//       text: 'Replay',
//       callback_data: 'replay'
//     }
//   ],
//   [
//     {
//       text: 'Edit',
//       callback_data: 'edit'
//     },

//     {
//       text: 'Delete',
//       callback_data: 'delete'
//     }
//   ]
// ]

// bot.on('callback_query', query => {

// const {chat, message_id, text} = query.message

//    switch(query.data) {
//      case 'forward':
//        bot.forwardMessage(chat.id, chat.id, message_id)
//        break
//        case 'replay':
//          bot.sendMessage(chat.id, `Отвечаем на сообщение`, {
//             reply_to_message_id: message_id
//          })
//          break

//          case 'edit':
//            bot.editMessageText(`${text} (edited)`, {
//              chat_id: chat.id,
//              message_id:message_id,
//              reply_markup: {inline_keyboard}
//            })
//            break

//            case 'delete':
//              bot.deleteMessage(chat.id, message_id)
//              break

//    }

//    bot.answerCallbackQuery({
//      callback_query_id:query.id
//    })
// })

// bot.onText(/\/start/, (msg, [source, match]) => {
//   const chatId = msg.chat.id

//   bot.sendMessage(chatId, 'Keyboard', {
//     reply_markup: {
//       inline_keyboard
//     }
//   })
// })
///////////////////////////////////

/////////////Отправка картинок//////////////////

// bot.onText(/\/pic/, msg => {
//   bot.sendPhoto(msg.chat.id, fs.readFileSync(__dirname + '/cat.jpg'))
// })

// bot.onText(/\/pic2/, msg => {
//   bot.sendPhoto(msg.chat.id, './cat.jpg', {
//     caption: 'This is cat'
//   })
// })
/////////////////Отправка ауидио/////////////////////////

bot.onText(/\/audio/, msg => {
  bot.sendAudio(msg.chat.id, './Agunda.mp3')
})

bot.onText(/\/audio2/, msg => {
  bot.sendMessage(msg.chat.id, 'Start audio uploading ...')
  fs.readFile(__dirname, '/Agunda.mp3', (err, data) => {
    bot.sendAudio(msg.chat.id, data).then(() => {
      bot.sendMessage(msg.chat.id, 'Uploading finish ...')
    })
  })
})