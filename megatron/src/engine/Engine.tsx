import { ResourceManager, AssetsType } from './ResourceManager';
import { AudioSystem, EventSounds } from './AudioSystem';
import { InputSystem, InputTriggerMap } from './InputSystem';

class Engine {
    //private static instance: Engine;

    public constructor(inputMap: InputTriggerMap, soundMapping: EventSounds, assets: AssetsType) {
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
}

export { Engine };
export type { InputTriggerMap, AssetsType };