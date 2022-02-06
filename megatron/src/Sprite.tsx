export class Sprite {
    private sprite: HTMLImageElement;

    public constructor(path: string) {
        this.sprite = new Image();
        this.sprite.src = path
    }

    public get getSprite() {
        return this.sprite;
    }
}