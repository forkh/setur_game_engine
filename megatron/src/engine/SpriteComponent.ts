import {BaseComponent} from "./GameComponent";
import { ObjectID } from "./ObjectID";

class SpriteComponent implements BaseComponent {
    private sprite: HTMLImageElement;
    private oid: number;

    public constructor(sprite: HTMLImageElement) {
        this.sprite = sprite;
        this.oid = ObjectID.NEWCOMPONENT();
    }

    public getSprite(): HTMLImageElement {
        return this.sprite;
    }

    public getOID(): number {
        return this.oid;
    }
}

export {SpriteComponent};