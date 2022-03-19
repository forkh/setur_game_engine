import { ResourceManager, AssetsType } from './ResourceManager';
import { AudioSystem, EventSounds } from './AudioSystem';
import { InputSystem, InputTriggerMap } from './InputSystem';
import { ReactNode } from 'react';
import Canvas from './Canvas';
import { CanvasProps } from './Canvas';
import { GameObject, GameComponent, ControlMap, ControllerComponent } from './GameObject';
import { CollisionSystem, CollisionProps } from './CollisionSystem';
import PhysicsSystem from './PhysicsSystem';
import { PhysicsProps, RigidBodyProps } from './PhysicsSystem';
import GameLoop from './GameLoop';
import { Vector2d } from './math';

class Engine {
    private gameObjects: GameObject[] = [];
    private collisionObjects: GameObject[] = [];
    private static debug: boolean = true;
    public static base_case: number;
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

        document.addEventListener("toggle_debug", () => {
            Engine.debug = !Engine.debug;
        })

        ResourceManager.instantiateResourceManager(assets);
        AudioSystem.instantiateAudioSystem(soundMapping);
        InputSystem.instantiateInputSystem(inputMap);
        PhysicsSystem.instantiatePhysicsSystem(this.gameObjects);
        PhysicsSystem.start();
    }

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
                if (go1.hasBoxCollider() && go2.hasBoxCollider() && go1.getObjectID() != go2.getObjectID()) {
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



                        //console.log("=============Collision============");
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

export { Engine, GameObject, GameComponent, ControllerComponent, Vector2d };
export type { InputTriggerMap, AssetsType, ControlMap };