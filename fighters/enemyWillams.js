import { Enemy } from "./enemyRoper.js";

const lifeWil = document.querySelector('.lifewillams');
const damagePunch = document.querySelector('.damageAttack'); 
const deadWillams = document.querySelector('.deadEnemy');
const lifeWillams = document.querySelector('.lifeWillams');

export class Willams extends Enemy {
    constructor(x, y, name) {
        super(x, y, name);
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 64;
        this.name = 'Willams';
        this.image = new Image();
        this.image.src = '';
        this.lifeWillams = 100;
        this.speed = 0.4;
        this.animations = [];
        this.isDead = false;
        this.frameIndex = 0;
        this.frameInterval = 10;
        this.frameTime = 0;
        this.direction = '';
        this.isHit = false;
        this.damageCooldown = 0;
        this.attackCooldown = 0;
        this.punchZone = null;
        this.punchTime = 0;
        this.stopAnimation = false;
        this.lastAttackTime = 0;
        this.isAttack = false;
        this.blinkTime = 30;
        this.blinkFrame = 0;
        this.visible = true;
        this.enemyWillams = true;
        this.countLife = 0;
    }

    update(player) {
    
            // Анимация: не сбрасываем frameIndex
    this.frameTime++;
    if (this.frameTime > this.frameInterval) {
        this.frameTime = 0;
        this.frameIndex = (this.frameIndex + 1) % this.animations.length;
    };

    if(this.isDead === true) {
        this.blinkFrame++;
        if(this.blinkFrame % 10 === 0) {
            this.visible = !this.visible;
            this.blinkTime--;
        };
        return;
    };

    lifeWil.style.width = this.lifeWillams + '%';
    lifeWillams.style.display = 'none';

    if(player.x >= this.x - 120) {
        lifeWillams.style.display = 'flex';
    }

    if (this.x < player.x) {
        this.direction = 'right';
    } else {
        this.direction = 'left';
    };

    if(player.lifeBilly <= 0 && this.direction === 'right' && this.enemyWillams === false) {
        this.punchZone = null;
        this.image.src = 'img/Williams_DD left.png';
        this.animations = [
            [516, 44, 26, 64],
            [491, 45, 17, 64],
            [463, 44, 20, 64],
            [429, 45, 26, 64],
        ];

        this.x -= this.speed;
        if(this.x <= player.x - 80) {
            this.x = player.x - 80;
            this.image.src = 'img/Williams_DD.png';
            this.animations = [
                [74, 44, 26, 64],
            ];

        };

        return;
    };
    
    if(player.lifeBilly <= 0 && this.direction === 'left' && this.enemyWillams === false) {
        this.punchZone = null;
        this.image.src = 'img/Williams_DD.png';
        this.animations = [
            [74, 44, 26, 64],
            [108, 45, 17, 64],
            [133, 44, 20, 64],
            [161, 45, 26, 64],
        ];

        this.x += this.speed;
        if(this.x >= player.x + 80) {
            this.x = player.x + 80;
            this.image.src = 'img/Williams_DD left.png';
            this.animations = [
                [516, 44, 26, 64],
            ];

        };

        return;
    };

    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if(distance >= 120 && this.direction === 'right') {
        lifeWillams.style.display = 'none';
        this.enemyWillams = false;
        this.direction = 'left';
        this.image.src = 'img/Williams_DD left.png';
        this.animations = [
            [516, 44, 26, 64],
            [491, 45, 17, 64],
            [463, 44, 20, 64],
            [429, 45, 26, 64],
        ];

        this.x -= this.speed;
        if(this.x <= 1000) {
            this.x = 1000;
            this.image.src = 'img/Williams_DD.png';
            this.animations = [
                [74, 44, 26, 64],
            ];
        };

        return;
    };

    if(this.direction === 'left' && distance >= 110) {
        lifeWillams.style.display = 'none';
        this.direction = 'right';
        this.image.src = 'img/Williams_DD.png';
        this.animations = [
            [74, 44, 26, 64],
            [108, 45, 17, 64],
            [133, 44, 20, 64],
            [161, 45, 26, 64],
        ];

        this.x += this.speed;
        if(this.x >= 1050) {
            this.x = 1050;
            this.y = 385;
            this.image.src = 'img/Williams_DD left.png';
            this.animations = [
                [516, 44, 26, 64],
            ];
        }
        return;
    };

    if(this.direction === 'left' && distance >= 24 || 
       this.direction === 'right' && distance >= 25
    ) {
        this.isAttack = false;
        this.x += this.speed * Math.sign(dx);
        this.y += this.speed * Math.sign(dy);
    };

    // Двигаемся
    if (player.x < this.x && this.direction === 'left') {
        if(this.stopAnimation === true) return;
        this.image.src = 'img/Williams_DD left.png';
        this.animations = [
            [516, 44, 26, 64],
            [491, 45, 17, 64],
            [463, 44, 20, 64],
            [429, 45, 26, 64],
        ];

          //Удар рукой левая сторона
        if (distance <= 24 && this.direction === 'left') {
            this.enemyWillams = false;
            this.isAttack = true;
            this.image.src = 'img/Williams_DD left.png';
            this.animations = [
                [580, 131, 28, 60],
                [526, 131, 46, 60],
                [489, 132, 29, 59],
                [435, 132, 46, 59],
                [399, 132, 28, 59],
    
            ];
        };

    } else if (player.x > this.x && this.direction === 'right') {
        if(this.stopAnimation === true) return;
        this.image.src = 'img/Williams_DD.png';
        this.animations = [
            [74, 44, 26, 64],
            [108, 45, 17, 64],
            [133, 44, 20, 64],
            [161, 45, 26, 64],
        ];
    };

        //Удар рукой правая сторона
    if (distance <= 25 && this.direction === 'right') {
        this.isAttack = true;
        this.image.src = 'img/Williams_DD.png';
        this.animations = [
            [8, 131, 28, 60],
            [44, 131, 46, 60],
            [98, 132, 29, 59],
            [135, 132, 46, 59],
            [189, 132, 28, 59],
    
        ];
    }

    if (this.lifeWillams <= 0 && this.direction === 'right') {
        this.countLife++;
        this.isHit = false;
        this.isDead = true;
        this.punchZone = null;
        this.image.src = 'img/Williams_DD left.png';
        this.animations = [
            [46, 676, 48, 30],
        ];

        setTimeout(() => {
            if(this.countLife >= 1) {
                this.isDead = true;
                this.punchZone = null;
                this.x = -500;
                this.lifeWillams = 0;
                lifeWillams.style.display = 'none';
                return;
            };

            this.isDead = false;
            this.x = player.x - 80;
            this.lifeWillams = 100;

        }, 3000);

        deadWillams.play();
        setTimeout(() => {
            deadWillams.pause();
        }, 500);
    
    };

    if (this.lifeWillams <= 0 && this.direction === 'left') {
        this.countLife++;
        this.isDead = true;
        this.punchZone = null;
        this.isHit = false;
        this.image.src = 'img/Williams_DD.png';
        this.animations = [
            [522, 676, 48, 30],
        ];

        setTimeout(() => {
            if(this.countLife >= 1) {
                this.isDead = true;
                this.punchZone = null;
                this.x = -500;
                this.lifeWillams = 0;
                lifeWillams.style.display = 'none';
                return;
            };

            this.isDead = false;
            this.x = player.x - 80;
            this.lifeWillams = 100;

        }, 3000);

        deadWillams.play();
        setTimeout(() => {
            deadWillams.pause();
        }, 500);
    };

    if(this.isHit === true && this.direction === 'right') {
        this.isHit = false;
        this.punchZone = null;
        this.image.src = 'img/Williams_DD.png';
        this.animations = [
            [8, 643, 27, 63],
            [75, 643, 24, 63],
        ];

        damagePunch.play();

    };

    if(this.isHit === true && this.direction === 'left') {
        this.isHit = false;
        this.punchZone = null;
        this.image.src = 'img/Williams_DD left.png';
        this.animations = [
            [581, 643, 27, 63],
            [517, 643, 24, 63],
        ];

        damagePunch.play();

    };

    console.log(this.isAttack);

    const isCollidingX = this.x < player.x + player.width &&
    this.x + this.width > player.x;
    const isSamePlaneY = Math.abs(this.y - player.y);
    const now = Date.now();
    
    if (isCollidingX && isSamePlaneY && now - this.lastAttackTime >= 500) {

        const zoneWidth = 5;
        const zoneHeight = 5;
        let zoneX;
        
        if (this.direction === 'left') {
            zoneX = this.x - zoneWidth;
        } else {
            zoneX = this.x + this.width + 10;
        };

        this.punchZone = {
            x: zoneX - 4,
            y: this.y + 8,
            width: zoneWidth,
            height: zoneHeight
        };

        this.lastAttackTime = now;

        if(this.punchZone) {
            setTimeout(() => {
                this.punchZone = null;
            }, 200);
        };
    };

    if (this.punchTime > 0) {
        this.punchTime--;
        if (this.punchTime <= 0) {
           this.punchZone = null;
        };

    };

    if (this.damageCooldown > 0) {
        this.damageCooldown--;
    };

    };

    takeDamage(amount) {
        this.isHit = true;
        if (this.damageCooldown > 0) return;
        this.lifeWillams -= amount;
        this.damageCooldown = 60;

        if(this.lifeWillams <= 0) {
            this.lifeWillams = 0;
        }
    };

    draw(ctx, cameraX, cameraY) {
        if(this.isDead && this.blinkTime <= 0) return;
        if(!this.visible) return;
        const frame = this.animations[this.frameIndex];
        if(!frame) return;
        const [sx, sy, sw, sh] = frame;
        ctx.drawImage(
            this.image,
            sx, sy, sw, sh,
            this.x - cameraX + (this.width - sw) / 2, 
            this.y - cameraY,
            sw, sh
        );

        if(this.punchZone) {
            ctx.fillStyle = 'transparent';
            ctx.fillRect(
                this.punchZone.x - cameraX,
                this.punchZone.y - cameraY,
                this.punchZone.width,
                this.punchZone.height
            )
        };
    };

}