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


function Canvas() {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let requestIdRef = useRef<number | null>(null);

    const size = { width: window.innerWidth, height: window.innerHeight};

    const updateImage = () => {


    };

    const renderFrame = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0,0, window.innerWidth, window.innerHeight)


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
