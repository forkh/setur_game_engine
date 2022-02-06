import * as img from './assets/sprites/bird.png';
import {Sprite} from "./Sprite";
import {BaseObject2} from "./BaseObject2";

export function renderer(objects: BaseObject2[]) {
    let canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    let context = canvas.getContext("2d");

    // Return if either objects are null.
    if (!canvas || !context) {
        return;
    }


    console.log("Renderer running");
    //let image = new Image();
    //image.src = "assets/sprites/test_pipe.png";
    //image.onload = function() {

    //    // @ts-ignore
    //    context.drawImage(image, 0, 0);
    //}

    context.clearRect(0, 0, 800, 600);
    objects.forEach(obj => {
        // @ts-ignore
        context.drawImage(obj.getSprite(), obj.getPosition.getX, 5);
        obj.getPosition.translate(5, 5);

        console.log("Trying to load: ", obj.getSprite()?.src);
        //img.onload = function() {
        //    console.log("in renderer, img path:", img.src);

        //    // @ts-ignore
        //    context.drawImage(img, x, y);
        //
        })

}