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
    //'KeyD': () => {document.dispatchEvent(new Event("move_right1"))},
    'KeyI': () => {document.dispatchEvent(new Event("move_up2"))},
    'KeyK': () => {document.dispatchEvent(new Event("move_down2"))},
    'KeyJ': () => {document.dispatchEvent(new Event("move_left2"))},
    'KeyL': () => {document.dispatchEvent(new Event("move_right2"))},
    'KeyR': () => {document.dispatchEvent(new Event("random"))},
    'KeyD': () => {document.dispatchEvent(new Event("toggle_debug"))},
    'Space': () => {document.dispatchEvent(new Event("whip"))},
    'KeyN': () => {document.dispatchEvent(new Event("whip2"))},
    'KeyP': () => {document.dispatchEvent(new Event("printCol"))},
    'KeyV': () => {document.dispatchEvent(new Event("island_hopper"))},
}



let engine: Engine = new Engine(inputMappings, soundMappings, assets, 450, 800);//, 1536, 0.5675, 0.75);
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
    document.dispatchEvent(new Event("flap"));
    document.dispatchEvent(new Event("bgmusic"));
    let force: Vector2d = Vector2d.zero;
    force.setXY(0, -400);
    go.addForce(force);
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

//document.addEventListener("printCol", () => {
//    engine.printColliders();
//})


//const fuglur: GameObject = new GameObject(50);
////fuglur.getTransform().setRotation(5);
//const gc: ControllerComponent = new ControllerComponent(fuglur, cm);
//fuglur.addComponent(gc);
////fuglur.addComponent(new BirdComponent(fuglur));
//fuglur.addSprite("bird");
//fuglur.addBoxCollider(64,64);
////fuglur.solid = true;
////engine.addGameObject(fuglur);

const background: GameObject = new GameObject(5);
background.addSprite("uberbg");
background.getTransform().translate(225, 400);
engine.addGameObject(background);

const fuglur2: GameObject = new GameObject(50);
fuglur2.getTransform().setPosition(50, 400);
//fuglur2.getTransform().setPosition(100, 800)
const gc2: ControllerComponent = new ControllerComponent(fuglur2, cm2);
fuglur2.addComponent(gc2);
//fuglur.addComponent(new BirdComponent(fuglur));
fuglur2.addSprite("bird");
fuglur2.addBoxCollider(32, 32);
fuglur2.addRigidBodyComponent(fuglur2);
fuglur2.solid = false;
engine.addGameObject(fuglur2);
fuglur2.tag = "bird";
engine.registerCollisionObject(fuglur2);


//const pipe3 = new GameObject(50);
////pipe3.solid = true;
//pipe3.getTransform().setPosition(50,300)
//pipe3.addSprite("island");
//pipe3.addBoxCollider(128, 64)
//engine.addGameObject(pipe3);
//engine.registerCollisionObject(pipe3)

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

type PipePair = {
    upperPipe: GameObject,
    lowerPipe: GameObject,
    collider: GameObject
}

class PipePairFactory {

    public createPipePair(zIndex: number, xPos: number): PipePair {
        let heightOffset: number = getRandomArbitrary(-350, 200);
        const pipePair: PipePair = {
            upperPipe: new GameObject(zIndex),
            lowerPipe: new GameObject(zIndex),
            collider: new GameObject(100)
        }

        pipePair.collider.tag = "score";
        pipePair.upperPipe.tag = "pipe";
        pipePair.lowerPipe.tag = "pipe";
        pipePair.collider.addBoxCollider(4, 300);
        pipePair.collider.getTransform().setPosition(xPos+42, heightOffset+450);
        //pipePair.collider.addSprite("bird");
        //pipePair.collider.isActive()
        pipePair.upperPipe.getTransform().translate(xPos, heightOffset);
        pipePair.lowerPipe.getTransform().translate(xPos, heightOffset+900);
        //pipePair.collider.getTransform().translate(xPos, heightOffset+900);
        pipePair.upperPipe.addSprite("pipe2");
        pipePair.lowerPipe.addSprite("pipe2rot");
        pipePair.upperPipe.addBoxCollider(32, 600);
        pipePair.lowerPipe.addBoxCollider(32, 600);
        engine.addGameObject(pipePair.collider);
        engine.addGameObject(pipePair.upperPipe);
        engine.addGameObject(pipePair.lowerPipe);
        return pipePair;
    }
}

