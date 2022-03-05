import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Canvas from "./engine/Canvas";

function App() {
    const draw = (ctx: any, frameCount: number) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(100, 100, 100 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()

    }


    return <Canvas draw={draw}/>
}




export default App;
