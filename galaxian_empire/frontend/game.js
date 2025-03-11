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
    speed: 5
};

const enemies = [];
const bulletWidth = 5;
const bulletHeight = 15;
const bullets = [];
let gameScore = 0;
let gameOver = false;

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

// Обновление игры
function update() {
    console.log("Game loop is running"); // Логируем запуск игрового цикла
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    drawBullets();

    // Движение врагов
    enemies.forEach(enemy => {
        enemy.y += enemy.speed;

        // Проверка на проигрыш (враги достигли нижней границы)
        if (enemy.y + enemy.height >= canvas.height) {
            gameOver = true;
            tg.showAlert("Game Over! You lost.");
            saveScore(gameScore); // Отправляем результат на бэкенд
            return;
        }
    });

    // Движение пуль
    bullets.forEach((bullet, index) => {
        bullet.y -= 5; // Пули летят вверх

        // Проверка на столкновение пули с врагами
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bulletWidth > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bulletHeight > enemy.y) {
                // Уничтожение врага
                enemies.splice(enemyIndex, 1);
                bullets.splice(index, 1);
                gameScore += 1; // Увеличиваем счет

                // Проверка на победу (набрано 10 очков)
                if (gameScore >= 10) {
                    gameOver = true;
                    tg.showAlert("You win! Score: " + gameScore);
                    saveScore(gameScore); // Отправляем результат на бэкенд
                    return;
                }
            }
        });

        // Удаление пуль, которые вылетели за пределы экрана
        if (bullet.y + bulletHeight < 0) {
            bullets.splice(index, 1);
        }
    });

    // Проверка на победу (все враги уничтожены)
    if (enemies.length === 0) {
        gameOver = true;
        tg.showAlert("You win! All enemies destroyed.");
        saveScore(gameScore); // Отправляем результат на бэкенд
        return;
    }

    requestAnimationFrame(update);
}

// Экспорт функции startGame
export function startGame() {
    console.log("Game started"); // Логируем запуск игры
    gameScore = 0; // Сбрасываем счет
    gameOver = false; // Сбрасываем флаг завершения игры
    enemies.length = 0; // Очищаем массив врагов
    bullets.length = 0; // Очищаем массив пуль
    createEnemies(); // Создаем новых врагов
    update(); // Запускаем игровой цикл
}

// Создаем невидимые кнопки для управления на смартфоне
const touchControls = document.createElement('div');
touchControls.style.position = 'absolute';
touchControls.style.bottom = '0';
touchControls.style.left = '0';
touchControls.style.right = '0';
touchControls.style.height = '20%'; // Зона управления в нижней части экрана
touchControls.style.display = 'flex';
touchControls.style.justifyContent = 'space-between';

// Левая зона для движения влево
const leftZone = document.createElement('div');
leftZone.style.width = '50%'; // Левая половина экрана
leftZone.style.height = '100%';
leftZone.style.backgroundColor = 'transparent'; // Невидимая

// Правая зона для движения вправо
const rightZone = document.createElement('div');
rightZone.style.width = '50%'; // Правая половина экрана
rightZone.style.height = '100%';
rightZone.style.backgroundColor = 'transparent'; // Невидимая

touchControls.appendChild(leftZone);
touchControls.appendChild(rightZone);
document.body.appendChild(touchControls);

// Обработка нажатий на левую зону
leftZone.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение (например, прокрутку)
    if (gameOver) return;
    player.x = Math.max(0, player.x - player.speed);
});

// Обработка нажатий на правую зону
rightZone.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение
    if (gameOver) return;
    player.x = Math.min(canvas.width - player.width, player.x + player.speed);
});

// Автоматическая стрельба
setInterval(() => {
    if (gameOver) return;
    bullets.push({ x: player.x + player.width / 2 - bulletWidth / 2, y: player.y });
}, 1000); // Пули создаются каждую секунду