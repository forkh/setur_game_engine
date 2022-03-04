import {ResourceManager} from "./ResourceManager";
import {Canvas2d} from "./Canvas2d";
import {GameComponent} from "./GameComponent";

class Engine {
    private gameComponents: Array<GameComponent>;
    //private canvas2d: Canvas2d;

    public constructor(resources: object) {
        ResourceManager.instantiateResourceManager(resources);
        Canvas2d.instantiateCanvas2d("engine_canvas");
        //this.canvas2d = new Canvas2d("canvas");
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