import {Vector2d} from "./math";

class Physics {
    // https://developer.ibm.com/tutorials/wa-build2dphysicsengine/
    // https://www.w3schools.com/graphics/tryit.asp?filename=trygame_gravity_game
    // https://github.com/luis-herasme/FisicaJS/blob/master/src/RigidBody.ts

    public mass: number;
    public restitution: number; // fylgi guide sindur blindt at byrja við verður brúkt til inelasticCollision
    public velocity: Vector2d = new Vector2d(0,0);
    public position: Vector2d = new Vector2d(0,0);
    public acceleration: Vector2d = new Vector2d(0,0);

    public constructor(position: Vector2d, restituion: number, mass = 1){
        this.position = position;
        this.restitution = restituion;
        this.mass = mass;
    }

    public addForce(force: Vector2d): void {
        this.acceleration.add(force);
    }

    /** public momentum(): Vector2d {
        return Vector2d.multiply(this.velocity, this.mass);
    } **/

    public update(): void {
        //this.acceleration.div(this.mass);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        //this.acceleration.zero();
    }


}




export {Physics};