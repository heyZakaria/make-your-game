import { blockImage, enemyCoords, gamePaused, numbreofenemy, } from "./index.js";
import { mapArray, mapClass } from "./map.js";
import { directions, keys, heroConfig, greenBlockImage, boombimage, exploImg, settingScreen, gameSetting, instructions, title } from "./index.js";
export let heart = 4
export var nbrOfKilled = 0
let mapSence = document.getElementById("map")
let findDoor = false
let doorCoords = [-1, -1]
let isBombed = false
export let diedhero = false

let XP = 0
let Score = document.getElementById("score")
Score.innerHTML = XP

export let bombCoords = []

const door = new Image()
door.src = './assets/door.png';

export function killEnemy(Xboomb, Yboomb, enemyCoords) {

    for (let i = 1; i <= numbreofenemy; i++) {
        console.log(enemyCoords[i], "Weeeeeeee");

        if (enemyCoords[i] == undefined) {
            continue
        }
        let xGap = Math.abs(Xboomb - enemyCoords[i].x * 32)
        let yGap = Math.abs(Yboomb - enemyCoords[i].y * 32)

        if ((xGap <= 45) && (yGap <= 45)) {
            nbrOfKilled = nbrOfKilled + 1

            enemyCoords[i].z = 1
            enemyCoords[i].w = 100
            XP += 100
            Score.innerText = XP

        }
    }
}


function killHero(Xboomb, Xhero, Yboomb, Yhero) {

    let xGap = Math.abs(Xboomb - Xhero)
    let yGap = Math.abs(Yboomb - Yhero)

    return ((xGap == 0 || xGap == 1) && (yGap == 0 || yGap == 1) && (xGap + yGap != 2))
}

