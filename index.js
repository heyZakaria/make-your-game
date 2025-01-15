let mapSence = document.getElementById("map")

let mapArray = `[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], 
]`
let tileSize = 16;

let tileImage = new Image
let blockImage = new Image
let greenBlockImage = new Image


tileImage.src = `./assets/tile.png`

blockImage.src = `./assets/block.png`
greenBlockImage.src = `./assets/greenBlock.png`


class mapClass {
    constructor(tileSize) {
        this.height = tileSize * mapArray.length
        this.width = tileSize * mapArray[0].length
    }

    
    drawMap = function (mapArr) {

        for (let row of mapArr) {
            for (let column of row) {

                switch (column) {
                    case "0":

                        let yajor = document.createElement("div")
                        yajor.style.width = tileSize + "px"
                        yajor.style.height = tileSize + "px"
                        yajor.style.backgroundImage = `url(${tileImage.src})`
                        mapSence.appendChild(yajor)
                        break;
                    case "1":

                        let green = document.createElement("div")
                        green.style.backgroundImage = `url(${greenBlockImage.src})`
                        green.style.width = tileSize + "px"
                        green.style.height = tileSize + "px"
                        mapSence.appendChild(green)
                        break;
                    default:
                        continue;
                }
            }
        }
    }
}

let x = new mapClass
x.drawMap(mapArray)
