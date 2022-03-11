import {Vector2d} from "../math";

class Physics { // rigidbody
    // https://developer.ibm.com/tutorials/wa-build2dphysicsengine/
    // https://www.w3schools.com/graphics/tryit.asp?filename=trygame_gravity_game
    // https://github.com/luis-herasme/FisicaJS/blob/master/src/RigidBody.ts

    public mass: number;
    public restitution: number; // fylgi guide sindur blindt at byrja við
    // (verður brúkt til inelasticCollision sama stað í guide'ini.)
    public velocity: Vector2d = new Vector2d(0,0);
    public position: Vector2d;
    public acceleration: Vector2d = new Vector2d(0,0);

    public constructor(position: Vector2d, restituion: number, mass = 1){
        this.position = position;
        this.restitution = restituion;
        this.mass = mass;
    }

    public addForce(force: Vector2d): void {
        this.acceleration.add(force);
    }

    /**public momentum(): Vector2d {
        return Vector2d.multiply(this.velocity, this.mass); // brúkar statiskar metodur
    }**/

    public update(): void {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        //this.acceleration.zero(); // nullstilla
    }

}

export {Physics};