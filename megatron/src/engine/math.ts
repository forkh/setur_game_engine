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

    public multiply(scalar: number){
        this.x *= scalar;
        this.y *= scalar;
    }

    public division(scalar: number){
        this.x /= scalar;
        this.y /= scalar;
    }

    public zero (): void {
        this.x = 0
        this.y = 0
    }

    public get(): Vector2d {
        return this;
    }

    public magnitude(): number{
        return Math.sqrt(this.x * this.x + this.y + this.y);
    }

    public dot(v: Vector2d): number{ // dot product
        return this.x * v.x * this.y * v.y;
    }

    public distance(v: Vector2d): number {
        return Vector2d.subtraction(this, v).magnitude();
    }

    public angle (): number {
        return Math.atan2(this.y, this.x);
    }


    public copy(): Vector2d {
        return new Vector2d(this.x, this.y);
    }


    static addition(vector1: Vector2d, vector2: Vector2d): Vector2d {
        return new Vector2d(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    static subtraction(vector1: Vector2d, vector2: Vector2d): Vector2d {
        return new Vector2d(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    static multiply(vector1: Vector2d, scalar: number): Vector2d {
        return new Vector2d(vector1.x * scalar, vector1.y * scalar);
    }

    static division(vector1: Vector2d, scalar: number): Vector2d {
        return new Vector2d(vector1.x / scalar, vector1.y / scalar);
    }

    static inverse(vector1: Vector2d): Vector2d {
        return new Vector2d(vector1.x * -1, vector1.y * -1);
    }

    static normalize(vector1: Vector2d): Vector2d {
        return new Vector2d(vector1.x * -1, vector1.y * -1);
    }

    static distance(vector1: Vector2d, vector2: Vector2d): number {
        return this.subtraction(vector1, vector2).magnitude();
    }

    static crossproduct (vector1: Vector2d, vector2: Vector2d): number {
        return vector1.x * vector2.y - vector2.x * vector1.y;

    }
}


export {Vector2d};