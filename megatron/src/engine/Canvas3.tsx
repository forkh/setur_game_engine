//import "./canvas.css";
import React, {useRef, useEffect, useCallback, useState} from "react";
import logo192 from "../logo192.png";
import logo512 from "../logo512.png"
import {
    InputSystem,
    EventType
} from "./Input"
import {InputMap} from "./Input";
import {getKeyEventProps} from "@testing-library/user-event/dist/keyboard/getEventProps";
import {Simulate} from "react-dom/test-utils";



//import frameRenderer from "./frameRenderer";


function Canvas() {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let requestIdRef = useRef<number | null>(null);
    //let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    /**InputSystem.instantiateInputSystem({
        "left": "ArrowLeft",
        "right": "ArrowRight",
        "up": "ArrowUp",
        "rotate-cw": "KeyQ",
        "rotate-ccw": "KeyE"
    });


    useEffect(() => {
        InputSystem.addButtonListener(EventType.ButtonDown, "up", () => {
            console.log("jump");
            y -= 20;
        });
    })**/


    let test = new Image();
    test.src = logo192;
    let test2 = new Image();
    test2.src = logo512;
    //const imageRef = useRef(null);
    const size = { width: window.innerWidth, height: window.innerHeight};
    let x = 0;
    let y = 0;
    let x1 = 10;
    let y1 = 10;
    //let keyCode = keyPress()

    useEffect(() => {
        window.addEventListener("keypress", jump )
        return (window.removeEventListener("keydown", jump ))

    }, []);



    function jump(): void {
        y -= 10;
        /**switch (keyCode) {
            case "ArrowLeft":
                // Left pressed
                break;
            case "ArrowRight":
                // Right pressed
                break;
            case "ArrowUp":

                // Up pressed
                break;
            case "ArrowDown":
                // Down pressed
                break;
        }**/
    }



    const updateImage = () => {
        //console.log("image")
        y += 1;
        x += 1;
        //console.log("DPPPPP")

    };

    const renderFrame = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

            ctx.drawImage(test, x , y );
            ctx.drawImage(test2, x1 , y1 );

            updateImage();
            //frameRenderer.call(ctx, size, ballRef.current);
        }
    };

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

    return <canvas {...size} ref={canvasRef} />;




}






export default Canvas;
