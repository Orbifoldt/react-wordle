import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './organisms/game-board/game-board';
import { loadDictionary, randomWord } from './game-logic/random-words';
import { useState, useEffect } from 'react';
import { exampleGame } from './game-logic/game';


const game = exampleGame()

function App(): JSX.Element {
  // const [dictLoaded, setDictLoaded] = useState(false)
  // useEffect(() => {
  //   loadDictionary()
  //     .then(() => setDictLoaded(true))
  // }, [])

  // if (dictLoaded) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>Welcome to Wordle!</div>
        </header>

        {/* <GameBoard {...game}/> */}
        {GameBoard(game)}
      </div>
    );
  // } else {
  //   return <div>waiting...</div>
  // }
}

export default App;
