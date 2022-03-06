import React from 'react';
import logo from './logo.svg';
import './App.css';
import './engine/ResourceManager'
import {Engine} from "./engine/Engine";
import resources from './engine/assets.json';
import {Flagsifuglur} from './Flagsifuglur';
import {
    ReactNode
} from "../../../../.local/share/JetBrains/Toolbox/apps/IDEA-U/ch-0/213.6461.79/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";

const flagsifuglur: Flagsifuglur = new Flagsifuglur();
//setInterval(flagsifuglur.fixedUpdate, 500);
flagsifuglur.update();

let c: HTMLCanvasElement = document.createElement("canvas");
let ctx: any = c.getContext("2d");
let c2: ReactNode = React.createElement("canvas");
function App() {
    return (
        <div className="App">
            <canvas>

            </canvas>
        </div>

    );
}

export default App;
