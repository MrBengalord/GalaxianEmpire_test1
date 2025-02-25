// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Основные элементы интерфейса
const startGameButton = document.getElementById('start-game');
const fleetList = document.getElementById('fleet-list');
const marketplaceList = document.getElementById('marketplace-list');

// Загрузка данных флота и маркетплейса
async function loadFleet() {
    // Здесь будет запрос к бэкенду или смарт-контракту
    const fleet = [
        { name: "Ship 1", level: 1 },
        { name: "Ship 2", level: 2 }
    ];
    fleetList.innerHTML = fleet.map(ship => `<li>${ship.name} (Level ${ship.level})</li>`).join('');
}

async function loadMarketplace() {
    // Здесь будет запрос к бэкенду или смарт-контракту
    const items = [
        { name: "Planet A", price: "100 TON" },
        { name: "Planet B", price: "200 TON" }
    ];
    marketplaceList.innerHTML = items.map(item => `<li>${item.name} - ${item.price}</li>`).join('');
}

// Запуск мини-игры
startGameButton.addEventListener('click', () => {
    tg.showAlert("Mini-game is starting!");
    // Здесь будет логика запуска мини-игры
});

// Инициализация
tg.ready();
loadFleet();
loadMarketplace();