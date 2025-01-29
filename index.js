import { mapClass } from "./map.js";
// When the block is destroyed and becomes gress, The Hero go below the gress
// Maybe because we draw the map in index.js and bomberman.js
let mapSence = document.getElementById("map")
var enemycord = [-1, -1]


// This is Set NOT Get
function getenemycord(x, y) {
    enemycord[0] = x
    enemycord[1] = y
}


let enemysholdkill = false

// This is Set NOT Get
function getherocord(x, y) {
    herocord[0] = x
    herocord[1] = y
}


function killenemy(xa, xb, ya, yb) {
    return Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb))

}


let isboombed = false

let newseconede = 0


let mapboom = []

let tileSize = 32;
let mapX = 0
let mapY = -32

let tileImage = new Image
let blockImage = new Image
let greenBlockImage = new Image
let enemymoveemage = new Image

tileImage.src = `./assets/tile.png`
blockImage.src = `./assets/block.png`
greenBlockImage.src = `./assets/greenBlock.png`
enemymoveemage.src = `./assets/enemy.png`




//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

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

        getenemycord(this.pixelX / 32, this.pixelY / 32)

        if (enemysholdkill == true) {
            enemysholdkill = false
            // Do the animation then remove it 
            this.element.remove()
        }


        if (this.isMoving) return;

        let nextGridX = this.gridX;
        let nextGridY = this.gridY;

        // Calculate target grid position based on direction
        ///caculer 

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
        const NEXTPixelX = nextGridX * 32;
        const NEXTPixelY = nextGridY * 32;

        const moveTonext = () => {
            let ARREVETOTARGER = false;

            // Move towards target position
            if (this.pixelX < NEXTPixelX) {
                this.pixelX += this.moveSpeed;
            }
            if (this.pixelX > NEXTPixelX) {
                this.pixelX -= this.moveSpeed;
            }
            if (this.pixelY < NEXTPixelY) {
                this.pixelY += this.moveSpeed;
            }
            if (this.pixelY > NEXTPixelY) {
                this.pixelY -= this.moveSpeed;
            }
            // Check if ITS OK I ARRIVE TO MY GOAL TO MY TARGER 
            // THE DISTENCE BETWEN TO POINT XA AND XB ITS JUST  THE DEFFERENCE BETWEN |XA - XB|  CHEK MY FILE RAPPELEMATHEMATIQUE.TXT TO LEARN MORE 
            const diffX = Math.abs(this.pixelX - NEXTPixelX);
            const diffY = Math.abs(this.pixelY - NEXTPixelY);

            if (diffX < this.moveSpeed && diffY < this.moveSpeed) {
                // Snap to gr
                this.pixelX = NEXTPixelX;
                this.pixelY = NEXTPixelY;
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


class EnemyGenerator {
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

const heroConfig = {
    tileSize: 32,
    initialGridX: 1,
    initialGridY: 1,
    speed: 2
};

const directions = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
};

const keys = {
    ArrowUp: directions.up,
    ArrowDown: directions.down,
    ArrowLeft: directions.left,
    ArrowRight: directions.right
};








let level1 = new mapClass
level1.drawMap(mapArray)
//how much you want to contral the level
const h = new EnemyGenerator(mapSence, 100)















































































