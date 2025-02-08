import { mapClass, mapArray } from "./map.js";
import { MapHero } from "./bomberman.js";
import { EnemyGenerator } from "./enemy.js";
import { Bomb } from "./bomb.js";


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
    speed: 1
};

export let enemyCoords = [-1, -1]
export let killTheEnemy = false

export function SetEnemyCoords(x, y) {
    enemyCoords[0] = x
    enemyCoords[1] = y
}



let game = document.getElementById("game")
let settingScreen = document.getElementById("settingScreen")
let gameSetting = document.getElementById("gameSetting")
game.insertBefore(settingScreen, game.firstChild)

let instructions = document.getElementById("instructions")
let title = document.getElementById("title")
//let gameAudio = document.getElementById("gameAudio")
let startGame = true
let gamePaused = false
let isWin = false
let isLose = false

let audio = new Audio("./assets/playGame.mp3")

window.addEventListener('keydown', (e) => {
    if (e.code == "KeyP") {
        if (startGame) {
            settingScreen.style.opacity = "0"
            gameSetting.style.opacity  = "0"
            const h = new EnemyGenerator(mapSence, 5)
            const hero = new MapHero(mapSence);
            hero.initializeControls()
            audio.play()
            startGame = false
        } else {
            audio.pause()
            gamePaused = true
            settingScreen.style.backdropFilter = "blur(100px)"
            settingScreen.style.opacity = "0.5"
            gameSetting.style.opacity  = "1"
            title.innerHTML = "Game is Paused"
            instructions.innerHTML = "Press R to Resume"
        }
    }
    if (e.code == "KeyR") {
        if (gamePaused) {
            settingScreen.style.opacity = "0"
            gameSetting.style.opacity  = "0"
             audio.play()
        }
    }
});



class ControleGame {
    constructor() {

    }
}





let level1 = new mapClass
level1.drawMap(mapArray)
//how much you want to contral the level