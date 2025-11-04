import { Billy } from './fighters/billy.js';
import { Enemy } from './fighters/enemyRoper.js';
import { Linda } from './fighters/enemyLinda.js';
import { Willams } from './fighters/enemyWillams.js';
import { Boss } from './fighters/boss.js';
import { Womens } from './fighters/womens.js';

const audioMission = document.querySelector('.audioMission');
let enemisRespoun = false;

const canvas = document.querySelector('#games');
const ctx = canvas.getContext('2d');

const mapImg = new Image();
mapImg.src = 'img/Area1.png';

//const playerJimmy = new Fighters(100, 430);
//const keys = {
//    up: false,
//    left: false,
//    right: false,
//    down: false,
//};

const playerBilly = new Billy(50, 400);
const keys = {
    up: false,
    left: false,
    right: false,
    down: false,
};

const womens = new Womens(1510, 415);

const enemyLinda = new Linda(500, 420);
const enemyRoper = new Enemy(900, 400);
const enemyWillams = new Willams(1050, 380);
const bossAbobo = new Boss(1400, 400);

let cameraX = 0;
let cameraY = 0;


window.addEventListener('keydown', (e) => {

    if (e.key === 'w') keys.up = true;
    if (e.key === 'a') keys.left = true;
    if (e.key === 'd') keys.right = true;
    if (e.key === 's') keys.down = true;

           // Jump
    if (e.key === ' ') keys.jump = true;
            // Attack Hand
    if (e.key === 't' && !keys.right && !keys.left && !keys.up && !keys.down) keys.rCrocc = true;
            //Attack LoweKick
    if (e.key === 'f' && !keys.right && !keys.left && !keys.up && !keys.down) keys.lkick = true;

});

window.addEventListener('keyup', (e) => {
    if (e.key === 'w') keys.up = false;
    if (e.key === 'a') keys.left = false;
    if (e.key === 'd') keys.right = false;
    if (e.key === 's') keys.down = false;
            // Jump
    if (e.key === ' ') keys.jump = false;
          //Attack Hand
    if (e.key === 't' ) keys.rCrocc = false;
          //Attack LoweKick
    if (e.key === 'f') keys.lkick = false;
});


