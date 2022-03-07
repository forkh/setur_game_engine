import { ReactNode, PropsWithChildren, createContext, useState, useCallback } from 'react';
import { GameComponent } from './GameComponent';

export const GameLoopContext = createContext<GameLoopOptions>({
    registerObject(_gameObject: GameComponent) { },
    start() { }
})

//function GameLoop(props: PropsWithChildren<object>) {
//    return <>
//        {props.children}
//    </>;
//
//}

function GameLoop(props: PropsWithChildren<{}>) {
    const [objects, setObject] = useState<GameComponent[]>([]);

    const registerObject = (gameObject: GameComponent) => {
        setObject(objects => {
            objects.push(gameObject);
            return objects;
        });
    }

    const updateLoop = (now: number) => {

        // Updates
        //objects.forEach(obj => {
        //    obj.components.forEach(comp => comp.enabled && comp.Update(now));
        //});

        window.requestAnimationFrame(updateLoop);
    }

    const start = useCallback(() => {
        objects.forEach(obj => {
            //obj.components.forEach(comp => comp.Start());
        });

        window.requestAnimationFrame(updateLoop);
    }, []);


    return (
        <GameLoopContext.Provider value={{registerObject, start}}>
            {props.children}
        </GameLoopContext.Provider>
    );
}

type GameLoopOptions = {
    registerObject(gameComponent: GameComponent): void,
    start(): void
};

export {GameLoop};