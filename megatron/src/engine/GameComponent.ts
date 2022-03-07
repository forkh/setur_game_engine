import {Transform} from './transform';
import {Vector2d} from "./math";
import {ObjectID} from './ObjectID';
import { ReactNode } from 'react';
import React from 'react';

type GameComponentMap = {
    [key: string]: BaseComponent;
}

interface BaseComponent {
    getOID(): number;
}

type GameComponent = {
    transform: Transform,
    sprite: string | null,
    collider: any
    active: boolean;
}

function createComponent(x: number, y: number, sprite_path: string): GameComponent {
    let go: GameComponent = {
        // @ts-ignore
        transform: {
            rotation: 0,
            scale: Vector2d.one,
            position: new Vector2d(0, 0)
        },
        sprite: sprite_path,
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