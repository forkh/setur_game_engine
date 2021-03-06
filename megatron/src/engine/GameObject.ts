import { ResourceManager } from './ResourceManager';
import { Transform } from './Transform';
import { StateMachine } from './StateMachine';
//import { InputSystem, InputTriggerMap } from './InputSystem';
import { Vector2d} from './math';
import { RigidBodyProps } from './PhysicsSystem';

type BoxColliderType = {
    width: number,
    height: number,
    exists: boolean
}

type TextProps = {
    exists: boolean,
    text: string,
    colour: string,
    font: string
}

class GameObject {
    private static GLOBAL_OBJECTID: number = 1;
    private objectId: number;
    private gameComponents: GameComponent[];
    private active: boolean;
    private transform: Transform;
    private stateMachine: StateMachine;
    private zIndex: number;
    //private forces: force[];
    public isGrounded: boolean = false;
    public solid: boolean = false;
    public tag: string;


    public constructor(zIndex: number) {
        this.objectId = GameObject.GLOBAL_OBJECTID;
        console.log(`Created object with OID: ${this.objectId}`);
        GameObject.GLOBAL_OBJECTID++;
        this.gameComponents = [];
        this.active = true;
        this.transform = new Transform();
        this.transform.setScale(1, 1);
        this.transform.setRotation(0);
        this.stateMachine = new StateMachine(this, 'temp');
        this.zIndex = zIndex;
        this.tag = "";
    }

    public addComponent(component: GameComponent) {
        this.gameComponents.push(component);
    }

    /**
     * @return returns empty image if one is not found, otherwise return current image
     */
    public getSprite(): HTMLImageElement {
        let img = new Image();
        this.gameComponents.forEach((gc) => {
            if (gc instanceof SpriteComponent) {
                //console.log("Should print something! OID: " + gc.parent.objectId);
                //console.log(gc.parent.transform.getPosition());
                //gc.parent.transform.translate(25, 25);
                //console.log(gc.parent.transform.getPosition());
                img = gc.getSprite();
            }
        })

        return img;
    }


    /**
     * @return boolean indicating wether object is active or not.
     */
    public isActive(): boolean {
        return this.active && this.getSprite() != null;
    }

    /**
     * @return Transform of current object.
     */
    public getTransform(): Transform {
        return this.transform;
    }

    /**
     * Adds sprite component to object.
     * @param image
     */
    public addSprite(image: string) {
        this.gameComponents.push(new SpriteComponent(image, this));
    }

    public setSprite(image: string): void {
        this.gameComponents.forEach((gc) => {
            if (gc instanceof SpriteComponent) {
                gc.setSprite(image);
            }
        })
    }
    
    public addRigidBodyComponent(go: GameObject): void{
        this.gameComponents.push(new RigidBodyComponent(go));

    }

    public hasRigidBodyComponent(): boolean {
        for (let i = 0; i < this.gameComponents.length; i++) {
            if (this.gameComponents[i] instanceof  RigidBodyComponent) {
                return true;
            }
        }
        return false;
        //this.gameComponents.forEach((gc) => {
        //    if (gc instanceof RigidBodyComponent) {
        //        //console.log("test has rigidbody")
        //        return true;
        //    }
        //})
        //return false;
    }

    public getRigidBodyComponent(): RigidBodyProps {
        let rb: RigidBodyProps = {
            hasRigidBody: false,
            rigidBody: null
        }

        for (let i = 0; i < this.gameComponents.length; i++) {
            if (this.gameComponents[i] instanceof RigidBodyComponent) {
                rb.rigidBody = this.gameComponents[i];
                rb.hasRigidBody = true;
                break;
            }
        }

        return rb;
    }

    //public addControllerComponent(controls: ControlMap): void {
    //    //let tmp: ControllerComponent = new ControllerComponent(this, controls);
    //    //this.gameComponents.push(new ControllerComponent(this, controls));
    //    this.gameComponents.push(new ControllerComponent(controls, this));
    //}

    public getObjectID(): number {
        return this.objectId;
    }

    //public hasControllerComponent(): boolean {
    //    this.gameComponents.forEach((gc) => {
    //        if (gc instanceof ControllerComponent) {
    //            return true;
    //        }
    //    })


    //    return false;
    //}

    //public getControllerComponent(): ControllerComponent | null{
    //    this.gameComponents.forEach((gc) => {
    //        if (gc instanceof ControllerComponent) {
    //            return gc;
    //        }
    //    })

    //    return null;
    //}

    public getNumberOfComponents(): number {
        return this.gameComponents.length;
    }

    public addBoxCollider(width: number, height: number): void {
        this.gameComponents.push(new BoxColliderComponent(this, width, height));
    }

    public hasBoxCollider(): boolean {
        let ret: boolean = false;
        this.gameComponents.forEach((gc) => {
            if (gc instanceof BoxColliderComponent) {
                // console.log("hey!");
                ret = true;
            }
        })

        return ret;
    }

    public getBoxCollider(): BoxColliderType {
        let i;
        let exists: boolean = false;
        for (i = 0; i < this.gameComponents.length; i++) {
            if (this.gameComponents[i] instanceof BoxColliderComponent) {
                exists = true;
                break;
            }
        }
        
        let gc: BoxColliderComponent = this.gameComponents[i] as BoxColliderComponent;
        
        
        const box: BoxColliderType = {
            width: exists ? gc.getWidth() : 0,
            height: exists ? gc.getHeight() : 0,
            exists: exists
        }
        
        return box;
        //this.gameComponents.forEach((gc) => {
        //    if (gc instanceof BoxColliderComponent) {
        //        return gc.getBoxCollider();
        //    }
        //})

        //return null;

    }

