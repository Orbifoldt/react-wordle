import { fillToSize } from "../common/functional-method"
import WordleGame, { GameState } from "./game"
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
 * An immutable controller for a Wordle game. It provides a view on a WordleGame object and additionally keeps tracks of the 
 * current inserted letters and the rows that weren't guessed yet.
 */
export default class WordleGameController {
    private _currentGuess: string = ""

    constructor(
        public readonly wordLength: number = 5,
        public readonly maxGuesses: number = 5,
        private game: WordleGame = new WordleGame(wordLength, maxGuesses),
        currentGuess: string = "",
    ) {
        this._currentGuess = currentGuess
    }

    get state() { return this.game.state }
    get currentGuessIndex() { return this.game.guesses.length } // no -1 to compensate for current guess
    get currentGuess() { return this._currentGuess }
    get currentGuessArray() { return fillToSize(this.currentGuess.split(''), this.wordLength, "") }

    get fullBoard(): [string[][], Score[][]] {
        const words: string[][] = this.game.guesses.map((guess) => guess.split(''))
        if (words.length < this.maxGuesses) {
            words.push(this.currentGuessArray)
        }
        fillToSize(words, this.maxGuesses, this.emptyWord())

        const scores: LetterScore[][] = this.game.scores
        fillToSize(scores, this.maxGuesses, this.unscoredArray())

        return [words, scores]
    }

    private changeCurrentGuess(newValue: string): WordleGameController {
        return new WordleGameController(this.wordLength, this.maxGuesses, this.game, newValue)
    }

    input(inputValue: string): WordleGameController {
        console.log("Input: " + inputValue)
        if (inputValue === Commands.RESET) {
            this.game.reset()
            return this.changeCurrentGuess("")
        } else if (this.state === GameState.PLAYING) {
            if (inputValue === Commands.BACKSPACE) {
                return this.changeCurrentGuess(this._currentGuess.slice(0, -1))
            } else if (inputValue === Commands.ENTER) {
                return this.guess()
            } else if (isValidInputChar(inputValue) && this._currentGuess.length < this.wordLength) {
                return this.changeCurrentGuess(this._currentGuess + inputValue.toUpperCase())
            }
        }
        return this
    }

    private guess() {
        try {
            this.game.guess(this._currentGuess)
            return new WordleGameController(this.wordLength, this.maxGuesses, this.game, "")
        } catch (error) {
            console.debug("Error while guessing:" + error)
            return this
        }
    }

    private unscoredArray = () => new Array(this.wordLength).fill(Score.UNSCORED)
    private emptyWord = () => new Array(this.wordLength).fill('')
}

const isValidInputChar = (str: string) => str.match(/[A-Za-z]/) && str.length === 1
