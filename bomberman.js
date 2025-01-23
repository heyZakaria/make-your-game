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


let heroImage = {
    up: new Image(),
    down: new Image(),
    left: new Image(),
    right: new Image()
};

heroImage.up.src = './assets/move_up.png';   
heroImage.down.src = './assets/move_down.png';
heroImage.left.src = './assets/move_left.png';
heroImage.right.src = './assets/move_right.png';


class MapHero {
    constructor() {
        this.x = heroConfig.initialGridX * heroConfig.tileSize;
        this.y = heroConfig.initialGridY * heroConfig.tileSize;
        
        this.element = document.createElement('div');
        this.element.style.width = heroConfig.tileSize + "px";
        this.element.style.height = heroConfig.tileSize + "px";
        this.element.style.position = "absolute";
        this.element.style.backgroundImage = `url(${heroImage.down.src})`;
        
        mapSence.appendChild(this.element);
         
        this.directions_press = [];
        this.initializeControls(); 
        this.startGameLoop();
    }

    initializeControls() {
        document.addEventListener("keydown", (e) => {
            const dir = keys[e.key];
            if (dir && this.directions_press.indexOf(dir) === -1) {
                this.directions_press.unshift(dir);
            }
        });

        document.addEventListener("keyup", (e) => {
            const dir = keys[e.key];
            const index = this.directions_press.indexOf(dir);
            if (index > -1) {
                this.directions_press.splice(index, 1);
            }
        });
    }
    

    moveHero() {
        const direction_press = this.directions_press[0];
        let newX = this.x;
        let newY = this.y;
        
        if (direction_press) {
            switch(direction_press) {
                case directions.right:
                    newX = this.x + heroConfig.speed;
                    this.element.style.backgroundImage = `url(${heroImage.right.src})`;
                    break;
                case directions.left:
                    newX = this.x - heroConfig.speed;
                    this.element.style.backgroundImage = `url(${heroImage.left.src})`;
                    break;
                case directions.down:
                    newY = this.y + heroConfig.speed;
                    this.element.style.backgroundImage = `url(${heroImage.down.src})`;
                    break;
                case directions.up:
                    newY = this.y - heroConfig.speed;
                    this.element.style.backgroundImage = `url(${heroImage.up.src})`;
                    break;
            }
            
            if (this.canMove(newX, newY)) {
                this.x = newX;
                this.y = newY;
            }
        }
        
        const mapWidth = mapArray[0].length * heroConfig.tileSize;
        const mapHeight = mapArray.length * heroConfig.tileSize;
        
        this.x = Math.max(heroConfig.tileSize, Math.min(this.x, mapWidth - heroConfig.tileSize));
        this.y = Math.max(heroConfig.tileSize, Math.min(this.y, mapHeight - heroConfig.tileSize));
        
        this.render();
    }
    

    canMove(newX, newY) {
        const tileSize = heroConfig.tileSize;
        const gridX = Math.floor(newX / tileSize);
        const gridY = Math.floor(newY / tileSize);
    
        if (mapArray[gridY] && ((mapArray[gridY][gridX]) === 1 || (mapArray[gridY][gridX]) === 2)) { 
           
            const topRightX = Math.floor((newX + tileSize - 1) / tileSize);
            const bottomLeftY = Math.floor((newY + tileSize - 1) / tileSize);
            const bottomRightX = Math.floor((newX + tileSize - 1) / tileSize);
            const bottomRightY = Math.floor((newY + tileSize - 1) / tileSize);
            console.log(mapArray[gridY][gridX]);
            
            return (
                
                (mapArray[Math.floor(newY / tileSize)][topRightX] === 1 || 
                 mapArray[Math.floor(newY / tileSize)][topRightX] === 2) &&
                (mapArray[bottomLeftY][gridX] === 1 || mapArray[bottomLeftY][gridX] === 2) &&
                (mapArray[bottomRightY][bottomRightX] === 1 || 
                 mapArray[bottomRightY][bottomRightX] === 2)
            );
        }
        console.log(mapArray[gridY][gridX]);
                       
        return false;
    }   


    render() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }

    startGameLoop() {
        const gameLoop = () => {
            this.moveHero();
            window.requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }
}


const directions = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
};

const keys = {
    ArrowUp: directions.up,
    ArrowLeft: directions.left,
    ArrowRight: directions.right,
    ArrowDown: directions.down,
};


window.addEventListener('load', () => {
    const hero = new MapHero();
});