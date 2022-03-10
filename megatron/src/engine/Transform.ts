import { Vector2d } from './math';

class Transform {
    private position: Vector2d;
    private rotation: number;
    private scale: Vector2d;

    public constructor() {
        this.position = Vector2d.zero;
        this.rotation = 0;
        this.scale = Vector2d.one;
    }

    public translate(x: number, y: number): void {
        this.position.addXY(x, y);
    }

    public setRotation(r: number): void {
        this.rotation += r;
    }

    public setScale(x: number, y: number) {
        this.scale.setXY(x, y);
    }

    public getPosition(): Vector2d {
        return this.position;
    }

    public getRotation(): number {
        return this.rotation;
    }

    public getScale(): Vector2d {
        return this.scale;
    }

}

//type Transform = {
//    position: Vector2d;
//    rotation: number;
//    scale: Vector2d;
//}
//
//function new_transform(): Transform {
//    const transform: Transform = {
//        position: Vector2d.zero,
//        rotation: 0,
//        scale: Vector2d.one
//    }
//
//    return transform;
//}
//
//function getPosition(transform: Transform) {
//    return transform.position;
//}
//
//export type { Transform };
//export { new_transform };
export { Transform };