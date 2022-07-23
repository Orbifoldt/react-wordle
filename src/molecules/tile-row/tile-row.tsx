import Tile from "../../atoms/tile"
import './tile-row.css'

interface TileRowProps {
    word: string
    word_length: number
}


function fill(word: string, size: number): string[]{
    let chars = word.split('')
    while(chars.length < size) {
        chars.push("")
    }
    return chars
}

const TileRow = (props: TileRowProps): JSX.Element => (
    <div className="tile-row">
        {fill(props.word, props.word_length)
            .map((char: string) => <Tile {...{value: char}}/>)
        }
    </div>
    )

export default TileRow