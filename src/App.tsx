import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard, { GameBoardProps, Score } from './organisms/game-board/game-board';
import { loadDictionary, randomWord } from './game-logic/random-words';
import { useState, useEffect } from 'react';

const game = new GameBoardProps()
game.guesses[0].word = "SEPIA"
game.guesses[0].score = [Score.GRAY, Score.GRAY, Score.GRAY, Score.GREEN, Score.YELLOW]
game.guesses[1].word = "AUDIO"
game.guesses[0].score = [Score.GREEN, Score.GRAY, Score.GRAY, Score.GREEN, Score.GRAY]

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
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React + { randomWord(5)}
          </a>
        </header>

        {/* <GameBoard {...game}/> */}
        {GameBoard(game)}
        {/* <TileRow word="SEPIA" />
        <TileRow word="AUDIO" />
        <TileRow word="TRACE" />
        <TileRow word="OUGHT" />
        <TileRow word="GROWL" /> */}
      </div>
    );
  // } else {
  //   return <div>waiting...</div>
  // }
}

export default App;
