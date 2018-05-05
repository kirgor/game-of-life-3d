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

    next() {
        const nextArray = new CellsArray(this.xSize, this.ySize, this.zSize)

        for (let x = 0; x < this.xSize; x++) {
            for (let y = 0; y < this.ySize; y++) {
                for (let z = 0; z < this.zSize; z++) {
                    const adj = this._getAdjacentAliveCount(x, y, z)
                    if (!this.get(x, y, z) && (adj === 3) ||
                        this.get(x, y, z) && (adj === 2 || adj === 3)) {
                        nextArray.set(x, y, z, true)
                    }
                }
            }
        }

        return nextArray
    }

    private _getAdjacentAliveCount(x, y, z) {
        let count = 0

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dz = -1; dz <= 1; dz++) {
                    let ax = x + dx
                    let ay = y + dy
                    let az = z + dz

                    if (dx === 0 && dy === 0 && dz === 0 ||
                        ax < 0 || ax >= this.xSize ||
                        ay < 0 || ay >= this.ySize ||
                        az < 0 || az >= this.zSize) {
                        continue
                    }

                    if (this.get(ax, ay, az)) {
                        count++
                    }
                }
            }
        }

        return count
    }

    private _toIndex(x: number, y: number, z: number): number {
        return z * this.xSize * this.ySize + y * this.xSize + x
    }
}