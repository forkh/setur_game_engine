import {PropsWithChildren, useCallback, useState} from "react";
import {GameObject} from "../gameobject/GameObject";
import {GameLoopContext} from "./GameLoopContext";

export function GameLoop(props: PropsWithChildren<{}>) {
    const [objects, setObject] = useState<GameObject[]>([]);

    const registerObject = (gameObject: GameObject) => {
        setObject(objects => {
            objects.push(gameObject);
            return objects;
        });
    }

    const updateLoop = (now: number) => {

        // Updates
        objects.forEach(obj => {
            obj.components.forEach(comp => comp.enabled && comp.Update(now));
        });
        
        window.requestAnimationFrame(updateLoop);
    }

    const start = useCallback(() => {
        objects.forEach(obj => {
            obj.components.forEach(comp => comp.Start());
        });

        window.requestAnimationFrame(updateLoop);
    }, []);


    return (
        <GameLoopContext.Provider value={{registerObject, start}}>
            {props.children}
        </GameLoopContext.Provider>
    );
}