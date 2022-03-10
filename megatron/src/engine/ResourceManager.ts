import {render} from "react-dom";
import React, {ReactElement} from "react";

type ResourceMap = {
    [key: string]: string;
}

type AssetsType = {
    [tp: string]: {[tp2: string]: string}
}

type ImageMap = {
    [key: string]: HTMLImageElement;
}

type AudioMap = {
    //[key: string]: string;
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

    public static instantiateResourceManager(assets: AssetsType): void {
        if (!ResourceManager.instance) {
            ResourceManager.instance = new ResourceManager();
        }

        this.instance.loadResources(assets);
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

    public static getAudio(audio: string): HTMLAudioElement {
        return this.instance.audioMap[audio];
    }

    public static getAnimation(animation: string): string {
        return this.instance.animationMap[animation];
    }

    private loadResources(resources: AssetsType): void {
        for (let image in resources["image"]) {
            ResourceManager.instance.imageMap[image] = new Image()
            // @ts-ignore
            ResourceManager.instance.imageMap[image].src = resources["paths"]["images"] + resources["image"][image];
        }

        for (let audio in resources["audio"]) {
            //ResourceManager.instance.audioMap[audio] = resources["paths"]["audio"] + resources["audio"][audio];
            ResourceManager.instance.audioMap[audio] = new Audio(resources["paths"]["audio"] + resources["audio"][audio]);
        }

        for (let animation in resources["animation"]) {
            // @ts-ignore
            ResourceManager.instance.animationMap[animation] = resources["paths"]["animation"] + resources["animation"][animation];
        }
    }
}


export {ResourceManager};
export type {AssetsType};
//export * from './ResourceManager';