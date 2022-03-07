import { Vector2d } from './math';
import { useState } from 'react';

type Transform = {
    position: Vector2d;
    rotation: number;
    scale: Vector2d;

    setPosition(value: Vector2d): void;
    setRotation(value: number): void;
    setScale(value: Vector2d): void;

    translate(value: Vector2d): void;
    rotate(value: number): void;
}

type TransformProps = {
    position?: Vector2d;
    rotation?: number;
    scale?: Vector2d;
}

function useTransform(props?: TransformProps): Transform {
    const [position, setPosition] = useState(props?.position || Vector2d.zero);
    const [rotation, setRotation] = useState(props?.rotation || 0);
    const [scale, setScale] = useState(props?.scale || Vector2d.one);

    const translate = (pos: Vector2d) => {
        setPosition((current) => Vector2d.add(current, pos));
    }

    const rotate = (angle: number) => {
        setRotation((current) => current + angle);
    }

    return {
        position,
        rotation,
        scale,
        setPosition,
        setRotation,
        setScale,
        translate,
        rotate
    };
}

export {useTransform};
export type {Transform, TransformProps};