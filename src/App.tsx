import logo from './logo.svg';
import './App.css';
import GameBoard from './organisms/game-board/game-board';
import { exampleGame } from './game-logic/game';


const game = exampleGame()

function App(): JSX.Element {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>Welcome to Wordle!</div>
        </header>

        {/* {GameBoard(game)} */}
      </div>
    );
}

export default App;
