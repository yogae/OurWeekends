import { Scene, Mesh, Color, Geometry, Material } from "three";

interface ThreeModel {
    draw(scene: Scene): void
    render(dx: number, dy: number): void
}

interface OffsetPosition {
    x: number
    y: number
}

export interface Options {
    w: number
    h: number
    color: Color | number
    offset: OffsetPosition
}


export abstract class BaseModel implements ThreeModel{
    protected obj: Mesh;
    protected offset: OffsetPosition;
    constructor(geometry:Geometry, material: Material, options: Options) {
        this.obj = new Mesh(geometry, material);
        this.offset = options.offset;
    }
    public draw(scene: Scene) {
        scene.add(this.obj);
    }
    
    abstract render(dx: number, dy: number): void
}