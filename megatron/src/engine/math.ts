class Vector2d {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(v: Vector2d): void {
        this.x += v.x;
        this.y += v.y;
    }

    public subtraction(v: Vector2d): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    public multiply(v: Vector2d, mass: number){
        this.x = v.x * mass;
        this.y = v.y * mass;
    }

    public get(): Vector2d {
        return this;
    }

    // Add dotproducts and more ?
}


export {Vector2d};