/**import {Vector2d} from "../math";**/

class Rigidbody { // rigidbody
    // https://developer.ibm.com/tutorials/wa-build2dphysicsengine/
    // https://www.w3schools.com/graphics/tryit.asp?filename=trygame_gravity_game
    // https://github.com/luis-herasme/FisicaJS/blob/master/src/RigidBody.ts
/**
    public mass: number;
    public restitution: number; // fylgi guide sindur blindt at byrja við
    // (verður brúkt til inelasticCollision sama stað í guide'ini.)
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

    public momentum(): Vector2d {
        return Vector2d.multiply(this.velocity, this.mass); // brúkar statiskar metodur
    }

    inelasticCollision({other}: { other: any }): void {
        const velocity1 = this.velocity;
        const velocity2 = other.velocity;
        const totalMomentum = other.momentum();
        totalMomentum.add(this.momentum());
        const totalMass = this.mass + other.mass;

        this.velocity = Vector2d.subtraction(velocity2, velocity1);
        this.velocity.multiply(this.restitution * other.mass);
        this.velocity.add(totalMomentum);
        this.velocity.division(totalMass);

        other.velocity = Vector2d.subtraction(velocity1, velocity2);
        other.velocity.multiply(other.restitution * this.mass);
        other.velocity.add(totalMomentum);
        other.velocity.division(totalMass);
    }


    public update(): void {
        this.acceleration.division(this.mass);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.zero(); // nullstilla
    }**/

}




export {Rigidbody}