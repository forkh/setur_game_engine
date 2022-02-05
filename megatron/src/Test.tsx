export type Hemingur = {
    x: number;
    y: number;
}

// Test fílur hjá Rúna

export function createHemingur(x: number, y: number) : Hemingur {
    let hem: Hemingur;
    hem = {
        x: x,
        y: y
    };
    return hem;
}

export function printHemingur(hem: Hemingur) {
    console.log("x:", hem.x, ", y:", hem.y);
}

export function move() {

}

export function fixedUpdate() {

}

export function update() {

}