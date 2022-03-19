import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap, ControllerComponent, Vector2d } from './engine/Engine';
import GameLoop from './engine/GameLoop';
import assets from './assets.json';
import soundMappings from './soundMappings.json';

const inputMappings: InputTriggerMap = {
    'KeyD': () => {document.dispatchEvent(new Event("toggle_debug"))},
    'Space': () => {document.dispatchEvent(new Event("whip"))},
}

const xRes: number = 450;
const yRes: number = 800;

let engine: Engine = new Engine(inputMappings, soundMappings, assets, xRes, yRes);

const controlMappings: ControlMap = {
    'whip': whip,
}

function whip(go: GameObject): void {
    console.log("Whip!");
    document.dispatchEvent(new Event("flap"));
    document.dispatchEvent(new Event("bgmusic"));
    let force: Vector2d = Vector2d.zero;
    force.setXY(0, -400);
    go.addForce(force);
}

const background: GameObject = new GameObject(5);
background.addSprite("uberbg");
background.getTransform().translate(225, 400);
engine.addGameObject(background);

const fuglur2: GameObject = new GameObject(50);
fuglur2.getTransform().setPosition(50, 400);
const gc2: ControllerComponent = new ControllerComponent(fuglur2, controlMappings);
fuglur2.addComponent(gc2);
fuglur2.addSprite("bird");
fuglur2.addBoxCollider(64, 64);
fuglur2.addRigidBodyComponent(fuglur2);
fuglur2.solid = false;
engine.addGameObject(fuglur2);
fuglur2.tag = "bird";
engine.registerCollisionObject(fuglur2);


engine.addTrack("flap", 2);

engine.startCollisionsChecking();
function Template() {
return (
    <div className={"Template"}>
        {engine.run()}
    </div>
);
}

export default Template;
