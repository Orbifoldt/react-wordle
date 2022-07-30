import WordleGame, { GameState } from "./game";
import WordleGameController, { Commands, Score } from "./game-controller"
import wordScore from "./score";

const emptyRow = Array(5).fill("")
const unscoredRow = Array(5).fill(Score.UNSCORED)

const target = "LOLLY";

const guess1: string = "ALLOW"
const guess2: string = "ABORT"
const guess3: string = "OUIJA"


const mockRandomWord: jest.Mock<string, [number]> = jest.fn()
    .mockImplementation((num: number) => target)
const mockIsWordValid: jest.Mock<boolean, [string]> = jest.fn()
    .mockImplementation(() => true)
jest.mock('./random-words', () => {
    const originalRandomWordsModule = jest.requireActual('./random-words')
    return {
        __esModule: true,
        ...originalRandomWordsModule,  // partial mock
        randomWord: () => mockRandomWord(0),
        isWordValid: (input: string) => mockIsWordValid(input)
    }
});


describe("should provide a view of the Wordle Game", () => {

    test('for a new game fullBoard should contain 5 empty unscored rows', () => {
        const gameController = new WordleGameController()
        const [guesses, scores] = gameController.fullBoard

        expect(guesses).toHaveLength(5)
        guesses.forEach((guess) => expect(guess).toEqual(emptyRow))
        expect(scores).toHaveLength(5)
        scores.forEach((scr) => expect(scr).toEqual(unscoredRow))

        expect(gameController.state).toEqual(GameState.PLAYING)
    })

    test('when typing the letters should be displayed in uppercase, without being scored', () => {
        const gameController = new WordleGameController()
        gameController.input("a")
        gameController.input("B")
        gameController.input("c")

        const [guesses, scores] = gameController.fullBoard

        expect(guesses).toHaveLength(5)
        expect(guesses[0]).toEqual(["A", "B", "C", "", ""])
        guesses.splice(1).forEach((guess) => expect(guess).toEqual(emptyRow))
        expect(scores).toHaveLength(5)
        scores.forEach((scr) => expect(scr).toEqual(unscoredRow))
    })

    test('should show the guessed word after submitting the guess', () => {
        const gameController = new WordleGameController()
        guessWord(gameController, guess1)

        const expectedScore = wordScore(guess1, target)
        const [guesses, scores] = gameController.fullBoard

        expect(guesses).toHaveLength(5)
        expect(guesses[0].join('')).toEqual(guess1)
        guesses.splice(1).forEach((guess) => expect(guess).toEqual(emptyRow))
        expect(scores).toHaveLength(5)
        expect(scores[0]).toEqual(expectedScore)
        scores.splice(1).forEach((scr) => expect(scr).toEqual(unscoredRow))

        expect(gameController.state).toEqual(GameState.PLAYING)
    })

    test('should show the guessed words after submitting multiple guesses', () => {
        const gameController = new WordleGameController()
        const words = [guess1, guess2, guess3]
        const expectedScores = words.map((guess) => wordScore(guess, target))

        words.forEach((guess) => guessWord(gameController, guess))

        const [guesses, scores] = gameController.fullBoard

        expect(guesses.map((guess) => guess.join(''))).toEqual([...words, "", ""])
        expect(scores).toEqual([...expectedScores, unscoredRow, unscoredRow])

        expect(gameController.state).toEqual(GameState.PLAYING)
    })


    test('should reset current guess after guessing a valid word', () => {
        const gameController = new WordleGameController()
        guessWord(gameController, guess1)

        expect(gameController.currentGuess).toEqual("")
    })


    test('BACKSPACE command should remove the latest guessed letter', () => {
        const gameController = new WordleGameController()
        gameController.input("a")
        gameController.input("B")
        gameController.input("c")
        gameController.input(Commands.BACKSPACE)

        const [guesses, scores] = gameController.fullBoard

        expect(guesses).toHaveLength(5)
        expect(guesses[0]).toEqual(["A", "B", "", "", ""])
        guesses.splice(1).forEach((guess) => expect(guess).toEqual(emptyRow))
        expect(scores).toHaveLength(5)
        scores.forEach((scr) => expect(scr).toEqual(unscoredRow))
    })

    test('should correctly show when game is won', () => {
        const gameController = new WordleGameController()
        guessWord(gameController, guess1)
        guessWord(gameController, guess2)
        guessWord(gameController, target)

        expect(gameController.state).toEqual(GameState.WON)
    })

    test('should correctly show when game is lost', () => {
        const gameController = new WordleGameController()
        Array(5).fill(null).forEach((_) => guessWord(gameController, guess1))

        expect(gameController.state).toEqual(GameState.LOST)
    })

})

describe('controller should allow sending command to underlying game', () => {
    let spyReset: jest.SpyInstance<void, []>
    let spyGuess: jest.SpyInstance<void, [string]>

    beforeEach(() => {
        spyReset = jest.spyOn(WordleGame.prototype, "reset")
        spyGuess = jest.spyOn(WordleGame.prototype, "guess")
    })

    test('ENTER command should submit a guess', () => {
        const gameController = new WordleGameController()
        guessWord(gameController, guess1)

        expect(spyGuess).toBeCalledTimes(1)
        expect(spyGuess).toBeCalledWith(guess1)
        expect(spyReset).toBeCalledTimes(0)
    })

    test('using ENTER command multiple times should submit each guess', () => {
        const gameController = new WordleGameController()
        guessWord(gameController, guess1)
        guessWord(gameController, guess2)
        guessWord(gameController, guess3)

        expect(spyGuess).toBeCalledTimes(3)
        expect(spyGuess).toBeCalledWith(guess1)
        expect(spyGuess).toBeCalledWith(guess2)
        expect(spyGuess).toBeCalledWith(guess3)
        expect(spyReset).toBeCalledTimes(0)
    })

    test('RESET command should reset the game', () => {
        const gameController = new WordleGameController()
        guessWord(gameController, guess1)
        gameController.input(Commands.RESET)

        expect(spyGuess).toBeCalledTimes(1)
        expect(spyReset).toBeCalledTimes(1)
    })
})


function guessWord(game: WordleGameController, word: string) {
    word.split('').forEach((letter) => game.input(letter))
    game.input(Commands.ENTER)
}


