import { mapArray } from "./map.js";
import { SetEnemyCoords, killTheEnemy } from "./index.js";


class Enemy {
    constructor(x, y) {
        //setup grid then >>>(simple32) grid to pixel !
        this.gridX = Math.floor(x / 32);
        this.gridY = Math.floor(y / 32);

        this.pixelX = this.gridX * 32;
        this.pixelY = this.gridY * 32;
        this.element = this.createEnemyono();
        this.direction = this.getRandomDirection();
        this.moveSpeed = 2;
        this.moveInterval = null;
        this.isMoving = false;
    }

    createEnemyono() {
        let enemy = document.createElement("div");
        enemy.style.width = "32px";
        enemy.style.height = "32px";
        enemy.style.backgroundImage = `url(${"./assets/enemy.png"})`
        enemy.style.position = "absolute";
        enemy.style.transform = `translate3d(${this.pixelX}px, ${this.pixelY}px, 0px)`;
        return enemy;
    }



    getRandomDirection() {
        const validDirections = this.getValidDirections();
        // no chane if lenght 0
        //LENGHT==0 SO CONTINU SAME DIRECTION 
        if (validDirections.length === 0) {
            return this.direction;

        }
        return validDirections[Math.floor(Math.random() * validDirections.length)];
    }

    getValidDirections() {
        const directions = [];

        // Check if valid dirxection*4
        if (this.isValidCARE(this.gridX, this.gridY - 1)) {
            directions.push('up');
        }
        if (this.isValidCARE(this.gridX, this.gridY + 1)) {
            directions.push('down');
        }
        if (this.isValidCARE(this.gridX - 1, this.gridY)) {
            directions.push('left');
        }
        if (this.isValidCARE(this.gridX + 1, this.gridY)) {
            directions.push('right');
        }

        return directions;
    }

    isValidCARE(x, y) {
        //    ris valid if green
        if (mapArray[y][x] != 1) {
            return false
        } else {

            return mapArray[y][x] === 1; // if ok  if green !!!

        }
    }

    move() {

        SetEnemyCoords(this.pixelX / 32, this.pixelY / 32)

        if (killTheEnemy == true) {
            killTheEnemy = false
            // Do the animation then remove it 
            this.element.remove()
        }


        if (this.isMoving) return;

        let nextGridX = this.gridX;
        let nextGridY = this.gridY;

        // Calculate target grid position based on direction

        switch (this.direction) {
            case 'left': nextGridX--; break;
            case 'up': nextGridY--; break;
            case 'down': nextGridY++; break;
            case 'right': nextGridX++; break;
        }

        // Check if direction position valid
        if (!this.isValidCARE(nextGridX, nextGridY)) {
            this.direction = this.getRandomDirection();
            return;
        }

        // Start moving to target position SAME IPERATION FROM [] TO PIXEL JUST * 32 
        this.isMoving = true;
        const NextPixelX = nextGridX * 32;
        const NextPixelY = nextGridY * 32;

        const moveTonext = () => {
            let ARREVETOTARGER = false;

            // Move towards target position
            if (this.pixelX < NextPixelX) {
                this.pixelX += this.moveSpeed;
            }
            if (this.pixelX > NextPixelX) {
                this.pixelX -= this.moveSpeed;
            }
            if (this.pixelY < NextPixelY) {
                this.pixelY += this.moveSpeed;
            }
            if (this.pixelY > NextPixelY) {
                this.pixelY -= this.moveSpeed;
            }
            // Check if ITS OK I ARRIVE TO MY GOAL TO MY TARGER 
            // THE DISTENCE BETWEN TO POINT XA AND XB ITS JUST  THE DEFFERENCE BETWEN |XA - XB|  CHEK MY FILE RAPPELEMATHEMATIQUE.TXT TO LEARN MORE 
            const diffX = Math.abs(this.pixelX - NextPixelX);
            const diffY = Math.abs(this.pixelY - NextPixelY);

            if (diffX < this.moveSpeed && diffY < this.moveSpeed) {
                // Snap to gr
                this.pixelX = NextPixelX;
                this.pixelY = NextPixelY;
                this.gridX = nextGridX;
                this.gridY = nextGridY;
                ARREVETOTARGER = true;
            }

            this.update();

            if (ARREVETOTARGER) {
                this.isMoving = false;
            } else {
                // search how you can make it in the start of this func
                requestAnimationFrame(moveTonext);
            }
        };

        moveTonext();
    }

    update() {
        this.element.style.transform = `translate3d(${this.pixelX}px, ${this.pixelY}px, 0px)`;
    }

    startMoving() {

        setInterval(() => {
            if (!this.isMoving) {
                this.direction = this.getRandomDirection();
            }
            // }, Math.random() * 2000 + 1000);
        }, 500);

        this.moveInterval = setInterval(() => {
            if (!this.isMoving) {
                this.move();
            }
        }, 50);
    }
}


export class EnemyGenerator {
    constructor(map, numberOfEnemies) {
        this.map = map;
        this.enemies = [];
        this.numberOfEnemies = numberOfEnemies;
        this.init();
    }

    init() {
        for (let i = 0; i < this.numberOfEnemies; i++) {
            this.createEnemy();
        }
    }
    //as always grid then pixel operation >>>> *32
    createEnemy() {
        let x, y;
        do {
            x = Math.floor(Math.random() * (mapArray[0].length - 2)) + 1;
            y = Math.floor(Math.random() * (mapArray.length - 2)) + 1;
        } while (mapArray[y][x] !== 1);

        const enemy = new Enemy(x * 32, y * 32);
        this.enemies.push(enemy);
        this.map.appendChild(enemy.element);
        enemy.startMoving();

    }


}