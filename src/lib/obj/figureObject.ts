// import { EventBus } from "./eventBus";
// function li(a: number, b: number, n: number) {
//     return (1 - n) * a + n * b;
// }
interface Offset {
    offsetX: number,
    offsetY: number
}

interface Postion {
    x: number,
    y: number
}

interface Size {
    w: number,
    h: number
}

export interface FingureRender {
    addTo(container: HTMLDivElement): void
    animate(sy: number): boolean
}

export class Figure implements FingureRender{
    private object: HTMLDivElement;
    private offset: Offset
    private size: Size;
    private speed: number;
    private position: Postion;
    constructor(size: Size, offset: Offset, speed: number) {
        this.object = document.createElement('div');
        this.size = {
            w: size.w,
            h: size.h,
        }
        this.offset = {
            offsetX: offset.offsetX,
            offsetY: offset.offsetY,
        }
        this.position = {
            x: offset.offsetX,
            y: offset.offsetY
        }
        this.speed = speed;
        this.setStyle();
    }

    private setStyle() {
        this.object.style.position = 'fixed';
        this.object.style.left = `${this.position.x}px`;
        this.object.style.top = `${this.position.y}px`;
        this.object.style.width = `${this.size.w}px`;
        this.object.style.height = `${this.size.h}px`;
        this.object.style.backgroundColor = 'red';
        this.object.style.transition = 'background-color 1s';
    }

    public addTo(container: HTMLDivElement) {
        container.appendChild(this.object);
    }

    // public startAnimation(sx: number, sy: number) {
    //     const obj = this.object;
    //     let rafId: any;
    //     const speed: number = this.speed;
    //     positionBuffer.push(sy * Math.abs(this.speed));
    //     function animate () {
    //         let latestSy = positionBuffer.pop();
    //         positionBuffer = [];
    //         if (latestSy !== undefined) preSy = latestSy;
    //         else {
    //             latestSy = preSy;
    //         }
    //         const diff = latestSy - dy;
    //         const delta = Math.abs(diff) < 0.1 ? 0 : diff * 0.07;
    //         if (delta) { // If `delta !== 0`
    //             // Update `current` scroll position
    //             dy += delta
    //             // Call `update` again, using `requestAnimationFrame`
    //             rafId = requestAnimationFrame(animate)
    //         } else { // If `delta === 0`
    //             rafActive = false;
    //             // Update `current`, and finish the animation loop
    //             cancelAnimationFrame(rafId);
    //         }
    //         obj.style.transform = `translateY(${dy}px)`;
    //         obj.style.top = `${dy}px`;
    //     }
    //     if (!rafActive) {
    //         rafActive = true;
    //         rafId = requestAnimationFrame(animate)
    //     }
    // }

    // public startAnimation(sx: number, sy: number) {
    //     const obj = this.object;
    //     const offset = this.offset;
    //     const position = this.postion;
    //     const options = this.options;
    //     options.positionBuffer.push(sy * Math.abs(this.speed));
    //     let rafId: any;
    //     function animate () {
    //         let latestSy = options.positionBuffer.pop();
    //         options.positionBuffer = [];
    //         if (latestSy !== undefined) options.preSy = latestSy;
    //         else {
    //             latestSy = options.preSy;
    //         }

    //         const diff = -latestSy + offset.offsetY - position.y;
    //         const delta = Math.abs(diff) < 0.1 ? 0 : diff * 0.1;
    //         if (delta) { // If `delta !== 0`
    //             // Update `current` scroll position
    //             position.y += delta
    //             // Call `update` again, using `requestAnimationFrame`
    //             rafId = requestAnimationFrame(animate)
    //         } else { // If `delta === 0`
    //             options.rafActive = false;
    //             // Update `current`, and finish the animation loop
    //             cancelAnimationFrame(rafId);
    //         }
    //         // console.log(position.y)
    //         obj.style.top = `${position.y}px`;
    //     }
    //     if (!options.rafActive) {
    //         options.rafActive = true;
    //         rafId = requestAnimationFrame(animate)
    //     }
    // }


    public animate(sy: number): boolean {
        const speed = sy * this.speed;
        const diff = -speed + this.offset.offsetY - this.position.y;
        const delta = Math.abs(diff) < 0.1 ? 0 : diff * 0.1;
        if (delta) { // If `delta !== 0`
            // Update `current` scroll position
            this.position.y += delta
            this.object.style.top = `${this.position.y}px`;
            return false;
        } 
        this.object.style.top = `${this.position.y}px`;
        return true;
    }

    public changeColor(color: string) {
        this.object.style.backgroundColor = color;
    }
}