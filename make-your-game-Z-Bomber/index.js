let mapSence = document.getElementById("map")
var enemycord=[-1,-1]
 var herocord=[2,2]

function getenemycord(x,y){
    enemycord[0]=x
    enemycord[1]=y
}

function getherocord(x,y){
    herocord[0]=x
    herocord[1]=y
}

function killhero(xa,xb,ya,yb){
    return Math.sqrt((xa-xb)*(xa-xb)+(ya-yb)*(ya-yb))

}
 


let mapArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,,0,0,0,0,0,0,0,0,,0,0,0,0,0,0],

     [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
     [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,,0,0,0,0,0,0,0,0,,0,0,0,0,0,0],


]


let tileSize = 32;
let mapX = 0
let mapY = -32

let tileImage = new Image
let blockImage = new Image
let greenBlockImage = new Image
let enemymoveemage=new Image

tileImage.src = `./assets/tile.png`
blockImage.src = `./assets/block.png`
greenBlockImage.src = `./assets/greenBlock.png`
enemymoveemage.src=`./assets/enemy.png`



class mapClass {

    constructor(tileSize) {
        this.height = tileSize * 2 * mapArray.length
        this.width = tileSize * 2 * mapArray[0].length
    }

    drawMap = function (mapArr) {

 
        let i=0
let j=0
        for (let row of mapArr) {
i++
j=0
            mapX = 0
            mapY += 32
            for (let column of row) {
j++
 
                if (Math.random() <0.1&& column == 1) {

                      mapArray[i-1][j-1]=2
 

                    column = 2
                }

                switch (column) {
                    case 0:

                        let yajor = document.createElement("div")
                        yajor.style.width = tileSize + "px"
                        yajor.style.height = tileSize + "px"
                        yajor.style.position = "absolute"

                        yajor.style.transform = `translate3d(${mapX}px ,${mapY}px,  0px)`

                        yajor.style.backgroundImage = `url(${tileImage.src})`
                        mapSence.appendChild(yajor)
                        mapX += tileSize
                        break;
                    case 1:

                        let gress = document.createElement("div")
                        gress.style.backgroundImage = `url(${greenBlockImage.src})`
                        gress.style.width = tileSize + "px"
                        gress.style.height = tileSize + "px"
                        gress.style.transform = `translate3d(${mapX}px ,${mapY}px,  0px)`

                        gress.style.position = "absolute"
                        mapSence.appendChild(gress)
                        mapX += tileSize
                        break;
                    case 2:
                        let canBomb = document.createElement("div")
                        canBomb.style.backgroundImage = `url(${blockImage.src})`
                        canBomb.style.width = tileSize + "px"
                        canBomb.style.height = tileSize + "px"

                        canBomb.style.transform = `translate3d(${mapX}px ,${mapY}px,  0px)`

                        canBomb.style.position = "absolute"
                        mapSence.appendChild(canBomb)
                        mapX += tileSize

                }
            }
        }


    }
}














 





 









//   class Enemy {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.element = this.createEnemyono();
//         this.direction = this.getRandomDirection();
//         this.moveSpeed = 2;
//         //to lwt it depend only on the player hemself
//         this.moveInterval = null;
//     }

//     createEnemyono() {
//         const enemy = document.createElement("div");
//         enemy.style.width = "32px";
//         enemy.style.height = "32px";
//         enemy.style.backgroundColor = "purple";
//         enemy.style.position = "absolute";
//         enemy.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
//         return enemy;
//     }

//     getRandomDirection() {
 
//         const directions = ['up', 'down', 'left', 'right'];
//         return directions[Math.floor(Math.random() * directions.length)];
//     }


//     move() {


//         let X=this.x/32
//         let Y=this.y/32
//         console.log("X,Y:",X,Y)
        
//         console.log("",mapArray[Math.floor(Y)][Math.floor(X)])
//         console.log("",mapArray[Math.ceil(Y)][Math.ceil(X)])

        
        
    
        
//         switch (this.direction) {

            
    
//             case 'up':
    
//                 // if (mapArray[Math.floor(Y-(this.moveSpeed/32))][Math.floor(X)]==1){
//                     if ((mapArray[Math.floor(Y-this.moveSpeed)][Math.floor(X)]==1) && (mapArray[Math.ceil(Y-this.moveSpeed)][Math.ceil(X)])===1)
//  {   
//                      this.y -= this.moveSpeed;
//                          break
//                 }
                
