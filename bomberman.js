import { blockImage, enemyCoords, numbreofenemy } from "./index.js";
import { mapArray, mapClass } from "./map.js";
import { directions, keys, heroConfig, greenBlockImage, boombimage, } from "./index.js";
let nbrOfKilled = 0
let mapSence = document.getElementById("map")
let findDoor = false
let doorCoords = [-1, -1]


let isBombed = false


export let bombCoords = []


/* let line = document.createElement("div")

function creatline(xa, xb,ya, yb){
 
    let distence=32*Math.sqrt(((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb)))

    let xmid=(xa+xb)*32/2
    let ymid=(ya+yb)*32/2
    
    let salopeinradian=Math.atan2((-yb+ya),(-xb+xa))
     
    let salopindegrees=(salopeinradian*180)/3

   
    line.style.top = ymid+"px"
    line.style.left = (xmid-(distence/2))+"px"
    line.style.width = distence+"px"
    line.style.backgroundColor = "red"
    line.style.position = "absolute"
    line.style.height = "5px"
    line.innerHTML="______________________"+distence
    
    // line.innerHTML="______________________________________________"
    line.style.transform="rotate("+salopindegrees+"deg)"
    mapSence.appendChild(line)
    
    
    } */



export function killEnemy(xa, xb, ya, yb) {
    return Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb) < 2)

}


function killHero(xa, xb, ya, yb) {
    return (Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb)) < 2)
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


        this.heroImages = {
            [directions.up]: new Image(),
            [directions.down]: new Image(),
            [directions.left]: new Image(),
            [directions.right]: new Image(),
            [directions.destroy]: new Image(),
        };

        this.heroImages[directions.up].src = './assets/move_up.png';
        this.heroImages[directions.down].src = './assets/move_down.png';
        this.heroImages[directions.left].src = './assets/move_left.png';
        this.heroImages[directions.right].src = './assets/move_right.png';
        this.heroImages[directions.destroy].src = './assets/destroy_hero.png';

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

            if (e.code === "Space") {
                this.createBomb(this.gridX, this.gridY)
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

        if (mapArray[nextGridY][nextGridX] !== 1 || (bombCoords[0] == nextGridX && bombCoords[1] == nextGridY)) {

            return false;
        } else {
            return mapArray[nextGridY][nextGridX] === 1
        }
    }

    tryToMove() {
        if (this.isMoving)
            return;
        const direction = this.pressedDirections[0];

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

            this.nextPixelX = nextGridX * heroConfig.tileSize;
            this.nextPixelY = nextGridY * heroConfig.tileSize;

        }
    }

    moveHero() {


        if (this.gridX == doorCoords[0] && this.gridY == doorCoords[1] && nbrOfKilled == numbreofenemy) {

            let level1 = new mapClass
            level1.drawMap(mapArray)
        }


        if (!this.isMoving)
            return;


        const diffX = Math.abs(this.pixelX - this.nextPixelX);
        const diffY = Math.abs(this.pixelY - this.nextPixelY);


        if (this.pixelX < this.nextPixelX) {
            this.pixelX += heroConfig.speed;
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

    createBomb(x, y) {
        if (isBombed) {
            return
        }
        isBombed = true

        let Xboomb = 32 * (x);
        let Yboomb = 32 * (y);

        let boomb = document.createElement('div');
        boomb.style.width = `${32}px`;
        boomb.style.height = `${32}px`;
        boomb.style.position = "absolute";
        boomb.style.overflow = "hidden";
        boomb.style.backgroundImage = `url(${boombimage.src})`
        boomb.style.transform = `translate3d(${Xboomb}px, ${Yboomb}px, 0px)`;
        bombCoords[0] = (Xboomb / 32)
        bombCoords[1] = (Yboomb / 32)

        mapSence.appendChild(boomb);

        setTimeout(() => {
            this.createExplosion(Math.ceil(Xboomb / heroConfig.tileSize), Math.ceil(Yboomb / heroConfig.tileSize))
            this.boombBriks(Math.ceil(Xboomb / heroConfig.tileSize), Math.ceil(Yboomb / heroConfig.tileSize))

            this.boombEnemy(Xboomb / heroConfig.tileSize, Yboomb / heroConfig.tileSize)

            this.boombHero((Xboomb) / heroConfig.tileSize, Yboomb / heroConfig.tileSize)

            bombCoords[0] = -1
            bombCoords[1] = -1
            boomb.remove();
            isBombed = false
        }, 3000);


    }

    boombBriks(Xboomb, Yboomb) {

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

            let brickBombed = document.querySelector(`.canBomb_${ybriks * 32}_${xbriks * 32}`)

            if ((Math.random() < 0.3) && (findDoor == false)) {

                brickBombed.style.background = 'purple';
                findDoor = true
                doorCoords = [ybriks, xbriks]

            } else {
                brickBombed.style.backgroundImage = `url(${greenBlockImage.src})`

            }

        }
    }


    boombEnemy(Xboomb, Yboomb) {
        if (killEnemy(Xboomb, enemyCoords[0], Yboomb, enemyCoords[1])) {

            enemyCoords[3] = 1
            nbrOfKilled++
            console.log("killed", nbrOfKilled)
        }
    }


    boombHero(Xboomb, Yboomb) {
        let herox = this.gridX
        let heroy = this.gridY


        if (killHero(Xboomb, herox, Yboomb, heroy)) {

            this.currentDirection = directions.destroy;
        }
    }

    // PArtie de lexplosion
    createExplosion(gridX, gridY) {
        const directions = [
            { dx: 0, dy: -1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 }
        ];

        this.createImgExplosion(gridX, gridY);

        directions.forEach(dir => {
            const newX = gridX + dir.dx;
            const newY = gridY + dir.dy;

            if (mapArray[newY] && mapArray[newY][newX]) {
                this.createImgExplosion(newX, newY);
            }
        });
    }

    createImgExplosion(gridX, gridY) {
        const explo = document.createElement('div')
        explo.style.width = `${heroConfig.tileSize}px`
        explo.style.height = `${heroConfig.tileSize}px`
        explo.style.position = "absolute"
        explo.style.backgroundColor = "rgb(255, 72, 0)"
        explo.style.transform = `translate3d(${gridX * heroConfig.tileSize}px, ${gridY * heroConfig.tileSize}px, 0px)`;
        mapSence.appendChild(explo);

        setTimeout(() => {
            explo.remove();
        }, 300);


    }
    render() {
        if (killHero(enemyCoords[0], this.gridX, enemyCoords[1], this.gridY)) {
            this.currentDirection = directions.destroy;
        }
        const curHeroDirection = this.heroImages[this.currentDirection];
        this.element.style.backgroundImage = `url(${curHeroDirection.src})`;
        this.element.style.backgroundPosition = `-${this.frameIndex * this.heroWidth}px 0px`;
        this.element.style.transform = `translate3d(${this.pixelX}px, ${this.pixelY}px, 2px)`;
    }

    startGameLoop() {
        let CountPerFrame = 0
        let gameTime = 200
        let Time = document.getElementById("Time")
        Time.innerText = "Time" + " " + gameTime

        const gameLoop = () => {
            this.moveHero();
            CountPerFrame += 16.7
            if (CountPerFrame >= 1000) {
                gameTime--
                Time.innerText = "Time" + " " + gameTime
                CountPerFrame = 0
            }
            this.render();

            window.requestAnimationFrame(gameLoop);

        };
        gameLoop();
    }
}
