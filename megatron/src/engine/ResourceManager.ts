//import resources from './assets.json';
import {render} from "react-dom";
import src from "*.png";
import React, {ReactElement} from "react";

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

    public static instantiateResourceManager(resources: object): void {
        if (!ResourceManager.instance) {
            ResourceManager.instance = new ResourceManager();
        }

        this.instance.loadResources(resources);
    }

    public static getImage(image: string, react: boolean): HTMLImageElement | ReactElement {
        if (react) {
            let img = React.createElement(
                "img",
                {
                    src: this.instance.imageMap[image].src
                }
            )

            return img;
        }

        return this.instance.imageMap[image];
    }

    public static getImage2(image: string): HTMLImageElement {
        return this.instance.imageMap[image];
}

    public static getAudio(audio: string): HTMLAudioElement {

        return this.instance.audioMap[audio];
    }

    public static getAnimation(animation: string): string {
        return this.instance.animationMap[animation];
    }

    private loadResources(resources: any): void {
        for (let image in resources["image"]) {
            ResourceManager.instance.imageMap[image] = new Image()
            // @ts-ignore
            ResourceManager.instance.imageMap[image].src = resources["paths"]["images"] + resources["image"][image];
        }

        for (let audio in resources["audio"]) {
            // @ts-ignore
            ResourceManager.instance.audioMap[audio] = new Audio(resources["paths"]["audio"] + resources["audio"][audio]);
        }

        for (let animation in resources["animation"]) {
            // @ts-ignore
            ResourceManager.instance.animationMap[animation] = resources["paths"]["animation"] + resources["animation"][animation];
        }
    }
}

export {ResourceManager};
export type {ImageMap};
//export * from './ResourceManager';