import {
    PlaneGeometry, MeshBasicMaterial, DoubleSide
} from "three";

import { BaseModel, Options } from "./baseModel";

function li(a: number, b: number, n: number) {
    return (1 - n) * a + n * b;
}

let dx = 0, dy = 0;
export class Box extends BaseModel {
    constructor(options: Options) {
        const geometry = new PlaneGeometry(options.w, options.h, 32);
        const material = new MeshBasicMaterial({ color: options.color, side: DoubleSide });
        super(geometry, material, options);   
    }

    public render(sx: number, sy: number) {
        dx = li(dx, sx, 0.07);
        dy = li(dy, sy, 0.07);
        dx = Math.floor(dx * 100) / 100;
        dy = Math.floor(dy * 100) / 100;
        this.obj.position.x = this.offset.x + dx;
        this.obj.position.y = this.offset.y + dy;
    }
}