import { Fighters } from "./figters.js";

const gameover = document.querySelector('.gameover');
const btn = document.querySelector('#btn');
const life = document.querySelector('.life');
const damageAttack = document.querySelector('.damageAttack');
const jumpBilly = document.querySelector('.jump');
const deadAudio = document.querySelector('.deadBilly');

let setka = false;
let fixedY = false;
let animation = false;
let nofight = false;
let noMove = false;

export class Billy extends Fighters {
    constructor(x, y) {
        super(x, y);
        this.name = 'Billy';
        this.image = new Image();
        this.image.src = 'img/Billy One.png';
        this.damagePunch = 20;
        this.damageKick = 50;
        this.x = x;
        this.y = y;
        this.lifeBilly = 100;
        this.gravity = 0.4;
        this.width = 24;
        this.height = 64;
        this.speed = 1;
        this.frameIndex = 0;
        this.frameTimer = 0;
        this.frameInterval = 6;
        this.velocity = 0;
        this.isJumping = false;
        this.jumpStartY = this.y;
        this.attackZone = null;
        this.attackTime = 0;
        this.kickZone = null;
        this.kickTimer = 0;
        this.animations = [];
        this.isHit = false;
        this.isDeadBilly = false;
        this.damageCooldown = 0;
        this.secondLife = false;
        this.lastLife = false;
        this.isFace = false;
    };

