// Подключаем библиотеку для работы с Telegram API в переменную
var TelegramBot = require("node-telegram-bot-api");

// Устанавливаем токен, который выдавал нам бот
var token = "1569313818:AAFWE5_3WIfEnlFA0RG8-w25r7_kkO81M7s";
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });

// bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
//   var userId = msg.from.id;
//   var text = match[1];
//   var time = match[2];

//   notes.push({ uid: userId, time: time, text: text });

//   bot.sendMessage(userId, "Отлично! Я обязательно напомню, если не сдохну :)");
// });

// setInterval(function () {
//   for (var i = 0; i < notes.length; i++) {
//     const curDate = new Date().getHours() + ":" + new Date().getMinutes();
//     if (notes[i]["time"] === curDate) {
//       bot.sendMessage(
//         notes[i]["uid"],
//         "Напоминаю, что вы должны: " + notes[i]["text"] + " сейчас."
//       );
//       notes.splice(i, 1);
//     }
//   }
// }, 1000);
bot.on("polling_error", console.log);

bot.on("message", function (message) {
  if (message.new_chat_members != undefined) {
    console.log(message.new_chat_member.is_bot);
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
