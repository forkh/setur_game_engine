import React from 'react';
import logo from './logo.svg';
import './App.css';
//import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap } from './engine/Engine';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap, ControllerComponent } from './engine/Engine';
import GameLoop from './engine/GameLoop';
import { Vector2d } from './engine/math';

import assets from './assets.json';
import soundMappings from './soundMappings.json';
import { CollisionSystem, CollisionProps } from './engine/CollisionSystem';

const inputMappings: InputTriggerMap = {
    'KeyW': () => {document.dispatchEvent(new Event("move_up1"))},
    'KeyS': () => {document.dispatchEvent(new Event("move_down1"))},
    'KeyA': () => {document.dispatchEvent(new Event("move_left1"))},
    'KeyD': () => {document.dispatchEvent(new Event("move_right1"))},
    'KeyR': () => {document.dispatchEvent(new Event("random"))},
    'F1': () => {document.dispatchEvent(new Event("toggle_debug"))},
    'Space': () => {document.dispatchEvent(new Event("whip"))},
}

let engine: Engine = new Engine(inputMappings, soundMappings, assets);

// Extend GameComponent for specialization
//class BirdComponent extends GameComponent {
//    //private go: GameObject;
//    parent: GameObject;
//    private funky: any = (x: any) => {
//        console.log(x);
//    }
//
//    public constructor(go: GameObject) {
//        super(go);
//        this.parent = go;
//        console.log(go);
//        document.addEventListener("move_sideways", this.squeek.bind(this));
//        this.parent.getTransform().getPosition();
//    }
//
//    private squeek(): void {
//        console.log("squeek!");
//        this.parent.getTransform().translate(3, 0);
//    }
//
//
//}
//
function birdup(go: GameObject): void {
    go.getTransform().translate(25, 0);
    console.log("GO: " + go);
}

const cm: ControlMap = {
    'move_up1': move_up,
    'move_down1': move_down,
    'move_left1': move_left,
    'move_right1': move_right,
    //'random': (go: GameObject) => {
    //    go.getTransform().setPosition(3, 15);
    //}
}

const cm2: ControlMap = {
    'move_up2': move_up,
    'move_down2': move_down,
    'move_left2': move_left,
    'move_right2': move_right,
    'whip': whip,
    //'random': (go: GameObject) => {
    //    go.getTransform().setPosition(3, 15);
    //}
}

function whip(go: GameObject): void {
    console.log("Whip!");
    let force: Vector2d = Vector2d.zero;
    force.setXY(0, -1000);
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

document.addEventListener('collision', () => {
    window.alert("!!!!!!!!!!!!!!!!!!!!!COLLSION!!!!!!!!!!!!!!!!!!");
})


const fuglur: GameObject = new GameObject(50);
const gc: ControllerComponent = new ControllerComponent(fuglur, cm);
fuglur.addComponent(gc);
//fuglur.addComponent(new BirdComponent(fuglur));
fuglur.addSprite("bird");
fuglur.addBoxCollider(15,15);
engine.addGameObject(fuglur);


const fuglur2: GameObject = new GameObject(10);
const gc2: ControllerComponent = new ControllerComponent(fuglur2, cm2);
fuglur2.addComponent(gc2);
//fuglur.addComponent(new BirdComponent(fuglur));
fuglur2.addSprite("bird");
fuglur2.addBoxCollider(64, 64);
fuglur2.addRigidBodyComponent(fuglur2);
engine.addGameObject(fuglur2);

//let colProp: CollisionProps = {
//    gameObjects: [fuglur]
//}
//CollisionSystem.getInstance(colProp);

const background: GameObject = new GameObject(1000);
////fuglur.addComponent(new BirdComponent(fuglur));
background.addSprite("background");
//background.addBoxCollider(100,100);
//engine.addGameObject(background);
//engine.sortingGameObjects();
//CollisionSystem.start();

engine.addTrack("s0", 0);
engine.addTrack("s1", 1);
engine.addTrack("s2", 2);
engine.addTrack("s3", 3);
engine.addTrack("s4", 4);

engine.startCollisionsChecking();
engine.registerCollisionObject(fuglur);
function FlagsiFuglur() {
let f = GameLoop();
//document.dispatchEvent(new Event("background_music"));
return (
    <div className={"FlagsiFuglur"}>
        {engine.run()}
        {f}
    </div>
);
//    return (
//        <div className="FlagsiFuglur">
//            <header className="App-header">
//                <img src={engine.getImage("bird").src} className="App-logo" alt="logo" />
//                <p>
//                    Edit <code>src/App.tsx</code> and save to reload.
//                </p>
//            </header>
//            {engine.run()}
//        </div>
//
//    );
}

export default FlagsiFuglur;
