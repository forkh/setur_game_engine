import {Transform} from './Transform';
import {Vector2d} from "./math";
//import {ObjectID} from './ObjectID';
import { ReactNode } from 'react';
import React from 'react';

type GameComponentMap = {
    [key: string]: BaseComponent;
}

interface BaseComponent {
    getOID(): number;
}

type GameComponent = {
    transform: Transform;
    sprite: HTMLImageElement;
    collider: any;
    active: boolean;
}

function createComponent(x: number, y: number, sprite_path: string): GameComponent {
    const img = new Image();
    img.src = sprite_path;
    let go: GameComponent = {
        // @ts-ignore
        transform: {
            rotation: 0,
            scale: Vector2d.one,
            position: new Vector2d(0, 0)
        },
        sprite: img,
        collider: null,
        active: true
    }

    return go;
}

function setActive(component: GameComponent, status: boolean) {
    component.active = status;
}


export type {GameComponent};
export {createComponent};