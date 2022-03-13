// Parts of this code is based on:
// https://github.com/suuunly/react-sheep-engine-2/blob/main/src/react-sheep-engine/core/maths/Vector2.ts

class Vector2d {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public add(v: Vector2d): Vector2d {
        this.x += v.x;
        this.y += v.y;

        return this;
    }

    public addXY(x1: number, y1: number): void {
        this.x += x1;
        this.y += y1;
    }

    public setXY(x1: number, y1: number): void {
        this.x = x1;
        this.y = y1;
    }

    public subtraction(v: Vector2d): Vector2d {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    }

    public get(): Vector2d {
        return this;
    }
    
    public scalar_product(scalar: number): void {
        this.x *= scalar;
        this.y *= scalar;
    }

    public static add(v1: Vector2d, v2: Vector2d): Vector2d {
        return new Vector2d(v1.x + v2.x, v1.y + v2.y);
    }

    public static subtract(v1: Vector2d, v2: Vector2d): Vector2d {
        return new Vector2d(v1.x - v2.x, v1.y - v2.y);
    }

    public static multiply(v1: Vector2d, s: number): Vector2d {
        return new Vector2d(v1.x * s, v1.y * s);
    }
    
    static addition(vector1: Vector2d, vector2: Vector2d): Vector2d {
        return new Vector2d(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    static division(vector1: Vector2d, scalar: number): Vector2d {
        return new Vector2d(vector1.x / scalar, vector1.y / scalar);
    }
    
    public static get zero(): Vector2d {
        return new Vector2d(0, 0);
    }

    public static get one(): Vector2d {
        return new Vector2d(1, 1);
    }

    public static get right(): Vector2d {
        return new Vector2d(1, 0);
    }

    public static get left(): Vector2d {
        return new Vector2d(-1, 0);
    }

    public static get up(): Vector2d {
        return new Vector2d(0, 1);
    }

    public static get down(): Vector2d {
        return new Vector2d(0, -1);
    }
}

// Exporting Vector2d class
export {Vector2d};