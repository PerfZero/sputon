from flask import Flask, request, jsonify
import telegram

app = Flask(__name__)
bot_token = '7358247413:AAHVJL-YPlUXKiV8U_Pbocfw4iBTLcsKDZw'
bot = telegram.Bot(token=bot_token)

# Обработка входящих запросов от Telegram
@app.route(f'/{bot_token}', methods=['POST'])
def respond():
    update = telegram.Update.de_json(request.get_json(force=True), bot)
    chat_id = update.message.chat.id
    msg_id = update.message.message_id
    text = update.message.text.encode('utf-8').decode()

    # Ваша логика обработки сообщений от пользователей
    response_text = f'Вы сказали: {text}'

    # Отправка ответа пользователю
    bot.sendMessage(chat_id=chat_id, text=response_text, reply_to_message_id=msg_id)

    return 'ok'

# Веб-интерфейс для пользователя
@app.route('/', methods=['GET'])
def index():
    return '''
        <form action="/send" method="post">
            <input type="text" name="message" />
            <input type="submit" value="Отправить" />
        </form>
    '''

# Обработка отправки сообщения пользователем через веб-интерфейс
@app.route('/send', methods=['POST'])
def send():
    message = request.form['message']
    bot.sendMessage(chat_id='YOUR_CHAT_ID', text=message)
    return 'Message sent'

if __name__ == '__main__':
    app.run()
