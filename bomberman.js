var herocord = [2, 2]
var boombcord = [0, 0]

// This is Set NOT Get
function getboombcord(x, y) {
    boombcord[0], x
    boombcord[1], y
}

function killhero(xa, xb, ya, yb) {
    return Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb))
}

let boombimage = new Image
boombimage.src = `./assets/bomb.png`



class MapHero {
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
            // console.log("dir",dir)
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
        ///////////////////////////////////////////////////////
        // let Xboomb = Math.floor(this.x)/32;
        // let Yboomb = Math.floor(this.y)/32;
        let cemoment = new Date().getSeconds()

        //////////////////////////////////////////////////////////////////////////////////////////////

        if (mapArray[gridY] && ((mapArray[gridY][gridX]) === 1) && ((mapboom[gridX, gridY] != 1) || (((mapboom[gridX, gridY] === 1 && (cemoment) - newseconede) < 2)))) {
            // (mapArray[gridY][gridX]) === 2)) { 
            // console.log("this is newseconde seconde frotxk  ",newseconede)




            const topRightX = Math.floor((newX + tileSize - 1) / tileSize);
            const bottomleftY = Math.floor((newY + tileSize - 1) / tileSize);
            const bottomRightX = Math.floor((newX + tileSize - 1) / tileSize);
            const bottomRightY = Math.floor((newY + tileSize - 1) / tileSize);
            // console.log("LA MAAAAAAAAP",mapboom[grid]);
            return (

                (mapArray[Math.floor(newY / tileSize)][topRightX] === 1) &&

                //  mapArray[Math.floor(newY / tileSize)][topRightX] === 2) &&
                (mapArray[bottomleftY][gridX] === 1) &&

                // || mapArray[bottomleftY][gridX] === 2) &&
                (mapArray[bottomRightY][bottomRightX] === 1)


                //  mapArray[bottomRightY][bottomRightX] === 2)
            );
        }

        return false;
    }

    creatboomb(x, y) {
        isboombed = true

        let Xboomb = Math.floor(this.x);
        let Yboomb = Math.floor(this.y);
        getboombcord(this.x / 32, this.y / 32)
        mapboom[(Math.floor((Xboomb) / 32), Math.floor((Yboomb) / 32))] = 1
        newseconede = new Date().getSeconds()
        // console.log("this seconde",newseconede)
        // console.log("creatboomb in xy*:",Math.floor((Xboomb)/32),Math.floor((Yboomb)/32))


        let boomb = document.createElement('div');
        boomb.style.width = `${32}px`;
        boomb.style.height = `${32}px`;
        boomb.style.position = "absolute";
        boomb.style.overflow = "hidden";
        // boomb.style.backgroundColor="red"
        boomb.style.backgroundImage = `url(${boombimage.src})`

        boomb.style.transform = `translate3d(${Xboomb}px, ${Yboomb}px, 0px)`;
        // boomb.style.display="none"

        mapSence.appendChild(boomb);

        // setTimeout(
        //     function(boomb,Xboomb,Yboomb) {
        //         mapboom[(Math.floor((Xboomb)/32),Math.floor((Yboomb)/32))]=0
        //         boomb.remove();

        //         newseconede=0
        //     }, 6000);


        setTimeout(() => {
            this.boombandbriks(Math.ceil(Xboomb / 32), Math.ceil(Yboomb / 32))
            this.boombandenemy(Xboomb / 32, Yboomb / 32)
            this.boombandhero((Xboomb) / 32, Yboomb / 32)
            mapboom[(Math.floor((Xboomb) / 32), Math.floor((Yboomb) / 32))] = 0
            boomb.remove();
        }, 300);

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
            console.log("#############")

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


            let gress = document.createElement("div")
            gress.style.backgroundImage = `url(${greenBlockImage.src})`
            gress.style.width = tileSize + "px"
            gress.style.height = tileSize + "px"
            gress.style.transform = `translate3d(${ybriks * 32}px ,${32 * xbriks}px,  0px)`

            gress.style.position = "absolute"
            mapSence.appendChild(gress)
        }







    }
    boombandenemy(Xboomb, Yboomb) {
        if (killenemy(Xboomb, enemycord[0], Yboomb, enemycord[1]) < 3) {
            // console.log("destroy enemy in grid",enemycord[0],enemycord[1])
            enemysholdkill = true
        }


    }

    boombandhero(Xboomb, Yboomb) {
        // console.log("sssssssssssssssssssssssssss",Math.floor(this.x/32),Math.floor(this.y/32))

        let herox = this.x / 32
        let heroy = this.y / 32
        if (killhero(Xboomb, herox, Yboomb, heroy) < 1) {

            // this.element.style.backgroundImage=`url(${"./assets/destroy_hero.png"})`
            this.currentDirection = directions.destroy;


            // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        }




    }




    moveHero() {
        const direction = this.pressedDirections[0];
        let newX = this.x;
        let newY = this.y;

        getherocord(this.x / 32, this.y / 32)
        //  console.log("getenemycord getherocord",herocord,enemycord)
        // console.log("DISTENCE:",killhero(enemycord[0],herocord[0],enemycord[1],herocord[1]))
        if (killhero(enemycord[0], herocord[0], enemycord[1], herocord[1]) < 1) {

            // this.element.style.backgroundImage=`url(${"./assets/destroy_hero.png"})`
            this.currentDirection = directions.destroy;


            // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
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

                document.addEventListener("keydown", (e) => {


                    if (e.key == "x") {
                        this.creatboomb(this.x, this.y)

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
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    startGameLoop() {
        const gameLoop = () => {
            this.moveHero();

            window.requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }
}

window.addEventListener('load', () => {
    const hero = new MapHero(mapSence);
});
