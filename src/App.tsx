import logo from './logo.svg';
import './App.css';
import GameController from './organisms/game-controller';




function App(): JSX.Element {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>Welcome to Wordle!</div>
      </header>
      <GameController />
    </div>
  );
}

export default App;
