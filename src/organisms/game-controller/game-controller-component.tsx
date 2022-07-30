import React, { useEffect, useState } from "react"
import WordleGameController, { Commands } from "../../game-logic/game-controller"
import GameBoard from "../../molecules/game-board"


const toState = (game: WordleGameController) => {
    const bord = game.fullBoard
    return { guesses: bord[0], scores: bord[1] }
}

const GameController = (): JSX.Element => {
    const [game, setGame] = useState(new WordleGameController(5, 5))

    const parseInput = (input: string) => setGame(game.input(input))

    const resetGame = () => parseInput(Commands.RESET)

    useEffect(() => {
        const handleKeyboardInput = (event: KeyboardEvent) => {
            var charStr = event.key.toUpperCase()
            console.log("pressed: " + charStr)
            parseInput(charStr)
        }
        window.addEventListener('keydown', handleKeyboardInput);

        return () => {
            window.removeEventListener('keydown', handleKeyboardInput);
        };
    }, [game]);

    return (<div>
        {GameBoard(toState(game))} 
        <div>Game state: {game.state}</div>
        <button onClick={handleClickAndRemoveFocus(resetGame)}>Reset game</button>
    </div>)
}

const handleClickAndRemoveFocus = (f: () => void) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.blur()
    f()
}

export default GameController 