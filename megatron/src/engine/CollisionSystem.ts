//import { System, Polygon, Circle } from "detect-collisions";
//import React, {useState} from "react";
import HitboxRectangle from "./HitBoxRectangle";
import {Engine} from "./Engine";
import { GameObject } from './GameObject';

//function checkForCollisions(): void {
//    this.gameObjects.forEach((go1: GameObject) => {
//        this.gameObjects.forEach((go2: GameObject) => {
//            if (go1.hasBoxCollider() && go2.hasBoxCollider() && go1.getObjectID() != go2.getObjectID()) {
//                const x1: number = go1.getTransform().getPosition().getX();
//                const y1: number = go1.getTransform().getPosition().getY();
//                // @ts-ignore
//                const w1: number = go1.getBoxCollider().width;
//                // @ts-ignore
//                const h1: number = go1.getBoxCollider().height;
//                const x2: number = go2.getTransform().getPosition().getX();
//                const y2: number = go2.getTransform().getPosition().getY();
//                // @ts-ignore
//                const w2: number = go2.getBoxCollider().width;
//                // @ts-ignore
//                const h2: number = go2.getBoxCollider().height;
//
//                if (x1 < (x2 + h2) &&
//                    (x1 + w1) > x2 &&
//                    y1 < (y2 + h2) &&
//                    (y1 + h1) > h2) {
//                   //return true;
//                    //send signal
//                    console.log("Collision");
//                    document.dispatchEvent(new Event("collision"));
//                }
//            }
//        })
//    })
//}
//
//export { checkForCollisions };

interface ICollider{ // havi ikki brúkt
    x : number;
    y : number;
}

type CollisionProps = {
    gameObjects: GameObject[];
}

class CollisionSystem {
    //private hitBoxRectangle = new HitboxRectangle(1,2,3,4);
    private gameObjects: GameObject[];
    //private collisionArray : any = [];

    private static instance: CollisionSystem;

    //private constructor(gameObjects: GameObject[]) {
    private constructor(collisionProps: CollisionProps) {
        this.gameObjects = collisionProps.gameObjects;
        //setInterval(this.checkCollisions, 1000);
    };

    public static getInstance(collisionProps: CollisionProps): CollisionSystem {
    //public static getInstance(gameObjects: GameObject[]): CollisionSystem {
        if (!CollisionSystem.instance) {
            CollisionSystem.instance = new CollisionSystem(collisionProps);
        }
        return CollisionSystem.instance;
    }

    public static start(): void {
        //CollisionSystem.instance.checkCollisions();
        //setInterval(function() {CollisionSystem.instance.checkCollisions}, 1000);
        setInterval(function () {CollisionSystem.instance.checkCollisions()}, 1000);
    }



    /*
    public makeHitbox(hitBoxRectangle : HitboxRectangle){

        //nú fer hitbox í array, skal gameobject taka har frá ella..
        //kanska mugu forbinda gameObject við hitbox aðrenn vit koyra í array..

        this.hitBoxRectangle = hitBoxRectangle;
        this.gameObjects.push(hitBoxRectangle)

    }


*/
    /**
     *  checks if gameObject has a Collider by iterating thogh
     *  if it has, pop and add too isCollided array
      */

    //public hasCollider(){
    //    if (this.gameObjects.includes(this.hitBoxRectangle) )
    //    {
    //        this.collisionArray.push(this.gameObjects)
    //    }
    //}

    //public isCollided(){
    public checkCollisions(): void {
        console.log("Checking for collisions");
        for (let i: number = 0; i < this.gameObjects.length; i++) {
            for (let j: number = 0; j < this.gameObjects.length; j++) {
                let go1: GameObject = this.gameObjects[i];
                let go2: GameObject = this.gameObjects[j];
                if (go1.hasBoxCollider() && go2.hasBoxCollider() && go1.getObjectID() != go2.getObjectID()) {
                    const x1: number = go1.getTransform().getPosition().getX();
                    const y1: number = go1.getTransform().getPosition().getY();
                    // @ts-ignore
                    const w1: number = go1.getBoxCollider().width;
                    // @ts-ignore
                    const h1: number = go1.getBoxCollider().height;
                    const x2: number = go2.getTransform().getPosition().getX();
                    const y2: number = go2.getTransform().getPosition().getY();
                    // @ts-ignore
                    const w2: number = go2.getBoxCollider().width;
                    // @ts-ignore
                    const h2: number = go2.getBoxCollider().height;

                    if (x1 < (x2 + h2) &&
                        (x1 + w1) > x2 &&
                        y1 < (y2 + h2) &&
                        (y1 + h1) > h2) {
                        //return true;
                        //send signal
                        console.log("!!!!!!!!!!!!!!!!Collision!!!!!!!!!!!!!!");
                        document.dispatchEvent(new Event("collision"));
                    }
                }
            }
        }
        //this.gameObjects.forEach((go1: GameObject) => {
        //    this.gameObjects.forEach((go2: GameObject) => {
        //        if (go1.hasBoxCollider() && go2.hasBoxCollider() && go1.getObjectID() != go2.getObjectID()) {
        //            const x1: number = go1.getTransform().getPosition().getX();
        //            const y1: number = go1.getTransform().getPosition().getY();
        //            // @ts-ignore
        //            const w1: number = go1.getBoxCollider().width;
        //            // @ts-ignore
        //            const h1: number = go1.getBoxCollider().height;
        //            const x2: number = go2.getTransform().getPosition().getX();
        //            const y2: number = go2.getTransform().getPosition().getY();
        //            // @ts-ignore
        //            const w2: number = go2.getBoxCollider().width;
        //            // @ts-ignore
        //            const h2: number = go2.getBoxCollider().height;

        //            if (x1 < (x2 + h2) &&
        //                (x1 + w1) > x2 &&
        //                y1 < (y2 + h2) &&
        //                (y1 + h1) > h2) {
        //               //return true;
        //                //send signal
        //                console.log("Collision");
        //                document.dispatchEvent(new Event("collision"));
        //            }
        //        }
        //    })
        //})
        //iterates through all of the components to see if any position overlaps
        //kanska man kann bara kannað upp ímótir okkara bird, ella main character

        //if (obj1.x < obj2.x + obj2.width &&
        //    obj1.x + obj1.width > obj2.x &&
        //    obj1.y < objt2.y + objt2.height &&
        //    obj1.y + obj1.height > obj2.y) {
        //    // collision detected!

        //senda síðani signal fyri at vit hava fingið eina collision og kunnu broyta state
        //fra

    }


}

export { CollisionSystem };
export type { CollisionProps };