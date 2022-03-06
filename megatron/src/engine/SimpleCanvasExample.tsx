import React from 'react'
import { useRef, useEffect } from 'react';
//import useCanvas from './CanvasHook' // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

/**const Canvas = props => {

    const { draw, ...rest } = props
    const canvasRef = useCanvas(draw)

    return <canvas ref={canvasRef} {...rest}/>
}**/

const SimpleCanvasExample: React.FC<{}> = () => {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        // Initialize
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current;
            ctx!.beginPath();
            ctx!.arc(95, 50, 40, 0, 2 * Math.PI);
            ctx!.stroke();
        }
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default SimpleCanvasExample;