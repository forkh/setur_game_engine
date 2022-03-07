import React from 'react'
import useCanvas from './CanvasHooks' // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

type CanvasProps = {
    [x: string]: any,
    draw: any,
    components: any
}

//const Canvas = (props: { [x: string]: any; draw: any }) => {
const Canvas = (props: CanvasProps) => {

    const { draw, ...rest } = props
    const canvasRef = useCanvas(draw)

    return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas;
export type {CanvasProps};