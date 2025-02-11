import { enemyCoords } from "./index.js";
import { mapArray } from "./map.js";
import { directions, keys, heroConfig, greenBlockImage, boombimage, killTheEnemy } from "./index.js";

let mapSence = document.getElementById("map")
let findport=false
var herocord = [2, 2]
export var boombcord = [0, 0]

let isboombed = false

let newseconede = 0

export let mapboom = []

// // This is Set NOT Get
// function setBombCoords(x, y) {
//     boombcord[0]= x
//     boombcord[1]= y
// }
let line = document.createElement("div")

function creatline(xa, xb,ya, yb){
 
    let distence=32*Math.sqrt(((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb)))
    // console.log(distence,"dist")

    let xmid=(xa+xb)*32/2
    let ymid=(ya+yb)*32/2
    
    let salopeinradian=Math.atan2((-yb+ya),(-xb+xa))
     
    let salopindegrees=(salopeinradian*180)/3
    // console.log("deg:",salopindegrees)

   
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
    
    
    }
    
    

export function killenemy(xa, xb, ya, yb) {
    return Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb)<5)

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

            if (e.key === "x") {
                this.createBomb(this.pixelX, this.pixelY)
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
            // console.log("OUT OF MAP", mapArray[nextGridY][nextGridX]);
            return false;
        } else {
            return mapArray[nextGridY][nextGridX] === 1
        }
    }

    tryToMove() {
        if (this.isMoving)
            return;
        const direction = this.pressedDirections[0];
        // console.log("DIR=>", direction);

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
            // console.log("MOVE", this.isMoving);

            this.nextPixelX = nextGridX * heroConfig.tileSize;
            this.nextPixelY = nextGridY * heroConfig.tileSize;

            // console.log("NPXCanmove=>", this.nextPixelX, "\nNPYCanmove=>", this.nextPixelY);
        }
        // console.log("CAN MOVE", this.canMove(nextGridX, nextGridY));
    }

    moveHero() {

        creatline(enemyCoords[0],this.gridX,enemyCoords[1],this.gridY)

 
        if (!this.isMoving)
            return;

        // console.log("NPX=>", this.nextPixelX, "\nNPY=>", this.nextPixelY);

        const diffX = Math.abs(this.pixelX - this.nextPixelX);
        const diffY = Math.abs(this.pixelY - this.nextPixelY);
        // console.log("diffX=>", diffX, "\ndiffY=>", diffY);


        if (this.pixelX < this.nextPixelX) {
            this.pixelX += heroConfig.speed;
            // console.log("this.pixelX=>", this.pixelX);
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

        isboombed = true

        let Xboomb = Math.floor(x);
        // console.log("XBOMB=>", Xboomb);

        let Yboomb = Math.floor(y);
        // setBombCoords(this.x / 32, this.y / 32)
        // console.log(setBombCoords(Xboomb, Yboomb));

        // mapboom[(Math.floor((Xboomb) / 32), Math.floor((Yboomb) / 32))] = 1
        newseconede = new Date().getSeconds()

        let boomb = document.createElement('div');
        boomb.style.width = `${32}px`;
        boomb.style.height = `${32}px`;
        boomb.style.position = "absolute";
        boomb.style.overflow = "hidden";
        boomb.style.backgroundImage = `url(${boombimage.src})`
        boomb.style.transform = `translate3d(${Xboomb}px, ${Yboomb}px, 0px)`;
        mapboom[(Math.floor((Xboomb) / 32), Math.floor((Yboomb) / 32))] = 1

        mapSence.appendChild(boomb);

        setTimeout(() => {
            this.createExplosion(Math.ceil(Xboomb / heroConfig.tileSize), Math.ceil(Yboomb / heroConfig.tileSize))
            this.boombandbriks(Math.ceil(Xboomb / heroConfig.tileSize), Math.ceil(Yboomb / heroConfig.tileSize))
            // console.log("BOMB&BRICK=>", this.boombandbriks);

            this.boombandenemy(Xboomb / heroConfig.tileSize, Yboomb / heroConfig.tileSize)
            this.boombandhero((Xboomb) / heroConfig.tileSize, Yboomb / heroConfig.tileSize)
            mapboom[(Math.floor((Xboomb) / heroConfig.tileSize), Math.floor((Yboomb) / heroConfig.tileSize))] = 0
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
            // console.log("XBR:", xbriks);
            // console.log("YBR:", ybriks);

            letsboomb = true
        }
        if (letsboomb) {

            mapArray[xbriks][ybriks] = 1
             
           let brickBombed = document.querySelector(`.canBomb_${ybriks*32}_${xbriks*32}`)
           
           if ((Math.random()<1) &&(findport==false)){

            // brickBombed.style.backgroundImage = `url(${port.src})`
            brickBombed.style.background = 'purple';
            findport=true

            
           }else{
           brickBombed.style.backgroundImage = `url(${greenBlockImage.src})`

           }




           
                     
        }
    }

    // boombandenemy(Xboomb, Yboomb) {
    //     let xenemy = enemyCoords[0] / 32
    //     let yenemy = enemyCoords[1] / 32
    //     if (killenemy(Xboomb, xenemy, Yboomb, yenemy) < 100) {
    //         // this.currentDirection = directions.destroyEnemy;
    //         // console.log("ENEMY KILLED");
    //         enemyCoords[3] == 1
        
    //     }
    // }


    boombandenemy(Xboomb, Yboomb) {
        // if (killenemy(Xboomb, enemyCoords[0], Yboomb, enemyCoords[1])) {
            // killTheEnemy = true

        enemyCoords[3]=1
        }
    // }











    boombandhero(Xboomb, Yboomb) {
        let herox = this.gridX
        let heroy = this.gridY
        // console.log(Xboomb,Yboomb)
        // console.log("herox:",herox,"heroy",heroy)

        if (killHero(Xboomb, herox, Yboomb, heroy)) {
            // console.log("booooooooooo2222222222")

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


