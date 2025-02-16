import { mapArray } from "./map.js";
import { SetEnemyCoords, killTheEnemy, enemyCoords, gamePaused } from "./index.js";
import { bombCoords } from "./bomberman.js";




export class Enemy {
    constructor(x, y, z) {
        //setup grid then >>>(simple32) grid to pixel !
        this.gridX = Math.floor(x / 32);
        this.gridY = Math.floor(y / 32);
        this.nmr = z
        this.pixelX = this.gridX * 32;
        this.pixelY = this.gridY * 32;
        this.element = this.createEnemyono();
        this.direction = this.getRandomDirection();
        this.moveSpeed = 0.8;
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
        if (this.isValidGrid(this.gridX, this.gridY - 1)) {
            directions.push('up');
        }
        if (this.isValidGrid(this.gridX, this.gridY + 1)) {
            directions.push('down');
        }
        if (this.isValidGrid(this.gridX - 1, this.gridY)) {
            directions.push('left');
        }
        if (this.isValidGrid(this.gridX + 1, this.gridY)) {
            directions.push('right');
        }

        return directions;
    }

    isValidGrid(x, y) {
        //    ris valid if green
        if ((mapArray[y][x] != 1) || (bombCoords[0] == x && bombCoords[1] == y)) {
            return false
        } else {

            return mapArray[y][x] === 1; // if ok  if green !!!

        }
    }

    move() {

        SetEnemyCoords(this.pixelX / 32, this.pixelY / 32, this.nmr)

        if (enemyCoords[this.nmr].z == 1) {
            enemyCoords[this.nmr].z = 0

            // Do the animation then remove it 
            // this.element.remove()
            this.element.style.backgroundImage = `url(${"./assets/destroy_enemy.png"})`

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
        if (!this.isValidGrid(nextGridX, nextGridY)) {
            this.direction = this.getRandomDirection();
            return;
        }

        // Start moving to target position SAME IPERATION FROM [] TO PIXEL JUST * 32 
        this.isMoving = true;
        const NextPixelX = nextGridX * 32;
        const NextPixelY = nextGridY * 32;

        const moveToNext = () => {

            let arreveToTarget = false;

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
                arreveToTarget = true;
            }

            this.update();


            if (arreveToTarget) {
                this.isMoving = false;
            } else {

               requestAnimationFrame(moveToNext)

            }
        }
        moveToNext()

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
    }

    init() {
        let x = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            x.push(this.createEnemy(i + 1))
        }
        return x

    }
    //as always grid then pixel operation >>>> *32
    createEnemy(z) {
        let x, y;
        do {
            x = Math.floor(Math.random() * (mapArray[0].length - 2)) + 1;
            y = Math.floor(Math.random() * (mapArray.length - 2)) + 1;
        } while (mapArray[y][x] !== 1);

        const enemy = new Enemy(x * 32, y * 32, z);
        enemy.element.className = `enemy`
        this.enemies.push(enemy);
        this.map.appendChild(enemy.element);

        return enemy
    }

} 