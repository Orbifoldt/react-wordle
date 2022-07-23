import WordleGame, { GameError, GameState } from "./game"
import wordScore from "./score"


const target = "LOLLY";

const guess1: string = "ALLOW"
const guess2: string = "ABORT"
const guess3: string = "OUIJA"

const mockRandomWord: jest.Mock<string, [number]> = jest.fn()
    .mockImplementation((num: number) => target)
jest.mock('./random-words', () => {
    const originalRandomWordsModule = jest.requireActual('./random-words')
    return {
        __esModule: true,
        ...originalRandomWordsModule,  // partial mock
        randomWord: () => mockRandomWord(0),
    }
});


describe("Initializing a game", () => {

    test("A new game has no guesses or scores", () => {
        const game = new WordleGame(5, 5)

        expect(game.guesses).toHaveLength(0)
        expect(game.scores).toHaveLength(0)
    })

    test("When we create a new game it generates a new random word", () => {
        new WordleGame(5, 5)
        expect(mockRandomWord).toHaveBeenCalledTimes(1)
    })

})

describe("Gameplay: guessing and getting scores", () => {

    test("Guessing a word should add it to the guesses", () => {
        const game = new WordleGame(5, 5)
        game.guess(guess1)

        expect(game.guesses[0]).toEqual(guess1)
    })

    test("Guessing multiple words should add them all to the guesses", () => {
        const game = new WordleGame(5, 5)

        game.guess(guess1)
        game.guess(guess2)
        expect(game.guesses).toEqual([guess1, guess2])

        game.guess(guess3)
        expect(game.guesses).toEqual([guess1, guess2, guess3])
    })

    test("Guessing a word should add the score to the scores", () => {
        const expectedScore = wordScore(guess1, target)
        const game = new WordleGame(5, 5)
        game.guess(guess1)

        expect(game.scores[0]).toEqual(expectedScore)
    })

    test("Guessing multiple words should add the scores of each guess to the scores", () => {
        const expectedScore1 = wordScore(guess1, target)
        const expectedScore2 = wordScore(guess2, target)
        const expectedScore3 = wordScore(guess3, target)

        const game = new WordleGame(5, 5)
        game.guess(guess1)
        game.guess(guess2)
        expect(game.scores).toEqual([expectedScore1, expectedScore2])

        game.guess(guess3)
        expect(game.scores).toEqual([expectedScore1, expectedScore2, expectedScore3])
    })

    test('should convert lowercase guesses to uppercase', () => {
        const guess = "lower"
        const game = new WordleGame(5, 5)
        game.guess(guess)

        expect(game.guesses).toEqual(["LOWER"])
        expect(game.scores).toEqual([wordScore("LOWER", target)])
    })

    test.each(["", "NO", "SHRT", "TOOLONG", "WAYTOOLONGGGG"])
        ('should throw an error if word length != target words length, guesses and score should remain empty', (guess) => {
            const game = new WordleGame(5, 5)

            expect(() => game.guess(guess)).toThrowError()
            expect(game.guesses).toHaveLength(0)
            expect(game.scores).toHaveLength(0)
        })

    test.each(["_ABCD", "ABCD*", "A.BCD"])
        ('should throw error for invalid characters, guesses and score should remain empty', (guess) => {
            const game = new WordleGame(5, 5)

            expect(() => game.guess(guess)).toThrowError()
            expect(game.guesses).toHaveLength(0)
            expect(game.scores).toHaveLength(0)
        })

    test('should only accept valid english words', () => {
        const game = new WordleGame(5, 5)

        expect(() => game.guess("XZORT")).toThrowError(GameError.InvalidGuess)
    })
})


describe('Completing the game by either winning or losing', () => {
    test('should set state to won if correct word is guessed', () => {
        const game = new WordleGame(5, 5)
        game.guess(guess1)
        game.guess(target)

        expect(game.state).toEqual(GameState.WON)
    })

    test('should not allow to guess more after game is won', () => {
        const game = new WordleGame(5, 5)
        game.guess(guess1)
        game.guess(target)

        expect(() => game.guess(guess1)).toThrowError()
        expect(() => game.guess(target)).toThrowError()
    })

    test('should set state to lost if guessing more than max guesses', () => {
        const game = new WordleGame(5, 5)
        loseGame(game)

        expect(game.state).toEqual(GameState.LOST)
    })

    test('should not allow to guess more than the max guesses', () => {
        const game = new WordleGame(5, 5)
        loseGame(game)

        expect(() => game.guess(guess1)).toThrowError()
    })

})




describe("Reseting the game", () => {
    test('when the game is reset it should get some new word', () => {
        mockRandomWord.mockReturnValueOnce("AUDIO")
            .mockReturnValueOnce("PASTA")

        const game = new WordleGame(5, 5)

        game.guess("AUDIO")
        expect(game.state).toEqual(GameState.WON)

        game.reset()
        game.guess("PASTA")
        expect(game.state).toEqual(GameState.WON)

        expect(mockRandomWord).toBeCalledTimes(2)
    })

    test('when won and then resetting it should set state back to playing and remove all guesses and score', () => {
        const game = new WordleGame(5, 5)

        game.guess(target)
        game.reset()

        expect(game.guesses).toHaveLength(0)
        expect(game.scores).toHaveLength(0)
        expect(game.state).toEqual(GameState.PLAYING)
    })

    test('when lost and then resetting it should set state back to playing and remove all guesses and score', () => {
        const game = new WordleGame(5, 5)

        loseGame(game)
        game.reset()

        expect(game.guesses).toHaveLength(0)
        expect(game.scores).toHaveLength(0)
        expect(game.state).toEqual(GameState.PLAYING)
    })

    test('when mid play and then resetting it should set state back to playing and remove all guesses and score', () => {
        const game = new WordleGame(5, 5)

        game.guess(guess1)
        game.guess(guess2)
        game.guess(guess3)

        game.reset()
        expect(game.guesses).toHaveLength(0)
        expect(game.scores).toHaveLength(0)
        expect(game.state).toEqual(GameState.PLAYING)
    })
})


function loseGame(game: WordleGame) {
    for (let i = 0; i < 5; i++) {
        game.guess(guess1)
    }
}

