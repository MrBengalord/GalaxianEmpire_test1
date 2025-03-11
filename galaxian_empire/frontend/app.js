import { startGame } from '../static/game.js';

// Инициализация Telegram Web App
let tg;
if (window.Telegram && window.Telegram.WebApp) {
    tg = window.Telegram.WebApp;
} else {
    // Режим разработки (если не в Telegram)
    tg = {
        ready: () => console.log("Telegram Web App is ready"),
        showAlert: (message) => alert(message) // Заменяем alert для отладки
    };
}

// Основные элементы интерфейса
const startGameButton = document.getElementById('start-game');
const fleetMenu = document.getElementById('fleet-menu');
const fleetSection = document.getElementById('fleet-section');
const fleetList = document.getElementById('fleet-list');
const marketplaceList = document.getElementById('marketplace-list');

// Загрузка данных флота
async function loadFleet() {
    try {
        // Здесь будет запрос к бэкенду или смарт-контракту
        const fleet = [
            { name: "Ship 1", level: 1 },
            { name: "Ship 2", level: 2 }
        ];

        // Очищаем список перед добавлением новых данных
        fleetList.innerHTML = '';

        // Добавляем элементы флота в список
        fleet.forEach(ship => {
            const li = document.createElement('li');
            li.textContent = `${ship.name} (Level ${ship.level})`;
            fleetList.appendChild(li);
        });
    } catch (error) {
        console.error('Failed to load fleet:', error);
        tg.showAlert("Failed to load fleet data. Please try again later.");
    }
}

// Загрузка данных маркетплейса
async function loadMarketplace() {
    try {
        // Здесь будет запрос к бэкенду или смарт-контракту
        const items = [
            { name: "Planet A", price: "100 TON" },
            { name: "Planet B", price: "200 TON" }
        ];

        // Очищаем список перед добавлением новых данных
        if (marketplaceList) {
            marketplaceList.innerHTML = '';

            // Добавляем элементы маркетплейса в список
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price}`;
                marketplaceList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Failed to load marketplace:', error);
        tg.showAlert("Failed to load marketplace data. Please try again later.");
    }
}

function saveScore(score) {
    console.log("Sending score to backend:", score);
    fetch('http://localhost:3000/api/save-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score })
    }).then(response => response.json())
      .then(data => {
          tg.showAlert(`Score saved: ${data.score}`);
          showMainInterface(); // Возвращаемся к основному интерфейсу
      })
      .catch(error => {
          console.error('Failed to save score:', error);
          tg.showAlert("Failed to save score. Please try again later.");
      });
}

// Показ основного интерфейса
function showMainInterface() {
    document.getElementById('app').style.display = 'block';
    document.getElementById('game-canvas').style.display = 'none';
}

// Запуск мини-игры
function startMiniGame() {
    tg.showAlert("Mini-game is starting!");
    
    // Скрываем текущий интерфейс
    document.getElementById('app').style.display = 'none';
    
    // Показываем canvas для игры
    const canvas = document.getElementById('game-canvas');
    canvas.style.display = 'block';

    // Запускаем игру
    startGame(); // Функция из game.js
}

// Показ/скрытие секции флота
function toggleFleetSection() {
    fleetSection.classList.toggle('hidden');
}

// Инициализация приложения
function initApp() {
    // Инициализация Telegram Web App
    tg.ready();

    // Загружаем данные флота и маркетплейса
    loadFleet();
    loadMarketplace();

    // Назначаем обработчик для кнопки запуска мини-игры
    if (startGameButton) {
        startGameButton.addEventListener('click', startMiniGame);
    }

    // Назначаем обработчик для иконки флота
    if (fleetMenu) {
        fleetMenu.addEventListener('click', toggleFleetSection);
    }
}

// Запуск инициализации при загрузке страницы
document.addEventListener('DOMContentLoaded', initApp);