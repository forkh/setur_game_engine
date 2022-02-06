//BaseObject, dno um vit brúka hetta, kanska?
export type BaseObject = {
    x: number;
    y: number;
    mass: number;
    name: string;
    path: string;
    sprite: HTMLImageElement;
}


export function createBaseObject(_x: number, _y: number, _mass: number, _name: string, _path: string) : BaseObject {
    let baseObject: BaseObject;
    baseObject = {
        x: _x,
        y: _y,
        mass: _mass,
        name: _name,
        path: _path,
        sprite: new Image()
    }

    return baseObject;
};