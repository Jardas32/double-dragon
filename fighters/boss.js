import { Fighters } from "./figters.js";

const lifeboss = document.querySelector('.lifeboss');
const deadBoss = document.querySelector('.deadEnemy');
const damageAttack = document.querySelector('.damageAttack');
const fightBoss = document.querySelector('.fightBoss');
const theEnd = document.querySelector('.theEnd');
const bossbg = document.querySelector('.bossbg');
const audioMission = document.querySelector('.audioMission');

export class Boss extends Fighters {
    constructor(x, y, name) {
        super(x, y, name);
        this.x = x;
        this.y = y;
        this.width = 28;
        this.height = 77;
        this.name = 'Boss';
        this.image = new Image();
        this.image.src = '';
        this.lifeBoss = 100;
        this.speed = 0.4;
        this.isDead = false;
        this.frameIndex = 0;
        this.frameInterval = 10;
        this.frameTime = 0;
        this.isHit = false;
        this.directions = '';
        this.animations = [];
        this.punchZone = null;
        this.punchTime = 0;
        this.damageCooldown = 0;
        this.lastAttackTime = 0;
        this.noMove = false;
        this.countLife = 0;
        this.blinkFrame = 0;
        this.blinkTime = 0;
        this.visible = true;
        this.enemyBoss = true;
        this.noBoss = true;
    }

