let mapSence = document.getElementById("map")


export let mapArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

mapSence.style.height = mapArray.length * 32 + "px"
mapSence.style.width = mapArray[0].length * 32 + "px"


let mapX = 0
let mapY = -32
let tileSize = 32;

let tileImage = new Image
let blockImage = new Image
let greenBlockImage = new Image


tileImage.src = `./assets/tile.png`
blockImage.src = `./assets/block.png`
greenBlockImage.src = `./assets/greenBlock.png`


addEventListener("resize", function () {

    if (window.innerWidth < 850) {

        tileSize = 22 + "px"
    }

});

export class mapClass {

    constructor(tileSize) {
        // there is no need for those
        // we can just change in the mapArray directly to control the map size
        // this.height = tileSize  * mapArray.length
        // this.width = tileSize  * mapArray[0].length
    }


    drawMap = function (mapArr) {

        let i = 0
        let j = 0
        for (let row of mapArr) {
            i++
            j = 0
            mapX = 0
            mapY += 32
            for (let column of row) {
                j++

                if (Math.random() < 0.1 && column == 1) {
                    mapArray[i - 1][j - 1] = 2

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
                    case 3:

                        let gress = document.createElement("div")
                        gress.style.backgroundImage = `url(${greenBlockImage.src})`
                        gress.style.width = tileSize + "px"
                        gress.style.height = tileSize + "px"
                        gress.style.transform = `translate3d(${mapX}px ,${mapY}px,  1px)`

                        gress.style.position = "absolute"
                        mapSence.appendChild(gress)
                        mapX += tileSize
                        break;
                    case 2:
                        let canBomb = document.createElement("div")
                        canBomb.style.backgroundImage = `url(${blockImage.src})`
                        canBomb.style.width = tileSize + "px"
                        canBomb.style.height = tileSize + "px"
                        canBomb.classList.add(`canBomb_${mapX}_${mapY}`)

                        canBomb.style.transform = `translate3d(${mapX}px ,${mapY}px,  2px)`

                        canBomb.style.position = "absolute"
                        mapSence.appendChild(canBomb)
                        mapX += tileSize

                        break


                }
            }
        }


    }
}





