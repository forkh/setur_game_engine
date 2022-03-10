import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Engine, InputTriggerMap, AssetsType } from './engine/Engine';

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

function FlagsiFuglur() {
    document.dispatchEvent(new Event("background_music"));
    return (
        <div className="FlagsiFuglur">
            <header className="App-header">
                <img src={engine.getImage("bird").src} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </header>
        </div>

    );
}

export default FlagsiFuglur;
