import { EventBus } from './eventBus';
import { store } from '../store';
import { ScrollStatus } from '../constant/status';
import { FingureRender } from './obj/figureObject';

export interface Renderer {
    render(sx: number, sy: number): void;
    fitSizeOnScreen(): void
}

let part: ScrollStatus = ScrollStatus.PART_1;
function updateStatusScrollPart(sy: number) {
    if (sy < 2000 - window.innerHeight / 2) {
        if (part !== ScrollStatus.PART_1) {
            part = ScrollStatus.PART_1;
            store.state.scrollStatus = ScrollStatus.PART_1;
        }
    } else if (sy < 4000 - window.innerHeight / 2) {
        if (part !== ScrollStatus.PART_2) {
            part = ScrollStatus.PART_2;
            store.state.scrollStatus = ScrollStatus.PART_2;
        }
    }
}

export class WindowManager {
    private options: {
        rafId: number
        positionBuffer: number[],
        preSy: number,
        rafActive: boolean
    } = {
        rafId: 0,
        positionBuffer: [],
        preSy: 0,
        rafActive: false
    }

    addEvent(eventObject: { [eventName: string]: (this: Window, ev: Event) => any }) {
        Object.keys(eventObject).forEach((key) => {
            window.addEventListener(key, eventObject[key]);
        });
    }

    removeEvent(eventObject: { [eventName: string]: (this: Window, ev: Event) => any }) {
        Object.keys(eventObject).forEach((key) => {
            window.removeEventListener(key, eventObject[key]);
        });
    }
    scrollEvent() {
        window.addEventListener('scroll', this.scrollEventListener, {  passive: true });
    }

    removeScrollEvent() {
        window.removeEventListener('scroll', this.scrollEventListener);
    }

    private scrollEventListener() {
        const sx = window.pageXOffset;
        const sy = window.pageYOffset;
        EventBus.$emit('scroll', sx, sy);
        updateStatusScrollPart(sy);
    }

    public startAnimation(sx: number, sy: number, fitures: FingureRender[]) {
        const options = this.options;
        options.positionBuffer.push(sy);
        function animate () {
            let latestSy = options.positionBuffer.pop();
            options.positionBuffer = [];
            if (latestSy !== undefined) options.preSy = latestSy;
            else {
                latestSy = options.preSy;
            }
            
            const isStoped = fitures.map((figure) => figure.animate(latestSy as number));
            if (!isStoped.every((stoped) => stoped)) { // If `delta !== 0`
                options.rafId = requestAnimationFrame(animate);
            } else { // If `delta === 0`
                options.rafActive = false;
                // Update `current`, and finish the animation loop
                cancelAnimationFrame(options.rafId);
            }
        }
        if (!options.rafActive) {
            options.rafActive = true;
            options.rafId = requestAnimationFrame(animate)
        }
    }
}