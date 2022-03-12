import React from 'react';
import logo from './logo.svg';
import './App.css';
//import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap } from './engine/Engine';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap, ControllerComponent } from './engine/Engine';
import GameLoop from './engine/GameLoop';

import assets from './assets.json';
import soundMappings from './soundMappings.json';
import { CollisionSystem } from './engine/CollisionSystem';

const inputMappings: InputTriggerMap = {
    'KeyT': f1,
    'KeyW': up,
    'KeyS': down,
    'KeyA': left,
    'KeyD': right,
    'KeyH': sideways,
    'KeyR': () => {document.dispatchEvent(new Event("random"))}
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

const engine: Engine = new Engine(inputMappings, soundMappings, assets);

// Extend GameComponent for specialization
class BirdComponent extends GameComponent {
    //private go: GameObject;
    parent: GameObject;
    private funky: any = (x: any) => {
        console.log(x);
    }

    public constructor(go: GameObject) {
        super(go);
        this.parent = go;
        console.log(go);
        document.addEventListener("move_sideways", this.squeek.bind(this));
        this.parent.getTransform().getPosition();
    }

    private squeek(): void {
        console.log("squeek!");
        this.parent.getTransform().translate(3, 0);
    }


}

function birdup(go: GameObject): void {
    go.getTransform().translate(25, 0);
    console.log("GO: " + go);
}

const cm: ControlMap = {
    'move_up': birdup,
    'random': (go: GameObject) => {
        go.getTransform().setPosition(3, 15);
    }
}

document.addEventListener('collision', () => {
    window.alert("COLLSION!");
})

const fuglur: GameObject = new GameObject(100);
const gc: ControllerComponent = new ControllerComponent(fuglur, cm);
fuglur.addComponent(gc);
fuglur.addComponent(new BirdComponent(fuglur));
fuglur.addSprite("bird");
fuglur.addBoxCollider(15,15);


engine.addGameObject(fuglur);

debugger;
CollisionSystem.getInstance([fuglur]);

const background: GameObject = new GameObject(100);
//fuglur.addComponent(new BirdComponent(fuglur));
background.addSprite("background");
background.addBoxCollider(100,100);


engine.addGameObject(background);

engine.addTrack("s0", 0);
engine.addTrack("s1", 1);
engine.addTrack("s2", 2);
engine.addTrack("s3", 3);
engine.addTrack("s4", 4);

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
