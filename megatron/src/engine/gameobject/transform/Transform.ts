import {Vector2} from "../../core/maths";

export type Transform = {
    position: Readonly<Vector2>;
    rotation: Readonly<number>;
    scale: Readonly<Vector2>;

    setPosition(value: Vector2): void;
    setRotation(value: number): void;
    setScale(value: Vector2): void;

    translate(value: Vector2): void;
    rotate(value: number): void;
};