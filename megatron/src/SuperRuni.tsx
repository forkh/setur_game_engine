import React from 'react';
import logo from './logo.svg';
import './App.css';
import assets from './srassets.json';
import soundMappings from './sr_soundMappings.json';
import { Engine, InputTriggerMap, AssetsType, GameObject, GameComponent, ControlMap, ControllerComponent } from './engine/Engine';
import { Vector2d } from './engine/math';
import { CollisionSystem, CollisionProps } from './engine/CollisionSystem';

const inputMappings: InputTriggerMap = {
    'ArrowRight': () => {
        document.dispatchEvent(new Event("move_right"));
    },

    'ArrowLeft': () => {
        document.dispatchEvent(new Event("move_left"));
    },

    'Space': () => {
        document.dispatchEvent(new Event("jump"));
    },

    'KeyD': () => {
        document.dispatchEvent(new Event("toggle_debug"));
    }
}

//let engine: Engine = new Engine(inputMappings, soundMappings, assets, 800, 600);//, 1536, 0.5675, 0.75);
const engine = Engine.instantiateEngine(inputMappings, soundMappings, assets, 800, 600);


// Game objects
// Background
//const background: GameObject = new GameObject(10);
//background.addSprite("background");
//background.getTransform().setPosition(400, 300);
//engine.addGameObject(background);

const island: GameObject = new GameObject(25);
island.addSprite("island");
island.getTransform().setPosition(400, 400);
island.solid = true;
island.addBoxCollider(1200, 100);
engine.addGameObject(island);
//engine.registerCollisionObject(island);
const island2: GameObject = new GameObject(25);
island2.addSprite("island");
island2.getTransform().setPosition(-400, 400);
island2.solid = true;
island2.addBoxCollider(1200, 100);
engine.addGameObject(island2);

// Coins
//const coin1: GameObject = new GameObject(20);
//coin1.addSprite("coin");
//coin1.getTransform().setPosition(40, 450);
////coin1.addBoxCollider(32, 32);
//coin1.solid = false;
//engine.addGameObject(coin1);

// Flag
//const flag: GameObject = new GameObject(20);
//flag.addSprite("flag");
//flag.getTransform().setPosition(760, 490);
//flag.addBoxCollider(32, 64);
//flag.solid = false;
//engine.addGameObject(flag);

// Player
const playerControl: ControlMap = {
    'move_right': move_right,
    'move_left': move_left,
    'jump': jump
}

const player: GameObject = new GameObject(25);
player.addSprite("runi");
player.getTransform().setPosition(400, 480);
player.addBoxCollider(64, 64);
player.addComponent(new ControllerComponent(player, playerControl));
player.addRigidBodyComponent(player);
player.solid = true;
engine.addGameObject(player);
engine.registerCollisionObject(player);

function move_right(go: GameObject): void {
    let force: Vector2d = Vector2d.zero;
    force.addXY(1, 0);
    go.addForce(force);
}

function move_left(go: GameObject): void {
    let force: Vector2d = Vector2d.zero;
    force.addXY(-1, 0);
    go.addForce(force);
}

function jump(go: GameObject): void {
    console.log("yoyo");
    let force: Vector2d = Vector2d.zero;
    force.addXY(0, -400);
    go.addForce(force);
}

engine.startCollisionsChecking();
function SuperRuni() {
    return (
        <div className={"SuperRuni"}>
            {engine.run()}
        </div>

    );
}

export default SuperRuni;
