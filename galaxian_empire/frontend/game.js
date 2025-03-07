const canvas = document.getElementById('game-canvas');
if (!canvas) {
    console.error("Canvas element not found!");
    return;
}
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: '#00FF00',
    speed: 5
};

const enemies = [];
const bulletWidth = 5;
const bulletHeight = 15;
const bullets = [];

// Отрисовка игрока
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Отрисовка врагов
function drawEnemies() {
    ctx.fillStyle = '#FF0000';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// Отрисовка пуль
function drawBullets() {
    ctx.fillStyle = '#FFFF00';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
    });
}

// Обновление игры
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    drawBullets();
    requestAnimationFrame(update);
}

// Запуск игры
document.getElementById('start-game').addEventListener('click', () => {
    update();
});

// Управление игроком
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    }
    if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
    if (e.key === ' ') { // Пробел для стрельбы
        bullets.push({ x: player.x + player.width / 2 - bulletWidth / 2, y: player.y });
    }
});