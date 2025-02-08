import { enemyCoords } from "./index.js";
import { mapArray } from "./map.js";
import { directions, keys, heroConfig, greenBlockImage, boombimage, killTheEnemy} from "./index.js";

let mapSence = document.getElementById("map")

var herocord = [2, 2]
export var boombcord = [0, 0]

let isboombed = false

let newseconede = 0

let mapboom = []

// This is Set NOT Get
/*function setBombCoords(x, y) {
    boombcord[0]= x
    boombcord[1]= y
}*/


export function killenemy(xa, xb, ya, yb) {
    return Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb))

}

// This is Set NOT Get
/*function setHeroCoords(x, y) {
    herocord[0] = x
    herocord[1] = y
}*/

function killHero(xa, xb, ya, yb) {
    return (Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb)) < 1)
}


export class MapHero {

    constructor() {
        this.gridX = heroConfig.initialGridX;
        this.gridY = heroConfig.initialGridY;
        
        this.pixelX = this.gridX * heroConfig.tileSize;
        this.pixelY = this.gridY * heroConfig.tileSize;
        
        this.nextPixelX = this.gridX * heroConfig.tileSize;
        this.nextPixelY = this.gridY * heroConfig.tileSize;

        this.isMoving = false;
      

        this.heroImgages = {
            [directions.up]: new Image(),
            [directions.down]: new Image(),
            [directions.left]: new Image(),
            [directions.right]: new Image(),
            [directions.destroy]: new Image(),
        };

        this.heroImgages[directions.up].src = './assets/move_up.png';
        this.heroImgages[directions.down].src = './assets/move_down.png';
        this.heroImgages[directions.left].src = './assets/move_left.png';
        this.heroImgages[directions.right].src = './assets/move_right.png';
        this.heroImgages[directions.destroy].src = './assets/destroy_hero.png';

        this.heroWidth = 32;
        this.heroHeight = 32;
        this.currentDirection = directions.down;
        this.frameIndex = 0;
        this.stepCount = 0;
        this.stepsPerFrame = 5;

        this.element = document.createElement('div');
        this.element.style.width = `${heroConfig.tileSize}px`;
        this.element.style.height = `${heroConfig.tileSize}px`;
        this.element.style.position = "absolute";
        this.element.style.overflow = "hidden";

        mapSence.appendChild(this.element);
        
        this.pressedDirections = [];
        this.initializeControls();
        this.startGameLoop();
    }

    initializeControls() {
       
        document.addEventListener("keydown", (e) => {
            const dir = keys[e.key];
            const index = this.pressedDirections.indexOf(dir);
            if (dir && index === -1) {
                this.pressedDirections.unshift(dir);
                this.tryToMove();
            }
        });

        document.addEventListener("keyup", (e) => {
            const dir = keys[e.key];
            const index = this.pressedDirections.indexOf(dir);
            if (index > -1) {
                this.pressedDirections.splice(index, 1);
            }
        });
    }

    canMove(nextGridX, nextGridY) {
        if (mapArray[nextGridY][nextGridX] !== 1) {
            console.log("OUT OF MAP", mapArray[nextGridY][nextGridX]);
            return false;
        }else {
            return mapArray[nextGridY][nextGridX] === 1
        }
    }

    tryToMove() {
        if (this.isMoving) 
            return;
        const direction = this.pressedDirections[0];
        console.log("DIR=>", direction);

        let nextGridX = this.gridX;
        let nextGridY = this.gridY;
        
        if (!direction) 
            return;

        switch (direction) {
            case directions.right:
                nextGridX++;
                break;
            case directions.left:
                nextGridX--;
                break;
            case directions.down:
                nextGridY++;
                break;
            case directions.up:
                nextGridY--;
                break;
        }
        if (this.canMove(nextGridX, nextGridY)) {
            this.currentDirection = direction;
            this.isMoving = true;
            console.log("MOVE", this.isMoving);
            
            this.nextPixelX = nextGridX * heroConfig.tileSize;
            this.nextPixelY = nextGridY * heroConfig.tileSize;

            console.log("NPXCanmove=>", this.nextPixelX , "\nNPYCanmove=>", this.nextPixelY);
        }
        console.log("CAN MOVE", this.canMove(nextGridX, nextGridY));
    }

