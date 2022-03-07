import React from 'react';
import { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import Canvas from "./engine/Canvas";
import {ResourceManager, ImageMap} from './engine/ResourceManager';
import {renderer, renderObject, testhey, testprop} from "./engine/CSSRenderer"
import inputs from './inputs.json';
import {AudioSystem} from './engine/AudioSystem';
import resources from './engine/assets.json';
import {useContext} from "react";
import {GameLoop} from './engine/GameLoop';
import { EventType, InputMap, InputTriggerMap, InputSystem } from './engine/Input';

ResourceManager.instantiateResourceManager(resources);
AudioSystem.instantiateAudioSystem();
const prp: testprop = {
    src: "/assets/images/bird.png",
    x: 0,
    y: 0
}
InputSystem.instantiateInputSystem(inputs);

function App() {
    const [resourceType, setResourceType] = useState('posts');

    console.log("render");

    useEffect(() => {
        console.log('resource type changed');
    }, [resourceType]);

    return (
        <div style={{position: 'relative', width: "800px", height: "800px", backgroundColor: "red"}}>
            <GameLoop>
                {AudioSystem.play("power")}
            </GameLoop>
        </div>
    )
}

export default App;
