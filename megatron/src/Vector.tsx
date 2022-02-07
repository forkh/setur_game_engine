export type Vector = {
    x: number,
    y: number,
    z: number
}


function dot_product(v1: Vector, v2: Vector) : number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

export { dot_product };