import {useState} from "react";
import {Vector2} from "../../core/maths";
import {Transform} from "./Transform";
import {TransformProps} from "./TransformProps";

export function useTransform(props?: TransformProps): Transform {
    const [position, setPosition] = useState(props?.position || Vector2.zero);
    const [rotation, setRotation] = useState(props?.rotation || 0);
    const [scale, setScale] = useState(props?.scale || Vector2.one);

    const translate = (pos: Vector2) => {
        setPosition((current) => Vector2.add(current, pos));
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