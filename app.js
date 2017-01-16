var TelegramBot = require('node-telegram-bot-api');
var request = require('request');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'sql11.freemysqlhosting.net',
	user: 'sql11154089',
	password: 'y7dn3hbrlX',
	database: 'sql11154089'
});



function botFactory(login, password, token) {

	var bot = new TelegramBot(token, {
		polling: true
	});

	bot.on('message', function (msg) {

		var chatId = msg.chat.id;
		var chatResponce = msg.text.toLowerCase();

		connection.query('SELECT * FROM  `11`', function (error, results, fields) {

			if (error) throw error;

			switch (chatResponce) {			

			case "/help":
				bot.sendMessage(chatId, "Доступные команды:\n/kurs - все курсы валют\n/eur - курс Евро\n\/usd - курс доллара");
				break;
			case "/eur":
				bot.sendMessage(chatId, "Купим Ваши евро по " + results[0].EurBuyingRate + "\nПродадим Вам евро по " + results[0].EurSaleRate);
				break;
			case "евро":
				bot.sendMessage(chatId, "Купим Ваши евро по " + results[0].EurBuyingRate + "\nПродадим Вам евро по " + results[0].EurSaleRate);
				break;
			case "/usd":
				bot.sendMessage(chatId, "Купим Ваши $ по " + results[0].UsdBuyingRate + "\nПродадим Вам $ по " + results[0].UsdSaleRate);
				break;
			case "/kurs":
				bot.sendMessage(chatId, "Usd: " + results[0].UsdBuyingRate + " " + results[0].UsdSaleRate + "\nEUR: " + results[0].EurBuyingRate + " " + results[0].EurSaleRate+"\nRUR: " + results[0].RubBuyingRate + " " + results[0].RubSaleRate);
				break;
			case "курс":
				bot.sendMessage(chatId, "Usd: " + results[0].UsdBuyingRate + " " + results[0].UsdSaleRate + "\nEUR: " + results[0].EurBuyingRate + " " + results[0].EurSaleRate);
				break;

			default:
				bot.sendMessage(chatId, "такую валюту не меняем");
			}

		});



	});
};


//botFactory('Lokis', '111', '316403403:AAEXBWg1j2NZcR22Ccwp017Gfb5fCjWjG9w');

botFactory('Exchange', '222', '312846189:AAHUZm-OEyzCnH2yUb012-tnBqsCVO43WuA');