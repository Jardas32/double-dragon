
export class Fighters {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 64;
        this.name = name;
        this.isDead = false;

    }

    update() {

        if (this.y >= 430) {
            this.y = 430;
        }

        if (this.x >= 0 && this.x <= 1024 && this.y <= 367) {
            this.y = 367;
        };

        if (this.x >= 1024 && this.x <= 1304 && this.y <= 322 ) {
            this.y = 322;
        }

        if (this.x >= 1290 && this.x <= 1295 && this.y <= 326 ) {
            this.x = 1290;
        }

        if (this.x >= 1294 && this.y <= 360 && this.y >= 330 ) {
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

    }

    takeDamage(amount) {
        this.life -= amount;
        if (this.life <= 0) {
            this.life = 0;
            this.isDead = true;
        }
    };

    isColliding(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    };

    drawHealth(ctx, cameraX, cameraY) {
        ctx.fillRect(this.x - cameraX, this.y - 10 - cameraY, this.health, 5);
    }
}
