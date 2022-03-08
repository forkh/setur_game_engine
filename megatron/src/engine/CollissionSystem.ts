import {Vector2d} from "./math";


class CollisionSystem {

    private static instance: CollisionSystem;


    private constructor() {}

    public static getInstance(): CollisionSystem {
        if (!CollisionSystem.instance) {
            CollisionSystem.instance = new CollisionSystem();
        }

        return CollisionSystem.instance;
    }

    /*public boxCollider(){

        return this.boxCollider();

    }*/

}