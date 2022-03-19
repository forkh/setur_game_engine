import React from 'react';
import logo from './logo.svg';
import './App.css';
//import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap } from './engine/Engine';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap, ControllerComponent } from './engine/Engine';
import GameLoop from './engine/GameLoop';
import { Vector2d } from './engine/math';

import assets from './assets.json';
import soundMappings from './soundMappings.json';
import { CollisionSystem, CollisionProps } from './engine/CollisionSystem';

//let CANVAS_HEIGHT: number = window.innerHeight * 0.75;
//let CANVAS_WIDTH: number  = window.innerHeight * 0.75 * 0.5675;

let CANVAS_HEIGHT: number = window.innerHeight;
let CANVAS_WIDTH: number  = window.innerHeight;

const inputMappings: InputTriggerMap = {
    'KeyW': () => {document.dispatchEvent(new Event("move_up1"))},
    'KeyS': () => {document.dispatchEvent(new Event("move_down1"))},
    'KeyA': () => {document.dispatchEvent(new Event("move_left1"))},
    'KeyD': () => {document.dispatchEvent(new Event("move_right1"))},
    'KeyI': () => {document.dispatchEvent(new Event("move_up2"))},
    'KeyK': () => {document.dispatchEvent(new Event("move_down2"))},
    'KeyJ': () => {document.dispatchEvent(new Event("move_left2"))},
    'KeyL': () => {document.dispatchEvent(new Event("move_right2"))},
    'KeyR': () => {document.dispatchEvent(new Event("random"))},
    'F1': () => {document.dispatchEvent(new Event("toggle_debug"))},
    'Space': () => {document.dispatchEvent(new Event("whip"))},
    'KeyN': () => {document.dispatchEvent(new Event("whip2"))},
    'KeyP': () => {document.dispatchEvent(new Event("printCol"))},
    'KeyV': () => {document.dispatchEvent(new Event("island_hopper"))},
}

function test() {

}

let engine: Engine = new Engine(inputMappings, soundMappings, assets, 1200, 400);//, 1536, 0.5675, 0.75);
//let engine: Engine = new Engine(inputMappings, soundMappings, assets, 1536, 0.5675, 0.75);

// Extend GameComponent for specialization
//class BirdComponent extends GameComponent {
//    //private go: GameObject;
//    parent: GameObject;
//    private funky: any = (x: any) => {
//        console.log(x);
//    }
//
//    public constructor(go: GameObject) {
//        super(go);
//        this.parent = go;
//        console.log(go);
//        document.addEventListener("move_sideways", this.squeek.bind(this));
//        this.parent.getTransform().getPosition();
//    }
//
//    private squeek(): void {
//        console.log("squeek!");
//        this.parent.getTransform().translate(3, 0);
//    }
//
//
//}
//
function birdup(go: GameObject): void {
    go.getTransform().translate(25, 0);
    console.log("GO: " + go);
}

const cm: ControlMap = {
    'move_up1': move_up,
    'move_down1': move_down,
    'move_left1': move_left,
    'move_right1': move_right,
    //'random': (go: GameObject) => {
    //    go.getTransform().setPosition(3, 15);
    //}
}

const cm2: ControlMap = {
    'move_up2': move_up,
    'move_down2': move_down,
    'move_left2': move_left,
    'move_right2': move_right,
    'whip': whip,
    'whip2': whip2,
    //'random': (go: GameObject) => {
    //    go.getTransform().setPosition(3, 15);
    //}
}

function whip(go: GameObject): void {
    console.log("Whip!");
    let force: Vector2d = Vector2d.zero;
    let i = 1;
    force.setXY(i , -400);

    go.addForce(force);
    go.getTransform().setPosition(go.getTransform().getPosition().getX(), go.getTransform().getPosition().getY());
}

function whip2(go: GameObject): void {
    console.log("Whip!");
    let force: Vector2d = Vector2d.zero;
    force.setXY(400, 0);
    go.addForce(force);
}

function move_right(go: GameObject): void {
    go.getTransform().translate(1, 0);
}
function move_left(go: GameObject): void {
    go.getTransform().translate(-1, 0);
}
function move_up(go: GameObject): void {
    go.getTransform().translate(0, -1);
}
function move_down(go: GameObject): void {
    go.getTransform().translate(0, 1);
}

//document.addEventListener('collision', () => {
//    window.alert("!!!!!!!!!!!!!!!!!!!!!COLLSION!!!!!!!!!!!!!!!!!!");
//})

document.addEventListener("printCol", () => {
    engine.printColliders();
})


const background: GameObject = new GameObject(1);
background.addSprite("background");
background.getTransform().setPosition(600, 200);
engine.addGameObject(background);


const fuglur: GameObject = new GameObject(50);
//fuglur.getTransform().setRotation(5);
const gc: ControllerComponent = new ControllerComponent(fuglur, cm);
fuglur.addComponent(gc);
//fuglur.addComponent(new BirdComponent(fuglur));
fuglur.addSprite("bird");
fuglur.addBoxCollider(64,64);
//fuglur.solid = true;
//engine.addGameObject(fuglur);


