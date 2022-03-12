import { ResourceManager } from './ResourceManager';
import { Transform, new_transform } from './Transform';

type BoxColliderType = {
    width: number,
    height: number
}

class GameObject {
    private gameComponents: GameComponent[];
    private active: boolean;
    private transform: Transform;

    public constructor() {
        this.gameComponents = [];
        this.active = true;
        this.transform = new_transform();
    }

    public addComponent(component: GameComponent) {
        this.gameComponents.push(component);
    }

    public getSprite(): HTMLImageElement {
        const img = new Image();
        this.gameComponents.forEach((gc) => {
            if (gc instanceof SpriteComponent) {
                return gc.getSprite();
            }
        })

        return img;
    }

    public isActive(): boolean {
        return this.active && this.getSprite() != null;
    }

    public getTransform(): Transform {
        return this.transform;
    }

    public addSprite(image: string) {
        this.gameComponents.push(new SpriteComponent(image, this));
    }

    public addBoxCollider(width: number, height: number): void {
        this.gameComponents.push(new BoxColliderComponent(this, width, height));
    }

    public hasBoxCollider(): boolean {
        this.gameComponents.forEach((gc) => {
            if (gc instanceof BoxColliderComponent) {
                return true;
            }
        })

        return false;
    }

    public getBoxCollider(): BoxColliderType | null {
        this.gameComponents.forEach((gc) => {
            if (gc instanceof BoxColliderComponent) {
                return gc.getBoxColl();
            }
        })

        return null;

    }
}


abstract class GameComponent {
    parent: GameObject;

    constructor(go: GameObject) {
        this.parent = go;
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
    private width : number;
    private height : number;
    // private canvasRef = useRef(null); -- Kunnu ikki brúka react hooks í classum.

    constructor (go: GameObject, width = 5, height = 5) {
        super(go);
        this.width = width;
        this.height = height;
    }

    public getBoxColl(): BoxColliderType {
        return {width: this.width, height: this.height};
    }



// Gera eina function sum riggar við okkara canvas so man kann síggja okkara
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

export { GameComponent, GameObject };
export type { BoxColliderType };
