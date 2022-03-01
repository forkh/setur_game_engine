import React from 'react';
import logo from './logo.svg';
import './App.css';
import './engine/ResourceManager'
import {ResourceManager} from "./engine/ResourceManager";

ResourceManager.instantiateResourceManager();

let t = ResourceManager.getImage("bird", true);
//console.log(t);

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
                {t}
            </header>
        </div>

    );
}

export default App;
