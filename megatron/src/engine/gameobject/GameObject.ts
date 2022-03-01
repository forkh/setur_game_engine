import {GameComponent, GameComponentInstanceDefinition} from "./GameComponent";
import {Transform} from "./transform";


export type GameObject = {
    name: Readonly<string>
    setName(value: string): void;

    active: Readonly<boolean>
    setActive(value: boolean): void;
    transform: Transform;

    components: GameComponent[];
    getComponent<TComponent extends GameComponent>(type: GameComponentInstanceDefinition<TComponent>): TComponent | null;
    addComponent<TComponent extends GameComponent>(type: GameComponentInstanceDefinition<TComponent>, enabled: boolean): TComponent
}