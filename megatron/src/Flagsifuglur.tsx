import {Engine} from './engine/Engine';
import resources from './engine/assets.json';
import {GameComponent} from "./engine/GameComponent";
import {SpriteComponent} from "./engine/SpriteComponent";
import {ResourceManager} from "./engine/ResourceManager";
import {ReactNode} from "react";

class Flagsifuglur {
    private engine: Engine;

    public constructor() {
        this.engine = new Engine(resources);
        setInterval(this.update, 500);
        const gc = new GameComponent();
        const sgc = new SpriteComponent(ResourceManager.getImage("bird", false) as HTMLImageElement);
        gc.setActive(true);
        gc.addGameComponent(sgc);
    }

    public update() {
        console.log("Flagsifuglur");
    }

    public render(): HTMLCanvasElement {
        return this.engine.getCanvas();
    }
}

export {Flagsifuglur};