import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import './engine/ResourceManager'
import PlayerController from './engine/PlayerController'

function App() {
  const player: PlayerController = new PlayerController()

  useEffect(() => {
    window.addEventListener("keypress", fly )
    return (window.removeEventListener("keydown", fly))

  }, []);

  function fly(): void {
    console.log("FLY from App.tsx")
    player.setState('fly')
  }

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
