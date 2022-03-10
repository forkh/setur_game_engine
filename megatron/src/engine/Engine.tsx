import { ResourceManager, AssetsType } from './ResourceManager';
import { AudioSystem, EventSounds } from './AudioSystem';
import { InputSystem, InputTriggerMap } from './InputSystem';
import { ReactNode } from 'react';
import Canvas from './Canvas';
import { GameComponent, createComponent } from './GameComponent';

class Engine {
    //private static instance: Engine;
    private gameComponents: GameComponent[];

    public constructor(inputMap: InputTriggerMap, soundMapping: EventSounds, assets: AssetsType) {
        this.gameComponents = [];
        ResourceManager.instantiateResourceManager(assets);
        AudioSystem.instantiateAudioSystem(soundMapping);
        InputSystem.instantiateInputSystem(inputMap);
    }

    public getImage(image: string): HTMLImageElement {
        return ResourceManager.getImage(image, false) as HTMLImageElement;
    }

    public addTrack(audio: string, channel: number): void {
        AudioSystem.addTrack(ResourceManager.getAudio(audio), channel);
    }

    public run(): ReactNode {
        return <Canvas gameComponents={this.gameComponents} height={600} width={100}/>;
    }

    public addGameComponent(gameComponent: GameComponent): void {
        this.gameComponents.push(gameComponent);
    }
}

export { Engine, createComponent };
export type { InputTriggerMap, AssetsType, GameComponent };