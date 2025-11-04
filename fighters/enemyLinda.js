import { Enemy } from "./enemyRoper.js";

const life = document.querySelector('#linda');
const dedadLinda = document.querySelector('.deadLinda');
const damagePunch = document.querySelector('.damageAttack');
const respounRandom = Math.floor(Math.random() * 1300 - 800) + 800;
const lifeLinda = document.querySelector('.lifeLinda');

export class Linda extends Enemy {
    constructor(x, y, name) {
        super(x, y, name);
        this.x = x;
        this.y = y;
        this.lifeLinda = 100;
        this.width = 25;
        this.height = 64;
        this.name = 'Linda';
        this.image = new Image();
        this.image.src = '';
        this.lifeLinda = 100;
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
        this.blinkFrame = 0;
        this.blinkTime = 30;
        this.visible = true;
        this.enemy = true;
        this.countLife = 0;
        this.visibleLife = false;
    }
    
    update(player, enemyWillams) {
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
            }
            return;
        };

        life.style.width = this.lifeLinda + '%';

        if(player.x >= 390) {
            this.visibleLife = true;
        };

        lifeLinda.style.display = 'none';

        if(this.visibleLife === true) {
            lifeLinda.style.display = 'flex';
        };


        if (this.x < player.x) {
            this.direction = 'right';
        } else {
            this.direction = 'left';
        };

        const isCollidingX = this.x < player.x + player.width &&
        this.x + this.width > player.x;
        const isSamePlaneY = Math.abs(this.y - player.y);
        const now = Date.now();
    
        if(player.lifeBilly <= 0 && this.direction === 'right' && this.enemy === false) {
            this.punchZone = null;
            this.image.src = 'img/dd_LINDAleft.png';
            this.animations = [
                [649, 36, 24, 61],
                [625, 36, 16, 61],
                [598, 36, 19, 61],
                [566, 37, 24, 60],

            ];
    
            this.x -= this.speed;
            if(this.x <= player.x - 80) {
                this.x = player.x - 80;
                this.image.src = 'img/dd_LINDA.png';
                this.animations = [
                    [128, 36, 19, 61],
                ];
    
            };
    
            return;
        };
    
        if(player.lifeBilly <= 0 && this.direction === 'left' && this.enemy === false) {
            this.punchZone = null;
            this.image.src = 'img/dd_LINDA.png';
            this.animations = [
                [72, 36, 24, 61],
                [104, 36, 16, 61],
                [128, 36, 19, 61],
                [155, 37, 24, 60],
            ];
    
            this.x += this.speed;
            if(this.x >= player.x + 80) {
                this.x = player.x + 80;
                this.image.src = 'img/dd_LINDAleft.png';
                this.animations = [
                    [649, 36, 24, 61],
                ];
    
            };
    
            return;
        };
    
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        //    //   Linda обходит с права на лево
        //if(enemyWillams.isAttack === true && enemyWillams.direction === 'left') {
        //    this.y += this.speed;
        //    if(this.y >= player.y + 3) {
        //        this.y = player.y + 3;
        //        this.x -= this.speed;
        //        if(this.x <= player.x - 24) {
        //            this.x = player.x - 24;
        //            this.image.src = 'img/dd_LINDA.png';
        //            this.animations = [
        //                [72, 36, 24, 61],
        //            ];

        //            this.image.src = 'img/dd_LINDA.png';
        //            this.animations = [
        //                [8, 115, 28, 60],
        //                [44, 114, 47, 61],
        //                [99, 114, 29, 61],
        //            ];

        //            this.direction = 'right';

        //            if (isCollidingX && isSamePlaneY && now - this.lastAttackTime >= 500) {
    
        //                const zoneWidth = 5;
        //                const zoneHeight = 5;
        //                let zoneX;
                        
        //                if (this.direction === 'left') {
        //                    zoneX = this.x - zoneWidth;
        //                } else {
        //                    zoneX = this.x + this.width + 10;
        //                };
                
        //                this.punchZone = {
        //                    x: zoneX - 4,
        //                    y: this.y + 8,
        //                    width: zoneWidth,
        //                    height: zoneHeight
        //                };
                
        //                this.lastAttackTime = now;
                
        //                if(this.punchZone) {
        //                    setTimeout(() => {
        //                        this.punchZone = null;
        //                    }, 200);
        //                };
        //            };
                
        //            if (this.punchTime > 0) {
        //                this.punchTime--;
        //                if (this.punchTime <= 0) {
        //                   this.punchZone = null;
        //                };
                
        //            };

        //        };
        //    }
        //    return;
        //};
        
            //   Linda обходит с лево  на право
        if(enemyWillams.isAttack === true && enemyWillams.direction === 'right') {
            //if(enemyWillams.lifeWillams <= 0) {
            //    this.x += this.speed;
            //    this.image.src = 'img/dd_LINDA.png';
            //    this.animations = [
            //        [72, 36, 24, 61],
            //        [104, 36, 16, 61],
            //        [128, 36, 19, 61],
            //        [155, 37, 24, 60],
            //    ];

            //    if(this.x >= player.x + 30) {
            //        this.x = player.x + 30;
            //        this.image.src = 'img/dd_LINDAleft.png';
            //        this.animations = [
            //            [709, 115, 28, 60],
            //            [654, 114, 47, 61],
            //            [617, 114, 29, 61],
            //        ];
            //    };

            //    return;
            //};

            //this.y += this.speed;
            //if(this.y >= player.y + 2) {
            //    this.y = player.y + 2;
            //    this.x += this.speed;
            //    if(this.x >= player.x + 25) {
            //        this.x = player.x + 25;
            //        this.image.src = 'img/dd_LINDAleft.png';
            //        this.animations = [
            //            [649, 36, 24, 61],
            //        ];

            //        this.image.src = 'img/dd_LINDAleft.png';
            //        this.animations = [
            //            [709, 115, 28, 60],
            //            [654, 114, 47, 61],
            //            [617, 114, 29, 61],
            //        ];

            //        this.direction = 'left';

            //        if (isCollidingX && isSamePlaneY && now - this.lastAttackTime >= 500) {
    
            //            const zoneWidth = 5;
            //            const zoneHeight = 5;
            //            let zoneX;
                        
            //            if (this.direction === 'left') {
            //                zoneX = this.x - zoneWidth;
            //            } else {
            //                zoneX = this.x + this.width + 10;
            //            };
                
            //            this.punchZone = {
            //                x: zoneX - 4,
            //                y: this.y + 8,
            //                width: zoneWidth,
            //                height: zoneHeight
            //            };
                
            //            this.lastAttackTime = now;
                
            //            if(this.punchZone) {
            //                setTimeout(() => {
            //                    this.punchZone = null;
            //                }, 200);
            //            };
            //        };
                
            //        if (this.punchTime > 0) {
            //            this.punchTime--;
            //            if (this.punchTime <= 0) {
            //               this.punchZone = null;
            //            };
                
            //        };

            //    };
            //}
            //return;
        };

        // Проверка столкновения с enemyWillams
        const willamsCollisionX =
        this.x < enemyWillams.x + enemyWillams.width &&
        this.x + this.width > enemyWillams.x;
        
        const willamsCollisionY = Math.abs(this.y - enemyWillams.y) < 40;
        
        const isCollidingWithWillams = willamsCollisionX && willamsCollisionY;

        if(distance >= 120 && this.direction === 'right') {
            lifeLinda.style.display = 'none';
            this.direction = 'left';
            this.image.src = 'img/dd_LINDAleft.png';
            this.animations = [
                [649, 36, 24, 61],
                [625, 36, 16, 61],
                [598, 36, 19, 61],
                [566, 37, 24, 60],

            ];
    
            this.x -= this.speed;
            if(this.x <= 500) {
                this.x = 500;
                this.image.src = 'img/dd_LINDA.png';
                this.animations = [
                    [72, 36, 24, 61],
                ];
            }
            return;
        }
    
        if(distance >= 120 && this.direction === 'left' ) {
            lifeLinda.style.display = 'none';
            this.direction = 'right';
            this.image.src = 'img/dd_LINDA.png';
            this.animations = [
                [72, 36, 24, 61],
                [104, 36, 16, 61],
                [128, 36, 19, 61],
                [155, 37, 24, 60],
            ];
    
            this.x += this.speed;
            if(this.x >= 500) {
                this.x = 500;
                this.image.src = 'img/dd_LINDAleft.png';
                this.animations = [
                    [649, 36, 24, 61],
                ];
            };
            return;
        };
    
        if(this.direction === 'left' && distance >= 24 || 
            this.direction === 'right' && distance >= 25
        ) {
            if(!isCollidingWithWillams) {
               this.x += this.speed * Math.sign(dx);
            }

              this.y += this.speed * Math.sign(dy);
        };
    
        // Двигаемся
        if (player.x < this.x && this.direction === 'left') {
            if(this.stopAnimation === true) return;
            this.image.src = 'img/dd_LINDAleft.png';
            this.animations = [
                [649, 36, 24, 61],
                [625, 36, 16, 61],
                [598, 36, 19, 61],
                [566, 37, 24, 60],

            ];
    
              //Удар рукой левая сторона
            if (distance <= 24 && this.direction === 'left') {
                this.enemy = false;
                this.image.src = 'img/dd_LINDAleft.png';
                this.animations = [
                    [709, 115, 28, 60],
                    [654, 114, 47, 61],
                    [617, 114, 29, 61],
                ];
            };
    
        } else if (player.x > this.x && this.direction === 'right') {
            if(this.stopAnimation === true) return;
            this.image.src = 'img/dd_LINDA.png';
            this.animations = [
                [72, 36, 24, 61],
                [104, 36, 16, 61],
                [128, 36, 19, 61],
                [155, 37, 24, 60],
            ];
        };
    
            //Удар рукой правая сторона
        if (distance <= 25 && this.direction === 'right') {
            this.enemy = false;
            this.image.src = 'img/dd_LINDA.png';
            this.animations = [
                [8, 115, 28, 60],
                [44, 114, 47, 61],
                [99, 114, 29, 61],
            ];
        }
            //  Умерает Linda
        if (this.lifeLinda <= 0 && this.direction === 'right') {
            this.countLife++;
            this.isDead = true;
            this.isHit = false;
            this.punchZone = null;
            this.image.src = 'img/dd_LINDA.png';
            this.animations = [
                [376, 305, 46, 27],
            ];
            
            setTimeout(() => {
                if(this.countLife >= 2) {
                    this.isDead = true;
                    this.punchZone = null;
                    this.x = -500;
                    this.lifeLinda = 0;
                    dedadLinda.play();
                    setTimeout(() => {
                        dedadLinda.pause();
                    }, 500);

                    lifeLinda.style.display = 'none';
    
                    return;
                };
    
                this.isDead = false;
                this.x = player.x - 80;
                this.lifeLinda = 100;
    
            }, 3000);

            dedadLinda.play();
            setTimeout(() => {
                dedadLinda.pause();
            }, 500);
        
        };
        
        if (this.lifeLinda <= 0 && this.direction === 'left') {
            this.countLife++;
            this.isHit = false;
            this.isDead = true;
            this.punchZone = null;
            this.image.src = 'img/dd_LINDAleft.png';
            this.animations = [
                [323, 305, 46, 27],
            ];
    
            setTimeout(() => {
                if(this.countLife >= 2) {
                    this.isDead = true;
                    this.punchZone = null;
                    this.x = -500;
                    this.lifeLinda = 0;
                    dedadLinda.play();
                    setTimeout(() => {
                        dedadLinda.pause();
                    }, 500);

                    lifeLinda.style.display = 'none';
    
                    return;
                };
    
                this.isDead = false;
                this.x = player.x - 80;
                this.lifeLinda = 100;
    
            }, 3000);

            dedadLinda.play();
            setTimeout(() => {
                dedadLinda.pause();
            }, 500);
        
        };
    
        if(this.isHit === true && this.direction === 'right') {
            this.isHit = false;
            this.punchZone = null;
            this.image.src = 'img/dd_LINDA.png';
            this.animations = [
                [8, 270, 25, 62],
                [73, 269, 21, 63],
            ];
            
            damagePunch.play();
        };
    
        if(this.isHit === true && this.direction === 'left') {
            this.isHit = false;
            this.punchZone = null;
            this.image.src = 'img/dd_LINDAleft.png';
            this.animations = [
                [712, 270, 25, 62],
                [651, 269, 21, 63],
            ];

            damagePunch.play();
    
        };
        
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
            this.lifeLinda -= amount;
            this.damageCooldown = 60;
    
            if(this.lifeLinda <= 0) {
                this.lifeLinda = 0;
            }
        }
    
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
