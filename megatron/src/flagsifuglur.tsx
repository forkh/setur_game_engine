import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent } from './engine/Engine';

import assets from './assets.json';
import soundMappings from './soundMappings.json';
//import inputMappings from './inputMappings.json';

const inputMappings: InputTriggerMap = {
    'KeyT': f1,
    'KeyF': f2
}



function f1() {
    console.log("Some shound should be heard!");
    document.dispatchEvent(new Event("background_music"));
}

function f2() {

}

const engine: Engine = new Engine(inputMappings, soundMappings, assets);

engine.addTrack("s0", 0);
engine.addTrack("s1", 1);
engine.addTrack("s2", 2);
engine.addTrack("s3", 3);
engine.addTrack("s4", 4);

const obj1: GameObject = new GameObject();
obj1.addSprite("background");
obj1.addBoxCollider(13, 13);
engine.addGameComponent(obj1);

//const gc1: GameComponent = createComponent(25, 25, engine.getImage("bird").src);
//engine.addGameComponent(gc1);
//const bg: GameComponent = createComponent(0, 0, engine.getImage("background").src);
//engine.addGameComponent(bg);

function FlagsiFuglur() {
    //document.dispatchEvent(new Event("background_music"));
    return (
        <div className={"FlagsiFuglur"}>
            {engine.run()}
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
