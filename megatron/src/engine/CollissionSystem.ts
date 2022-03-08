import { System, Polygon, Circle } from "detect-collisions";
import {Vector2d} from "./math";

interface ICollider{
    title : string;
    x : number;
    y : number;
}

class CollisionSystem {
    collisionArray = [];
    collisionSystem = new System();


    private static instance: CollisionSystem;

    private constructor() {}


    public static getInstance(): CollisionSystem {
        if (!CollisionSystem.instance) {
            CollisionSystem.instance = new CollisionSystem();
        }

        return CollisionSystem.instance;
    }



}