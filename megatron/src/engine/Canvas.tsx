//import "./canvas.css";
import React, {useRef, useEffect, useCallback, useState, Fragment} from "react";
import logo192 from "../logo192.png";
import logo512 from "../logo512.png"
//import {createComponent} from "./GameObject";
//import {GameComponent} from "./GameObject"
import { GameComponent, createComponent } from './GameComponent';

interface CanvasProps {
    gameComponents: GameComponent[];
    width: number;
    height: number;
}

function Canvas(canvasProps: CanvasProps): JSX.Element {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    //let canvasRef = useRef<HTMLCanvasElement | null>(null);

    //const size = { width: window.innerWidth, height: window.innerHeight};

    /**function reportWindowSize() {
        size.width = window.innerHeight;
        size.height = window.innerWidth;
    }

    window.addEventListener('resize', reportWindowSize); **/



    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (!ctx) {
                throw new Error("2d context not supported or canvas already initialized");

            }
            ctx.clearRect(0,0, canvasProps.width, canvasProps.height)
            let test3 = new Image();
            test3.src = logo192;
            let test4 = new Image();
            test4.src = logo512;

            const test = createComponent(1000,10, test3.src)
            const test2 = createComponent(100, 100, test4.src)

            var array: GameComponent[] = [
                test, test2
            ]

            canvasProps.gameComponents.forEach((gc) => {
                if (gc.active) {
                    ctx.drawImage(gc.sprite, gc.transform.position.getX(), gc.transform.position.getY());
                    console.log("=========ARRAY PRINT=======")
                }
            }, [])


            //array.forEach(function(GameComponent){
            //    // @ts-ignore
            //    ctx.drawImage(GameComponent.sprite, GameComponent.transform.position.x,
            //        GameComponent.transform.position.getY());
            //    console.log("=========ARRAY PRINT=======")
            //}, []);
        }


    })
    return<Fragment>
        <canvas {...canvasProps} ref={canvasRef} />
        </Fragment>
}

export default Canvas;