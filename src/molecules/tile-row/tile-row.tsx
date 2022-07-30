import Tile from "../../atoms/tile"
import { zip } from "../../common/functional-method"
import { Score } from "../../game-logic/game-controller"
import { LetterScore } from "../../game-logic/score"
import './tile-row.css'

interface TileRowProps {
    guess: string[]
    score: Score[]
}

function mapScoreToState(score: LetterScore): "default" | "yellow" | "green" | "gray" {
    switch (score) {
        case Score.GRAY: return "gray";
        case Score.YELLOW: return "yellow";
        case Score.GREEN: return "green";
        default: return "default";
    }
}

const TileRow = ({ guess, score }: TileRowProps): JSX.Element => (
    <div className="tile-row">
        {zip(guess, score).map(([char, charScore]) => Tile({ value: char, state: mapScoreToState(charScore) }))}
    </div>
)

export default TileRow