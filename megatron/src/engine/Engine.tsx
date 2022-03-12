import { ResourceManager, AssetsType } from './ResourceManager';
import { AudioSystem, EventSounds } from './AudioSystem';
import { InputSystem, InputTriggerMap } from './InputSystem';
import { ReactNode } from 'react';
import Canvas from './Canvas';
import { CanvasProps } from './Canvas';
//import { GameComponent, createComponent } from './GameComponent';
//import { GameObject, GameComponent, ControlMap } from './GameObject';
import { GameObject, GameComponent, ControlMap, ControllerComponent } from './GameObject';

class Engine {
    //private static instance: Engine;
    private gameObjects: GameObject[];

    public constructor(inputMap: InputTriggerMap, soundMapping: EventSounds, assets: AssetsType) {
        this.gameObjects = [];
        ResourceManager.instantiateResourceManager(assets);
        AudioSystem.instantiateAudioSystem(soundMapping);
        InputSystem.instantiateInputSystem(inputMap);
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

    public getImage(image: string): HTMLImageElement {
        return ResourceManager.getImage(image, false) as HTMLImageElement;
    }

    public addTrack(audio: string, channel: number): void {
        AudioSystem.addTrack(ResourceManager.getAudio(audio), channel);
    }

    public run(): ReactNode {
        const canvasProps: CanvasProps = {
            objects: this.gameObjects,
            height: 800,
            width: 800
        }
       // return <Canvas gameComponents={this.gameComponents} height={600} width={100}/>;
        //return <Canvas objects={this.gameObjects} height={600} width={100}/>
        return <Canvas {...canvasProps}/>
    }

    public addGameObject(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
        // TODO: Ger so at tað verður sortera eftir zIndex propery hjá GameObject
        this.gameObjects.sort();
    }

    public addControllerListener(key: string, func: (() => {})): void {
    }
}

//export { Engine, GameObject, GameComponent };//, ControllerComponent };
export { Engine, GameObject, GameComponent, ControllerComponent };
export type { InputTriggerMap, AssetsType, ControlMap };