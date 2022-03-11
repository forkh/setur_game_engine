//import "./canvas.css";
import React, {useRef, useEffect, useCallback, useState, Fragment} from "react";
import logo192 from "../logo192.png";
import logo512 from "../logo512.png"
//import {createComponent} from "./GameObject";
//import {GameComponent} from "./GameObject"
//import { GameComponent, createComponent } from './GameComponent';
import { GameObject } from './GameObject';

interface CanvasProps {
    //gameComponents: GameComponent[];
    objects: GameObject[];
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

            //const test = createComponent(1000,10, test3.src)
            //const test2 = createComponent(100, 100, test4.src)

            //var array: GameComponent[] = [
            //    test, test2
            //]

            //var array: HTMLImageElement[] = [test3, test4];

            //array.forEach((x) => {
            //    ctx.drawImage(x, 25, 25);
            //})
            canvasProps.objects.forEach((go) => {
                //console.log("Object ID: " + go.getObjectID());
            //canvasProps.gameComponents.forEach((gc) => {
                if (go.isActive()) {
                    ctx.drawImage(go.getSprite(),
                        go.getTransform().getPosition().getX(),
                        go.getTransform().getPosition().getY());
                    //console.log("=========ARRAY PRINT=======")
                    //console.log(go.getObjectID() + ": (" + go.getTransform().getPosition().getY() + ", " + go.getTransform().getPosition().getY() + ")");
                }
                //console.log("printy");
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
export type { CanvasProps };