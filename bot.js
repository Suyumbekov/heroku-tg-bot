// Подключаем библиотеку для работы с Telegram API в переменную
var TelegramBot = require("node-telegram-bot-api");

let db = require('./db');
// Устанавливаем токен, который выдавал нам бот
var token = "1569313818:AAHm65XxYkgWDWipQMt0mf6VDUp4PZLICY4";
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });
let groups = [];
db.read().then((obj)=>{
  obj.forEach(elem => {
    groups[elem.name]=elem.message;
  });
})


bot.on("polling_error", console.log);

bot.onText(/\/start/, (msg) => {    
    bot.sendMessage(msg.chat.id, `Бот будет пртветстовать всех \nвходящих в групповые чаты \nзаданным текстом.\nДля установки текста \nприветствия используйте \n<a>/settext</a> ваш_текст`,{ parse_mode: "HTML" })
  });
  bot.onText(/\/settext (.+)/, (msg, match) => {  
    const resp = match[1];
    if(msg.chat.title){
    db.setText(msg.chat.title,resp);
    groups[msg.chat.title]=resp;
    bot.sendMessage(msg.chat.id, `<strong>Приветствие успешно записано</strong>`,{ parse_mode: "HTML" });
    } else
    bot.sendMessage(msg.chat.id, "Команда не можеть быть использованна\nв личных чатах");
  });
bot.on("message", function (message) {
  if(message.chat.title){
    if(!groups[message.chat.title]){
     db.add(message.chat.title);
     groups[message.chat.title]=null;
    }
     
   }
  if (message.new_chat_members != undefined) {
    if (!message.new_chat_member.is_bot && groups[message.chat.title]) {
      if (message.new_chat_member.last_name)
        bot.sendMessage(
          message.chat.id,
          `<b>Добро пожаловать в чат "${message.chat.title}"</b>\n${message.new_chat_member.first_name} ${message.new_chat_member.last_name}.\n${groups[message.chat.title]}`,
          { parse_mode: "HTML" }
        );
      else
        bot.sendMessage(
          message.chat.id,
          `<b>Добро пожаловать в чат "${message.chat.title}"</b>\n${message.new_chat_member.first_name} .\n${groups[message.chat.title]}`,
          { parse_mode: "HTML" }
        );
    }
  }
});
