import {useRef, useEffect} from 'react'
// Heavily HEAVILY inspired by:
// https://gist.github.com/balmacefa/3e899642ae96eeb78e76d015d9587397
// https://www.youtube.com/watch?v=uJRXJxsvj7Q&t=82s

//export const useFrameLoop = ( callback: any): void => {
export const useFrameLoop = ( callback: (time: number, deltaTime: number) => void ): void => {

    const requestID = useRef(0);
    const previousTime = useRef(0);

    const loop = (time: number) => {
        if (previousTime.current !== undefined) {
            const deltaTime = time - previousTime.current;
            callback(time, deltaTime);
        }

        previousTime.current = time;
        if (requestID.current === undefined || null) { // error handling
            throw new Error("Error occured for request in Frameloop");
        }
        requestID.current = requestAnimationFrame(loop);

    }

    useEffect(()=>{
        if (requestID.current === undefined || null) {
            throw new Error("Error occured for request in Frameloop");
        }
        requestID.current = requestAnimationFrame(loop);

        return ()=> cancelAnimationFrame(requestID.current);
    }, []);
}