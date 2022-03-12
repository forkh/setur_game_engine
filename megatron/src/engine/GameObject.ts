import { ResourceManager } from './ResourceManager';
import { Transform } from './Transform';
import { StateMachine } from './StateMachine';
import { InputSystem, InputTriggerMap } from './InputSystem';

class GameObject {
    private static GLOBAL_OBJECTID: number = 1;
    private objectId: number;
    private gameComponents: GameComponent[];
    private active: boolean;
    private transform: Transform;
    private stateMachine: StateMachine;
    private zIndex: number;
    //private forces: force[];

    public constructor(zIndex: number) {
        this.objectId = GameObject.GLOBAL_OBJECTID;
        GameObject.GLOBAL_OBJECTID++;
        this.gameComponents = [];
        this.active = true;
        this.transform = new Transform();
        this.stateMachine = new StateMachine(this, 'temp');
        this.zIndex = zIndex;
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
                console.log("Should print something! OID: " + gc.parent.objectId);
                //console.log(gc.parent.transform.getPosition());
                //gc.parent.transform.translate(25, 25);
                //console.log(gc.parent.transform.getPosition());
                img = gc.getSprite();
            }
        })

        return img;
    }

    public addBoxCollider(): void {
        this.gameComponents.push(new BoxColliderComponent(this));
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
}


abstract class GameComponent {
    parent: GameObject;
    //protected parent: GameObject;
    //public parent: GameObject;
    //abstract parent: GameObject;

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

}

class BoxColliderComponent extends GameComponent {
    public constructor(go: GameObject) {
        super(go);
        //this.parent.getTransform().getPosition();
    }
}

type ControlMap = {
    //[key: string]: (() => void);
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
                console.log("Found event");
                break;
            }
        }
    }

    //public constructor(go: GameObject, inputs: ControlMap) {
    //    super(go);
    //    //document.addEventListener(, this.buttonPressed.bind(this));
    //    this.triggers = inputs;

    //    for (let k in inputs) {
    //        document.addEventListener(k, inputs[k]);
    //        this.triggers[k] = inputs[k];
    //    }
    //}

    //private buttonPressed(e: any) : void {
    //    for (let k in this.triggers) {
    //        if (k === e.code) {
    //            this.triggers[k](this.parent);
    //            return;
    //        }

    //    }

    //    console.log(e.code + " is not bound to anything.");
    //}
    //private controls: ControlMap;
    ////private input: InputSystem;
    //public constructor(controls: ControlMap, go: GameObject) {
    //    console.log("New ControllerComponent");
    //    super(go);
    //    this.controls = {};
    //    for (let controlsKey in controls) {
    //        //document.addEventListener(controlsKey, this.controls[controlsKey]);
    //        this.addListener(controlsKey, this.controls[controlsKey]);
    //    }
    //}

    //public addListener(event: string, func: (go: GameObject) => void) {
    //    document.addEventListener(event, this.doSomething.bind(this));
    //    this.controls[event] = func;
    //    //document.addEventListener(event, func);
    //    console.log("Registering listener '" + event + "' to execute function: " + func);
    //}

    //private doSomething(e: any): void {
    //    for (let k in this.controls) {
    //        if (k === e.type) {
    //            console.log(e.type);
    //            this.controls[k](this.parent);
    //            return;
    //        }
    //    }
    //}
}

export { GameComponent, GameObject , ControllerComponent };
export type { ControlMap };