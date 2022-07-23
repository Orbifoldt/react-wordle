import { isWordValid, randomWord } from "./random-words"


test('should be able to generate a random word with 5 letters', () => {
    const rand = randomWord()
    expect(rand).toMatch(/[A-Z]{5}/)
})


test('should return true for a valid english word', () => {
    expect(isWordValid("ADOBE")).toBe(true)
})

test('should return true for a valid english word ignoring case', () => {
    expect(isWordValid("AdObE")).toBe(true)
})

test('should return false for a non-english word', () => {
    expect(isWordValid("SRWOX")).toBe(false)
})


