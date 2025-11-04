import { Fighters } from "./figters.js";

const winsbg = document.querySelector('.winsbg');
const winer = document.querySelector('.winer');
const btnEnd = document.querySelector('.btnEnd');

export class Womens extends Fighters {
    constructor(x, y, name) {
        super(x, y, name);
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 61;
        this.name = 'Zhena';
        this.image = new Image();
        this.image.src = 'img/Marian_DD left.png';
        this.animations = [];
        this.frameIndex = 0;
        this.frameInterval = 10;
        this.frameTime = 0;
        this.speed = 0.3;
        this.kiss = false;
        this.stopAnimation = false;
        this.hardTime = 0;
        this.hardInterval = 10;
        this.hardIndex = 0;
        this.imageHard = new Image();
        this.imageHard.src = 'img/Marian_DD left.png';
        this.animHard = [
            [27, 187, 9, 8],
            [8, 184, 11, 11]
        ];
    }

    update(playerBilly, bossAbobo) {
        if(this.kiss === true) {
            this.hardTime++;
            if(this.hardTime >= this.hardInterval) {
                this.hardTime = 0;
                this.hardIndex = (this.hardIndex + 1) % 
                this.animHard.length;
            };
        };

        if(this.stopAnimation === true) return;

        this.frameTime++;
        if(this.frameTime >= this.frameInterval) {
           this.frameTime = 0;
           this.frameIndex = (this.frameIndex + 1) %
           this.animations.length;
        };

        const dx = playerBilly.x - this.x;
        const dy = playerBilly.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance >= 70) {
            this.image.src = 'img/Marian_DD.png';
            this.animations = [
                [153, 134, 21, 61],
                [182, 135, 17, 60],
                [207, 134, 20, 61],
                [235, 135, 21, 60]
            ];

            this.x += this.speed;
            if(this.x >= 1510) {
                this.x = 1510;
                this.y = 415;
                this.image.src = 'img/Marian_DD left.png';
                this.animations = [
                    [378, 156, 30, 39]
                ];
            };

            return;
        };

        if(bossAbobo.countLife >= 2 && playerBilly.x >= 1420) {
            this.x += this.speed * Math.sign(dx);
            this.y += this.speed * Math.sign(dy);
            this.image.src = 'img/Marian_DD left.png';
            this.animations = [
                [326, 134, 21, 61],
                [301, 135, 18, 60],
                [273, 134, 20, 61],
                [244, 135, 21, 60]
            ];

            if(distance <= 5) {
                this.kiss = true;
                this.y = playerBilly.y;
                this.image.src = 'img/Marian_DD left.png';
                this.animations = [
                    [189, 134, 23, 61],
                    [157, 134, 24, 61],
                    [126, 134, 23, 61],
                ];
                
                setTimeout(() => {
                    this.stopAnimation = true;
                }, 150);
                
                setTimeout(() => {
                    winsbg.classList.add('active');
                    winer.classList.add('active');
                }, 2500);

                btnEnd.addEventListener('click', () => {
                    winsbg.classList.remove('active');
                    winer.classList.remove('active');
                    location.reload();
                });
            };

        };

    }

    draw(ctx, cameraX, cameraY) {
        const frame = this.animations[this.frameIndex];
        const frameHard = this.animHard[this.hardIndex];
        if(!frame) return;
        if(!frameHard) return;
        const [sx, sy, sw, sh] = frame;
        const [hx, hy, hw, hh ] = frameHard;
        ctx.drawImage(
            this.image,
            sx, sy, sw, sh,
            this.x - cameraX + (this.width - sw) / 2,
            this.y - cameraY,
            sw, sh,
        );

        if(this.kiss === true) {
            ctx.drawImage(
                this.imageHard,
                hx, hy, hw, hh,
                this.x - cameraX - 10,
                this.y - cameraY - 10,
                hw, hh
            );
       };
    };
}