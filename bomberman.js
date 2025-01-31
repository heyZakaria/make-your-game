import { enemyCoords } from "./index.js";
import { mapArray } from "./map.js";
import { directions, keys, heroConfig, greenBlockImage, boombimage, killTheEnemy} from "./index.js";

let mapSence = document.getElementById("map")

var herocord = [2, 2]
var boombcord = [0, 0]

let isboombed = false

let newseconede = 0

let mapboom = []

// This is Set NOT Get
function setBombCoords(x, y) {
    boombcord[0], x
    boombcord[1], y
}


function killenemy(xa, xb, ya, yb) {
    return Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb))

}

// This is Set NOT Get
function setHeroCoords(x, y) {
    herocord[0] = x
    herocord[1] = y
}

function killHero(xa, xb, ya, yb) {
    return (Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb)) < 1)
}


export class MapHero {

    constructor() {
        this.x = heroConfig.initialGridX * heroConfig.tileSize;
        this.y = heroConfig.initialGridY * heroConfig.tileSize;

        this.heroImgages = {
            [directions.up]: new Image(),
            [directions.down]: new Image(),
            [directions.left]: new Image(),
            [directions.right]: new Image(),
            [directions.destroy]: new Image()
        };

        this.heroImgages[directions.up].src = './assets/move_up.png';
        this.heroImgages[directions.down].src = './assets/move_down.png';
        this.heroImgages[directions.left].src = './assets/move_left.png';
        this.heroImgages[directions.right].src = './assets/move_right.png';
        this.heroImgages[directions.destroy].src = './assets/destroy_hero.png'


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
            if (dir && this.pressedDirections.indexOf(dir) === -1) {
                this.pressedDirections.unshift(dir);
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

    canMove(newX, newY) {
        const tileSize = heroConfig.tileSize;
        const gridX = Math.floor(newX / tileSize);
        const gridY = Math.floor(newY / tileSize);

        let cemoment = new Date().getSeconds()

        if (mapArray[gridY] && ((mapArray[gridY][gridX]) === 1 ) && ((mapboom[gridX, gridY] != 1) || (((mapboom[gridX, gridY] === 1 && (cemoment) - newseconede) < 2)))) {

            const topRightX = Math.floor((newX + tileSize - 1) / tileSize);
            const bottomleftY = Math.floor((newY + tileSize - 1) / tileSize);
            const bottomRightX = Math.floor((newX + tileSize - 1) / tileSize);
            const bottomRightY = Math.floor((newY + tileSize - 1) / tileSize);
            return (

                (mapArray[Math.floor(newY / tileSize)][topRightX] === 1) &&

                (mapArray[bottomleftY][gridX] === 1) &&

                (mapArray[bottomRightY][bottomRightX] === 1)


            );
        }

        return false;
    }

    createBomb() {
        isboombed = true

        let Xboomb = Math.floor(this.x);
        let Yboomb = Math.floor(this.y);
        setBombCoords(this.x / 32, this.y / 32)
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
        if (killenemy(Xboomb, enemyCoords[0], Yboomb, enemyCoords[1]) < 3) {
            killTheEnemy = true
        }
    }

    boombandhero(Xboomb, Yboomb) {

        let herox = this.x / 32
        let heroy = this.y / 32
        if (killHero(Xboomb, herox, Yboomb, heroy) ) {

            this.currentDirection = directions.destroy;

        }

    }


    moveHero() {
        const direction = this.pressedDirections[0];
        let newX = this.x;
        let newY = this.y;

        setHeroCoords(this.x / 32, this.y / 32)
        if (killHero(enemyCoords[0], herocord[0], enemyCoords[1], herocord[1])) {

            this.currentDirection = directions.destroy;
            
        }


        if (direction) {

            this.stepCount++;
            if (this.stepCount > this.stepsPerFrame) {
                this.stepCount = 0;
                this.frameIndex = (this.frameIndex + 1) % 3;
            }

            switch (direction) {
                case directions.right:
                    newX = this.x + heroConfig.speed;
                    this.currentDirection = directions.right;
                    
                    break;
                case directions.left:
                    newX = this.x - heroConfig.speed;
                    this.currentDirection = directions.left;
                    break;
                case directions.down:
                    newY = this.y + heroConfig.speed;
                    this.currentDirection = directions.down;
                    break;
                case directions.up:
                    newY = this.y - heroConfig.speed;
                    this.currentDirection = directions.up;
                    break;
                case direction.destroy:
                    this.currentDirection = directions.destroy;
                    break;

            }

            if (this.canMove(newX, newY)) {
                this.x = newX;
                this.y = newY;

                // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                document.addEventListener("keydown", (e) => {

                    if (e.key == "x") {
                        this.createBomb(this.x, this.y)

                    }
                })

            }
        } else {
            this.frameIndex = 0;
            this.stepCount = 0;
        }

        this.render();
    }

    render() {
        const curHeroDirection = this.heroImgages[this.currentDirection];

        this.element.style.backgroundImage = `url(${curHeroDirection.src})`;
        this.element.style.backgroundPosition = `-${this.frameIndex * this.heroWidth}px 0px`;
        // AAAAAAAAAAAAAAAAAAAAAAAAAAA
        this.element.style.transform = `translate3d(${this.x}px ,${this.y}px,  2px)`

        /* this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`; */
    }

    startGameLoop() {
        const gameLoop = () => {
            this.moveHero();

            window.requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }
}