    public addTextComponent(text: string, font: string, size: string, colour: string): void {
        this.gameComponents.push(new TextComponent(this, text, font, size, colour));
    }

    public updateTextComponent(text: string): void {
        this.gameComponents.forEach((gc) => {
            if (gc instanceof TextComponent) {
                gc.setString(text);
            }
        })
    }
    /**
     * Returns TextProps
     */
    public getTextComponentProps(): TextProps {
        let textProps: TextProps = {
            exists: false,
            text: "",
            colour: "",
            font: ""
        }

        this.gameComponents.forEach((gc) => {
            if (gc instanceof TextComponent) {
                textProps.exists = true;
                textProps.text = gc.getString();
            }
        })

        return textProps;
    }
    
    public getZIndex(): number {
        return this.zIndex;
    }

    public addForce(force: Vector2d): void {
        if (this.hasRigidBodyComponent()) {
            console.log("Adding force");
            const rb: RigidBodyComponent = this.getRigidBodyComponent().rigidBody;
            rb.addForce(force);
        }
    }

    public printColliders(): void {
        for (let i: number = 0; i < this.gameComponents.length; i++) {
            if (this.gameComponents[i] instanceof BoxColliderComponent) {
                (this.gameComponents[i] as BoxColliderComponent).printCollider();
            }
        }
    }
}


abstract class GameComponent {
    parent: GameObject;

    constructor(go: GameObject) {
        this.parent = go;
    }

    protected getParent(): GameObject {
        return this.parent;
    }
}

class SpriteComponent extends GameComponent {
    private sprite: HTMLImageElement;

    public constructor(image: string, go: GameObject) {
        super(go);
        this.sprite = ResourceManager.getImage(image, false) as HTMLImageElement;
    }

    public getSprite(): HTMLImageElement {
        return this.sprite;
    }

    public setSprite(image: string): void {
        this.sprite = ResourceManager.getImage(image, false) as HTMLImageElement;
    }

}

class BoxColliderComponent extends GameComponent {
    private width : number;
    private height : number;
    // private canvasRef = useRef(null); -- Kunnu ikki br??ka react hooks ?? classum.

    constructor (go: GameObject, width = 5, height = 5) {
        super(go);
        this.width = width;
        this.height = height;
    }

    public getBoxCollider(): BoxColliderType {
        const tmp: BoxColliderType = {width: this.width, height: this.height, exists: true };
        // console.log(tmp);
        return tmp;
    }
    
    public getWidth(): number {
        return this.width;
    }
    
    public getHeight(): number {
        return this.height;
    }

    public printCollider(): void {
        //console.log()
        console.log(`${this.parent.getObjectID()}: w: ${this.parent.getRigidBodyComponent().rigidBody.width}, x: ${this.parent.getTransform().getPosition().getX()}`);
        console.log(`${this.parent.getObjectID()}: h: ${this.parent.getRigidBodyComponent().rigidBody.height}, y: ${this.parent.getTransform().getPosition().getY()}`);
    }



// Gera eina function sum riggar vi?? okkara canvas so man kann s??ggja okkara
// rectangle
//
// private drawRectangle(x:number, y:number, width:number, height:number) {
//     const canvas = this.canvasRef.current
//     const rectangle = ctx.clearRect("2d");
//     rectangle.beginPath();
//     rectangle.rect(x, y, height, width);
//     rectangle.stroke();
//     return {x, y, height, width}
// }
}

type ControlMap = {
    [key: string]: ((go: GameObject) => void);
}

class ControllerComponent extends GameComponent {
    private triggers: ControlMap;

    public constructor(parent: GameObject, inputs: ControlMap) {
        super(parent);
        this.triggers = inputs;
        this.addControls();
    }

    private addControls(): void {
        for (let k in this.triggers) {
            console.log("Registering: " + this.triggers[k]);
            document.addEventListener(k, this.execute.bind(this));

        }
    }

    private execute(e: any): void {
        for (let event in this.triggers) {
            if (event === e.type) {
                this.triggers[event](this.parent);
                //console.log("Found event");
                break;
            }
        }
    }
}

class RigidBodyComponent extends GameComponent { // testing
    //public force: Vector2d;
    public mass: number;
    public velocity: Vector2d;
    public force: Vector2d;

    public constructor(go: GameObject) {
        super(go);
        //this.force = Vector2d.zero; // testing
        this.mass = 1; // testing
        this.velocity = Vector2d.zero;
        this.force = Vector2d.zero;
    }

    public getRigidBodyComponent(): RigidBodyComponent {
        return this;
    }

    public addForce(force: Vector2d) {
        this.force = force;
    }

}

class TextComponent extends GameComponent {
    private props: TextProps;

    //this.gameComponents.push(new TextComponent(this, text, font, size, colour));
    public constructor(go: GameObject, text: string, font: string, size: string, colour: string) {
        super(go);
        this.props = {
            exists: true,
            text: text,
            font: `${size}px ${font}`,
            colour: colour
        }

    }

    public setString(text: string): void {
        this.props.text = text;
    }

    public getString(): string {
        return this.props.text;
    }
}

export { GameComponent, GameObject, ControllerComponent, RigidBodyComponent };
export type { ControlMap, BoxColliderType };