    update(keys, womens, enemyRoper, enemyWillams, bossAbobo) {
        if (this.isDeadBilly === true) {
            noMove = true;
            return;
        };

                // Лезит по решотке
        const onGrid = (this.x >= 1408 && this.x <= 1526 && this.y <= 360 );

                //  Лезит по лестнице
        const onDrap = (this.x >= 1607 && this.x <= 1622 && this.y <= 305);

        if (onGrid) {
            keys.rCrocc = false;
            keys.lkick = false;
            keys.jump = false;
        };

        if (onGrid && this.x <= 1408 && this.y <= 361 && this.y >= 299) {
            this.x = 1409;
        };

        if (onGrid && this.y <= 300) {
            this.y = 300;
        };

        if (onGrid) {
            fixedY = true;
            this.image.src = 'img/Billy Lee.png';
            this.animations = [
                [16, 174, 22, 62],
                [46, 175, 24, 63],
                [78, 174, 24, 63],
                [110, 175, 21, 63],
                [139, 174, 22, 62],
            ];

        } else {
            fixedY = false;
        };

                // Ограничения по высоте и ширине
        
        if (this.y >= 430) {
            this.y = 430;
        }

        if (this.x >= 0 && this.x <= 1024 && this.y <= 367) {
            this.y = 367;
        };

        if (this.x >= 1024 && this.x <= 1304 && this.y <= 322 && fixedY === false) {
            this.y = 322;
        }

        if (this.x >= 1290 && this.x <= 1295 && this.y <= 326 && fixedY === false) {
            this.x = 1290;
        }

        if (this.x >= 1294 && this.y <= 360 && this.y >= 330 && fixedY === false) {
            this.y = 364;
        }

        if (this.x >= 1533 && this.y >= 358 && this.y <= 388) {
            this.x = 1533;
        };

        if (this.x >= 1529 && this.x <= 1611 && this.y <= 304) {
               this.y = 304;
        };

        if (this.x >= 1563 && this.x <= 1646 && this.y >= 325 && this.y <= 326) {
            this.y = 325;
        };

        if (this.x <= 1563 && this.x >= 1562 && this.y <= 325 && this.y >= 320) {
            this.x = 1563;
        };

        if (this.x <= 1551 && this.x >= 1550 && this.y >= 309 && this.y <= 320) {
            this.x = 1551;
        };

        if (this.x >= 1622 && this.x <= 1623 && this.y <= 325 && this.y >= 258 ) {
            this.x = 1622;
        };

        if (this.x >= 1607 && this.x <= 1622 && this.y <= 255) {
            this.y = 255;
        };

        if (this.x >= 1624 && this.x <= 1717 && this.y <= 257) {
            this.y = 257;
        };

        if (this.x >= 1709 && this.x <= 1915 && this.y >= 328) {
            this.y = 328;
        };

        if (this.x <= 1637 && this.x >= 1636 && this.y >= 262 && this.y <= 270) {
            this.x = 1637;
        };

        if (this.x <= 1650 && this.x >= 1649 && this.y >= 270 && this.y <= 280) {
            this.x = 1650;
        };

        if (this.x <= 1657 && this.x >= 1656 && this.y >= 280 && this.y <= 290) {
            this.x = 1657;
        };

        if (this.x <= 1672 && this.x >= 1671 && this.y >= 290 && this.y <= 300) {
            this.x = 1672;
        };

        if (this.x <= 1687 && this.x >= 1686 && this.y >= 300 && this.y <= 315) {
            this.x = 1687;
        };

        if (this.x <= 1700 && this.x >= 1699 && this.y >= 315 && this.y <= 330) {
            this.x = 1700;
        };

        if (this.x >= 1913 && this.x <= 1914 && this.y >= 315 && this.y <= 328) {
            this.x = 1913;
        };

        if (this.x >= 1860 && this.x <= 1913 && this.y <= 315) {
            this.y = 315;
        };

        if (this.x >= 1810 && this.x <= 1860 && this.y <= 308) {
            this.y = 308;
        };

        if (this.x >= 1743 && this.x <= 1800 && this.y <= 292 && this.y >= 291) {
            this.y = 292;
        };

        if (this.x >= 1710 && this.x <= 1711 && this.y >= 257 && this.y <= 266) {
            this.x = 1710;
        };

        if (this.x >= 1716 && this.x <= 1717 && this.y >= 266 && this.y <= 274) {
            this.x = 1716;
        };

        if (this.x >= 1740 && this.x <= 1741 && this.y >= 274 && this.y <= 292) {
            this.x = 1740;
        };

        if (this.x >= 1732 && this.x <= 1743 && this.y <= 282) {
            this.y = 282;
        };

        if (this.x >= 1725 && this.x <= 1732 && this.y <= 280) {
            this.y = 280;
        };

        if (this.x >= 1718 && this.x <= 1725 && this.y <= 272) {
            this.y <= 272;
        };

        if (onDrap) {
            this.image.src = 'img/Billy Lee.png';
            this.animations = [
                [16, 174, 22, 62],
                [46, 175, 24, 63],
                [78, 174, 24, 63],
                [110, 175, 21, 63],
                [139, 174, 22, 62],
            ];
        };

                //  Падает в яму
        if (this.y >= 391 && this.x >= 1576 ) {
            this.x = 1576;
            this.image.src = 'img/Billy Lee left.png';
            this.animations = [
                [292, 1010, 47, 45],
            ];

            setTimeout(() => {
                this.x = 1500;
                this.y = 400;
            }, 400);
            
        };

        setTimeout(() => {
            this.image.src = 'img/Billy Lee.png';
            this.animations = [
                [15, 94, 22, 64],
            ];
            
        }, 40);

        if (this.isFace === true) {
            this.image.src = 'img/Billy Lee left.png';
            this.animations = [
                 [575, 95, 22, 64],

            ];
        };

        if(this.isFace === true && onGrid || this.isFace === true && onDrap) {
            fixedY = true;
            this.image.src = 'img/Billy Lee left.png';
            this.animations = [
                [541, 175, 24, 63],
                [509, 174, 24, 63],
                [480, 175, 21, 63],
                [450, 174, 22, 62],
            ];
            fixedY = false;
        };

        if (keys.left) {
            if(noMove === true) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                   [16, 174, 22, 62],
                ];
                return;
            };

