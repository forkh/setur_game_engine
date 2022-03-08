// https://levelup.gitconnected.com/gamedev-patterns-and-algorithms-with-typescript-game-loop-part-1-2-699919bb9b71
// https://developer.ibm.com/tutorials/wa-build2dphysicsengine/
// https://www.w3schools.com/graphics/tryit.asp?filename=trygame_gravity_game
// https://github.com/luis-herasme/FisicaJS/blob/master/src/RigidBody.ts

import { render } from "./Canvas5"
import {useEffect} from "react";

interface IUpdate{ // bara okkurt
    Update(deltaTime: number): void
}


export function GameLoop(context: CanvasRenderingContext2D): void {

    function loop(): void {
        requestAnimationFrame(() => {
            render(context);
            console.log("render loop run")
            loop();
        })
    }

    loop()
}


