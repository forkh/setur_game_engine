import { ResourceManager, AssetsType } from './ResourceManager';
import { AudioSystem, EventSounds } from './AudioSystem';
import { InputSystem, InputTriggerMap } from './InputSystem';
import { ReactNode } from 'react';
import Canvas from './Canvas';
import { CanvasProps } from './Canvas';
//import { GameComponent, createComponent } from './GameComponent';
//import { GameObject, GameComponent, ControlMap } from './GameObject';
import { GameObject, GameComponent, ControlMap, ControllerComponent } from './GameObject';
import { CollisionSystem, CollisionProps } from './CollisionSystem';
import PhysicsSystem from './PhysicsSystem';
import { PhysicsProps, RigidBodyProps } from './PhysicsSystem';
import GameLoop from './GameLoop';

class Engine {
    //private static instance: Engine;
    private gameObjects: GameObject[] = [];// = [new GameObject(-1)];
    private collisionObjects: GameObject[] = [];
    //private gameObjects: GameObject[] = new Array<GameObject>();
    private static debug: boolean = false;

    public registerCollisionObject(gameObject: GameObject): void {
        this.collisionObjects.push(gameObject);
    }

    public static getDebugState(): boolean {
        return this.debug;
    }

    public constructor(inputMap: InputTriggerMap, soundMapping: EventSounds, assets: AssetsType) {
        document.addEventListener("toggle_debug", () => {
            Engine.debug = !Engine.debug;
        })
        //this.gameObjects = [];
        ResourceManager.instantiateResourceManager(assets);
        AudioSystem.instantiateAudioSystem(soundMapping);
        InputSystem.instantiateInputSystem(inputMap);
        PhysicsSystem.instantiatePhysicsSystem(this.gameObjects);
        PhysicsSystem.start();
        //setInterval()
        //const collisionProp: CollisionProps = {
        //    gameObjects: this.gameObjects
        //}
        //setInterval(this.checkForCollisions, 2000);
        //CollisionSystem.getInstance(collisionProp);
        //CollisionSystem.start();
        // TODO: CollisionSystem:

        // TODO: PhysicsSystem:
    }

    //private test() {
    //    this.gameObjects.forEach((go1) => {
    //        this.gameObjects.forEach((go2) => {
    //            if (go1.getObjectID() != go2.getObjectID()
    //            //go1.hasCollider() && go2.hasCollider()) {
    //                //collision logic
    //            }
    //        })
    //    })
    //}

    // TODO: SLETTA!
    //public getObjects(): GameObject[] {
    //    return this.gameObjects;
    //}

    public getImage(image: string): HTMLImageElement {
        return ResourceManager.getImage(image, false) as HTMLImageElement;
    }

    public addTrack(audio: string, channel: number): void {
        AudioSystem.addTrack(ResourceManager.getAudio(audio), channel);
    }

    public run(): ReactNode {
        const gameLoop: any = GameLoop();
        const canvasProps: CanvasProps = {
            // TODO: Broyt til at hetta verður definera í game design, ikki engine
            objects: this.gameObjects,
            height: window.innerHeight * 0.75,
            width: window.innerHeight * 0.75 * 0.5625
        }
       // return <Canvas gameComponents={this.gameComponents} height={600} width={100}/>;
        //return <Canvas objects={this.gameObjects} height={600} width={100}/>
        return <div><Canvas {...canvasProps}/>{gameLoop}</div>
    }

    public addGameObject(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
        // TODO: Ger so at tað verður sortera eftir zIndex propery hjá GameObject
        this.gameObjects.sort(compareZIndex);
    }

    public addControllerListener(key: string, func: (() => {})): void {
    }

    public startCollisionsChecking(): void {
        setInterval(this.checkForCollisions.bind(this), 20);
    }

    private checkForCollisions(): void {
        console.log("Checking for collisions");
        //this.gameObjects.forEach((go1: GameObject) => {
        //    this.gameObjects.forEach((go2: GameObject) => {
        for (let i = 0; i < this.collisionObjects.length; i++) {
            let go1: GameObject = this.gameObjects[i];
            for (let j = 0; j < this.gameObjects.length; j++) {
                let go2: GameObject = this.gameObjects[j];
                if (go1.hasBoxCollider() && go2.hasBoxCollider() && go1.getObjectID() != go2.getObjectID()) {
                    // @ts-ignore
                    const w1: number = go1.getBoxCollider().width;
                    // @ts-ignore
                    const h1: number = go1.getBoxCollider().height;
                    const x1: number = go1.getTransform().getPosition().getX() - w1 / 2;
                    const y1: number = go1.getTransform().getPosition().getY() - h1 / 2;
                    
                    // @ts-ignore
                    const w2: number = go2.getBoxCollider().width;
                    // @ts-ignore
                    const h2: number = go2.getBoxCollider().height;
                    const x2: number = go2.getTransform().getPosition().getX() - w2 / 2;
                    const y2: number = go2.getTransform().getPosition().getY() - h2 / 2;

                    if (x1 < (x2 + h2) &&
                        (x1 + w1) > x2 &&
                        y1 < (y2 + h2) &&
                        (y1 + h1) > h2) {
                        //return true;
                        //send signal
                        console.log("=============Collision============");
                        document.dispatchEvent(new Event("collision"));
                    }
                }
            }
        }
    }
    
    public sortingGameObjects(): void {
        this.gameObjects.sort(compareZIndex);
    }

    public printColliders(): void {
        for (let i: number = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].printColliders();
        }
        //this.gameObjects.forEach((gc) => {
        //    gc.printColliders();
        //})
    }
}

function compareZIndex(go1: GameObject, go2: GameObject): number {
    if(go1.getZIndex() < go2.getZIndex()) {
        return -1;
    }

    if (go1.getZIndex() > go2.getZIndex()) {
        return 1;
    }

    return 0;
}

//export { Engine, GameObject, GameComponent };//, ControllerComponent };
export { Engine, GameObject, GameComponent, ControllerComponent };
export type { InputTriggerMap, AssetsType, ControlMap };