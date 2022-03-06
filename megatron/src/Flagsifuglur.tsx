import {Engine} from './engine/Engine';
import resources from './engine/assets.json';
import {GameComponent} from "./engine/GameComponent";
import {SpriteComponent} from "./engine/SpriteComponent";
import {ResourceManager} from "./engine/ResourceManager";
import {ReactNode} from "react";

type FFProps = {
    canvas: HTMLCanvasElement;
}

class Flagsifuglur {
    private engine: Engine;

    public constructor() {
        this.engine = new Engine(resources);
        //setInterval(this.update, 2000);
        const gc = new GameComponent();
        const sgc = new SpriteComponent(ResourceManager.getImage("bird", false) as HTMLImageElement);
        gc.setActive(true);
        gc.addGameComponent(sgc);
        this.engine.addGameComponent(gc);
    }

    public fixedUpdate() {
        console.log("Doing physics");
    }

    public update() {
        setInterval(this.engine.update, 2000);
    }

    //public render(): HTMLCanvasElement {
    //    return this.engine.getCanvas();
    //}

    public render2(): ReactNode {
        return this.engine.getCanvas2();
    }
}

export {Flagsifuglur};