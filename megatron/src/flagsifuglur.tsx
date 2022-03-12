import React from 'react';
import logo from './logo.svg';
import './App.css';
//import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap } from './engine/Engine';
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
    'KeyH': sideways,
    'KeyR': () => {document.dispatchEvent(new Event("random"))}

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
        //console.log("squeek!");
        //console.log(this.parent);
        //this.parent.getTransform().translate(3, 0);
        //this.go.getTransform().getPosition();
        //this.parent.getTransform();
        //const go: GameObject = super.getParent();
        //go.getTransform().translate(3, 0);
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


const fuglur: GameObject = new GameObject(100);
const gc: ControllerComponent = new ControllerComponent(fuglur, cm);
fuglur.addBoxCollider();
fuglur.addComponent(gc);
fuglur.addComponent(new BirdComponent(fuglur));
fuglur.addSprite("bird");


engine.addGameObject(fuglur);
engine.addTrack("s0", 0);
engine.addTrack("s1", 1);
engine.addTrack("s2", 2);
engine.addTrack("s3", 3);
engine.addTrack("s4", 4);


//let obj1: GameObject = new GameObject(1);
//obj1.addSprite("bird");
//engine.addGameObject(obj1);

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
