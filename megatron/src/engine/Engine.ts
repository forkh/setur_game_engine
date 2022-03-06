import {ResourceManager} from "./ResourceManager";
import {Canvas2d} from "./Canvas2d";
import {BaseComponent} from "./GameComponent";
import { ReactNode } from "react";

type ComponentMap = {
    [oid: number]: BaseComponent;
}

class Engine {
    //private components: Array<BaseComponent> = [];
    //private components: BaseComponent [];
    //private components: Array<BaseComponent>;
    private componentMap: ComponentMap;
    //private canvas2d: Canvas2d;

    public constructor(resources: object) {
        //this.components = new Array<BaseComponent>();
        this.componentMap = {};
        ResourceManager.instantiateResourceManager(resources);
        Canvas2d.instantiateCanvas2d("engine_canvas");
        //this.canvas2d = new Canvas2d("canvas");
    }


    //public addGameComponent(component: BaseComponent): void {
    //    this.components.push(component);
    //}
    public addGameComponent(component: BaseComponent): void {
        this.componentMap[component.getOID()] = component;
    }

    //public getCanvas(): HTMLCanvasElement {
    //    return Canvas2d.getCanvas();
    //}

    public getCanvas2(): ReactNode {
        return Canvas2d.getCanvas2();
    }

    public update(): void {
        for (let oid in this.componentMap) {
            console.log(oid);
        }
        //if (this.components !== undefined) {
        //    console.log(this.components.length);
        //} else {
        //    console.log("components is undefined");
        //}
        //this.gameComponents.forEach((obj) => {
        //    console.log(obj.getOID() + (obj.isActive() ? "is active" : "is not active"));
        //})
    }

}

export {Engine};