            animation = true;
            if(onGrid || onDrap) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                    [573, 174, 23, 62],
                    [541, 175, 24, 63],
                    [509, 174, 24, 63],
                    [480, 175, 21, 63],
                    [450, 174, 22, 62],
                ];

                fixedY = false;

            } else {
                this.isFace = true;
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                    [575, 95, 22, 64],
                    [543, 95, 26, 64],
                    [511, 94, 25, 64],
                    [485, 96, 20, 63],
                ];
            }

        };

        if(this.isFace === false && onGrid) {
            fixedY = true;
            this.image.src = 'img/Billy Lee.png';
            this.animations = [
                [16, 174, 22, 62],
                [46, 175, 24, 63],
                [78, 174, 24, 63],
                [110, 175, 21, 63],
                [139, 174, 22, 62],
            ];
        }

        if (keys.right) {
            if(noMove === true) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                   [16, 174, 22, 62],
                ];
                return;
            };

            animation = true;
            this.isFace = false;
            if(onGrid || onDrap) {
                this.image.src = 'img/Billy Lee.png';
                this.animations = [
                   [16, 174, 22, 62],
                   [46, 175, 24, 63],
                   [78, 174, 24, 63],
                   [110, 175, 21, 63],
                   [139, 174, 22, 62],
                ];

            } else {
                this.image.src = 'img/Billy Lee.png';
                this.animations = [
                   //Move Right
                   [15, 94, 22, 64],
                   [43, 95, 26, 64],
                   [75, 94, 25, 64],
                   [107, 95, 20, 63],
                ];
            }
            
        };

        if (keys.up) {
            if(noMove === true) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                   [16, 174, 22, 62],
                ];
                return;
            };

            animation = true;
            if(onGrid && this.isFace === false || onDrap) {
                fixedY = true;
                this.image.src = 'img/Billy Lee.png';
                this.animations = [
                    [16, 174, 22, 62],
                    [46, 175, 24, 63],
                    [78, 174, 24, 63],
                    [110, 175, 21, 63],
                    [139, 174, 22, 62],
                ];

            } else {
                 this.image.src = 'img/Billy Lee.png';
                 this.animations = [
                     //Move UpRight
                    [158, 98, 23, 64],
                    [189, 97, 26, 64],
                    [223, 97, 26, 64],
                    [256, 98, 22, 64],
                ];
            }
           
        };

        if (this.isFace === true && keys.up) {
            if(noMove === true) return;
            animation = true;
            this.isFace = true;
            if (this.isFace === true && onGrid || onDrap) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                    [573, 174, 23, 62],
                    [541, 175, 24, 63],
                    [509, 174, 24, 63],
                    [480, 175, 21, 63],
                    [450, 174, 22, 62],
                ];

            } else {
               this.image.src = 'img/Billy Lee left.png';
               this.animations = [
                     //Move UpLeft
                    [430, 97, 24, 64],
                    [396, 97, 26, 64],
                    [362, 97, 26, 64],
                    [332, 98, 22, 64],
                ];
            }
            
        };

        if (keys.down) {
            if(noMove === true) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                   [16, 174, 22, 62],
                ];
                return;
            };

            animation = true;
            if(onGrid || onDrap) {
                fixedY = true;
                this.image.src = 'img/Billy Lee.png';
                this.animations = [
                    [16, 174, 22, 62],
                    [46, 175, 24, 63],
                    [78, 174, 24, 63],
                    [110, 175, 21, 63],
                    [139, 174, 22, 62],
                ];
            } else {
                this.image.src = 'img/Billy Lee.png';
                this.animations = [
                    //Move DownRight
                    [15, 94, 22, 64],
                    [43, 95, 26, 64],
                    [75, 94, 25, 64],
                    [107, 95, 20, 63],
                ];
            }
            
        };

        if (this.isFace === true && keys.down) {
            if(noMove === true) {
                this.image.src = 'img/Billy Lee.png';
                this.animations = [
                   [16, 174, 22, 62],
                ];
                return;
            };
            animation = true;
            if (onGrid || onDrap) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                    [573, 174, 23, 62],
                    [541, 175, 24, 63],
                    [509, 174, 24, 63],
                    [480, 175, 21, 63],
                    [450, 174, 22, 62],
                ];
            } else {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                    //Move DownLeft
                    [575, 95, 22, 64],
                    [543, 95, 26, 64],
                    [511, 94, 25, 64],
                    [485, 96, 20, 63],
                ];
            }
            
        };

        if (keys.rCrocc) {
            if(noMove === true) return;
            nofight = true;
            this.image.src = 'img/Billy Lee.png';
            this.animations = [
                  //Attack Hand Right
                [16, 280, 29, 64],
                [54, 280, 45, 64],
                [107, 280, 27, 64],
                [166, 279, 28, 63],
                [201, 281, 46, 63],
                [255, 281, 29, 63],
            ];
        };

        if (this.isFace === true && keys.rCrocc) {
            if(noMove === true) return;
            nofight = true;
            this.image.src = 'img/Billy Lee left.png';
            this.animations = [
                  //Attack Hand Left
                [566, 280, 29, 64],
                [512, 281, 46, 64],
                [477, 281, 27, 64],
                [418, 280, 27, 63],
                [364, 281, 47, 63],
                [328, 282, 28, 63],

            ];
        };

        if (keys.lkick) {
            if(noMove === true) return;
            nofight = true;
            this.image.src = 'img/Billy Lee.png';
            this.animations = [
                  //Attack LoweKick Right
                [16, 359, 25, 64],
                [49, 359, 39, 64],
            
            ];
        };

        if (this.isFace === true && keys.lkick) {
            if(noMove === true) return;
            nofight = true;
            this.image.src = 'img/Billy Lee left.png';
            this.animations = [
                  //Attack LoweKick Left
                [570, 359, 25, 64],
                [523, 359, 39, 64],
            ];
        };

                // Физика прыжка
        if (this.isJumping) {
            this.velocityY += this.gravity;
            this.y += this.velocityY;
        
            // Приземление: если вернулся примерно на исходную позицию
            if (this.y >= this.jumpStartY) {
                this.y = this.jumpStartY;
                this.velocityY = 0;
                this.isJumping = false;
            }
        };

        if (keys.jump) {
            if(noMove === true) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                   [16, 174, 22, 62],
                ];
                return;
            };
            this.image.src = 'img/Billy Lee.png';
            this.animations = [
                //Jump Right
                [16, 435, 28, 64],
                [52, 460, 37, 39],
                [52, 460, 37, 39],
                [52, 460, 37, 39],
                [52, 460, 37, 39],
            ];

            jumpBilly.play();
        };

        if (this.isFace === true && keys.jump) {
            if(noMove === true) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                   [16, 174, 22, 62],
                ];
                return;
            };

            this.image.src = 'img/Billy Lee left.png';
            this.animations = [
                //Jump Left
                [567, 435, 28, 64],
                [522, 460, 37, 39],
                [522, 460, 37, 39],
                [522, 460, 37, 39],
                [522, 460, 37, 39],
            ];

            jumpBilly.play();
        };

        const isMoving = keys.left || keys.up || keys.right || keys.down ||
         keys.rCrocc || keys.lkick || keys.jump;

        if (keys.left) this.x -= this.speed;
        if (keys.right) this.x += this.speed;
        if (keys.up) this.y -= this.speed;
        if (keys.down) this.y += this.speed;
        if (keys.jump && !this.isJumping) {
            this.velocityY = -6;
            this.isJumping = true;
            this.jumpStartY = this.y;
        };

        if (isMoving) {
            if(noMove === true) return;
            this.frameTimer++;
            if (this.frameTimer >= this.frameInterval) {
                this.frameTimer = 0;
                this.frameIndex = (this.frameIndex + 1) % this.animations.length;
            }

        } else {
            this.frameIndex = 0; // стоячий кадр
        };

            //Атака рукой появляется квадрат
        if (keys.rCrocc && this.attackTime <= 0) {
            const zoneWidth = 10;
            const zoneHeight = 10;
            const offset = this.isFace ? -zoneWidth : this.width;

            const zoneX = this.isFace
            ? this.x - zoneWidth
            : this.x + this.width + zoneWidth;
        
            this.attackZone = {
                x: zoneX - 5,
                y: this.y + 8,
                width: zoneWidth,
                height: zoneHeight
            };

            this.attackTime = 10;
        };

        if (this.attackTime > 0) {
            this.attackTime--;
            if (this.attackTime <= 0) {
                this.attackZone = null;
            }
        };

        //   Атака ногой квадрат
        if (keys.lkick && this.kickTimer <= 0) {
            const zoneWidth = 10;
            const zoneHeight = 15;
            const offset = this.isFace ? -zoneWidth : this.width;

            const zoneX = this.isFace
            ? this.x - zoneWidth
            : this.x + this.width + zoneWidth;

            this.kickZone = {
                x: zoneX - 4,
                y: this.y + 3,
                width: zoneWidth,
                height: zoneHeight
            };

            this.kickTimer = 10;
        }

        if (this.kickTimer > 0) {
            this.kickTimer--;
            if (this.kickTimer <= 0) {
                this.kickZone = null;
            }
        };

        if (this.damageCooldown > 0) {
            this.damageCooldown--;
        };

                //  Поцелуй
        if(womens.kiss === true) {
            noMove = true;
            this.image.src = 'img/Billy Lee left.png';
            this.animations = [
                [211, 1232, 25, 63],
                [180, 1232, 23, 63],
                [147, 1232, 25, 63]
            ];

        };

               // Анимация урона левая сторона
        if (this.x < enemyRoper.x && this.isFace === false && this.isHit === true ||
            this.x < enemyRoper.x && this.isFace === true && this.isHit === true
        ) {
            life.style.width = this.lifeBilly + '%';
            this.attackZone = null;
            this.kickZone = null;
            this.isHit = false;
            if(this.isFace === true) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                    [512, 851, 28, 64],
                    [572, 849, 23, 64],
                ];
            };
            
            if(this.isFace === false) {
                this.image.src = 'img/Billy Lee.png';
                this.animations = [
                    [71, 851, 28, 64],
                    [16, 849, 23, 64],
                ];
            };

            damageAttack.play();

        };

                // Анимация урона правая сторона
        if (this.x > enemyRoper.x && this.isFace === true && this.isHit === true ||
            this.x > enemyRoper.x && this.isFace === false && this.isHit === true
        ) {
            life.style.width = this.lifeBilly + '%';
            this.attackZone = null;
            this.kickZone = null;
            this.isHit = false;
            if(this.isFace === true) {
                this.image.src = 'img/Billy Lee left.png';
                this.animations = [
                    [512, 851, 28, 64],
                    [572, 849, 23, 64],
                ];
            };

            if(this.isFace === false) {
                this.image.src = 'img/Billy Lee.png';
                this.animations = [
                    [71, 851, 28, 64],
                    [16, 849, 23, 64],
                ];
            };
            
            damageAttack.play();

        };

    if(this.lifeBilly <= 0 && this.x < enemyRoper.x) {
            this.image.src = 'img/Billy Lee.png';
            this.animations = [
                    [127, 955, 47, 29],
                ];

            setTimeout(() => {
               this.isDeadBilly = true;
               gameover.classList.add('active');

            btn.addEventListener('click', () => {
            gameover.classList.remove('active');
            setTimeout(() => {
                noMove = false;
                this.isFace = false;
                this.isDeadBilly = false;
                this.lifeBilly = 100;
                life.style.width = '100%';
                this.x = 150;
            }, 600);

            });
    
            }, 3800);

        deadAudio.play();

    };

    if(this.lifeBilly <= 0 && this.x > enemyRoper.x) {
            this.image.src = 'img/Billy Lee left.png';
            this.animations = [
                    [437, 955, 47, 29],
                ];

                setTimeout(() => {
                    this.isDeadBilly = true;
                    gameover.classList.add('active');
     
                btn.addEventListener('click', () => {
                gameover.classList.remove('active');
                setTimeout(() => {
                     noMove = false;
                     this.isFace = false;
                     this.isDeadBilly = false;
                     this.lifeBilly = 100;
                     life.style.width = '100%';
                     this.x = 150;
                }, 600);
     
                });
         
                }, 3800);

        deadAudio.play();
    
    };

    };

    takeDamage(amount) {
        this.isHit = true;
        if (this.damageCooldown > 0) return;
        this.lifeBilly -= amount;
        this.damageCooldown = 60;

        if (this.lifeBilly <= 0) {
            this.lifeBilly = 0;
            setTimeout(() => {
              this.isDeadBilly = true;
            }, 1500)
            
        };
    };

    draw(ctx, cameraX, cameraY) {
        if (this.isDeadBilly === true) return;

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
        if (this.attackZone) {
            //ctx.fillStyle = 'red';
            ctx.fillRect(
                this.attackZone.x - cameraX,
                this.attackZone.y - cameraY,
                this.attackZone.width,
                this.attackZone.height
            );
        };

               //Атака ногой появляется квадрат
        if (this.kickZone) {
            ctx.fillStyle = 'transparent';
            ctx.fillRect(
                this.kickZone.x - cameraX,
                this.kickZone.y - cameraY,
                this.kickZone.width,
                this.kickZone.height
            );

        };

    };

};

