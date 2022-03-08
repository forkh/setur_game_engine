import {createComponent} from "./GameObject";
import {GameComponent} from "./GameObject"
import logo192 from "../logo192.png";
import logo512 from "../logo512.png";


export function render(context: CanvasRenderingContext2D): void {
    const canvas: HTMLCanvasElement = context.canvas
    const ctx = canvas.getContext("2d");

    drawObjects(ctx)
}

export function drawObjects(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    let test3 = new Image();
    test3.src = logo192;
    let test4 = new Image();
    test4.src = logo512;

    const test = createComponent(1000, 10, test3)
    const test2 = createComponent(100, 100, test4)

    var array: GameComponent[] = [
        test, test2
    ]

    array.forEach(function (GameComponent) {
        ctx.drawImage(GameComponent.sprite, GameComponent.transform.position.x,
            GameComponent.transform.position.y)
        console.log("=========ARRAY PRINT=======")
    });
}




