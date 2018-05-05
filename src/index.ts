import {GameSpaceView} from './GameSpaceView'
import {CellsArray} from './CellsArray'

const gameSpaceView = new GameSpaceView().init(document.body)
const cellsArray = new CellsArray(10, 10, 10)
gameSpaceView.setCells(cellsArray)
gameSpaceView.centerCamera()

window['GAME_SPACE_VIEW'] = gameSpaceView
window['CELLS_ARRAY'] = cellsArray