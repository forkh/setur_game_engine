//import "./canvas.css";
import React, {useRef, useEffect, useCallback, useState} from "react";
import logo192 from "../logo192.png";
import {InputSystem, EventType} from "./Input"
import {InputMap} from "./Input";


//import frameRenderer from "./frameRenderer";


function Canvas() {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let requestIdRef = useRef<number | null>(null);
    //let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
    InputSystem.instantiateInputSystem({
        "left": "ArrowLeft",
        "right": "ArrowRight",
        "rotate-cw": "KeyQ",
        "rotate-ccw": "KeyE"
    });

    InputSystem.addButtonListener(EventType.ButtonDown, "ArrowLeft", () => {
        console.log("jump");
        y -= 10;
    });

    let test = new Image();
    test.src = logo192
    const imageRef = useRef(null);
    const size = { width: window.innerWidth, height: window.innerHeight};
    let x = 0;
    let y = 0;

    /**useEffect(() => {
        window.addEventListener("keypress", jump )
        return (window.removeEventListener("keydown", jump ))

    }, []);**/



    /**function jump(): void {
        console.log("jump");
        y -= 10;
    }**/



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
