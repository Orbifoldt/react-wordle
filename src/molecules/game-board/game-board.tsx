import { zip } from "../../common/functional-method"
import  { Score } from "../../game-logic/game-controller"
import TileRow from "../tile-row"


interface GameBoardState {
    guesses: string[][]
    scores: Score[][]
}

const GameBoard = ({
    guesses,
    scores
}: GameBoardState): JSX.Element => {
    return (
        <div className="game-board">
            {zip(guesses, scores).map(([guess, score]) => TileRow({guess: guess, score: score}))}
        </div>
    )
}
export default GameBoard