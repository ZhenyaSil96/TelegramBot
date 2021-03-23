const TelegramBot = require('node-telegram-bot-api')
const config = require('./config')
const mongoose = require('mongoose')
const helper = require('./helper')
const kb = require('./keyboard-buttons')
const keyboard = require('./keyboard')

helper.logStart()

mongoose.connect(config.DB_URL, {
    useMongoClient: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))
const TOKEN = '1629315632:AAHgIslo_irJWSWVNVknMWJAjeHqtkCldes'
const bot = new TelegramBot(TOKEN, {
    polling: true
})

bot.on('message', msg => {
    console.log('Working', msg.from.first_name)
    const chatId = helper.getChatId(msg)
    switch(msg.text){
        case kb.home.favorite: 
          break
        case kb.home.films:
            bot.sendMessage(chatId, `Выберите жанр`, {
                reply_markup: {keyboard: keyboard.films}
            })
          break
        case kb.home.cinemas:
            break
            case kb.back:
                bot.sendMessage(chatId, `Что хотите посмотреть?`, {
                    reply_markup: {keyboard: keyboard.home}
                })
                break

    }
})

bot.onText(/\/start/, msg => {
    const text = `Здравствуйте ${msg.from.first_name}\n Выберите команду для начала работы `

    bot.sendMessage(helper.getChatId(msg), text, {
        reply_markup: {
            keyboard: keyboard.home
        }
    })
})