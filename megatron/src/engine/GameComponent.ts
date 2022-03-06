import {Transform} from './transform';
import {Vector2d} from "./math";
import {ObjectID} from "./ObjectID";

type GameComponentMap = {
    [key: string]: BaseComponent;
}

interface BaseComponent {
    getOID(): number;
}

class GameComponent implements BaseComponent {
    private oid: number;
    //private gameComponents: GameComponentMap;
    private gameComponents: Array<BaseComponent>;
    private active: boolean;
    private transform: Transform;

    public getOID(): number {
        return this.oid;
    }

    public constructor() {
        this.oid = ObjectID.NEWCOMPONENT();
        this.gameComponents = [];
        this.active = false;
        this.transform = {
            scale: 1,
            rotation: 1,
            position: new Vector2d(10, 10)
        }
    }

    public addGameComponent(baseComponent: BaseComponent): void {
        //if (gameComponentName in this.gameComponents) {
        //    return;
        //}

        //this.gameComponents[gameComponentName] = gameComponent;
        this.gameComponents.push(baseComponent);
    }

    //public checkProperty(property: string): boolean {
    //    return property in this.gameComponents;
    //}

    //public getProperty(property: string): any {
    //    return this.gameComponents[property];
    //}

    public isActive(): boolean {
        return this.active;
    }

    public toggleActivity(): void {
        this.active = !this.active;
    }

    public setActive(status: boolean): void {
        this.active = status;
    }
}

export {GameComponent};
export type {BaseComponent};