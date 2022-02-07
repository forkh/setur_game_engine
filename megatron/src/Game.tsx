import React from 'react';
import './Game.css';
import './Test';
import './Renderer';
import {renderer} from "./Renderer";
import {Sprite} from "./Sprite";
import {BaseObject2} from "./BaseObject2";
import jsonData from './assets.json';
import {Position} from "./Position";

// Burdi veri flutt til ResourceLoading.tsx
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
    setInterval(renderer, 1000, objects);
    console.log("Test!!");
    return (
    <div className="Game">
        <canvas id="game-canvas"></canvas>
    </div>
  );
}

export default Game;
