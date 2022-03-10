// https://levelup.gitconnected.com/gamedev-patterns-and-algorithms-with-typescript-game-loop-part-1-2-699919bb9b71
// https://developer.ibm.com/tutorials/wa-build2dphysicsengine/
// https://www.w3schools.com/graphics/tryit.asp?filename=trygame_gravity_game
// https://github.com/luis-herasme/FisicaJS/blob/master/src/RigidBody.ts
// https://github.com/kevinbgreene/physics-game/blob/master/src/index.ts

import { render } from "./Canvas5"
import  Canvas  from "./Canvas6"
import {PropsWithChildren, useEffect, useRef} from "react";

interface IUpdate{ // bara okkurt
    Update(deltaTime: number): void
}


export function GameLoop(context: CanvasRenderingContext2D): void{

    function loop(): void {
        requestAnimationFrame(() => {
            render(context); // my canvas
            console.log("render loop run");

            loop();
        })
    }
    loop()

}

export function GameLoop3(): JSX.Element{

    return Canvas();

}


export function GameLoop2(p: () => any): void{

    function loop(): void {
        requestAnimationFrame(() => {
            Canvas();
            console.log("render loop run");
            loop();
        })
    }
    loop();
}




function GameEngine(): JSX.Element {
    let canvas = Canvas();

    GameLoop2(()=> {
        console.log("test123 ==================");
    });

    return canvas;
}




