import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap, ControllerComponent } from './engine/Engine';
import GameLoop from './engine/GameLoop';
import { Vector2d } from './engine/math';

import assets from './assets.json';
import soundMappings from './soundMappings.json';
import { CollisionSystem, CollisionProps } from './engine/CollisionSystem';

let CANVAS_HEIGHT: number = window.innerHeight;
let CANVAS_WIDTH: number  = window.innerHeight;

const inputMappings: InputTriggerMap = {
    'KeyW': () => {
        document.dispatchEvent(new Event("move_up1"))
    },
    'KeyS': () => {
        document.dispatchEvent(new Event("move_down1"))
    },
    'KeyA': () => {
        document.dispatchEvent(new Event("move_left1"))
    },
    'KeyD': () => {
        document.dispatchEvent(new Event("move_right1"))
    },
    'Space': () => {
        document.dispatchEvent(new Event("jump"))
    },
}

let engine: Engine = new Engine(inputMappings, soundMappings, assets, 800, 800);


const cm: ControlMap = {
    'move_up': lilmanup,
    'move_down': lilmandown,
    'move_left': lilmanleft,
    'move_right': lilmanright,
    'jump': lilmanjump,
}

function lilmanup(go:GameObject): void {
    go.getTransform().translate(0,-5)
    console.log("moving up baby")
}

function lilmandown(go:GameObject): void {
    go.getTransform().translate(0,5)
    console.log("moving down")
}

function lilmanleft(go:GameObject): void {
    go.getTransform().translate(-5,0)
    console.log("moving left baby")
}

function lilmanright(go:GameObject): void {
    go.getTransform().translate(5,0)
    console.log("moving right baby")
}

function lilmanjump(go:GameObject): void {
    document.dispatchEvent(new Event("flap"));
    let force: Vector2d = Vector2d.zero;
    force.setXY(0, -400);
    go.addForce(force);
}

const background: GameObject = new GameObject(5);
background.addSprite("uberbg");
background.getTransform().translate(225, 400);
engine.addGameObject(background);

const lilman : GameObject = new GameObject(5);
lilman.getTransform().translate(60,200);

const gc1: ControllerComponent = new ControllerComponent(lilman, cm);
lilman.addComponent(gc1);
lilman.addSprite("lilman");
lilman.addBoxCollider(32,32);
lilman.addRigidBodyComponent(lilman);
lilman.solid = false;
engine.addGameObject(lilman);
lilman.tag = "lilman";
engine.registerCollisionObject(lilman);



class TheJGame {
    private score: number;
    //private process: GameObject;
    private dialogCollider: GameObject;
    //private processArray : processArray[];
    private processCollider: GameObject;
    private groundCollider: GameObject;
    private level2: boolean;
    private movedToNext: boolean;

    public constructor() {
        this.level2 = true;
        this.movedToNext = true;
        this.score = 0;
        this.dialogCollider = new GameObject(100);
        this.dialogCollider.addBoxCollider(50, 50);
        this.dialogCollider.getTransform().setPosition(50, 10);
        this.dialogCollider.tag = "dialogCollider";
        engine.addGameObject(this.dialogCollider);
        this.groundCollider = new GameObject(100);
        this.groundCollider.addBoxCollider(450, 4);
        this.groundCollider.getTransform().setPosition(225, 800);
        this.groundCollider.tag = "ground";
        engine.addGameObject(this.groundCollider);
        this.processCollider = new GameObject(100);
        this.processCollider.addBoxCollider(500, 2);
        this.processCollider.getTransform().setPosition(224, 399);
        this.processCollider.tag = "processCollision"

        document.addEventListener("collision2", (e: Event) => {
            let target: GameObject = (e as CustomEvent).detail.obj2;

            if (target.tag === "ground") {
                console.log("isGrounded")
                document.dispatchEvent(new Event("grounded"));
                this.groundCollider.isGrounded = true;
            }

            if (target.tag === "dialogCollider") {
                document.dispatchEvent(new Event("dialogCollision"));
            }

            if (target.tag === "processCollider") {
                document.dispatchEvent(new Event("processCollision"));
            }

            if (target.tag === "score"){
                this.score++;
                document.dispatchEvent(new Event("score"));
            }
        })

    }





}

function JGame() {
    return (
        <div className={"TheJGame"}>
            {engine.run()}
        </div>
    );

}






export default JGame;