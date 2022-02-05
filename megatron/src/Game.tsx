import React from 'react';
import logo from './logo.svg';
import './Game.css';
import './Test';
import {createHemingur, printHemingur} from "./Test";

function testest() {
    console.log("Interval test");
}

function Game() {
    console.log("Test!!");
    let hem = createHemingur(2, 42);
    printHemingur(hem);
    console.log("Test done!!");
    setInterval(testest, 3000);
    return (
    <div className="Game">
      <header className="Game-header">
          The game!
      </header>
        <canvas id="game-canvas"></canvas>
    </div>
  );
}

export default Game;
