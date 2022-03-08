import {GameLoop} from "./engine/GameLoop";

/**import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Area51 from './Area51';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); **/

const canvas: HTMLCanvasElement = document.createElement('canvas')

const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
const root: HTMLElement | null = document.getElementById('root')

if (context === null || root === null) {
    throw new Error('Unable to add canvas')
}
canvas.width = window.innerWidth
canvas.height = window.innerHeight

root.appendChild(canvas)
{GameLoop(context)}
