export class CellsArray {
    readonly xSize: number
    readonly ySize: number
    readonly zSize: number
    private readonly _cells: boolean[]

    constructor(xSize: number, ySize: number, zSize: number) {
        this.xSize = xSize
        this.ySize = ySize
        this.zSize = zSize

        this._cells = []
        for (let i = 0; i < xSize * ySize * zSize; i++) {
            this._cells.push(false)
        }
    }

    get(x: number, y: number, z: number): boolean {
        return this._cells[this._toIndex(x, y, z)]
    }

    set(x: number, y: number, z: number, value: boolean): void {
        this._cells[this._toIndex(x, y, z)] = value
    }

    private _toIndex(x: number, y: number, z: number): number {
        return z * this.xSize * this.ySize + y * this.xSize + x
    }
}