//import "./canvas.css";
import React, {useRef, useEffect, useCallback, useState} from "react";
import logo192 from "../logo192.png";
import logo512 from "../logo512.png"
import {
    InputSystem,
    EventType
} from "./Input"
import {InputMap} from "./Input";
import {createComponent} from "./GameObject";
import {GameComponent} from "./GameObject"


function Canvas() {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let requestIdRef = useRef<number | null>(null);

    const size = { width: window.innerWidth, height: window.innerHeight};

    const update = () => {
        //console.log("frame update")

    };


    const renderFrame = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            drawObjects(ctx);

            //update();
        }
    };

    function drawObjects(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
        let test3 = new Image();
        test3.src = logo192;
        let test4 = new Image();
        test4.src = logo512;

        const test = createComponent(1000,10, test3)
        const test2 = createComponent(100, 100, test4)

        var array: GameComponent[] = [
            test, test2
        ]

        array.forEach(function(GameComponent){
           ctx.drawImage(GameComponent.sprite, GameComponent.transform.position.x,
               GameComponent.transform.position.y)
            console.log("=========ARRAY PRINT=======")
        });



        /**ctx.drawImage(test.sprite, test.transform.position.x, test.transform.position.y);
        console.log(test.transform.position.x + test.transform.position.y)
        ctx.drawImage(test2.sprite, test2.transform.position.x, test2.transform.position.y);
        console.log(test2.transform.position.x + test2.transform.position.y)**/
    }

    const tick = () => {
        if (!canvasRef.current) return;
        renderFrame();
        if (requestIdRef.current) {
            requestIdRef.current = requestAnimationFrame(tick);
        }
    };

    useEffect(() => {
        requestIdRef.current = requestAnimationFrame(tick);
        return () => {
            if (requestIdRef.current) {
                cancelAnimationFrame(requestIdRef.current);
            }
        };
    }, []);

    //renderFrame();
    return <canvas {...size} ref={canvasRef} />;

}

export default Canvas;
