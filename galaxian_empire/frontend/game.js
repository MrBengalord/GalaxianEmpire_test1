const canvas = document.getElementById('game-canvas');
if (!canvas) {
    console.error("Canvas element not found!");
}
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: '#00FF00',
    speed: 10 // Увеличена скорость
};

const enemies = [];
const bulletWidth = 5;
const bulletHeight = 15;
const bullets = [];
let gameScore = 0;
let gameOver = false;

// Добавляем флаги для управления
let isLeftPressed = false;
let isRightPressed = false;

// Создаем врагов
function createEnemies() {
    for (let i = 0; i < 5; i++) {
        enemies.push({
            x: i * 100 + 50,
            y: 50,
            width: 50,
            height: 50,
            speed: 1
        });
    }
}

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

// Обновление движения игрока
function updatePlayerMovement() {
    if (isLeftPressed) {
        player.x = Math.max(0, player.x - player.speed);
    }
    if (isRightPressed) {
        player.x = Math.min(canvas.width - player.width, player.x + player.speed);
    }
}

// Обновление игры
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    drawBullets();

    updatePlayerMovement(); // Интеграция движения

    // Остальная логика игры
    enemies.forEach(enemy => {
        enemy.y += enemy.speed;
        if (enemy.y + enemy.height >= canvas.height) {
            gameOver = true;
            tg.showAlert("Game Over! You lost.");
            saveScore(gameScore);
            return;
        }
    });

    bullets.forEach((bullet, index) => {
        bullet.y -= 5;
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bulletWidth > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bulletHeight > enemy.y) {
                enemies.splice(enemyIndex, 1);
                bullets.splice(index, 1);
                gameScore += 1;
                if (gameScore >= 10) {
                    gameOver = true;
                    tg.showAlert("You win! Score: " + gameScore);
                    saveScore(gameScore);
                    return;
                }
            }
        });
        if (bullet.y + bulletHeight < 0) {
            bullets.splice(index, 1);
        }
    });

    if (enemies.length === 0) {
        gameOver = true;
        tg.showAlert("You win! All enemies destroyed.");
        saveScore(gameScore);
        return;
    }

    requestAnimationFrame(update);
}

export function startGame() {
    console.log("Game started");
    gameScore = 0;
    gameOver = false;
    enemies.length = 0;
    bullets.length = 0;
    createEnemies();
    update();
}

// Невидимое управление для мобильных устройств
const touchControls = document.createElement('div');
touchControls.style.position = 'absolute';
touchControls.style.bottom = '0';
touchControls.style.left = '0';
touchControls.style.right = '0';
touchControls.style.height = '20%';
touchControls.style.display = 'flex';
touchControls.style.justifyContent = 'space-between';

const leftZone = document.createElement('div');
leftZone.style.width = '50%';
leftZone.style.height = '100%';
leftZone.style.backgroundColor = 'transparent';

const rightZone = document.createElement('div');
rightZone.style.width = '50%';
rightZone.style.height = '100%';
rightZone.style.backgroundColor = 'transparent';

touchControls.appendChild(leftZone);
touchControls.appendChild(rightZone);
document.body.appendChild(touchControls);

// Обработчики касаний
leftZone.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isLeftPressed = true;
});

leftZone.addEventListener('touchend', (e) => {
    e.preventDefault();
    isLeftPressed = false;
});

rightZone.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isRightPressed = true;
});

rightZone.addEventListener('touchend', (e) => {
    e.preventDefault();
    isRightPressed = false;
});

// Автоматическая стрельба
setInterval(() => {
    if (!gameOver) {
        bullets.push({
            x: player.x + player.width / 2 - bulletWidth / 2,
            y: player.y
        });
    }
}, 1000);