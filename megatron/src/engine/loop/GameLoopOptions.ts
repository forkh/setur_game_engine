import { GameObject } from "../gameobject/GameObject";

export type GameLoopOptions = {
    registerObject(gameObject: GameObject): void;
    start(): void;
};
