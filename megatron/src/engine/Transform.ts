import { Vector2d } from './math';

type Transform = {
    position: Vector2d;
    rotation: number;
    scale: Vector2d;
}

function new_transform(): Transform {
    const transform: Transform = {
        position: Vector2d.zero,
        rotation: 0,
        scale: Vector2d.one
    }

    return transform;
}

function getPosition(transform: Transform) {
    return transform.position;
}

export type { Transform };
export { new_transform };