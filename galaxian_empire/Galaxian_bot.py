import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton

# Токен бота
bot = telebot.TeleBot('')

# Обработчик команды /start
@bot.message_handler(commands=['start'])
def send_welcome(message):
    # Создаем кнопку для открытия мини-аппа
    markup = InlineKeyboardMarkup()
    button = InlineKeyboardButton("Открыть мини-апп", web_app=WebAppInfo(url="https://galaxianempire.vercel.app"))
    markup.add(button)

    # Отправляем сообщение с кнопкой
    bot.send_message(message.chat.id, "Добро пожаловать в GalaxianEmpire! Нажми кнопку ниже, чтобы открыть мини-апп.", reply_markup=markup)

# Запуск бота
bot.polling()