const fuglur2: GameObject = new GameObject(50);
fuglur2.getTransform().setPosition(256, 100)
const gc2: ControllerComponent = new ControllerComponent(fuglur2, cm2);
fuglur2.addComponent(gc2);
//fuglur.addComponent(new BirdComponent(fuglur));
fuglur2.addSprite("plane");
fuglur2.addBoxCollider(76, 32);
fuglur2.addRigidBodyComponent(fuglur2);
fuglur2.getTransform().setPosition(50, 0);
fuglur2.solid = true;
engine.addGameObject(fuglur2);
engine.registerCollisionObject(fuglur2);



const pipe3 = new GameObject(50);
pipe3.solid = true;
pipe3.getTransform().setPosition(600,400)
pipe3.addSprite("island");
pipe3.addBoxCollider(1200, 100)
engine.addGameObject(pipe3);

const pipe4 = new GameObject(50);
//pipe4.solid = true;
pipe4.getTransform().setPosition(800,300)
pipe4.addSprite("island2");
pipe4.addBoxCollider(203, 31)
engine.addGameObject(pipe4);

const pipe5 = new GameObject(50);
//pipe5.solid = true;
pipe5.getTransform().setPosition(300,100)
pipe5.addSprite("island2");
pipe5.addBoxCollider(203, 31)
engine.addGameObject(pipe5);
engine.registerCollisionObject(pipe3)

//let colProp: CollisionProps = {
//    gameObjects: [fuglur]
//}
//CollisionSystem.getInstance(colProp);

type pipe_pair = {
    upper_pipe: GameObject,
    lower_pipe: GameObject
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}


class FlagsiFuglurSpael {
    private PIPERUS: pipe_pair[];

    public constructor() {
        this.PIPERUS = [];
    }

    public update(): void {
        this.PIPERUS.forEach((pipes) => {
            if (pipes.upper_pipe.getTransform().getPosition().getX() < -pipes.upper_pipe.getSprite().width) {
                var height: number = getRandomArbitrary(-1400, -1350);
                console.log(`new height: ${height}`);
                console.log(pipes.upper_pipe.getTransform().getPosition().getX());
                console.log(pipes.lower_pipe.getTransform().getPosition().getY());
                pipes.upper_pipe.getTransform().setPosition(CANVAS_WIDTH + pipes.upper_pipe.getSprite().width, height/4);
                //pipes.upper_pipe.getTransform().setPosition(CANVAS_WIDTH + pipes.upper_pipe.getSprite().width, height/4);
                pipes.lower_pipe.getTransform().setPosition(CANVAS_WIDTH + pipes.lower_pipe.getSprite().width, height/4+100+CANVAS_HEIGHT);
                console.log(pipes.upper_pipe.getTransform().getPosition().getX());
                console.log(pipes.lower_pipe.getTransform().getPosition().getY());
            }
            pipes.upper_pipe.getTransform().translate(-5, 0);
            pipes.lower_pipe.getTransform().translate(-5, 0);
            //if (pipe.getTransform().getPosition().getX() < -pipe.getSprite().width) {
            //    pipe.getTransform().setPosition(CANVAS_WIDTH + pipe.getSprite().width, 0);
            //}
            //pipe.getTransform().translate(-5, 0);

        })
    }

    public start(updateInterval: number): void {
        setInterval(this.update.bind(this), updateInterval);
    }

    public addPipePair(p1: GameObject, p2: GameObject): void {
        const pp: pipe_pair = {
            upper_pipe: p1,
            lower_pipe: p2
        }
        this.PIPERUS.push(pp);
    }
}

//const PIPERU: GameObject = new GameObject(35);
//PIPERU.addSprite("PIPERU");
//PIPERU.addBoxCollider(128, 128);
//PIPERU.getTransform().setPosition(1200, 0);
//engine.addGameObject(PIPERU);


//const p11: GameObject = new GameObject(35);
//p11.addSprite("megapipe");
//p11.addBoxCollider(150, 1536);
//p11.getTransform().setPosition(1600, 0);
//engine.addGameObject(p11);
//const p12: GameObject = new GameObject(35);
//p12.addSprite("megapipe");
//p12.addBoxCollider(150, 1536);
//p12.getTransform().setPosition(1600, 1636);
//engine.addGameObject(p11);

//const p2: GameObject = new GameObject(35);
//p2.addSprite("megapipe");
//p2.addBoxCollider(150, 1536);
//p2.getTransform().setPosition(2000, 0);
//engine.addGameObject(p2);
//
//const p3: GameObject = new GameObject(35);
//p3.addSprite("megapipe");
//p3.addBoxCollider(150, 1536);
//p3.getTransform().setPosition(2400, 0);
//engine.addGameObject(p3);

//const FFS: FlagsiFuglurSpael = new FlagsiFuglurSpael();
//FFS.addPipePair(p11, p12);
//FFS.start(20);

//const background: GameObject = new GameObject(1000);
//////fuglur.addComponent(new BirdComponent(fuglur));
//background.addSprite("background");
//background.addBoxCollider(100,100);
//engine.addGameObject(background);
//engine.sortingGameObjects();
//CollisionSystem.start();

engine.addTrack("s0", 0);
engine.addTrack("s1", 1);
engine.addTrack("s2", 2);
engine.addTrack("s3", 3);
engine.addTrack("s4", 4);

engine.startCollisionsChecking();
//engine.registerCollisionObject(fuglur);
function FlagsiFuglur() {
//let f = GameLoop();
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
