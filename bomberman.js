let mapSence = document.getElementById("map");
let mapArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]


const heroConfig = {
    tileSize: 32,
    initialGridX: 1, 
    initialGridY: 1,
    speed: 1
};

const directions = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight"
};

const keys = {
    ArrowUp: directions.up,
    ArrowDown: directions.down,
    ArrowLeft: directions.left,
    ArrowRight: directions.right
};

class MapHero {
    constructor() {
        this.x = heroConfig.initialGridX * heroConfig.tileSize;
        this.y = heroConfig.initialGridY * heroConfig.tileSize;
        
      
        this.heroImgages = {
            [directions.up]: new Image(),
            [directions.down]: new Image(),
            [directions.left]: new Image(),
            [directions.right]: new Image()
        };

        this.heroImgages[directions.up].src = './assets/move_up.png';
        this.heroImgages[directions.down].src = './assets/move_down.png';
        this.heroImgages[directions.left].src = './assets/move_left.png';
        this.heroImgages[directions.right].src = './assets/move_right.png';
        
     
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
    
        if (mapArray[gridY] && ((mapArray[gridY][gridX]) === 1 || (mapArray[gridY][gridX]) === 2)) { 
           
            const topRightX = Math.floor((newX + tileSize - 1) / tileSize);
            const bottomleftY = Math.floor((newY + tileSize - 1) / tileSize);
            const bottomRightX = Math.floor((newX + tileSize - 1) / tileSize);
            const bottomRightY = Math.floor((newY + tileSize - 1) / tileSize);
            console.log(mapArray[gridY][gridX]);
            
            return (
                
                (mapArray[Math.floor(newY / tileSize)][topRightX] === 1 || 
                 mapArray[Math.floor(newY / tileSize)][topRightX] === 2) &&
                (mapArray[bottomleftY][gridX] === 1 || mapArray[bottomleftY][gridX] === 2) &&
                (mapArray[bottomRightY][bottomRightX] === 1 || 
                 mapArray[bottomRightY][bottomRightX] === 2)
            );
        }
        console.log(mapArray[gridY][gridX]);
                       
        return false;
    }    

    moveHero() {
        const direction = this.pressedDirections[0];
        let newX = this.x;
        let newY = this.y;
        
        if (direction) {
            
            this.stepCount++;
            if (this.stepCount > this.stepsPerFrame) {
                this.stepCount = 0;
                this.frameIndex = (this.frameIndex + 1) % 3;
            }
            
            switch(direction) {
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
            }
            
            if (this.canMove(newX, newY)) {
                this.x = newX;
                this.y = newY;
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