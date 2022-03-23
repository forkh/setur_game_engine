import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap, ControllerComponent } from './engine/Engine';
import GameLoop from './engine/GameLoop';
import { Vector2d } from './engine/math';

import assets from './assets.json';
import soundMappings from './soundMappings.json';
import { CollisionSystem, CollisionProps } from './engine/CollisionSystem';

let CANVAS_HEIGHT: number = window.innerHeight;
let CANVAS_WIDTH: number  = window.innerHeight;

const inputMappings: InputTriggerMap = {
    'KeyW': () => {
        document.dispatchEvent(new Event("move_up1"))
    },
    'KeyS': () => {
        document.dispatchEvent(new Event("move_down1"))
    },
    'KeyA': () => {
        document.dispatchEvent(new Event("move_left1"))
    },
    'KeyD': () => {
        document.dispatchEvent(new Event("move_right1"))
    },
    'Space': () => {
        document.dispatchEvent(new Event("jump"))
    },
}

let engine: Engine = new Engine(inputMappings, soundMappings, assets, 800, 800);


const cm: ControlMap = {
    'move_up': lilmanup,
    'move_down': lilmandown,
    'move_left': lilmanleft,
    'move_right': lilmanright,
    'jump': lilmanjump,

}

function lilmanup(go:GameObject): void {
    go.getTransform().translate(0,-5)
    console.log("moving up baby")
}

function lilmandown(go:GameObject): void {
    go.getTransform().translate(0,5)
    console.log("moving down")
}

function lilmanleft(go:GameObject): void {
    go.getTransform().translate(-5,0)
    console.log("moving left baby")
}

function lilmanright(go:GameObject): void {
    go.getTransform().translate(5,0)
    console.log("moving right baby")
}

function lilmanjump(go:GameObject): void {
    document.dispatchEvent(new Event("flap"));
    let force: Vector2d = Vector2d.zero;
    force.setXY(0, -400);
    go.addForce(force);
}

const background: GameObject = new GameObject(5);
background.addSprite("uberbg");
background.getTransform().translate(225, 400);
engine.addGameObject(background);

// const lilman : GameObject = new GameObject(2)
// const

export default JGame;