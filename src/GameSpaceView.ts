import {
    BoxGeometry,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    Vector3,
    WebGLRenderer
} from 'three'
import {CellsArray} from './CellsArray'

const CUBE_GEOMETRY = new BoxGeometry(1, 1, 1)
const CUBE_MATERIAL = new MeshPhongMaterial({color: 0x00ff00, transparent: true, opacity: 0.3})
const CUBE_SPACING = 1

export class GameSpaceView {
    private _renderer: WebGLRenderer
    private _scene: Scene
    private _camera: PerspectiveCamera
    private _light: PointLight
    private _cubes: Mesh[]
    private _cells: CellsArray = new CellsArray(0, 0, 0)
    private _cellsCenterPoint: Vector3 = new Vector3(0, 0, 0)
    private _freeCameraMode: boolean = true
    private _width: number
    private _height: number
    private _depth: number

    init(el: HTMLElement): this {
        this._renderer = new WebGLRenderer()
        this._renderer.setSize(600, 600)
        this._renderer.setClearColor(0xffffff)
        el.appendChild(this._renderer.domElement)

        this._scene = new Scene()
        this._camera = new PerspectiveCamera(45, 1, 0.1, 1000)
        this._light = new PointLight(0xffffff, 1, 100)
        this._scene.add(this._light)

        const animationCallback = time => {
            requestAnimationFrame(animationCallback)
            this._tick(time)
        }
        requestAnimationFrame(animationCallback)

        return this
    }

    setCells(cells: CellsArray) {
        if (cells.xSize !== this._cells.xSize ||
            cells.ySize !== this._cells.ySize ||
            cells.zSize !== this._cells.zSize) {

            this._scene.remove(...this._cubes)
            this._cubes = []
            for (let x = 0; x < cells.xSize; x++) {
                for (let y = 0; y < cells.ySize; y++) {
                    for (let z = 0; z < cells.zSize; z++) {
                        this._cubes.push(new Mesh(CUBE_GEOMETRY, CUBE_MATERIAL))
                    }
                }
            }
            this._scene.add(...this._cubes)

            this._width = cells.xSize * CUBE_SPACING - 1
            this._height = cells.ySize * CUBE_SPACING - 1
            this._depth = cells.zSize * CUBE_SPACING - 1
            this._cellsCenterPoint = new Vector3(this._width / 2, this._height / 2, this._depth / 2)
        }

        this._cells = cells
    }

    private _tick(time: number) {
        let i = 0
        for (let x = 0; x < this._cells.xSize; x++) {
            for (let y = 0; y < this._cells.ySize; y++) {
                for (let z = 0; z < this._cells.zSize; z++) {
                    const cube = this._cubes[i++]
                    if (this._cells.get(x, y, z)) {
                        cube.position.x = x * CUBE_SPACING
                        cube.position.y = y * CUBE_SPACING
                        cube.position.z = z * CUBE_SPACING
                        cube.visible = true
                    } else {
                        cube.visible = false
                    }
                }
            }
        }

        const angle = time / 10000 * Math.PI * 2
        const dist = Math.max(this._width, this._height, this._depth) * 2.5
        const elevation = dist * 0.6
        this._camera.position
            .copy(this._cellsCenterPoint)
            .add(new Vector3(Math.cos(angle) * dist, elevation, Math.sin(angle) * dist))

        this._camera.lookAt(this._cellsCenterPoint)

        this._light.position.copy(this._camera.position)
        this._light.distance = dist * 2

        this._renderer.render(this._scene, this._camera)
    }
}