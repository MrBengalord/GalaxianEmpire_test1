// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Основные элементы интерфейса
const startGameButton = document.getElementById('start-game');
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

// Запуск мини-игры
function startMiniGame() {
    tg.showAlert("Mini-game is starting!");
    // Здесь будет логика запуска мини-игры
    // Например, переход на другую страницу или запуск игрового процесса
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
}

// Запуск инициализации при загрузке страницы
document.addEventListener('DOMContentLoaded', initApp);