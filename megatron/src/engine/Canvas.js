import React from 'react'
import useCanvas from './CanvasHook' // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const Canvas = props => {

    const { draw, ...rest } = props
    const canvasRef = useCanvas(draw)

    return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas