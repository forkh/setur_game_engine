import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Test';
import {createHemingur, printHemingur} from "./Test";

function testest() {
    console.log("Interval test");
}

function App() {
    console.log("Test!!");
    let hem = createHemingur(2, 42);
    printHemingur(hem);
    console.log("Test done!!");
    setInterval(testest, 3000);
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

export default App;
