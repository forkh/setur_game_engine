export class Position {
    private x: number;
    private y: number;
    private rotation: number;

    constructor(_x: number, _y: number, _rotation: number) {
        this.x = _x;
        this.y = _y;
        this.rotation = _rotation;
    };

    public get getX() {
        return this.x;
    }

    public get getY() {
        return this.y;
    }

    public get getRotation() {
        return this.rotation;
    }

    public set setX(_x: number) {
        this.x = _x;
    }

    public set setY(_y: number) {
        this.y = _y;
    }

    public set setRotation(_rotation: number) {
        this.rotation = _rotation;
    }

    public translate(_x: number, _y: number) {
        this.x += _x;
        this.y += _y;
    }
}