//import "./canvas.css";
import React, {useRef, useEffect, useCallback, useState, Fragment} from "react";
import logo192 from "../logo192.png";
import logo512 from "../logo512.png"
import { ResourceManager } from './ResourceManager';
//import {createComponent} from "./GameObject";
//import {GameComponent} from "./GameObject"
//import { GameComponent, createComponent } from './GameComponent';
import { GameObject, BoxColliderType } from './GameObject';
import { Engine } from './Engine';

interface CanvasProps {
    //gameComponents: GameComponent[];
    objects: GameObject[];
    width: number;
    height: number;
    //scale: number;
}

function Canvas(canvasProps: CanvasProps): JSX.Element {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    //let scale: number = canvasProps.scale;
    //let canvasRef = useRef<HTMLCanvasElement | null>(null);

    //const size = { width: window.innerWidth, height: window.innerHeight};

    /**function reportWindowSize() {
        size.width = window.innerHeight;
        size.height = window.innerWidth;
    }
    **/
    window.addEventListener('resize', () => {
        console.log("Adding event listener for resize.")

    });



    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (!ctx) {
                throw new Error("2d context not supported or canvas already initialized");

            }
            ctx.clearRect(0,0, canvasProps.width, canvasProps.height)
            ctx.fillStyle = "#79DDEC";
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            //let bg: HTMLImageElement = ResourceManager.getImage("uberbg", false) as HTMLImageElement;

            //ctx.drawImage(bg, 0, 0);
            //let test3 = new Image();
            //test3.src = logo192;
            //let test4 = new Image();
            //test4.src = logo512;

            //const test = createComponent(1000,10, test3.src)
            //const test2 = createComponent(100, 100, test4.src)

            //var array: GameComponent[] = [
            //    test, test2
            //]

            //var array: HTMLImageElement[] = [test3, test4];

            //array.forEach((x) => {
            //    ctx.drawImage(x, 25, 25);
            //})

            //canvasProps.objects
            for (let i = 0; i < canvasProps.objects.length; i++) {
                let go: GameObject = canvasProps.objects[i];

                if (go.isActive()) {
                    //ctx.rotate(go.getTransform().getRotation());
                    const x: number = go.getTransform().getPosition().getX();
                    const y: number = go.getTransform().getPosition().getY();
                    //console.log(`x: ${x}, y: ${y}, ${}`);
                    //ctx.scale(go.getTransform().getPosition().getX(),
                    //          go.getTransform().getPosition().getY());
                    let rot: number = go.getTransform().getRotation();
                    let scx: number = go.getTransform().getScale().getX();
                    let scy: number = go.getTransform().getScale().getY();
                    //ctx.scale(1, 1);
                    //ctx.scale(scx, scy);
                    //ctx.rotate(rot);
                    //ctx.drawImage(go.getSprite(),
                    //    go.getTransform().getPosition().getX()
                    //    - go.getSprite().width / 2,
                    //    go.getTransform().getPosition().getY()
                    //    - go.getSprite().height / 2);
                    ctx.drawImage(go.getSprite(),
                        go.getTransform().getPosition().getX()
                        - (go.getSprite().width) / 2,
                        go.getTransform().getPosition().getY()
                        - (go.getSprite().height) / 2,
                        go.getSprite().width,
                        go.getSprite().height);
                    //console.log("================================");
                    //console.log("components: " + go.getNumberOfComponents() + ", is true? " + go.hasBoxCollider());
                    let box: BoxColliderType = go.getBoxCollider();
                    //console.log(box.exists);
                    //if (go.hasBoxCollider()) {
                    if (!Engine.getDebugState() && box.exists) {
                        let box: BoxColliderType = go.getBoxCollider();
                        //console.log("box: " + box.exists);
                        if (box.exists) {
                            // console.log("box test");
                            ctx.strokeStyle = "#ff0000";
                            ctx.beginPath();
                            let x: number = go.getTransform().getPosition().getX();
                            let y: number = go.getTransform().getPosition().getY();
                            let w: number = go.getBoxCollider().width;
                            let h: number = go.getBoxCollider().height;
                            //console.log(`x: ${x}, y: ${y}, w: ${w}, h: ${h}`);
                            ctx.rect(x - (w / 2), y - (h / 2), w, h);
                            //ctx.rect(x-w/2, y-h/2, w, h);
                            ctx.stroke();
                            //ctx.strokeStyle = "#008000";
                            //ctx.beginPath();
                            //ctx.rect(x-w/2, y-h/2, w, h);
                            //ctx.rect(go.getTransform().getPosition().getX(),
                            //    go.getTransform().getPosition().getY(),
                            //    box.width,
                            //    box.height
                            //);
                            ctx.fillStyle = "#ff0000";
                            //ctx.font = "14px Comic Sans MS";
                            ctx.fillText(`${go.getObjectID()}: height: ${h}, width: ${w}, x: ${x}, ${y}yo`, x+h/2+3, y-w/2+3);
                            ctx.fillText(`${go.getObjectID()}: rotation: ${rot}, scale: (${scx}, ${scy})`, x+h/2+3, y-w/2+3+15);

                            ctx.stroke();
                        }
                    }
                    ////console.log("=========ARRAY PRINT=======")
                    ////console.log(go.getObjectID() + ": (" + go.getTransform().getPosition().getY() + ", " + go.getTransform().getPosition().getY() + ")");
                }
            }

            //canvasProps.objects.forEach((go) => {
            //    //console.log("Object ID: " + go.getObjectID());
            ////canvasProps.gameComponents.forEach((gc) => {
            //    if (go.isActive()) {
            //        ctx.drawImage(go.getSprite(),
            //        go.getTransform().getPosition().getX(),
            //        go.getTransform().getPosition().getY());
            //        //console.log("================================");
            //        //console.log("components: " + go.getNumberOfComponents() + ", is true? " + go.hasBoxCollider());
            //        if (go.hasBoxCollider()) {
            //            let box: BoxColliderType | null = go.getBoxCollider();
            //            //console.log("box: " + box);
            //            if (box) {
            //                // console.log("box test");
            //                ctx.strokeStyle = "#ff0000";
            //                ctx.beginPath();
            //                ctx.rect(5, 5, 30, 30);
            //                //ctx.rect(go.getTransform().getPosition().getX(),
            //                //    go.getTransform().getPosition().getY(),
            //                //    box.width,
            //                //    box.height
            //                //);
            //                ctx.stroke();
            //            }
            //        }
            //        ////console.log("=========ARRAY PRINT=======")
            //        ////console.log(go.getObjectID() + ": (" + go.getTransform().getPosition().getY() + ", " + go.getTransform().getPosition().getY() + ")");
            //    }
            //    //console.log("printy");
            //}, [])



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