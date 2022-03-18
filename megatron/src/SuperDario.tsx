import React from 'react';
import './App.css';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap, ControllerComponent } from './engine/Engine';
import { Vector2d } from './engine/math';

import assets from './marioAssets.json';
import soundMappings from './soundMappings.json';
import {CollisionSystem} from "./engine/CollisionSystem";



let CANVAS_HEIGHT: number = window.innerHeight;
let CANVAS_WIDTH: number  = window.innerHeight;

const inputMappings: InputTriggerMap = {
    'KeyW': () => {document.dispatchEvent(new Event("move_up1"))},
    'KeyS': () => {document.dispatchEvent(new Event("move_down1"))},
    'KeyA': () => {document.dispatchEvent(new Event("move_left1"))},
    'KeyD': () => {document.dispatchEvent(new Event("move_right1"))},
    'KeyI': () => {document.dispatchEvent(new Event("move_up2"))},
    'KeyK': () => {document.dispatchEvent(new Event("move_down2"))},
    'KeyJ': () => {document.dispatchEvent(new Event("move_left2"))},
    'KeyL': () => {document.dispatchEvent(new Event("move_right2"))},
    'KeyR': () => {document.dispatchEvent(new Event("random"))},
    'F1': () => {document.dispatchEvent(new Event("toggle_debug"))},
    'Space': () => {document.dispatchEvent(new Event("whip"))},
    'KeyN': () => {document.dispatchEvent(new Event("whip2"))},
    'KeyP': () => {document.dispatchEvent(new Event("printCol"))},
    'KeyV': () => {document.dispatchEvent(new Event("island_hopper"))},
}

function test() {

}

let engine: Engine = new Engine(inputMappings, soundMappings, assets, 1000, 600);//, 1536, 0.5675, 0.75);


function birdup(go: GameObject): void {
    go.getTransform().translate(25, 0);
    console.log("GO: " + go);
}

const cm: ControlMap = {
    'move_up1': move_up,
    'move_down1': move_down,
    'move_left1': move_left,
    'move_right1': move_right,
}

const cm2: ControlMap = {
    'move_up2': move_up,
    'move_down2': move_down,
    'move_left2': move_left,
    'move_right2': move_right,
    'whip': whip,
    'whip2': whip2,
}

function whip(go: GameObject): void {
    console.log("Whip!");
    let force: Vector2d = Vector2d.zero;
    force.setXY(0, -400);
    go.addForce(force);
    document.dispatchEvent(new Event("flap"));
    document.dispatchEvent(new Event("theme"));
}

function whip2(go: GameObject): void {
    console.log("Whip!");
    let force: Vector2d = Vector2d.zero;
    force.setXY(400, 0);
    go.addForce(force);
}

function move_right(go: GameObject): void {
    go.getTransform().translate(1, 0);
}
function move_left(go: GameObject): void {
    go.getTransform().translate(-1, 0);
}
function move_up(go: GameObject): void {
    go.getTransform().translate(0, -1);
}
function move_down(go: GameObject): void {
    go.getTransform().translate(0, 1);
}


document.addEventListener("printCol", () => {
    engine.printColliders();
})


const mario: GameObject = new GameObject(50);
//fuglur.getTransform().setRotation(5);
const cc: ControllerComponent = new ControllerComponent(mario, cm);
mario.addComponent(cc);
//fuglur.addComponent(new BirdComponent(fuglur));
mario.addSprite("mario");
mario.addBoxCollider(64,64);
//fuglur.solid = true;
//engine.addGameObject(fuglur);

const mario2: GameObject = new GameObject(50);
mario2.getTransform().setPosition(100, 100)
const cc2: ControllerComponent = new ControllerComponent(mario2, cm2);
mario2.addComponent(cc2);
mario2.addSprite("mario");
mario2.addBoxCollider(150, 150);
mario2.addRigidBodyComponent(mario2);
mario2.getTransform().setPosition(50, 0);
mario2.solid = true;
engine.addGameObject(mario2);

const pipe3 = new GameObject(50);
//pipe3.solid = true;
pipe3.getTransform().setPosition(50,300);
pipe3.addSprite("island");
pipe3.addBoxCollider(128, 64);
engine.addGameObject(pipe3);

type pipe_pair = {
    upper_pipe: GameObject,
    lower_pipe: GameObject
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}





//engine.registerCollisionObject(fuglur2);

const background: GameObject = new GameObject(1);
background.addSprite("background");
background.getTransform().setPosition(500, 300);
engine.addGameObject(background);


engine.addTrack("s0", 0);
engine.addTrack("s1", 1);
engine.addTrack("s2", 2);
engine.addTrack("theme", 3);
engine.addTrack("flap", 4);

engine.startCollisionsChecking();
function SuperDario() {
    return (
        <div className={"SuperDario"}>
            {engine.run()}
        </div>
    );
}

export default SuperDario;
