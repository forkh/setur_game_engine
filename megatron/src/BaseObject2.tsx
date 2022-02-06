//import {global_oid} from './Game';

import {Sprite} from "./Sprite";
import {PhysicalObject} from "./PhysicalObject";
import {Position} from "./Position";

export class BaseObject2 {
    private oid: number = -1;
    private name: string | null;
    private sprite: Sprite | null;
    private physicalObject: PhysicalObject | null;
    private position: Position;

    constructor(_name: string,
                _sprite: Sprite,
                _physicalObject: PhysicalObject | null,
                _position: Position) {
        this.oid = -1;
        this.name = _name;
        this.sprite = _sprite;
        this.physicalObject = _physicalObject;
        this.position = _position;
    }

    public getSprite() : HTMLImageElement | undefined {
        return this.sprite?.getSprite;
    }

    public get getPosition() {
        return this.position;
    }
}