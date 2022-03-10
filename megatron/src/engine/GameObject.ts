import { ResourceManager } from './ResourceManager';
import { Transform, new_transform } from './Transform';

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
    public constructor(go: GameObject) {
        super(go);

    }

}

export { GameComponent, GameObject };