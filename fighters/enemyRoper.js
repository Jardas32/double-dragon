import { Fighters } from "./figters.js";

const life = document.querySelector('#player2Right');
const damageAttack = document.querySelector('.damageAttack');
const dedadRoperAudio = document.querySelector('.deadEnemy');
const lifeRoper = document.querySelector('.lifeRoper');
let billyLife = true;
let stopAnimation = false;
let animations = false;
let noDamage = false;
let noFighte = false;
let noAnim = false;


export class Enemy extends Fighters {
    constructor(x, y, name) {
        super(x, y, name);
        this.image = new Image();
        this.image.src;
        this.name = 'Roper';
        this.frameInterval = 20;
        this.frameIndex = 0;
        this.frameTime = 0;
        this.lifeRoper = 100;
        this.secondLife = false;
        this.speed = 0.4;
        this.attackCooldown = 0;
        this.direction = '';
        this.animations = [];
        this.damageCooldown = 0;
        this.isHit = false;
        this.isDead = false;
        this.hitFrameTime = 0;
        this.punchZone = null;
        this.punchTime = 0;
        this.nextLife = false;
        this.lastAttackTime = 0;
        this.blinkFrame = 0;
        this.blinkTime = 30;
        this.visible = true;
        this.countLife = 0;
    }

