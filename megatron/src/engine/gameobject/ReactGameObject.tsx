import {Fragment, PropsWithChildren, useEffect, useLayoutEffect, useState} from "react";
import {useGameLoop} from "../loop";
import {GameComponent, GameComponentInstanceDefinition} from "./GameComponent";
import {GameObject} from "./GameObject";
import {TransformProps, useTransform} from "./transform";

export type ReactGameObjectProps = {
    active?: boolean;
    name?: string;
    components: typeof GameComponent[];
    transform?: TransformProps;
};

export function ReactGameObject(props: PropsWithChildren<ReactGameObjectProps>) {
    const loop = useGameLoop();

    const [name, setName] = useState(props?.name || "GameObject");
    const [active, setActive] = useState(props.active !== undefined ? props.active : true);
    const transform = useTransform(props?.transform);

    const [components, setComponents] = useState<GameComponent[]>([]);

    // TODO: Turn into a memo
    const gameObject: GameObject = {
        name,
        setName,
        active,
        setActive,
        transform,
        components: components,
        getComponent: <TComponent extends GameComponent>(type: GameComponentInstanceDefinition<TComponent>): TComponent | null => {
            const found = components.find(comp => comp instanceof type);
            return found ? found as TComponent : null;
        },
        addComponent: <TComponent extends GameComponent>(type: GameComponentInstanceDefinition<TComponent>, enabled: boolean = true): TComponent => {
            const newComp = new type(enabled, gameObject, transform);
            setComponents(components => {
                components.push(newComp);
                return components;
            });
            return newComp;
        },
    };

    useLayoutEffect(() => {
        props.components.forEach(comp => gameObject.addComponent(comp, true));
    }, []);

    useEffect(() => {
        loop.registerObject(gameObject);
    }, []);

    return <Fragment>
        {components.map((comp, i) => {
            return <Fragment key={i + " : " + transform.position.x}>
                {comp.Render(transform.position, transform.rotation)}
            </Fragment>
        })}
        {props.children}
    </Fragment>
}