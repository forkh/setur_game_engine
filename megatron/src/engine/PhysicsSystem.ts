import { Vector2d } from "./math"
import { GameObject } from "./GameObject"

interface PhysicsProps {
    //gameComponents: GameComponent[];
    gameObjects: GameObject[];
}

interface RigidBodyProps {
    hasRigidBody: boolean;
    rigidBody: any;
}

class PhysicsSystem {

    private static instance: PhysicsSystem;

    private gameObjects: GameObject[];

    private constructor(gameObjects: GameObject[]) {
        this.gameObjects = gameObjects;
    }

    public static start(): void {
        setInterval(PhysicsSystem.instance.step, 50);
    }

    //public static instantiatePhysicsSystem(): void {
    public static instantiatePhysicsSystem(gameObjects: GameObject[]): void {
        if (!PhysicsSystem.instance) {
            PhysicsSystem.instance = new PhysicsSystem(gameObjects);
        }
        console.log("Physics system already exists")
    }

    public static getInstance(): PhysicsSystem {
        return this.instance;
    }

    //public step(dt: number, physicsProps: PhysicsProps): void { // havi broytt so Gameobject ikki hevur access til force, velocity og mass
    public step(): void { // havi broytt so Gameobject ikki hevur access til force, velocity og mass
        let dt: number = 40;
        let m_gravity: number = 5.50;
        console.log("========================GRAVITY=====================")
        //console.log(physicsProps.gameObjects)

        for (let i = 0; i < PhysicsSystem.getInstance().gameObjects.length; i++) {
            //console.log(go.getObjectID() + " test ")
            //let test:Vector2d = Vector2d.multiply1(go.force, (go.mass * m_gravity))
            //console.log(go.getRigidBodyComponent())
            let go: GameObject = PhysicsSystem.getInstance().gameObjects[i];
            console.log(go.hasRigidBodyComponent())
            let rb: RigidBodyProps = go.getRigidBodyComponent();
            if (rb.hasRigidBody) {

                let vector1: Vector2d = Vector2d.zero

                //test.setXY(0, go.getRigidBodyComponent().mass * m_gravity)
                vector1.setXY(0, rb.rigidBody.mass * m_gravity)

                //console.log(test)

                rb.rigidBody.force = Vector2d.addition(rb.rigidBody.force, vector1); // +=

                //console.log(rb.rigidBody.force)

                let vector2: Vector2d = Vector2d.zero

                vector2 = Vector2d.division(rb.rigidBody.force, rb.rigidBody.mass * dt); //
                //console.log(test2)

                rb.rigidBody.velocity = Vector2d.addition(rb.rigidBody.velocity, vector2); // +=

                //console.log(rb.rigidBody.velocity)

                go.getTransform().setPosition(0, rb.rigidBody.velocity.getY())

                rb.rigidBody.force = Vector2d.zero;
                console.log(go.getTransform().getPosition())
            }
        }

        //this.gameObjects.forEach((go) => {

        ////console.log(go.getObjectID() + " test ")
        //    //let test:Vector2d = Vector2d.multiply1(go.force, (go.mass * m_gravity))
        //    //console.log(go.getRigidBodyComponent())
        //    console.log(go.hasRigidBodyComponent())
        //    let rb: RigidBodyProps = go.getRigidBodyComponent();
        //    if (rb.hasRigidBody) {

        //        let vector1: Vector2d = Vector2d.zero

        //        //test.setXY(0, go.getRigidBodyComponent().mass * m_gravity)
        //        vector1.setXY(0, rb.rigidBody.mass * m_gravity)

        //        //console.log(test)

        //        rb.rigidBody.force = Vector2d.addition(rb.rigidBody.force, vector1); // +=

        //        //console.log(rb.rigidBody.force)

        //        let vector2: Vector2d = Vector2d.zero

        //        vector2 = Vector2d.division(rb.rigidBody.force, rb.rigidBody.mass * dt); //
        //        //console.log(test2)

        //        rb.rigidBody.velocity = Vector2d.addition(rb.rigidBody.velocity, vector2); // +=

        //        //console.log(rb.rigidBody.velocity)

        //        go.getTransform().setPosition(0, rb.rigidBody.velocity.getY())

        //        rb.rigidBody.force = Vector2d.zero;
        //        console.log(go.getTransform().getPosition())
        //    }
        //});
    }
}

export default PhysicsSystem
export type { PhysicsProps, RigidBodyProps }


