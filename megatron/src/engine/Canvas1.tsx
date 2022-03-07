import React, { useRef, useEffect, Fragment } from 'react';
import logo192 from "../logo192.png";

const SimpleCanvasExample: React.FC<{}> = () => {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);



    useEffect(() => {
        // Initialize
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let test = new Image();
            test.src = logo192
            let ctx = canvasCtxRef.current;
            ctx.fillStyle = "black"
            ctx.drawImage(test, 0 ,0 );
            alert('the image is drawn');

        }
    }, []);

    return <Fragment>
        <img src = "../../public/logo512.png"/><canvas ref={canvasRef} width = {800} height = {800}></canvas>
        </Fragment>;
};

export default SimpleCanvasExample;