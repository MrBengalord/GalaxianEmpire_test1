from flask import Flask, request, jsonify
from flask_cors import CORS

# Создаем приложение Flask
app = Flask(__name__)
CORS(app)  # Разрешаем запросы с фронтенда

# Обработчик для сохранения результатов игры
@app.route('/api/save-score', methods=['POST'])
def save_score():
    # Получаем данные из запроса
    data = request.json
    score = data.get('score')

    # Здесь можно сохранить результат в базу данных или файл
    print(f"Score saved: {score}")

    # Возвращаем ответ
    return jsonify({"status": "success", "score": score})

# Запуск сервера
if __name__ == '__main__':
    app.run(port=3000)