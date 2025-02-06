import { mapClass, mapArray } from "./map.js";
import { MapHero } from "./bomberman.js";
import { EnemyGenerator } from "./enemy.js";


// When the block is destroyed and becomes gress, The Hero go below the gress
// Maybe because we draw the map in index.js and bomberman.js
let mapSence = document.getElementById("map")

export const tileImage = new Image
export const blockImage = new Image
export const greenBlockImage = new Image
export const enemymoveemage = new Image
export const boombimage = new Image

tileImage.src = `./assets/tile.png`
blockImage.src = `./assets/block.png`
greenBlockImage.src = `./assets/greenBlock.png`
enemymoveemage.src = `./assets/enemy.png`
boombimage.src = `./assets/bomb.png`

export const directions = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
};

export const keys = {
    ArrowUp: directions.up,
    ArrowDown: directions.down,
    ArrowLeft: directions.left,
    ArrowRight: directions.right
};

export const heroConfig = {
    tileSize: 32,
    initialGridX: 1,
    initialGridY: 1,
    speed: 2
};



export let enemyCoords = [-1, -1,0]
export let killTheEnemy = false

export function SetEnemyCoords(x, y) {
    enemyCoords[0] = x
    enemyCoords[1] = y
}


let level1 = new mapClass
level1.drawMap(mapArray)

//how much you want to contral the level


window.addEventListener('keydown', (e) => {
    if (e.code == "KeyP") {
        const h = new EnemyGenerator(mapSence, 1)
        
        const hero = new MapHero(mapSence);
    }
});