//             case 'down':
//                 // console.log("yeeeeeeeeeeeeeeeeeeep",mapArray[Math.floor(Y)][Math.floor(X)])
    
//                 // if (mapArray[Math.floor(Y+(this.moveSpeed/32))][Math.floor(X)]==1){
    
//                 if ((mapArray[Math.floor(Y +this.moveSpeed)][Math.floor(X)]==1) && (mapArray[Math.ceil(Y+this.moveSpeed)][Math.ceil(X)])===1)
// {
//                 this.y += this.moveSpeed;
//                 break
//     }
    
    
//             case 'left':
//                 // console.log("yeeeeeeeeeeeeeeeeeeep",mapArray[Math.floor(Y)][Math.floor(X)])
    
//                 if ((mapArray[Math.floor(Y)][Math.floor(X-(this.moveSpeed/32))]==1) && (mapArray[Math.ceil(Y)][Math.ceil(X-(this.moveSpeed/32))])===1)
//                     {
    
    
//                 this.x -= this.moveSpeed;
//                 break;
//                 }
            
//             case 'right':
//                 // console.log("yeeeeeeeeeeeeeeeeeeep",mapArray[Math.floor(Y)][Math.floor(X)])
    
//             // if (mapArray[Math.floor(Y)][Math.floor(X+(this.moveSpeed/32))]==1){
//                 if ((mapArray[Math.floor(Y)][Math.floor(X+(this.moveSpeed/32))]===1) && (mapArray[Math.ceil(Y)][Math.ceil(X+(this.moveSpeed/32))])===1)
    
//                 this.x += this.moveSpeed;
//                 break;
//              }          
    
        
    
//         // if after map change direction
    
    
    
   
    
    
    
//         if (this.x < 32 )   {
            
//             this.x = 32
//             this.direction = 'right'
//         }
//         if (this.x > (mapArray[0].length - 2) * 32)   {
    
//             this.x = (mapArray[0].length - 2) * 32
//             this.direction = 'left'
//         }
//         if (this.y < 32){
    
//             this.y = 32
        
//             this.direction = 'down'
//         }
//         if (this.y > (mapArray.length - 2) * 32){
   
    
//             this.y = (mapArray.length - 2) * 32
//             this.direction = 'up'
//         }
        
    
//         //update statu
//         this.update()
//     }    
    

//     update() {
//         let X=this.x/32
//         let Y=this.y/32
//         // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")

//         if (mapArray[Math.floor(Y)][Math.floor(X)]!=1){
 
 
 
//             console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",X,Y)
         
//          }
        
         
//         this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
     
// }

//     startMoving() {
// // change randem every 3 or seconde
//         setInterval(() => {killhero
//             this.direction = this.getRandomDirection();
//         }, Math.random() * 2000 + 1000)   

//         //move contine 
        
//             this.moveInterval = setInterval(() => {
                
//                 this.move();


//         }, 50);
//     }
// }

