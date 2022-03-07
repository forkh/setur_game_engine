import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useRef, useEffect } from 'react';
//import Canvas from "./engine/Canvas";
import Canvas from "./engine/Canvas3"

function App() {
    return (
        <div className="App">
            <Canvas />

        </div>
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

    );
}


/**
function App() {
    return (
        <div className="App">
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
        </div>

    );
}

export default App;**/
export default App;
