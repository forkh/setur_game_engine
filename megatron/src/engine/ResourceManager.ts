import resources from '../../public/assets/assets.json';

type ResourceMap = {
    [key: string]: string | number;
}

type ImageMap = {
    [key: string]: HTMLImageElement;
}

type AudioMap = {
    [key: string]: HTMLAudioElement;
}

type AnimationMap = {
    [key: string]: string;
}

class ResourceManager {
    private static instance: ResourceManager;
    private imageMap: ImageMap;
    private audioMap: AudioMap;
    private animationMap: AnimationMap;

    private constructor() {
        this.imageMap = {};
        this.audioMap = {};
        this.animationMap = {};
    }

    public instantiateResourceManager(): void {
        if (!ResourceManager.instance) {
            ResourceManager.instance = new ResourceManager();
        }
    }

    public static getImage(image: string): HTMLImageElement {
        return this.instance.imageMap[image];
    }

    public static getAudio(audio: string): HTMLAudioElement {
        return this.instance.audioMap[audio];
    }

    public static getAnimation(animation: string): string {
        return this.instance.animationMap[animation];
    }

    public static loadResources(): void {
        for (let image in resources["image"]) {
            this.instance.imageMap[image] = new Image()//.src = resources["images"][image];
            // @ts-ignore
            this.instance.imageMap[image].src = resources["image"][image];
        }

        for (let audio in resources["audio"]) {
            // @ts-ignore
            this.instance.audioMap[audio] = new Audio(resources["audio"][audio]);
        }

        for (let animation in resources["animation"]) {
            // @ts-ignore
            this.instance.animationMap[animation] = resources["animation"][animation];
        }
    }
}

export {ResourceManager};