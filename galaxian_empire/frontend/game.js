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
let gameScore = 0;
let gameOver = false;

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
    if (gameOver) return; // Останавливаем игру, если она завершена

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    drawBullets();

    if (enemy.y + enemy.height >= canvas.height) {
        gameOver = true;
        tg.showAlert("Game Over! You lost.");
        saveScore(gameScore);
        return;
    }

    if (gameScore >= 10) {
        gameOver = true;
        tg.showAlert("You win! Score: " + gameScore);
        saveScore(gameScore);
        return;
    }

    if (enemies.length === 0) {
        gameOver = true;
        tg.showAlert("You win! All enemies destroyed.");
        saveScore(gameScore);
        return;
    }
    showMainInterface
    requestAnimationFrame(update);
}

window.startGame = function() {
    gameScore = 0; // Сбрасываем счет
    gameOver = false; // Сбрасываем флаг завершения игры
    enemies.length = 0; // Очищаем массив врагов
    bullets.length = 0; // Очищаем массив пуль
    createEnemies(); // Создаем новых врагов
    update(); // Запускаем игровой цикл
};

// Управление игроком
document.addEventListener('keydown', (e) => {
    if (gameOver) return; // Игнорируем управление, если игра завершена

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