import React from 'react';
import logo from './logo.svg';
import './Game.css';
import './Test';
import {createHemingur, printHemingur} from "./Test";
import {BaseObject, createBaseObject} from "./BaseObject";
import './Renderer';
import {renderer} from "./Renderer";
import {loadSprites} from "./ResourceLoading";
import {Sprite} from "./Sprite";
import {BaseObject2} from "./BaseObject2";
import jsonData from './assets2.json';
import {Position} from "./Position";

function testest() {
    console.log("Interval test");
}

function loadObjects() : BaseObject2[] {
    let objects: BaseObject2[] = [];
    jsonData["objects"].forEach(obj => {
        let pos: Position = new Position(obj.position.x, obj.position.y, obj.position.rotation);
        let object: BaseObject2 =
            new BaseObject2(obj.name, new Sprite(obj.sprite.path), null, pos);
        objects.push(object);
    });

    return objects;
}

let objects: BaseObject2[] = loadObjects();

function Game() {
    //let sprites: Sprite[] = loadSprites("assets.json");
    setInterval(renderer, 1000, objects);
    console.log("Test!!");
    return (
    <div className="Game">
        <canvas id="game-canvas"></canvas>
    </div>
  );
}

export default Game;
