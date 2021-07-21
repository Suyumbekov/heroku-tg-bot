// Подключаем библиотеку для работы с Telegram API в переменную
var TelegramBot = require("node-telegram-bot-api");

let db = require('./db');
// Устанавливаем токен, который выдавал нам бот
var token = "1569313818:AAHm65XxYkgWDWipQMt0mf6VDUp4PZLICY4";
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });


bot.on("polling_error", console.log);

bot.onText(/\/start/, (msg) => {
  let groups = await db.selectFrom();
  console.log(groups);
  
  });
bot.on("message", function (message) {
  // if(!groups.includes(message.chat.title)){
  //     db.queryAdd(message.chat.title)
  //     groups = db.queryRead();
  // }
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
