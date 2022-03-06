import { useRef, useEffect } from 'react'
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

/**const useCanvas = draw => {

    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let frameCount = 0;
        let animationFrameId: any;

        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [draw])

    return canvasRef;
}**/
