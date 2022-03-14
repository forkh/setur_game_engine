import React from 'react';
import logo from './logo.svg';
import './App.css';
import assets from './srassets.json';
import soundMappings from './sr_soundMappings.json';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap, ControllerComponent } from './engine/Engine';

const inputMappings: InputTriggerMap = {
    'KeyD': () => {

    },

    'KeyA': () => {

    },

    'Space': () => {

    }
}

let engine: Engine = new Engine(inputMappings, soundMappings, assets, 800, 600);//, 1536, 0.5675, 0.75);

// Game objects
const background: GameObject = new GameObject(10);
background.addSprite("background");
background.getTransform().setPosition(400, 300);
engine.addGameObject(background);

function SuperRuni() {
    return (
        <div className={"SuperRuni"}>
            {engine.run()}
        </div>

    );
}

export default SuperRuni;
