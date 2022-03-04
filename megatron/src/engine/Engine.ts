import {ResourceManager} from "./ResourceManager";
// Remove this:
import resources from './assets.json';
import {Canvas2d} from "./Canvas2d";
import {GameComponent} from "./GameComponent";

class Engine {
    private gameComponents: Array<GameComponent>;

    public constructor() {
        ResourceManager.instantiateResourceManager(resources);
        Canvas2d.instantiateCanvas2d();
        this.gameComponents = new Array<GameComponent>();
    }

    public addGameComponent(gameComponent: GameComponent): void {
        this.gameComponents.push(gameComponent);
    }

    public getCanvas(): HTMLCanvasElement {
        return Canvas2d.getCanvas();
    }

}

export {Engine};