    update(player) {
        this.frameTime++;
        if (this.frameTime >= this.frameInterval) {
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

        lifeRoper.style.display = 'none';

        if(player.x >= this.x - 120) {
            lifeRoper.style.display = 'flex';
        };

        super.update();

        if (player.isDeadBilly === true) {
            noFighte = true;
            setTimeout(() => {
                if(player.isDeadBilly === false) {
                    noFighte = false;
                };

            }, 2000);

        };

        if (noFighte === true) {
            return;
        };
    
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (billyLife === true) {
           this.frameTime++;
        if (this.frameTime >= this.frameInterval) {
            this.frameTime = 0;
            this.frameIndex = (this.frameIndex + 1) % this.animations.length;
        }

        };

        if (billyLife === true) {

        if (distance >= 120 && this.direction === 'left') {
            lifeRoper.style.display = 'none';
            this.image.src = 'img/Roper.png';
            this.animations = [
               [76, 44, 28, 64],
               [112, 46, 17, 64],
               [137, 46, 21, 64],
               [166, 46, 28, 64],

        ];

        if (this.x >= 900) {
            this.x = 900;
            this.image.src = 'img/Roper left.png';
            this.animations = [
                [560, 44, 28, 64],
            ];

        };
            this.x += this.speed;
            return;
    
        };

        if(distance >= 120 && this.direction === 'right') {
            lifeRoper.style.display = 'none';
            this.image.src = 'img/Roper left.png';
            this.animations = [
                [560, 44, 28, 64],
                [535, 46, 17, 64],
                [506, 46, 21, 64],
                [470, 46, 28, 64],

            ];

            if(this.x <= 900) {
                this.x = 900;
                this.image.src = 'img/Roper.png';
                this.animations = [
                   [76, 44, 28, 64],
                ];
            };

            this.x -= this.speed;
            return;
        };

        if (this.direction === 'left' && distance >= 21 ||
            this.direction === 'right' && distance >= 35
        ) { 
            if(stopAnimation === true) return;
            this.x += this.speed * Math.sign(dx);
            this.y += this.speed * Math.sign(dy);
        } else {
            if (this.attackCooldown <= 0) {
                this.attackCooldown = 60;
            }
        }

        if (this.attackCooldown > 0) {
            this.attackCooldown--;
        };

        };

        const respounRandom = Math.floor(Math.random() * (1510 - 1200 + 1)) + 1200;

        if(player.lifeBilly <= 0 && this.x > player.x) {
            this.direction = 'right';
            this.punchZone = null;
            this.image.src = 'img/Roper.png';
            this.animations = [
                [76, 44, 28, 64],
                [112, 46, 17, 64],
                [137, 46, 21, 64],
                [166, 46, 28, 64],
            ];

            this.x += this.speed + 1;
            if(this.x > player.x + 95) {
                this.direction = 'left';
                this.x = player.x + 95;
                this.image.src = 'img/Roper left.png';
                this.animations = [
                    [560, 44, 28, 64],
                ];
            };

            return;
        };

        if (player.lifeBilly <= 0 && this.x < player.x ) {
            this.punchZone = null;
            this.direction = 'left';
            this.image.src = 'img/Roper left.png';
            this.animations = [
                [560, 44, 28, 64],
                [535, 46, 17, 64],
                [506, 46, 21, 64],
                [470, 46, 28, 64],
            ];

            this.x -= this.speed + 1;
            if(this.x < player.x - 95) {
                this.direction = 'left';
                this.x = player.x - 95;
                this.image.src = 'img/Roper.png';
                this.animations = [
                    [76, 44, 28, 64],
                ];
            };

            return;
        };

                     //Left go
       if (this.x > player.x) {
        this.direction = 'left';
        setTimeout(() => {
            billyLife = true;
        }, 2000);
            
        if (player.lastLife === true) {
                this.image.src = 'img/Roper left.png';
                this.animations = [
                    [560, 44, 28, 64],
                ];

            };

        this.image.src = 'img/Roper left.png';
        this.animations = [
          [560, 44, 28, 64],
          [535, 46, 17, 64],
          [506, 46, 21, 64],
          [470, 46, 28, 64],

        ];

            //   Roper атакует рукой левая сторона
        this.direction = 'left';
        if (distance <= 21 ) {
            animations = true;
            this.animations = [
                [560, 44, 28, 64],
            ];
                this.image.src = 'img/Roper left.png';
                this.animations = [
                    [631, 123, 25, 64],
                    [578, 124, 45, 64],
                    [543, 125, 27, 64],
                    [489, 125, 46, 64],
                    [453, 124, 27, 64],
                ];

            };

            setTimeout(() => {
                animations = false;
            }, 30);
     };

              //Идет в право
     if(this.x < player.x) {
        this.direction = 'right';
        this.image.src = 'img/Roper.png';
        this.animations = [
          [76, 44, 28, 64],
          [112, 46, 17, 64],
          [137, 46, 21, 64],
          [166, 46, 28, 64],

        ];

            //Roper атакует рукой правая сторона
        this.direction = 'right';
        if (distance <= 35) {
            if(noFighte === true) return;
            animations = true;
            this.image.src = 'img/Roper.png';
                    this.animations = [
                        [8, 123, 25, 64],
                        [41, 124, 45, 64],
                        [94, 125, 27, 64],
                        [129, 125, 46, 64],
                        [183, 124, 27, 64],
                    ];
    
                };

            setTimeout(() => {
                animations = false;
            }, 30);

      };

            //   Получает урон 
      if (this.direction === 'left' && this.isHit === true) {
          if(noFighte === true) return;
          life.style.width = this.lifeRoper + '%';
          this.punchZone = null;
          this.image.src = 'img/Roper left.png';
            this.animations = [
                [629, 669, 27, 64],
                [565, 666, 24, 64],
            ];

            setTimeout(() => {
                this.isHit = false;
            }, 200);
            
            damageAttack.play();
    };

              //   Получает урон 
    if (this.direction === 'right' && this.isHit === true) { 
        if(noFighte === true) return;
        life.style.width = this.lifeRoper + '%';
        this.punchZone = null;
        this.image.src = 'img/Roper.png';
        this.animations = [
            [8, 669, 27, 64],
            [75, 666, 24, 64],
        ];

        setTimeout(() => {
            this.isHit = false;
        }, 200);
        
        damageAttack.play();

    };

    const now = Date.now();
 
    if (!this.punchZone && animations === true && now - this.lastAttackTime >= 600) {
        if (noDamage === true) return;
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
            y: this.y + 5,
            width: zoneWidth,
            height: zoneHeight
        };

        this.lastAttackTime = now;

        if(this.punchZone) {
            setTimeout(() => {
                this.punchZone = null;
            }, 200);
        }
    }

    if (this.punchTime > 0) {
        this.punchTime--;
        if (this.punchTime <= 0) {
            this.punchZone = null;
        };
    };

    if(this.direction === 'left' && this.lifeRoper <= 0) {
        this.countLife++;
        this.isHit = false;
        this.isDead = true;
        this.punchZone = null;
        this.image.src = 'img/Roper left.png';
        this.animations = [
           [306, 700, 48, 30],
        ];

        setTimeout(() => {
           if(this.countLife >= 2) {
             this.isDead = true;
             this.x = -500;
             this.lifeRoper = 0;
             lifeRoper.style.display = 'none';
             return;
           };

           this.isDead = false;
        //   this.x = respounRandom;
           this.x = player.x + 80;
           this.lifeRoper = 100;
           life.style.width = '100%';
        }, 3000);

        dedadRoperAudio.play();

    };

    if(this.direction === 'right' && this.lifeRoper <= 0) {
        this.countLife++;
        this.isHit = false;
        this.isDead = true;
        this.punchZone = null;
        this.image.src = 'img/Roper.png';
        this.animations = [
           [310, 700, 48, 30],
        ];

        setTimeout(() => {
            if(this.countLife >= 2) {
                this.isDead = true;
                this.punchZone = null;
                this.x = -500;
                this.lifeRoper = 0;
                lifeRoper.style.display = 'none';
                return;
            };

            this.isDead = false;
            //this.x = respounRandom;
            this.x = player.x - 80;
            this.lifeRoper = 100;
            life.style.width = '100%';
        }, 3000);

        dedadRoperAudio.play();

    };

    if(this.damageCooldown > 0) {
        this.damageCooldown--;
    };

    };

    takeDamage(amount) {
        this.isHit = true;
        if (this.damageCooldown > 0) return;
        this.lifeRoper -= amount;
        this.damageCooldown = 60;

        if(this.lifeRoper <= 0) {
            this.lifeRoper = 0;
        }
    };

    draw(ctx, cameraX, cameraY) {
        if(this.isDead && this.blinkTime <= 0) return;;
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

                  //Атака рукой появляется квадрат
        if (this.punchZone) {
            ctx.fillStyle = 'transparent';
            ctx.fillRect(
                this.punchZone.x - cameraX,
                this.punchZone.y - cameraY,
                this.punchZone.width,
                this.punchZone.height
            );
        };
    };
    
};



