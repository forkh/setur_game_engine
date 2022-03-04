import {BaseComponent} from "./GameComponent";

class SpriteComponent implements BaseComponent {
    private sprite: HTMLImageElement;

    public constructor(sprite: HTMLImageElement) {
        this.sprite = sprite;
    }

    public getSprite(): HTMLImageElement {
        return this.sprite;
    }
}

export {SpriteComponent};