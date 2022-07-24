import Tile from "../../atoms/tile"
import { LetterScore } from "../../game-logic/score"
import './tile-row.css'

interface TileRowProps {
    wordLength: number
    word?: string
    score?: LetterScore[]
}


function fill(word: string = "", size: number): string[] {
    let chars = word.split('')
    while (chars.length < size) {
        chars.push("")
    }
    return chars
}

function safeGet(idx: number, array?: any[]){
    if(array){
        return array[idx]
    } else {
        return undefined
    }
}

function mapScoreToState(score?: LetterScore): "default" | "yellow" | "green" | "gray" {
    switch (score) {
        case LetterScore.GRAY: return "gray";
        case LetterScore.YELLOW: return "yellow";
        case LetterScore.GREEN: return "green";
        case undefined: 
        default: return "default";
    }
}

const TileRow = (props: TileRowProps): JSX.Element => (
    <div className="tile-row">
        {fill(props.word, props.wordLength)
            .map((char: string, idx: number) => <Tile {...{
                value: char,
                state: mapScoreToState(safeGet(idx, props.score))
            }} />)
        }
    </div>
)

export default TileRow