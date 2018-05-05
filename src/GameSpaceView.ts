import {
    BoxGeometry,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer
} from 'three'
import {CellsArray} from './CellsArray'

const BOX_GEOMETRY = new BoxGeometry(1, 1, 1)
const DEAD_MATERIAL = new MeshPhongMaterial({color: 0xffffff, transparent: true, opacity: 0.1})
const ALIVE_MATERIAL = new MeshPhongMaterial({color: 0xff0000})
const CUBE_SPACING = 2

export class GameSpaceView {
    private _renderer: WebGLRenderer
    private _scene: Scene
    private _camera: PerspectiveCamera
    private _light: PointLight
    private _cubes: Mesh[]
    private _cells: CellsArray

    init(el: HTMLElement): this {
        this._renderer = new WebGLRenderer()
        this._renderer.setSize(600, 600)
        el.appendChild(this._renderer.domElement)

        this._scene = new Scene()
        this._camera = new PerspectiveCamera(45, 1, 0.1, 1000)
        this._light = new PointLight(0xffffff, 1, 100)
        this._light.position.z = 5
        this._scene.add(this._light)

        const animationCallback = time => {
            requestAnimationFrame(animationCallback)
            this._render(time)
        }
        requestAnimationFrame(animationCallback)

        return this
    }

    setCells(cells: CellsArray) {
        this._cells = cells

        this._scene.remove(...this._cubes)
        this._cubes = []
        for (let x = 0; x < this._cells.xSize; x++) {
            for (let y = 0; y < this._cells.ySize; y++) {
                for (let z = 0; z < this._cells.zSize; z++) {
                    this._cubes.push(new Mesh(BOX_GEOMETRY, DEAD_MATERIAL))
                }
            }
        }
        this._scene.add(...this._cubes)
    }

    centerCamera() {
        this._camera.position.x = this._cells.xSize / 2 * CUBE_SPACING - 1
        this._camera.position.y = this._cells.ySize / 2 * CUBE_SPACING - 1
        this._camera.position.z = 50
    }

    private _render(time: number) {
        let i = 0
        for (let x = 0; x < this._cells.xSize; x++) {
            for (let y = 0; y < this._cells.ySize; y++) {
                for (let z = 0; z < this._cells.zSize; z++) {
                    const cube = this._cubes[i++]
                    cube.position.x = x * CUBE_SPACING
                    cube.position.y = y * CUBE_SPACING
                    cube.position.z = z * CUBE_SPACING
                    cube.material = this._cells.get(x, y, z) ? ALIVE_MATERIAL : DEAD_MATERIAL
                }
            }
        }

        this._light.position.copy(this._camera.position)

        this._renderer.render(this._scene, this._camera)
    }
}