function update() {
    if(playerBilly.isDeadBilly === false) {
    //   audioMission.play();
    } else {
        audioMission.pause();
    };

    //if (playerBilly.x >= 400 ) {
    //    enemisRespoun = true;

    //    enemyRoper.x = 480;
    //    enemyRoper.y = 390;

    //    enemyLinda.x = 440;
    //    enemyLinda.y = 370;

    //    enemyWillams.x = 470;
    //    enemyWillams.y = 410;
    //}

    //if(enemisRespoun === true && playerBilly.isDeadBilly === false) {
       
    //}
    
    // Проверка столкновения и отмена движения только при попытке пройти внутрь врага
    //if (isCollidingPlayer(playerBilly, enemyRoper, enemyLinda, enemyWillams)) {
    //if (enemyRoper.isDead === true) return;
    //if (enemyWillams.isDead === true) return;
    //if (enemyLinda.isDead === true) return;

    //const prevX = playerBilly.x;
    //const prevY = playerBilly.y;

    //// Пробуем откатить движение временно
    //if (keys.right) playerBilly.x -= playerBilly.speed;
    //if (keys.left) playerBilly.x += playerBilly.speed;
    //if (keys.up) playerBilly.y += playerBilly.speed;
    //if (keys.down) playerBilly.y -= playerBilly.speed;

    //// Если откат устраняет коллизию — значит это была попытка войти внутрь
    //if (!isCollidingPlayer(playerBilly, enemyRoper, enemyLinda, enemyWillams)) {
    //    // Откатили — всё ок, оставим так
    //} else {
    //    // Даже откат не помогает — вернём как было
    //    playerBilly.x = prevX;
    //    playerBilly.y = prevY;
    //}

    //};

    function isCollidingPlayer(rect1, rect2) {
        return (
            rect1.x < rect2.x + 5 &&
            rect1.x + 5 > rect2.x &&
            rect1.y < rect2.y + 2 &&
            rect1.y + 2 > rect2.y
        );
    };

    function isColliding(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    };
    
    // Проверка урона от удара рукой Billy
    if (playerBilly.attackZone && isColliding(playerBilly.attackZone, enemyRoper)) {
        enemyRoper.takeDamage(20);
    };
    
    // Проверка урона от удара ногой Billy
    if (playerBilly.kickZone && isColliding(playerBilly.kickZone, enemyRoper)) {
        enemyRoper.takeDamage(30);
    };

    if(playerBilly.kickZone && isColliding(playerBilly.kickZone, enemyLinda)) {
        enemyLinda.takeDamage(30);
    }

    if(playerBilly.attackZone && isColliding(playerBilly.attackZone, enemyLinda)) {
        enemyLinda.takeDamage(20);
    }

    if(playerBilly.attackZone && isColliding(playerBilly.attackZone, enemyWillams)) {
        enemyWillams.takeDamage(20);
    }

    if(playerBilly.kickZone && isColliding(playerBilly.kickZone, enemyWillams)) {
        enemyWillams.takeDamage(30);
    }

    // Проверка урона от удара рукой Roper
    if (enemyRoper.punchZone && isColliding(enemyRoper.punchZone, playerBilly)) {
        playerBilly.takeDamage(5);
    }

    // Проверка урона от удара рукой Linda
    if(enemyLinda.punchZone && isColliding(enemyLinda.punchZone, playerBilly)) {
        playerBilly.takeDamage(5);
    }

    // Проверка урона от удара рукой Willams
    if(enemyWillams.punchZone && isColliding(enemyWillams.punchZone, playerBilly)) {
        playerBilly.takeDamage(5);
    }

    //Boss damage рука
    if(playerBilly.attackZone && isColliding(playerBilly.attackZone, bossAbobo)) {
        bossAbobo.takeDamage(20);
    }

    //Boss damage нога
    if(playerBilly.kickZone && isColliding(playerBilly.kickZone, bossAbobo)) {
        bossAbobo.takeDamage(30);
    }

    //Boss attack Billy
    if(bossAbobo.punchZone && isColliding(bossAbobo.punchZone, playerBilly)) {
        playerBilly.takeDamage(20);
    }

    if (playerBilly.x < 10) {
        playerBilly.x = 10;
    } else if(playerBilly.x > 2242) {
        playerBilly.x = 2242;
    }

    playerBilly.update(keys, womens, enemyRoper, playerBilly, enemyWillams, bossAbobo);
    womens.update(playerBilly, bossAbobo);

    // Центрируем игрока в экране, камера следует за ним
    cameraX = playerBilly.x - canvas.width / 2;
    // Ограничения камеры
    if (cameraX < 0) cameraX = 0;
    if (cameraX > mapImg.width - canvas.width) {
        cameraX = mapImg.width - canvas.width;
    }

    cameraY = playerBilly.y - canvas.height / 2;
    if (cameraY < 0) cameraY = 0;
    if (cameraX > mapImg.width - canvas.width) cameraX = mapImg.width - canvas.width;
    if (cameraY > mapImg.height - canvas.height) cameraY = mapImg.height - canvas.height;

    enemyRoper.update(playerBilly);
    enemyLinda.update(playerBilly, enemyWillams);
    enemyWillams.update(playerBilly);
    bossAbobo.update(playerBilly, enemyLinda, enemyRoper, enemyWillams);
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Рисуем карту с учётом сдвига камеры
    ctx.drawImage(mapImg, cameraX, cameraY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

     // Рисуем персонажей в зависимости от их координаты Y
    const characters = [playerBilly, womens, enemyRoper, enemyLinda, enemyWillams, bossAbobo];
    characters.sort((a, b) => a.y - b.y);

    characters.forEach(character => {
        character.draw(ctx, cameraX, cameraY);
    });

};

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

mapImg.onload = () => {
    loop();
};
