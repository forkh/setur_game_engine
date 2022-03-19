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
    private static debug: boolean = true;
    public static base_case: number;
    //public static scale: number;
    //public static aspectRatio: number;
    //public static proportion: number;
    private width: number;
    private height: number;

    public registerCollisionObject(gameObject: GameObject): void {
        this.collisionObjects.push(gameObject);
    }

    public static getDebugState(): boolean {
        return this.debug;
    }

    /**
     *
     * @param inputMap Key input mappings
     * @param soundMapping Sound event mappings
     * @param assets Resources
     * @param base_case Height of canvas, 100%
     * @param aspect_ratio Aspect ratio of canvas
     * @param proportion How much of vertical screen real estate to use.
     */
    public constructor(inputMap: InputTriggerMap, soundMapping: EventSounds, assets: AssetsType, width: number, height: number) {//, base_case: number, aspect_ratio: number, proportion: number) {
        this.height = height;
        this.width = width;
    //public constructor(inputMap: InputTriggerMap, soundMapping: EventSounds, assets: AssetsType, base_case: number, aspect_ratio: number, proportion: number) {
        //Engine.base_case = base_case;
        //Engine.scale = window.innerHeight / Engine.base_case;
        //Engine.aspectRatio = aspect_ratio;
        //Engine.proportion = proportion;
        //document.addEventListener("resize", () => {
        //    Engine.scale = window.innerHeight / Engine.base_case;
        //})
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
            height: this.height,//window.innerHeight,// * Engine.proportion,
            width: this.width//window.innerHeight// * Engine.proportion * Engine.aspectRatio,//0.5625,
            //scale: Engine.scale
        }
       // return <Canvas gameComponents={this.gameComponents} height={600} width={100}/>;
        //return <Canvas objects={this.gameObjects} height={600} width={100}/>
        return <div><Canvas {...canvasProps}/>{gameLoop}</div>
    }

    public addGameObject(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
        this.gameObjects.sort(compareZIndex);
    }

    /**
     * Riggar ikki heilt í løtuni
     * @param gameObject
     */
    public removeGameObject(gameObject: GameObject): void {
        console.log(`Deleting gameObject: ${gameObject.getObjectID()}`);
        console.log(`Size of gameObjects before: ${this.gameObjects.length}`);
        console.log(this.gameObjects);
        const i: number = this.gameObjects.indexOf(gameObject, 0);
        this.gameObjects = this.gameObjects.splice(i, 1);
        console.log(`Size of gameObjects after: ${this.gameObjects.length}`);
        console.log(this.gameObjects);
    }

    public addControllerListener(key: string, func: (() => {})): void {
    }

    public startCollisionsChecking(): void {
        setInterval(this.checkForCollisions.bind(this), 20);
    }

    private checkForCollisions(): void {
        //console.log("Checking for collisions");
        //const scale: number = window.innerWidth / Engine.base_case;
        //this.gameObjects.forEach((go1: GameObject) => {
        //    this.gameObjects.forEach((go2: GameObject) => {
        if (this.gameObjects.length < 2) {
            return;
        }

        if (this.collisionObjects.length < 1) {
            return;
        }

        for (let i = 0; i < this.collisionObjects.length; i++) {
            let go1: GameObject = this.collisionObjects[i];
            for (let j = 0; j < this.gameObjects.length; j++) {
                let go2: GameObject = this.gameObjects[j];
                //console.log("321oyoyoy");
                //if (go1.hasBoxCollider() && go2.hasBoxCollider()) {
                if (go1.hasBoxCollider() && go2.hasBoxCollider() && go1.getObjectID() != go2.getObjectID()) {
                    //console.log("yoyoyo123");
                    //// @ts-ignore
                    //const w1: number = go1.getBoxCollider().width;
                    //// @ts-ignore
                    //const h1: number = go1.getBoxCollider().height;
                    //const x1: number = go1.getTransform().getPosition().getX() - w1 / 2;
                    //const y1: number = go1.getTransform().getPosition().getY() - h1 / 2;
                    //// @ts-ignore
                    //const w2: number = go2.getBoxCollider().width;
                    //// @ts-ignore
                    //const h2: number = go2.getBoxCollider().height;
                    //const x2: number = go2.getTransform().getPosition().getX() - w2 / 2;
                    //const y2: number = go2.getTransform().getPosition().getY() - h2 / 2;
                    // @ts-ignore
                    const w1: number = go1.getBoxCollider().width;
                    // @ts-ignore
                    const h1: number = go1.getBoxCollider().height;
                    const x1: number = (go1.getTransform().getPosition().getX());
                    const y1: number = (go1.getTransform().getPosition().getY());
                    // @ts-ignore
                    const w2: number = go2.getBoxCollider().width;
                    // @ts-ignore
                    const h2: number = go2.getBoxCollider().height;
                    const x2: number = (go2.getTransform().getPosition().getX());
                    const y2: number = (go2.getTransform().getPosition().getY());

                    //const w1: number = go1.getBoxCollider().width;
                    //// @ts-ignore
                    //const h1: number = go1.getBoxCollider().height;
                    //const x1: number = (go1.getTransform().getPosition().getX() - w1);
                    //const y1: number = (go1.getTransform().getPosition().getY() - h1);
                    //// @ts-ignore
                    //const w2: number = go2.getBoxCollider().width;
                    //// @ts-ignore
                    //const h2: number = go2.getBoxCollider().height;
                    //const x2: number = (go2.getTransform().getPosition().getX() - w2);
                    //const y2: number = (go2.getTransform().getPosition().getY() - h2);
                    //if (x1 < (x2 + h2) &&
                    //    (x1 + w1) > x2 &&
                    //    y1 < (y2 + h2) &&
                    //    (y1 + h1) > h2) {
                    //    //return true;
                    //    //send signal
                    //    console.log("=============Collision============");
                    //    console.log(`${go1.getObjectID()} and ${go2.getObjectID()}`);
                    //    document.dispatchEvent(new Event("collision"));

                    //}
                    //console.log(`${go1.getObjectID()}: x: ${x1}, y: ${y1}, w: ${w1}, h: ${h1}, isSolid: ${go1.solid}`);
                    //console.log(`${go2.getObjectID()}: x: ${x2}, y: ${y2}, w: ${w2}, h: ${h2}, isSolid: ${go2.solid}`);
                    if (
                        x1 + w1 / 2 > x2 - w2 / 2 &&
                        x1 - w1 / 2 < x2 + w2 / 2 &&
                        y1 + h1 / 2 > y2 - h2 / 2 &&
                        y1 - h1 / 2 < y2 + h2 / 2
                    ) {
                        /*if (!go1.isGrounded) {
                            go1.canJump = false;
                        }*/

                        //if (go1.solid && go1.hasRigidBodyComponent()) {
                        //    console.log("yoy");
                        //    if (go1.getRigidBodyComponent().rigidBody.force.y >= 0) {
                        //        console.log(go1.getSprite().src);
                        //    }
                        //}
                        //if (go1.solid && go2.solid) {
                        //    go1.isGrounded = true;
                        //    console.log("solids!");
                        //    //if (y1 < y2 /*&& go1.getRigidBodyComponent().hasRigidBody*/) {
                        //    //    console.log(go1.getSprite().src)
                        //    //    console.log(" ======== bird landed on pipe =========");
                        //    //    go1.isGrounded = true;

                        //    //}
                        //}



                        //return true;
                        //send signal
                        console.log("=============Collision============");
                        //document.dispatchEvent(new Event("collision"));
                        //console.log("[[[[[[[[[]]]]]]]]]]]]]]");
                        document.dispatchEvent(new CustomEvent("collision2", {detail: {'obj': go1, 'obj2': go2}}));



                    } else {
                        go1.isGrounded = false;
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