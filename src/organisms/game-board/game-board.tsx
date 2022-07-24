import { useEffect, useState } from "react"
import WordleGame, { GameState } from "../../game-logic/game"
import TileRow from "../../molecules/tile-row"


const GameBoard = (props: WordleGame): JSX.Element => {

    const [currentGuess, setCurrentGuess] = useState("ABC")

    function mapping(props: WordleGame): JSX.Element[] {
        const output: JSX.Element[] = []

        output.push(
            ...props.guesses.map((guess, idx) => TileRow({
                wordLength: props.wordLength,
                word: guess,
                score: props.scores[idx],
            }))
        )
        if (props.state === GameState.PLAYING) {
            output.push(TileRow({
                wordLength: props.wordLength,
                word: currentGuess
            }))
        }
        for (let i = output.length; i < props.maxGuesses; i++) {
            output.push(TileRow({
                wordLength: props.wordLength,
                word: "",
            }))
        }
        return output
    }

    useEffect(() => {
        const handleKeyboardInput = (event: KeyboardEvent) => {
            var charStr = event.key.toUpperCase()
            if (charStr.match(/^[A-Z]$/)) {
                if (currentGuess.length < props.wordLength && props.state === GameState.PLAYING) {
                    setCurrentGuess(currentGuess + charStr)
                }
                console.log("letter! " + charStr)
            } else if (charStr === "BACKSPACE") {
                console.log("Pressed backspace!")
                setCurrentGuess(currentGuess.slice(0, -1))
            } else if (charStr === "ENTER") {
                console.log("Pressed enter, trying to submit")
                if (currentGuess.length === props.wordLength) {
                    try {
                        props.guess(currentGuess) 
                        setCurrentGuess("")  
                    } catch (error) {
                        console.log("Not a valid word: " + currentGuess)
                    }
                }
            } else {
                console.log("pressed: " + charStr)
            }
        };

        window.addEventListener('keydown', handleKeyboardInput);

        return () => {
            window.removeEventListener('keydown', handleKeyboardInput);
        };
    }, [currentGuess, props.guesses, props.state]);






    return (
        <div className="game-board">
            {mapping(props)}
        </div>
    )
}
export default GameBoard