import {ReactNode, useRef} from "react";
import {GameComponent} from "./GameComponent";

class Canvas2d {
    private static instance: Canvas2d;
    private static canvas: ReactNode;
    private static context: any;
    private constructor() {

    };

    public static instantiateCanvas2d(): void {
        if (!Canvas2d.instance) {
            Canvas2d.instance = new Canvas2d();
            //Canvas2d.canvas = HTMLCanvasElement();
            Canvas2d.canvas = useRef(HTMLCanvasElement);
            //Canvas2d.context = Canvas2d.canvas.getContext("2d");

        }
    }

    public static render(objects: Array<GameComponent>): void {
        objects.forEach((obj) => {
            if (obj.checkProperty("sprite")) {
                this.context.drawImage(obj.getProperty("sprite"));
            }
        });
    }

    //public static getCanvas(): HTMLCanvasElement {
    //    return this.canvas;
    //}

};

export {Canvas2d};