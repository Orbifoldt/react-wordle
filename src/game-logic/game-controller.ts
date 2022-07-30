import WordleGame, { GameError } from "./game"
import { LetterScore } from "./score"


export const Commands = {
    BACKSPACE: "BACKSPACE",
    ENTER: "ENTER",
    RESET: "RESET"
}

export class Score extends LetterScore {
    static readonly UNSCORED = new LetterScore('')
}

/**
 * A controller for a Wordle game. It provides a view on a WordleGame object and additionally keeps tracks of the 
 * current inserted letters and the rows that weren't guessed yet.
 */
export default class WordleGameController {
    private game: WordleGame
    private _currentGuess: string = ""

    constructor(public readonly wordLength: number = 5, public readonly maxGuesses: number = 5) {
        this.game = new WordleGame(wordLength, maxGuesses)
    }

    get currentGuess() { return this._currentGuess }
    get currentGuessArray() {
        const x = this.currentGuess.split('')
        fillToSize(x, this.wordLength, "")
        return x
    }
    get currentGuessIndex() { return this.game.guesses.length } // no -1 to compensate for current guess
    get state() { return this.game.state }

    get fullBoard(): [string[][], Score[][]] {
        const board: string[][] = [
            ...this.game.guesses.map((guess) => guess.split('')),
            this.currentGuessArray
        ]
        fillToSize(board, this.maxGuesses, this.emptyWord())
        const score: LetterScore[][] = this.game.scores
        fillToSize(score, this.maxGuesses, this.unscoredArray())
        return [board, score]
    }

    input(inputValue: string) {
        if (inputValue === Commands.BACKSPACE) {
            this._currentGuess = this._currentGuess.slice(0, -1)
        } else if (inputValue === Commands.ENTER) {
            this.guess()
        } else if (inputValue === Commands.RESET) {
            this.game.reset()
        } else if (isValidInputChar(inputValue) && this._currentGuess.length < this.wordLength) {
            this._currentGuess += inputValue.toUpperCase()
        } else {
            throw GameError.InvalidCommand
        }
    }

    private guess() {
        try {
            this.game.guess(this._currentGuess)
            this._currentGuess = ""
        } catch (error) {
            console.error(error)
        }
    }

    private unscoredArray = () => new Array(this.wordLength).fill(Score.UNSCORED)
    private emptyWord = () => new Array(this.wordLength).fill('')
}

/**
 * Pushes values into a given array untill it has a given size. (Mutates the array)
 * @param arr The array to push values into
 * @param size The required size of the array. If less than the current size the array will be unchanged
 * @param value The value to push into the array
 */
function fillToSize<T>(arr: Array<T>, size: number, value: T) {
    while (arr.length < size) {
        arr.push(value)
    }
}

const isValidInputChar = (str: string) => str.length === 1 && str.match(/[A-Za-z]/)
