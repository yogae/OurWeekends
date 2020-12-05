
// import {
//     WebGLRenderer, PerspectiveCamera, Scene, TextureLoader
// } from "three";
// import { Renderer } from './windowManager';
// import { BaseModel } from './threeModels/baseModel';
// import { Map } from './threeModels/map';

// export class Draw implements Renderer {
//     private renderer: WebGLRenderer;
//     private camera: PerspectiveCamera;
//     private scene: Scene;
//     private models: BaseModel[];
//     private map: Map;
//     constructor() {
//         this.renderer = new WebGLRenderer();
//         this.camera = this.makeCamera();
//         this.scene = new Scene();
//         this.models = [];
//     }

//     private makeCamera() {
//         const camera = new PerspectiveCamera(
//             45,
//             window.innerWidth / window.innerHeight,
//             1,
//             500
//         );
//         camera.position.set(0, 0, 100);
//         camera.lookAt(0, 0, 0);
//         return camera;
//     }

//     public addObject(model: BaseModel) {
//         model.draw(this.scene);
//         this.models.push(model);
//     }

//     public addSvg(map: Map) {
//         map.draw(this.scene);
//         this.map = map;
//     }

//     public init(container: HTMLElement) {
//         container.appendChild(this.renderer.domElement);
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         this.renderer.render(this.scene, this.camera);
//         this.renderer.setClearColor(0xffffff)
//     }

//     public fitSizeOnScreen() {
//         this.camera.updateProjectionMatrix();
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//     }

//     public render(sx: number, sy: number) {
//         this.map.render(sx, sy);
//         this.camera.updateProjectionMatrix();
//         this.models.forEach((model) => {
//             model.render(sx, sy);
//         });
        
//         this.renderer.render(this.scene, this.camera);
//     }

// }