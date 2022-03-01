

class Physics {
    // https://developer.ibm.com/tutorials/wa-build2dphysicsengine/
    // also has collision

    private velocity: number;
    private acceleration: number;
    private gravity: number;
    private mass: number;
    private positionX: number;
    private positionY: number;
    private time: number;

    public constructor(velocity: number, acceleration: number, gravity: number,
                       mass: number, positionX: number, positionY: number, dt: number){
        this.time = dt;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.gravity = gravity;
        this.mass = mass;
        this.positionX = positionX; // Havi ikki heilt skilt hvussu x-y position skal nýtasta í position equation
        this.positionY = positionY;
    }

    public positionEquation() {
        this.positionX = this.velocity * this.time + this.positionX; // time = delta time
    }

    public velocityEquation(){
        this.velocity = this.acceleration * this.time + this.velocity; // time = delta time
    }

    public forceEquation(){ // If we want different mass in our engine we can change the value
        //var force = this.mass * this.acceleration;

        var force = this.acceleration;
    }

}

export {Physics};