import {ResourceManager} from "./ResourceManager";
import {GameComponent} from "./GameComponent";
import { ReactNode } from "react";

type ComponentMap = {
    [oid: number]: GameComponent;
}

const gameComponents: GameComponent[] = [];

type Engine = {
    active?: boolean;
    name?: string;
    components: GameComponent[];
}

function addGameComponent(gameComponents: GameComponent[], gameComponent: GameComponent) {
    gameComponents.push(gameComponent);
}

export type {Engine};
export {gameComponents, addGameComponent};