import { 
    Group, MeshBasicMaterial, DoubleSide,
    ShapeBufferGeometry, Mesh, Scene, Matrix4
} from "three";
import { SVGLoader } from "./loader/SVGLoader";
import map from "../../assets/map5.svg";


// instantiate a loader
// let dx = 0, dy = 0;

function li(a: number, b: number, n: number) {
    return (1 - n) * a + n * b;
}

export class Map {
    private loader: SVGLoader;
    private group: Group;
    private meshes: Mesh[];
    constructor() {
        this.loader = new SVGLoader();
        this.group = new Group();
        this.meshes = [];
    }

    public draw(scene: Scene) {
        const g = this.group;
        const meshes = this.meshes;
        // load a SVG resource
        this.loader.load(
            // resource URL
            map,
            // called when the resource is loaded
            function ( data ) {
                const paths = data.paths;
                for ( let i = 0; i < paths.length; i ++ ) {
                    const path = paths[ i ];
                    const material = new MeshBasicMaterial( {
                        color: i === 0 ? 0xFCD074 : 0x00FF00,
                        side: DoubleSide,
                        depthWrite: false
                    } );
                    const shapes = path.toShapes( true );
                    for ( let j = 0; j < shapes.length; j ++ ) {
                        const shape = shapes[ j ];
                        const geometry = new ShapeBufferGeometry( shape );
                        const mesh = new Mesh( geometry, material );
                        meshes.push(mesh);
                        g.scale.y = -1;
                        g.position.x = g.position.x - 2.3;
                        g.position.y = g.position.y + 4;
                        g.add( mesh );
                    }
                }
                scene.add(g);
            },
            // called when loading is in progresses
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
    }

    public render(sx: number, sy: number) {
        // dx = li(dx, sx, 0.07);
        // dy = li(dy, sy, 0.07);
        // dx = Math.floor(dx * 100) / 100;
        // dy = Math.floor(dy * 100) / 100;
        // this.obj.position.x = this.offset.x + dx;
        // this.obj.position.y = this.offset.y + dy;

        this.group.position.x = this.group.position.x + sx;
        this.group.position.y = 30 - sy / 8.2;
    }
}
