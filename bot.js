// Подключаем библиотеку для работы с Telegram API в переменную
var TelegramBot = require("node-telegram-bot-api");
const express = require('express');

// Устанавливаем токен, который выдавал нам бот
var token = "1569313818:AAHm65XxYkgWDWipQMt0mf6VDUp4PZLICY4";
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
<<<<<<< HEAD
var bot = new TelegramBot(token, { polling: true });
=======


// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://<PUBLIC-URL>';
const bot = new TelegramBot(token);


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${token}`);


const app = express();
// parse the updates to JSON

app.use(express.json());

// We are receiving updates at the route below!
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
>>>>>>> 78adcfab4ab4e599caa23410e9322fbc1c9d8508

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

bot.on("message", function (message) {
  if (message.new_chat_members != undefined) {
    if (!message.new_chat_member.is_bot) {
      if (message.new_chat_member.last_name)
        bot.sendMessage(
          message.chat.id,
          `<b>Добро пожаловать в чат "${message.chat.title}"</b>\n${message.new_chat_member.first_name} ${message.new_chat_member.last_name}.\nСиздин Бактылуу Инсан каналына кошулганыңызга кубанычтабыз😌! Бул группадан пайдалуу маалыматтарды аласыз деп ишенебиз! Сиз да маалыматтар менен бөлүшүп, сиз билген иш чаралар боюнча башкалардын да кабардар болушуна себепчи болуңуз🤗.`,
          { parse_mode: "HTML" }
        );
      else
        bot.sendMessage(
          message.chat.id,
          `<b>Добро пожаловать в чат "${message.chat.title}"</b>\n${message.new_chat_member.first_name} .\nСиздин Бактылуу Инсан каналына кошулганыңызга кубанычтабыз😌! Бул группадан пайдалуу маалыматтарды аласыз деп ишенебиз! Сиз да маалыматтар менен бөлүшүп, сиз билген иш чаралар боюнча башкалардын да кабардар болушуна себепчи болуңуз🤗.`,
          { parse_mode: "HTML" }
        );
    }
  }
});