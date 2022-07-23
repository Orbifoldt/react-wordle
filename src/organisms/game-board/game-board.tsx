import { useEffect, useState } from "react"
import TileRow from "../../molecules/tile-row"

export class GameBoardProps{
    readonly _max_rows: number
    readonly _word_length: number
    readonly _is_finished = false

    constructor(
        max_rows: number = 5, 
        word_length = 5, 
        public guesses: Guess[] = new Array(max_rows).fill(undefined).map(() => new Guess())
    ){
        this._max_rows = max_rows
        this._word_length = word_length
    }

    get max_rows(){
        return this._max_rows
    }

    get is_finished(){
        return this._is_finished
    }
}

export enum Score {
    GRAY, YELLOW, GREEN
}

export class Guess {
    _word_length: number

    constructor(word_length = 5, public word: string = "", public score: Score[] = new Array(word_length).fill(Score.GRAY)){
        this._word_length = word_length
        // validate word length
    }
}

const GameBoard = (props: GameBoardProps): JSX.Element => {
    let game = new GameBoardProps()
    game.guesses[0].word = "SEPIA"
    game.guesses[0].score = [Score.GRAY, Score.GRAY,  Score.GRAY, Score.GREEN, Score.YELLOW]
    game.guesses[1].word = "AUDIO"
    game.guesses[1].score = [Score.GREEN, Score.GRAY,  Score.GRAY, Score.GREEN, Score.GRAY]
    let [state, setState] = useState(game)

    
    const addLetter = (char: string) => setState((myGame) => {
        let current = myGame.guesses[2].word
        myGame.guesses[2].word = current + char 
        return myGame
    })
    // setState(game)

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            var charStr = event.key.toUpperCase()
            if(charStr.match(/^[A-Z]$/)){
                addLetter(charStr)
                console.log("letter!" + charStr)
            }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);

    return (
    <div className="game-board">{state.guesses.map((guess) => TileRow({word: guess.word, word_length: guess._word_length}))}</div>
)
}
export default GameBoard