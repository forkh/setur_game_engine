import React from 'react';
import logo from './logo.svg';
import './App.css';
import './engine/ResourceManager'
import {ResourceManager} from "./engine/ResourceManager";
import {InputSystem, InputTriggerMap} from './engine/InputSystem';
import {AudioSystem, EventSounds} from './engine/AudioSystem';
import assets from './assets.json';
// Input mapping object
const inputMap: InputTriggerMap = {
    'KeyR': f1,
    'KeyT': f2
}

// Audio events mapping
const audioEvents: EventSounds = {
    'shoot': 0,
    'test': 1,
    'explosion': 2,
    'audio': 3,
    'background_music': 4
}

// Used in f1 function
var i: number = 0;

// Instantiates sub systems.
ResourceManager.instantiateResourceManager(assets);
InputSystem.instantiateInputSystem(inputMap);
AudioSystem.instantiateAudioSystem(audioEvents);

// Add sounds to channels
AudioSystem.addTrack(ResourceManager.getAudio("s0"), 0);
AudioSystem.addTrack(ResourceManager.getAudio("s1"), 1);
AudioSystem.addTrack(ResourceManager.getAudio("s2"), 2);
AudioSystem.addTrack(ResourceManager.getAudio("s3"), 3);


// Dispatches a specific event based upon the value of variable i.
function f1() {
    console.log("Playing some sound:");
    if (i == 0) {
        console.log("Shoot!");
        document.dispatchEvent(new Event("shoot"));
    }

    if (i == 1) {
        console.log("Test!");
        document.dispatchEvent(new Event("test"));
    }

    if (i == 2) {
        console.log("Explosion!");
        document.dispatchEvent(new Event("explosion"));
    }

    if (i == 3) {
        console.log("Audio!");
        document.dispatchEvent(new Event("audio"));
    }

    i++;
    if (i > 3) {
        i = 0;
    }

    console.log("i is: " + i);
}

// Does nothing but log to console
function f2() {
    console.log("Silence :>");
}

// Best bird in the world.
let t = ResourceManager.getImage("bird", true);
//console.log(t);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                {t}
            </header>
        </div>

    );
}

export default App;
