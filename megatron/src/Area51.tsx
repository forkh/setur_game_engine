import React from 'react';
import logo from './logo.svg';
import './App.css';
import './engine/ResourceManager'
import {Engine} from "./engine/Engine";
import resources from './engine/assets.json';
import {Flagsifuglur} from './Flagsifuglur';

const flagsifuglur: Flagsifuglur = new Flagsifuglur();

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
            <div>
                <canvas id={"engine_canvas"}></canvas>
            </div>

        </div>

    );
}

export default App;
