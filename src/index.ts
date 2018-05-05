import {GameSpaceView} from './GameSpaceView'
import {CellsArray} from './CellsArray'

const SIZE = 16

const gameSpaceView = new GameSpaceView().init(document.body)
let cellsArray = new CellsArray(SIZE, SIZE, SIZE)
gameSpaceView.setCells(cellsArray)

for (let i = SIZE / 2 - 2; i < SIZE / 2 + 2; i++) {
    for (let j = SIZE / 2 - 2; j < SIZE / 2 + 2; j++) {
        for (let k = SIZE / 2 - 2; k < SIZE / 2 + 2; k++) {
            cellsArray.set(i, j, k, (i + j + k) % 2 === 0)
            // cellsArray.set(i, j, k, (i + j + k) % 3 === 0)
        }
    }
}

function next() {
    cellsArray = cellsArray.next()
    gameSpaceView.setCells(cellsArray)
}

setInterval(next, 250)

window['NEXT'] = next
window['GAME_SPACE_VIEW'] = gameSpaceView
window['CELLS_ARRAY'] = cellsArray