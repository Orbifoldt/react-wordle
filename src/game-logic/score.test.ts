import  wordScore, { LetterScore } from './score'

test("Letter in correct position should return Green", () => {
    const target = "BAAAA"
    const guess = "BZZZZ"
    const score = wordScore(guess, target)

    expect(score[0]).toBe(LetterScore.GREEN)
})


test("Correct letter in wrong position should return yellow", () => {
    const target = "BAAAA"
    const guess = "ZBZZZ"

    const score = wordScore(guess, target)

    expect(score[1]).toBe(LetterScore.YELLOW)

})


test("Incorrect letter should be graded gray", () => {
    const target = "AAAAA"
    const guess = "ZZZZZ"
    const score = wordScore(guess, target)

    expect(score[0]).toBe(LetterScore.GRAY)
})


test("No letters correct should give all gray", () => {
    const target = "AAAAA"
    const guess = "ZZZZZ"
    const score = wordScore(guess, target)

    expect(score).toEqual(new Array(5).fill(LetterScore.GRAY))
})


test("All letters correct should give all green", () => {
    const target = "ABCDE"
    const guess = "ABCDE"
    const score = wordScore(guess, target)

    expect(score).toEqual(new Array(5).fill(LetterScore.GREEN))
})

test("All letters correct but in incorrect position should give all yellow", () => {
    const target = "ABCDE"
    const guess = "BCDEA"
    const score = wordScore(guess, target)

    expect(score).toEqual(new Array(5).fill(LetterScore.YELLOW))
})

test("Repeated guessed letter with one in correct place should be scored with one green and one gray", () => {
    const target = "BAAAA"
    const guess = "BBZZZ"
    const score = wordScore(guess, target)

    expect(score[0]).toEqual(LetterScore.GREEN)
    expect(score[1]).toEqual(LetterScore.GRAY)
})

test("Repeated guessed letter with all incorrect location should be scored with first one yellow and second one gray", () => {
    const target = "BAAAA"
    const guess = "ZBBZZ"
    const score = wordScore(guess, target)

    expect(score[1]).toEqual(LetterScore.YELLOW)
    expect(score[2]).toEqual(LetterScore.GRAY)
})

test("repeated guessed letter with second one correctly placed should return single green for the second letter", () => {
    const target = "BABBB"
    const guess = "AAZZZ"

    const score = wordScore(guess, target)

    expect(score[0]).toEqual(LetterScore.GRAY)
    expect(score[1]).toEqual(LetterScore.GREEN)
})

test("trice repeated letter with one correct location and one correct but incorrect location gives 1 green and 1 yellow", () => {
    const target = "BBBAA"
    const guess = "AZAZA"

    const score = wordScore(guess, target)

    expect(score).toEqual([LetterScore.YELLOW, LetterScore.GRAY, LetterScore.GRAY, LetterScore.GRAY, LetterScore.GREEN])
})

test("Unequal length inputs should throw error", () => {
    expect(() => wordScore("FOUR", "FIVE5")).toThrowError()
})


test("Guessing ALLOW for LOLLY: 🟨🟨🟩⬛⬛", () => {
    const target = "ALLOW"
    const guess = "LOLLY"

    const score = wordScore(guess, target)
    expect(score).toEqual([LetterScore.YELLOW, LetterScore.YELLOW, LetterScore.GREEN, LetterScore.GRAY, LetterScore.GRAY])
})

test("Guessing BULLY for LOLLY: ⬛⬛🟩🟩🟩", () => {
    const target = "BULLY"
    const guess = "LOLLY"

    const score = wordScore(guess, target)
    expect(score).toEqual(
        [LetterScore.GRAY, LetterScore.GRAY, LetterScore.GREEN, LetterScore.GREEN, LetterScore.GREEN]
    )
})

test("Guessing ALERT for ROBIN: ⬛⬛⬛🟨⬛", () => {
    const target = "ROBIN"
    const guess = "ALERT"

    const score = wordScore(guess, target)
    expect(score).toEqual(
        [LetterScore.GRAY, LetterScore.GRAY, LetterScore.GRAY, LetterScore.YELLOW, LetterScore.GRAY]
    )

})

test("Guessing SONIC for ROBIN: ⬛🟩🟨🟩⬛", () => {
    const target = "ROBIN"
    const guess = "SONIC"

    const score = wordScore(guess, target)
    expect(score).toEqual(
        [LetterScore.GRAY, LetterScore.GREEN, LetterScore.YELLOW, LetterScore.GREEN, LetterScore.GRAY]
    )
})

test("Guessing ROBIN for ROBIN: 🟩🟩🟩🟩🟩", () => {
    const target = "ROBIN"
    const guess = "ROBIN"
    
    const score = wordScore(guess, target)
    expect(score).toEqual(
        [LetterScore.GREEN, LetterScore.GREEN, LetterScore.GREEN, LetterScore.GREEN, LetterScore.GREEN]

    )
})



