import React from 'react';
import './App.css';
import { GameLoop3 } from "./engine/GameLoop"
import  Canvas  from "./engine/Canvas6"



function App() { // Rendrar ikki
    /**const canvas: HTMLCanvasElement = document.createElement('canvas')

    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    const root: HTMLElement | null = document.getElementById('root')

    if (context === null || root === null) {
        throw new Error('Unable to add canvas')
    }
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    root.appendChild(canvas)**/

    return (
        GameLoop3()
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