function enemykillHero(enemyCoords, Xhero, Yhero) {
    for (const [key, val] of Object.entries(enemyCoords)) {
        let xGap = Math.abs(val.x * 32 - Xhero)
        let yGap = Math.abs(val.y * 32 - Yhero)

        if ((xGap <= 30) && (yGap <= 30)) {
            diedhero = true
            heart -= 1
            return true
        }

    }
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
        this.element.className = "hero"

        mapSence.appendChild(this.element);

        this.pressedDirections = [];
        this.initializeControls();
    }

    initializeControls() {

        diedhero = false

        document.addEventListener("keydown", (e) => {

            if (gamePaused) {
                return
            }

            const dir = keys[e.key];
            const index = this.pressedDirections.indexOf(dir);
            if (dir && index === -1) {
                this.pressedDirections.unshift(dir);
                this.tryToMove();
            }

            if (e.code === "Space" && !gamePaused) {
                if (this.gridX > 0 && this.gridY > 0) {
                    this.createBomb(this.gridX, this.gridY)

                }
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

        if (nextGridX === -1 || nextGridY === -1) return

        if ((mapArray[nextGridY][nextGridX] !== 1 && mapArray[nextGridY][nextGridX] !== 3) || (bombCoords[0] === nextGridX && bombCoords[1] === nextGridY)) {

            return false;
        } else {

            return true
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

        if (enemykillHero(enemyCoords, this.pixelX, this.pixelY)) {

            this.currentDirection = directions.destroy;
            setTimeout(() => {
                this.element.remove()
            }, 200);
            this.gridX = -Math.random()
            this.gridY = -Math.random()
        }

        if (this.gridX == doorCoords[0] && this.gridY == doorCoords[1] && nbrOfKilled == numbreofenemy) {

            alert("You Win")
            window.location.href = 'index.html'

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

    createBomb(xBombGrid, yBombGrid) {
        if (isBombed) {
            return
        }
        isBombed = true

        bombCoords[0] = xBombGrid
        bombCoords[1] = yBombGrid

        let Xboomb = 32 * xBombGrid;
        let Yboomb = 32 * yBombGrid;

        let bomb = document.createElement('div');
        bomb.style.width = `${32}px`;
        bomb.style.height = `${32}px`;
        bomb.style.position = "absolute";
        bomb.style.overflow = "hidden";
        bomb.style.backgroundImage = `url(${boombimage.src})`
        bomb.style.transform = `translate3d(${Xboomb}px, ${Yboomb}px, 0px)`;
        mapSence.appendChild(bomb);

        setTimeout(() => {
            this.createExplosion(xBombGrid, yBombGrid)
            this.boombBriks(xBombGrid, yBombGrid)
            this.boombEnemy(Xboomb, Yboomb)
            this.boombHero(xBombGrid, yBombGrid)

            bombCoords[0] = -1
            bombCoords[1] = -1
            bomb.remove();
            isBombed = false
        }, 2000);


    }

    boombBriks(Xboomb, Yboomb) {

        let xbriks = -1
        let ybriks = -1

        if (mapArray[Yboomb + 1][Xboomb] === 2) {
            // Check Down
            xbriks = Yboomb + 1
            ybriks = Xboomb
            XP += 100
            Score.innerText = XP
            bombIt()
        }

        if (mapArray[Yboomb][Xboomb + 1] === 2) {
            // Check Right
            xbriks = Yboomb
            ybriks = Xboomb + 1
            XP += 100
            Score.innerText = XP
            bombIt()
        }

        if (mapArray[Yboomb - 1][Xboomb] === 2) {
            // Check UP
            xbriks = Yboomb - 1
            ybriks = Xboomb
            XP += 100
            Score.innerText = XP
            bombIt()
        }
        if (mapArray[Yboomb][Xboomb - 1] === 2) {
            // Check Left
            xbriks = Yboomb
            ybriks = Xboomb - 1
            XP += 100
            Score.innerText = XP
            bombIt()
        }

        function bombIt() {

            mapArray[xbriks][ybriks] = 1

            let brickBombed = document.querySelector(`.canBomb_${ybriks * 32}_${xbriks * 32}`)

            if ((Math.random() < 0.3) && (findDoor == false)) {

                findDoor = true
                doorCoords = [ybriks, xbriks]
                brickBombed.style.backgroundImage = `url(${door.src})`

            } else {
                //brickBombed.style.backgroundImage = `url(${greenBlockImage.src})`
                let frameIndex = 0;
                const animationBricks = setInterval(() => {
                    if (frameIndex < 4) {

                        brickBombed.style.backgroundImage = `url(${blockImage.src})`;
                        brickBombed.style.backgroundPosition = `-${frameIndex * 32}px 0px`;
                        frameIndex++;
                    } else {
                        clearInterval(animationBricks);
                        brickBombed.style.backgroundImage = `url(${greenBlockImage.src})`;
                    }
                }, 100);
            }

        }
    }


    boombEnemy(Xboomb, Yboomb) {
        killEnemy(Xboomb, Yboomb, enemyCoords)
    }


    boombHero(Xboomb, Yboomb) {
        let heroX = this.gridX
        let heroY = this.gridY
        if (killHero(Xboomb, heroX, Yboomb, heroY)) {
            this.currentDirection = directions.destroy;
            diedhero = true

            setTimeout(() => {
                this.element.remove()
            }, 200);
            this.gridX = -Math.random()
            this.gridY = -Math.random()
        }
        if (diedhero) {

            settingScreen.style.opacity = ".1"
            gameSetting.style.opacity = ".5"
            title.innerHTML = "You are Dead "
            instructions.innerHTML = "Click Arrow to continue"
        }
        const explosionDir = [
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 }
        ]
        explosionDir.forEach(dirExplo => {
            const exploX = Xboomb + dirExplo.dx
            const exploY = Yboomb + dirExplo.dy

            if (heroX === exploX && heroY === exploY) {
                this.currentDirection = directions.destroy;
                diedhero = true

                setTimeout(() => {
                    this.element.remove()
                }, 200);
                this.gridX = -Math.random()
                this.gridY = -Math.random()
            }
        })
    }

    // PArtie de lexplosion
    createExplosion(gridX, gridY) {
        const directions = [
            { dx: 0, dy: 1 }, // UP
            { dx: 0, dy: -1 }, // Down
            { dx: 1, dy: 0 }, // Right
            { dx: -1, dy: 0 } // Left
        ];

        this.createImgExplosion(gridX, gridY);

        directions.forEach(dir => {

            const exploX = gridX + dir.dx;
            const exploY = gridY + dir.dy;

            if (mapArray[exploY] && mapArray[exploY][exploX] && mapArray[exploY][exploX] != 2) {
                this.createImgExplosion(exploX, exploY);
            }
        });
    }

    createImgExplosion(gridX, gridY) {
        const explo = document.createElement('div')
        explo.style.width = `${heroConfig.tileSize}px`
        explo.style.height = `${heroConfig.tileSize}px`
        explo.style.position = "absolute"
        explo.style.backgroundImage = `url(${exploImg.src})`
        explo.style.transform = `translate3d(${gridX * heroConfig.tileSize}px, ${gridY * heroConfig.tileSize}px, 0px)`;
        mapSence.appendChild(explo);

        setTimeout(() => {
            explo.remove();
        }, 200);


    }
    render() {

        const curHeroDirection = this.heroImages[this.currentDirection];
        this.element.style.backgroundImage = `url(${curHeroDirection.src})`;
        this.element.style.backgroundPosition = `-${this.frameIndex * this.heroWidth}px 0px`;
        this.element.style.transform = `translate3d(${this.pixelX}px, ${this.pixelY}px, 2px)`;
    }

}

