import wordScore, { LetterScore } from "./score"
import { isWordValid, randomWord } from "./random-words"


export enum GameState {
    PLAYING, LOST, WON
}

export class GameError extends Error {
    static readonly GameOver = new GameError("The game is already over, cannot guess anymore")
    static readonly InvalidGuessLength = new GameError(`Invalid guess! Number of letters does not match word length.`)
    static readonly InvalidGuessSymbol = new GameError(`Invalid guess! Your guess may only contain the symbols A-Z.`)
    static readonly InvalidGuess = new GameError(`Invalid guess! Should be a valid english word`)
}


export default class WordleGame {
    constructor(public readonly wordLength: number, public readonly maxGuesses: number) {
        if (wordLength !== 5) {
            throw Error("Only word length 5 is supported for now!")
        }
    }

    private targetWord: string = randomWord(this.wordLength)
    private readonly _guesses: string[] = []
    private readonly _scores: LetterScore[][] = []
    private _state: GameState = GameState.PLAYING

    get guesses() { return [...this._guesses] }
    get scores() { return [...this._scores] }
    get state() { return this._state }

    guess(word: string) {
        if (this._state === GameState.PLAYING) {
            word = word.toUpperCase()
            this.validateGuess(word)

            const score = wordScore(word, this.targetWord)
            this._guesses.push(word)
            this._scores.push(score)

            this.updateGameState(score)
        } else {
            throw GameError.GameOver
        }
    }

    private validateGuess(word: string) {
        if (this.wordLength !== word.length) {
            throw GameError.InvalidGuessLength
        }
        if (!word.match(`[A-Z]{${this.wordLength}}`)) {
            throw GameError.InvalidGuessSymbol
        }
        if (!isWordValid(word)) {
            throw GameError.InvalidGuess
        }
    }

    private updateGameState(lastScore: LetterScore[]) {
        if (this.isWinning(lastScore)) {
            this._state = GameState.WON
        } else if (this._guesses.length === this.maxGuesses) {
            this._state = GameState.LOST
        }
    }

    private isWinning(score: LetterScore[]) {
        return (score.every((letterScore) => letterScore === LetterScore.GREEN))
    }

    reset() {
        this._guesses.splice(0, this._guesses.length)
        this._scores.splice(0, this._scores.length)
        this.targetWord = randomWord(this.wordLength)
        this._state = GameState.PLAYING
    }

}