killhero
 


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
        const enemy = document.createElement("div");
        enemy.style.width = "32px";
        enemy.style.height = "32px";
        // enemy.style.backgroundColor = "purple";
     enemy.style.backgroundImage=`url(${"./assets/enemy.png"})`
        enemy.style.position = "absolute";
        enemy.style.transform = `translate3d(${this.pixelX}px, ${this.pixelY}px, 0px)`;
        return enemy;
    }

    getRandomDirection() {
        const validDirections = this.getValidDirections();
        // no chane if lenght 0
       //LENGHT==0 SO CONTINU SAME DIRECTION 
        if (validDirections.length === 0){
            return this.direction; 

        } 
        return validDirections[Math.floor(Math.random() * validDirections.length)];
    }

    getValidDirections() {
        const directions = [];
        
        // Check if valid dirxection*4
        if (this.isValidCARE(this.gridX, this.gridY - 1)){
             directions.push('up');
    }
        if (this.isValidCARE(this.gridX, this.gridY + 1)){
            directions.push('down');
        } 
        if (this.isValidCARE(this.gridX - 1, this.gridY)){
            directions.push('left');
        } 
        if (this.isValidCARE(this.gridX + 1, this.gridY)) {
            directions.push('right');
        }

        return directions;
    }

    isValidCARE(x, y) {
    //    ris valid if green
    if (mapArray[y][x]!=1){
        return false
    }else{
        
         return mapArray[y][x] ==1; // if ok  if green !!!

    }
    }

    move() {

        getenemycord(this.pixelX/32,this.pixelY/32)
                
 

        if (this.isMoving) return;

        let nextGridX = this.gridX;
        let nextGridY = this.gridY;

        // Calculate target grid position based on direction
        ///caculer 
        switch (this.direction) {
            case 'up': nextGridY--; break;
            case 'down': nextGridY++; break;
            case 'left': nextGridX--; break;
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
                if (this.pixelY > NEXTPixelY)
                    {
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
        }, Math.random() * 2000 + 1000);


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
        this.heroImgages[directions.destroy].src='./assets/destroy_hero.png'
        
     
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
    
        if (mapArray[gridY] && ((mapArray[gridY][gridX]) === 1)){ 
        // (mapArray[gridY][gridX]) === 2)) { 
           
            const topRightX = Math.floor((newX + tileSize - 1) / tileSize);
            const bottomleftY = Math.floor((newY + tileSize - 1) / tileSize);
            const bottomRightX = Math.floor((newX + tileSize - 1) / tileSize);
            const bottomRightY = Math.floor((newY + tileSize - 1) / tileSize);
            // console.log(mapArray[gridY][gridX]);
            
            return (
                
                (mapArray[Math.floor(newY / tileSize)][topRightX] === 1 )&& 
                //  mapArray[Math.floor(newY / tileSize)][topRightX] === 2) &&
                (mapArray[bottomleftY][gridX] === 1) &&
                    // || mapArray[bottomleftY][gridX] === 2) &&
                (mapArray[bottomRightY][bottomRightX] === 1 )
                //  mapArray[bottomRightY][bottomRightX] === 2)
            );
        }
                        
        return false;
    }  
  
    creatboomb(){
        let Xboomb = this.x;
        let Yboomb = this.y;
        document.addEventListener("keydown", (e) => {
            // const dir = keys[e.key];
            // if (dir && this.pressedDirections.indexOf(dir) === -1) {
            //     this.pressedDirections.unshift(dir);
            // }


            if (e.key=="x"){
                // creattheboomb(Xboomb/32,Yboomb/32)

                this.element = document.createElement('div');
                this.element.style.backgroundColor='red'
                this.element.style.width = `${heroConfig.tileSize}px`;
                this.element.style.height = `${heroConfig.tileSize}px`;
                this.element.style.position = "absolute";
                this.element.style.overflow = "hidden";
            
            }
        });




    }
 
    moveHero() {
         const direction = this.pressedDirections[0];
        let newX = this.x;
        let newY = this.y;
    
         getherocord(this.x/32,this.y/32)
        //  console.log("getenemycord getherocord",herocord,enemycord)
        console.log("DISTENCE:",killhero(enemycord[0],herocord[0],enemycord[1],herocord[1]))
          if (killhero(enemycord[0],herocord[0],enemycord[1],herocord[1])<1){

            // this.element.style.backgroundImage=`url(${"./assets/destroy_hero.png"})`
             this.currentDirection = directions.destroy;

            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
          }

       
         


        
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
                case direction.destroy:
                    this.currentDirection = directions.destroy;
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
            this.creatboomb();
            window.requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }
}

window.addEventListener('load', () => {
    const hero = new MapHero(mapSence);
}); 
















let level1 = new mapClass
level1.drawMap(mapArray)
//how much you want to contral the level
const h = new EnemyGenerator(mapSence, 7);  

























// generatooooooooooooor
// class Enemygenerator {
//     constructor(mapElement, numberOfEnemies) {
//         this.mapElement = mapElement;
//         this.enemies = [];
//         this.numberOfEnemies = numberOfEnemies;
//         this.init();
//     }

//     init() {
//         // Creat how mux in random posit
//         for (let i = 0; i < this.numberOfEnemies; i++) {
//             this.createEnemy();
//         }
//     }


//     createEnemy() {

//         //if valid in path 
//         let x, y;
//         do {
//             x = Math.floor(Math.random() * (mapArray[0].length - 2)) + 1;
//             y = Math.floor(Math.random() * (mapArray.length - 2)) + 1;
//         } while (mapArray[y][x] !== 1);

//         //   array   to pixel  
//         const enemy = new Enemy(x * 32, y * 32);
//         this.enemies.push(enemy);
//         this.mapElement.appendChild(enemy.element);
//         enemy.startMoving();
//     }
// }
















































 