    update(player, linda, roper, willams) {
        super.update();

        lifeboss.style.width = this.lifeBoss + '%';

        // Animations sprites
        this.frameTime++;
        if(this.frameTime >= this.frameInterval) {
           this.frameTime = 0;
           this.frameIndex = (this.frameIndex + 1) %
           this.animations.length;
        };

                //  Появление Boss
        if (player.x >= this.x - 120 && linda.countLife >= 2 &&
            roper.countLife >= 2 && willams.countLife >= 1
        ) {
            setTimeout(() => {
                this.enemyBoss = false;
                bossbg.style.display = 'flex';
                this.noBoss = true;
            }, 200);

            audioMission.pause();

            fightBoss.play();

        };

        if(this.countLife >= 2) {
            fightBoss.pause();
        };

            //  Dead Boss
        if(this.isDead === true) {
            this.blinkFrame++;
            if(this.blinkFrame % 10 === 0) {
                this.visible = !this.visible;
                this.blinkTime--;
            }
            return;
        };

            //  Directions
        if(this.x <= player.x) {
            this.directions = 'right';
            this.image.src = 'img/Boss.png';
            this.animations = [
                [8, 44, 28, 77]
            ];

        } else if (this.x >= player.x) {
            this.directions = 'left';
            this.image.src = 'img/BossLeft.png';
            this.animations = [
                [732, 44, 28, 77]
            ];
        };

        if(player.lifeBilly <= 0 && this.directions === 'left' && this.enemyBoss === false) {
            this.punchZone = null;
            this.image.src = 'img/Boss.png';
            this.animations = [
                [68, 44, 28, 77],
                [104, 50, 31, 71],
                [143, 46, 31, 75],
                [182, 49, 28, 72],
            ];

            this.x += this.speed;
            if(this.x >= player.x + 90) {
                this.x = player.x + 90;
                this.image.src = 'img/BossLeft.png';
                this.animations = [
                    [572, 459, 32, 83]
                ];
            };

            return;

        };

        if(player.lifeBilly <= 0 && this.directions === 'right' && this.enemyBoss === false) {
            this.punchZone = null;
            this.image.src = 'img/BossLeft.png';
            this.animations = [
                [732, 44, 28, 77],
                [693, 50, 31, 71],
                [654, 46, 31, 75],
                [618, 49, 28, 72],
            ];

            this.x -= this.speed;
            if(this.x <= player.x - 90) {
                this.x = player.x - 90;
                this.image.src = 'img/Boss.png';
                this.animations = [
                    [224, 459, 32, 83]
                ];
            };

            return;

        };

        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distantions = Math.sqrt(dx * dx + dy * dy);

                //Идет в лево за Билли
        if( distantions >= 100 && this.directions === 'right') {
            bossbg.style.display = 'none';
            //this.enemyBoss = false;
            //this.image.src = 'img/BossLeft.png';
            //this.animations = [
            //    [732, 44, 28, 77],
            //    [693, 50, 31, 71],
            //    [654, 46, 31, 75],
            //    [618, 49, 28, 72],
            //];

            //this.x -= this.speed;
            //if(this.x <= 1400) {
            //    this.x = 1400;
            //    this.image.src = 'img/Boss.png';
            //    this.animations = [
            //        [68, 44, 28, 77],
            //    ];
            //};

            //return;

        };

        //Идет в право за Билли
        if(distantions >= 100 && this.directions === 'left') {
            bossbg.style.display = 'none';
            this.image.src = 'img/Boss.png';
            this.animations = [
                [68, 44, 28, 77],
                [104, 50, 31, 71],
                [143, 46, 31, 75],
                [182, 49, 28, 72],
            ];

            this.x += this.speed;
            if(this.x >= 1400) {
                this.x = 1400;
                this.image.src = 'img/BossLeft.png';
                this.animations = [
                    [732, 44, 28, 77],
                ];
            };

            return;

        };
        
        if(distantions >= 24 && this.directions === 'left' ||
           distantions >= 24 && this.directions === 'right'
        ) {
            if(this.noBoss === false) return;
            if(this.noMove === true) return;
            if(player.lifeBilly <= 0) return;
            this.x += this.speed * Math.sign(dx);
            this.y += this.speed * Math.sign(dy);

            if(this.directions === 'left') {
                this.image.src = 'img/BossLeft.png';
                this.animations = [
                    [732, 44, 28, 77],
                    [693, 50, 31, 71],
                    [654, 46, 31, 75],
                    [618, 49, 28, 72],
                ];

            } else if(this.directions === 'right') {
                this.image.src = 'img/Boss.png';
                this.animations = [
                    [68, 44, 28, 77],
                    [104, 50, 31, 71],
                    [143, 46, 31, 75],
                    [182, 49, 28, 72],
                ];
            };

        } else {
                //  Boss удар с левой стороны
            if(this.directions === 'left') {
                this.enemyBoss = false;
               this.image.src = 'img/BossLeft.png';
               this.animations = [
                   [789, 230, 31, 73],
                   [722, 230, 59, 73],
                   [682, 230, 32, 73],
                   [644, 230, 30, 73],
                   [580, 230, 56, 73],
                   [541, 230, 31, 73],
                   [474, 230, 59, 73],
                   [434, 230, 32, 73]
               ];

                //  Boss удар с правой стороны
            } else if(this.directions === 'right') {
                this.enemyBoss = false;
                this.image.src = 'img/Boss.png';
                this.animations = [
                    [8, 230, 31, 73],
                    [47, 230, 59, 73],
                    [114, 230, 32, 73],
                    [154, 230, 30, 73],
                    [192, 230, 56, 73],
                    [256, 230, 31, 73],
                    [295, 230, 59, 73],
                    [362, 230, 32, 73]
                ];
            };

        };

        //Урон от Billy Left
        if(this.isHit === true && this.directions === 'left') {
            this.punchZone = null;
            this.animations = [
                [789, 559, 31, 75],
                [727, 558, 30, 76]
            ];

            setTimeout(() => {
                this.isHit = false;
            }, 200);
            
            if(this.lifeBoss <= 0 && this.directions === 'left') {
                this.countLife++;
                this.isDead = true;
                this.animations = [
                    [8, 584, 40, 50],
                ];
                this.blinkTime = 30;

                setTimeout(() => {
                    this.isDead = false;
                    this.lifeBoss = 100;
                    this.isHit = false;

                    if(this.countLife >= 2) {
                        this.isDead = true;
                        this.lifeBoss = 0;
                        this.punchZone = null;
                        this.animations = [
                           [301, 597, 59, 37]
                        ];
                        bossbg.style.display = 'none';
                        
                        fightBoss.pause();
                        deadBoss.play();
                        
                        setTimeout(() => {
                            theEnd.play();
                        }, 3000);

                    };

                }, 2000);

            };

            damageAttack.play();
            
        };

                //Урон от Billy Right
        if(this.isHit === true && this.directions === 'right') {
            this.punchZone = null;
            this.animations = [
                [8, 559, 32, 75],
                [71, 558, 30, 76]
            ];

            setTimeout(() => {
                this.isHit = false;
            }, 200);
            
            if(this.lifeBoss <= 0 && this.directions === 'right') {
                this.countLife++;
                this.isDead = true;
                this.animations = [
                    [780, 584, 40, 50]
                ];

                this.blinkTime = 30;

                setTimeout(() => {
                    this.isDead = false;
                    this.lifeBoss = 100;
                    this.isHit = false;

                    if(this.countLife >= 2) {
                        this.isDead = true;
                        this.lifeBoss = 0;
                        this.punchZone = null;
                        this.animations = [
                            [468, 597, 59, 37]
                        ];
                        bossbg.style.display = 'none';
                        
                        fightBoss.pause();
                        deadBoss.play();
                        
                        setTimeout(() => {
                            theEnd.play();
                        }, 2500);
                    };

                }, 2000);

            };

            damageAttack.play();
            
        };

        const isCollidingX = this.x < player.x + player.width &&
        this.x + this.width > player.x;
        const isSamePlaneY = Math.abs(this.y - player.y) < 5;
        const now = Date.now();
        
        if (isCollidingX && isSamePlaneY && now - this.lastAttackTime >= 500) {
            if(this.noBoss === false) return;

            const zoneWidth = 5;
            const zoneHeight = 5;
            let zoneX;
            
            if (this.directions === 'left') {
                zoneX = this.x - zoneWidth - 5;
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
        this.lifeBoss -= amount;
        this.damageCooldown = 60;

        if(this.lifeBoss <= 0) {
            this.lifeBoss = 0;
        }
    };

    draw(ctx, cameraX, cameraY) {
        if(this.noBoss === false) return;
        if(this.isDead && this.blinkTime <= 0) return;
        if(!this.visible) return;
        const frame = this.animations[this.frameIndex];
        if(!frame) return;
        const [sx, sy, sw, sh] = frame;

        ctx.drawImage(
            this.image,
            sx, sy, sw, sh,
            this.x - cameraX + (this.width - sw) / 2,
            this.y - cameraY - 10,
            sw, sh
        );

        if(this.punchZone) {
            ctx.fillStyle = 'transparent';
            ctx.fillRect(
                this.punchZone.x - cameraX,
                this.punchZone.y - cameraY,
                this.punchZone.width,
                this.punchZone.height,
            );
        };
    };
};