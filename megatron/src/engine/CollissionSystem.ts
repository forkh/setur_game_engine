//import { System, Polygon, Circle } from "detect-collisions";
//import React, {useState} from "react";
import HitboxRectangle from "./HitBoxRectangle";
import {Engine} from "./Engine";

interface ICollider{ // havi ikki brúkt
    x : number;
    y : number;
}

class CollisionSystem {
    private hitBoxRectangle = new HitboxRectangle(1,2,3,4);
    private gameObjects : any = [];
    private collisionArray : any = [];
    
    private static instance: CollisionSystem;

    private constructor() {};

    public static getInstance(): CollisionSystem {
     
        if (!CollisionSystem.instance) {
            CollisionSystem.instance = new CollisionSystem();
        }
        return CollisionSystem.instance;
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

    public hasCollider(){
        if (this.gameObjects.includes(this.hitBoxRectangle) )
        {
            this.collisionArray.push(this.gameObjects)
        }
    }

    public isCollided(){
        // iterates through all of the components to see if any position overlaps
        // kanska man kann bara kannað upp ímótir okkara bird, ella main character

        // if (obj1.x < obj2.x + obj2.width &&
        //     obj1.x + obj1.width > obj2.x &&
        //     obj1.y < objt2.y + objt2.height &&
        //     obj1.y + obj1.height > obj2.y) {
        //     // collision detected!

        //senda síðani signal fyri at vit hava fingið eina collision og kunnu broyta state
        //fra

    }


}
