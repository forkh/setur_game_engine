import { createContext } from "react";
import { GameObject } from "../gameobject/GameObject";
import { GameLoopOptions } from "./GameLoopOptions";


export const GameLoopContext = createContext<GameLoopOptions>({
    registerObject(_gameObject: GameObject) { },
    start() { }
})