    moveHero() {
        if (!this.isMoving) 
            return;
      
        console.log("NPX=>", this.nextPixelX , "\nNPY=>", this.nextPixelY);
        
        const diffX = Math.abs(this.pixelX - this.nextPixelX);
        const diffY = Math.abs(this.pixelY - this.nextPixelY);
        console.log("diffX=>", diffX , "\ndiffY=>", diffY);
        
        
        if (this.pixelX < this.nextPixelX)
        {
            this.pixelX += heroConfig.speed;
            console.log("this.pixelX=>", this.pixelX);
        }
        if (this.pixelX > this.nextPixelX) 
            this.pixelX -= heroConfig.speed;
        if (this.pixelY < this.nextPixelY) 
            this.pixelY += heroConfig.speed;
        if (this.pixelY > this.nextPixelY) 
            this.pixelY -= heroConfig.speed;

        this.stepCount++;
        if (this.stepCount > this.stepsPerFrame) {
            this.stepCount = 0;
            this.frameIndex = (this.frameIndex + 1) % 3;
        }

        if (diffX < heroConfig.speed && diffY < heroConfig.speed) {
            this.pixelX = this.nextPixelX;
            this.pixelY = this.nextPixelY;
            this.gridX = Math.floor(this.pixelX / heroConfig.tileSize);
            this.gridY = Math.floor(this.pixelY / heroConfig.tileSize);
            this.isMoving = false;
            this.tryToMove();
        }
    }

    createBomb() {
        isboombed = true

        let Xboomb = Math.floor(this.x);
        let Yboomb = Math.floor(this.y);
        //setBombCoords(this.x / 32, this.y / 32)
        //console.log(setBombCoords(Xboomb, Yboomb));
        
        mapboom[(Math.floor((Xboomb) / 32), Math.floor((Yboomb) / 32))] = 1
        newseconede = new Date().getSeconds()

        let boomb = document.createElement('div');
        boomb.style.width = `${32}px`;
        boomb.style.height = `${32}px`;
        boomb.style.position = "absolute";
        boomb.style.overflow = "hidden";
        boomb.style.backgroundImage = `url(${boombimage.src})`
        boomb.style.transform = `translate3d(${Xboomb}px, ${Yboomb}px, 0px)`;

        mapSence.appendChild(boomb);

        setTimeout(() => {
            this.boombandbriks(Math.ceil(Xboomb / 32), Math.ceil(Yboomb / 32))
            this.boombandenemy(Xboomb / 32, Yboomb / 32)
            this.boombandhero((Xboomb) / 32, Yboomb / 32)
            mapboom[(Math.floor((Xboomb) / 32), Math.floor((Yboomb) / 32))] = 0
            boomb.remove();
        }, 3000);

    }

    boombandbriks(Xboomb, Yboomb) {

        let xbriks = -1
        let ybriks = -1
        let letsboomb = false

        if (mapArray[Yboomb + 1][Xboomb] === 2) {
            xbriks = Yboomb + 1
            ybriks = Xboomb
            letsboomb = true

        }
        if (mapArray[Yboomb][Xboomb + 1] === 2) {

            xbriks = Yboomb
            ybriks = Xboomb + 1
            letsboomb = true


        }
        if (mapArray[Yboomb - 1][Xboomb] === 2) {

            xbriks = Yboomb - 1
            ybriks = Xboomb

            letsboomb = true

        }
        if (mapArray[Yboomb][Xboomb - 1] === 2) {

            xbriks = Yboomb
            ybriks = Xboomb - 1
            letsboomb = true

        }
        if (letsboomb) {

            mapArray[xbriks][ybriks] = 1
            console.log(xbriks, ybriks, "DDDDdddd");
            
           let brickBombed = document.querySelector(`.canBomb_${ybriks*32}_${xbriks*32}`)
           brickBombed.style.backgroundImage = `url(${greenBlockImage.src})`
                     
        }
    }

    boombandenemy(Xboomb, Yboomb) {
        let xenemy = this.x / 32
        let yenemy = this.y / 32
        if (killenemy(Xboomb, xenemy, Yboomb, yenemy) < 100) {
            this.currentDirection = directions.destroyEnemy;
            console.log("ENEMY KILLED");    
        }
    }

    boombandhero(Xboomb, Yboomb) {
        let herox = this.x / 32
        let heroy = this.y / 32
        if (killHero(Xboomb, herox, Yboomb, heroy) ) {
            this.currentDirection = directions.destroy;
        }
    }


    render() {
        if (killHero(enemyCoords[0], this.gridX, enemyCoords[1], this.gridY)) {
            this.currentDirection = directions.destroy;
        }

        const curHeroDirection = this.heroImgages[this.currentDirection];
        this.element.style.backgroundImage = `url(${curHeroDirection.src})`;
        this.element.style.backgroundPosition = `-${this.frameIndex * this.heroWidth}px 0px`;
        this.element.style.transform = `translate3d(${this.pixelX}px, ${this.pixelY}px, 2px)`;
    }

    startGameLoop() {
        const gameLoop = () => {
            this.moveHero();
            this.render();
            window.requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }
}


