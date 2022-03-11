import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap, ControllerComponent } from './engine/Engine';
import GameLoop from './engine/GameLoop';

import assets from './assets.json';
import soundMappings from './soundMappings.json';
//import inputMappings from './inputMappings.json';

const inputMappings: InputTriggerMap = {
    'KeyT': f1,
    'KeyW': up,
    'KeyS': down,
    'KeyA': left,
    'KeyD': right,
    'KeyH': sideways

//    'KeyF': f2,
//    'KeyR': f3
}
function sideways() {
    document.dispatchEvent(new Event("move_sideways"));

}

function up() {
    document.dispatchEvent(new Event("move_up"));
}

function down() {
    document.dispatchEvent(new Event("move_down"));
}

function left() {
    document.dispatchEvent(new Event("move_left"));
}

function right() {
    document.dispatchEvent(new Event("move_right"));
}

function f1() {
    console.log("Some shound should be heard!");
}

const go1: GameObject = new GameObject(1);
go1.addBoxCollider();

//function f2() {
//    //obj2.getTransform().translate(3, 3);
//    //obj1.getTransform().setPosition(10, 10);
//    //console.log(obj1.getTransform().getPosition());
//    console.log(obj1.getObjectID() + ": (" + obj1.getTransform().getPosition().getY() + ", " + obj1.getTransform().getPosition().getY() + ")");
//}

//function f3() {
//    obj1.getTransform().translate(3, 3);
//}

const engine: Engine = new Engine(inputMappings, soundMappings, assets);

engine.addTrack("s0", 0);
engine.addTrack("s1", 1);
engine.addTrack("s2", 2);
engine.addTrack("s3", 3);
engine.addTrack("s4", 4);


//let obj1: GameObject = new GameObject(1);
//obj1.addSprite("bird");
//engine.addGameObject(obj1);
let playa: GameObject = new GameObject(1);

function translateTest(go: GameObject) {
    console.log("translateTest running");
    go.getTransform().translate(3, 3);
}

const cm: InputTriggerMap = {
    'move_sideways': () => {translateTest(playa)},
}
playa.addControllerComponent(cm);
playa.addSprite("bird");
engine.addGameObject(playa);

//const obj2: GameObject = new GameObject(1);
//obj2.addSprite("background");
//engine.addGameObject(obj2);


//const gc1: GameComponent = createComponent(25, 25, engine.getImage("bird").src);
//engine.addGameComponent(gc1);
//const bg: GameComponent = createComponent(0, 0, engine.getImage("background").src);
//engine.addGameComponent(bg);

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
