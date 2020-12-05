import { router } from "../../router";
import { store } from "../../store";
import { ScrollStatus } from '../../constant/status';
import { FingureRender } from './figureObject';

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

export class ImageObject implements FingureRender{
    private container: HTMLDivElement;
    private object: HTMLImageElement;
    private offset: Offset
    private size: Size;
    private speed: number;
    private position: Postion;
    private imageMap: Map<ScrollStatus, string>;
    private selectedImage: string;
    constructor(size: Size, offset: Offset, speed: number, imageMap: Map<ScrollStatus, string>) {
        this.container = document.createElement('div');
        this.object = document.createElement('img');
        this.object.style.height = `${size.h}px`;
        this.object.style.width = `${size.w}px`;
        this.object.src = imageMap.get(ScrollStatus.PART_1) as string;
        this.selectedImage = imageMap.get(ScrollStatus.PART_1) as string;
        this.object.style.opacity = "1";
        this.container.appendChild(this.object);
        this.imageMap = imageMap;
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
        

        this.setOnClickEvent();
    }

    private setStyle() {
        this.container.style.position = 'fixed';
        this.container.style.left = `${this.position.x}px`;
        this.container.style.top = `${this.position.y}px`;
        this.container.style.width = `${this.size.w}px`;
        this.container.style.height = `${this.size.h}px`;
        this.container.style.backgroundColor = 'red';
        this.container.style.transition = 'background-color 1s';
    }

    private setOnClickEvent() {
        const container = this.container;
        const obj = this.object;
        const selectedImage = this.selectedImage;
        this.container.onclick = function (this: GlobalEventHandlers, ev: MouseEvent): any {
            store.state.clickedImage = selectedImage;
            container.style.transition = 'left 1s, top 1s';
            container.style.position = 'absolute'
            container.style.left = `${100}px`;
            container.style.top = `${100}px`;
            
            obj.style.transition = 'width 1s, height 1s';
            obj.style.left = `${100}px`;
            obj.style.top = `${100}px`;
            obj.style.width = `${500}px`;
            obj.style.height = `${400}px`;
            // let clickCount = 0;
            // container.addEventListener('transitionend', function (ev) {
            //     if (clickCount < 1) {
            //         router.push('/focused');
            //         clickCount += 1;
            //     }
            // });
        }
    }

    public addTo(container: HTMLDivElement) {
        container.appendChild(this.container);
    }

    public animate(sy: number): boolean {
        const speed = sy * this.speed;
        const diff = -speed + this.offset.offsetY - this.position.y;
        const delta = Math.abs(diff) < 0.1 ? 0 : diff * 0.1;
        if (delta) { // If `delta !== 0`
            // Update `current` scroll position
            this.position.y += delta
            this.container.style.top = `${this.position.y}px`;
            return false;
        } 
        this.container.style.top = `${this.position.y}px`;
        return true;
    }

    public changeImage(status: ScrollStatus) {
        this.object.src = this.imageMap.get(status) as string;
        this.selectedImage = this.imageMap.get(status) as string;
    }
}