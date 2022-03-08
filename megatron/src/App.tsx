import React from 'react';
import './App.css';
import { GameLoop } from "./engine/GameLoop"



function App() {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    const root: HTMLElement | null = document.getElementById('root')

    if (context === null || root === null) {
        throw new Error('Unable to add canvas')
    }

    root.appendChild(canvas)

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    return (
        <div>  {GameLoop(context)} </div>
    );
}

//<SimpleCanvasExample />
//<Canvas />
/**<div className="App">
 <header className="App-header">
 <img src={logo} className="App-logo" alt="logo" />
 <p>
 Edit <code>src/App.tsx</code> and save to reload.
 </p>
 <a
 className="App-link"
 href="https://reactjs.org"
 target="_blank"
 rel="noopener noreferrer"
 >
 Learn React
 </a>
 </header>
 </div>**/

export default App;