class FlagsiFuglurSpael {
    private highScore: GameObject;
    private score: number;
    //private PIPERUS: pipe_pair[];
    private pipes: PipePair[];
    private factory: PipePairFactory;
    private skyCollider: GameObject;
    private groundCollider: GameObject;
    private moved99: boolean;
    private moved999: boolean;
    private pipeSpeed: number;
    private level2: boolean;
    private level3: boolean;

    public constructor() {
        this.level2 = true;
        this.level3 = true;
        this.moved99 = true;
        this.moved999 = true;
        this.pipeSpeed = 1.5;
        //document.dispatchEvent(new Event("music"));
        //this.PIPERUS = [;
        this.highScore = new GameObject(100);
        this.highScore.addTextComponent("0", "Comic Sans", "32", "#000000");
        this.highScore.getTransform().setPosition(390, 770);
        this.score = 0;
        engine.addGameObject(this.highScore);
        this.skyCollider = new GameObject(100);
        this.skyCollider.addBoxCollider(450, 4);
        this.skyCollider.getTransform().setPosition(225, -50);
        this.skyCollider.tag = "pipe";
        engine.addGameObject(this.skyCollider);
        this.groundCollider = new GameObject(100);
        this.groundCollider.addBoxCollider(450, 4);
        this.groundCollider.getTransform().setPosition(225, 800);
        this.groundCollider.tag = "pipe";
        engine.addGameObject(this.groundCollider);
        this.factory = new PipePairFactory();
        this.pipes = [];
        document.addEventListener("collision2", (e: Event) => {
            let target: GameObject = (e as CustomEvent).detail.obj2;
            if (target.tag === "score") {
                this.score++;
                console.log("")
                document.dispatchEvent(new Event("score"));
            }

            if (target.tag === "pipe") {
                document.dispatchEvent(new Event("collision"));
                //this.highScore.updateTextComponent("You died :<");
                //let tmp_text: string = this.score;
                this.highScore.updateTextComponent(`You hit a pipe.\nScore was: ${this.score}\n`);
                this.highScore.getTransform().setPosition(25, 400);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        })

    }

    public update(): void {
        if (this.score > 100 && this.score < 300 && this.level2) {
            background.setSprite("uberbg2");
            this.pipeSpeed += 1;
            this.level2 = false;
        }

        if (this.score > 300 && this.level3) {
            background.setSprite("uberbg");
            this.pipeSpeed += 1;
            this.level3 = false;
        }

        if (this.score > 99 && this.moved99) {
            this.highScore.getTransform().translate(-30, 0);
            this.moved99 = false;
        }

        if (this.score > 299 && this.moved999) {
            this.highScore.getTransform().translate(-30, 0);
            this.moved999 = false;
        }

        this.pipes.forEach((pp) => {
            pp.upperPipe.getTransform().translate(-this.pipeSpeed, 0);
            pp.lowerPipe.getTransform().translate(-this.pipeSpeed, 0);
            pp.collider.getTransform().translate(-this.pipeSpeed, 0);

            // Remove pipe pair if pipes have gone off screen
            if (pp.upperPipe.getTransform().getPosition().getX() < -16) {
                let heightOffset: number = getRandomArbitrary(-350, 200);
                pp.upperPipe.getTransform().setPosition(500, heightOffset);
                pp.lowerPipe.getTransform().setPosition(500, heightOffset+900);
                pp.collider.getTransform().setPosition(542, heightOffset+450);
            }
        })
    }

    public start(updateInterval: number): void {
        this.pipes.push(this.factory.createPipePair(25, 500));
        this.pipes.push(this.factory.createPipePair(25, 750));
        setInterval(this.update.bind(this), updateInterval);
    }

}

const FFS: FlagsiFuglurSpael = new FlagsiFuglurSpael();
FFS.start(20);
FFS.update();

engine.addTrack("score", 0);
engine.addTrack("collision", 1);
engine.addTrack("flap", 2);
engine.addTrack("bgmusic", 3);

engine.startCollisionsChecking();
function FlagsiFuglur() {
return (
    <div className={"FlagsiFuglur"}>
        {engine.run()}
    </div>
);
}

export default FlagsiFuglur;
