class Vector2d {
    public x: number;
    public y: number;

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

    public get(): Vector2d {
        return this;
    }

    public dot_product(scalar: number): void {
        this.x *= scalar;
        this.y *= scalar;
    }
}

// Exporting Vector2d class
export {Vector2d};