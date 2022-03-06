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
            {flagsifuglur.render()}
        </div>

    );
}

export default App;
