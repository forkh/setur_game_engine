import { useRef, useEffect } from 'react'
import {CanvasProps} from './Canvas';
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258



const useCanvas: any = (draw: (arg0: any, arg1: number) => void) => {
//const useCanvas: any = (draw: CanvasProps => void) => {

    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current;
        // @ts-ignore
        const context = canvas.getContext('2d');
        let frameCount = 0;
        let animationFrameId: number;

        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        }

        const render2 = () => {

        }

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [draw])

    return canvasRef;
}

export default useCanvas