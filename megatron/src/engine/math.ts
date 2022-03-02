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

    public multiply(mass: number){
        this.x *= mass;
        this.y *= mass;
    }

    public division(mass: number){
        this.x /= mass;
        this.y /= mass;
    }

    public zero (): void {
        this.x = 0
        this.y = 0
    }

    public get(): Vector2d {
        return this;
    }

    // Add dotproducts and more ?
}


export {Vector2d};