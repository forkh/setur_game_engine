import React from "react";
import {ReactNode, useEffect, useRef} from "react";
import {BaseComponent, GameComponent} from "./GameComponent";
import {SpriteComponent} from "./SpriteComponent";

class Canvas2d {
    private static instance: Canvas2d;
    //private static canvas: HTMLCanvasElement;
    //private static context: any;
    private static canvas2: ReactNode;
    private static context: any;

    private constructor(canvasid: string) {
        //Canvas2d.canvas = document.getElementById(canvasid) as HTMLCanvasElement;
        //Canvas2d.canvas = new HTMLCanvasElement();
        //Canvas2d.context = Canvas2d.canvas.getContext("2d");
        //this.testmethod();
        //Canvas2d.canvas = document.createElement("canvas");
        //Canvas2d.context = Canvas2d.canvas.getContext("2d");
        Canvas2d.canvas2 = React.createElement("canvas");

    };

    public static instantiateCanvas2d(canvasid: string): void {
        if (!Canvas2d.instance) {
            Canvas2d.instance = new Canvas2d(canvasid);
            //Canvas2d.canvas = HTMLCanvasElement();
            //Canvas2d.canvas = useRef(HTMLCanvasElement);
            //Canvas2d.context = Canvas2d.canvas.getContext("2d");

        }
    }

    public render(objects: Array<GameComponent>): void {
        objects.forEach((obj) => {
            if (obj.isActive()) {
                if (obj instanceof SpriteComponent) {
                    const sobj: SpriteComponent = obj;
                    //Canvas2d.context.drawImage(sobj.getSprite());
                }
            }
            //if (obj.checkProperty("sprite")) {
            //    Canvas2d.context.drawImage(obj.getProperty("image"));
            //    //this.context.drawImage(obj.getProperty("sprite"));
            //}
        });
    }

    //public getCanvas(): HTMLCanvasElement {
    //    return this.canvas;
    //}
    //public static getCanvas(): HTMLCanvasElement {
    //    return Canvas2d.canvas;
    //}

    public static getCanvas2(): ReactNode {
        return Canvas2d.canvas2;
    }

};

export {Canvas2d};
