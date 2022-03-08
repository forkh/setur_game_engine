import {Vector2d} from "./math";


class CollissionSystem {

    private static instance: CollissionSystem;


    private constructor() {}

    public static getInstance(): CollissionSystem {
        if (!CollissionSystem.instance) {
            CollissionSystem.instance = new CollissionSystem();
        }

        return CollissionSystem.instance;
    }

    /*public boxCollider(){

        return this.boxCollider();

    }*/

}