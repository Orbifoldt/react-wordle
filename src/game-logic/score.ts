
export class LetterScore{
    constructor(public readonly emoji: string){}

    static readonly GRAY = new LetterScore('⬛')
    static readonly YELLOW = new LetterScore('🟨')
    static readonly GREEN = new LetterScore('🟩')
}

export default function wordScore(guess: string, target: string): LetterScore[] {
    if (guess.length !== target.length) {
        throw Error("Guess and answer should have equal length")
    }

    const score = new Array(target.length).fill(LetterScore.GRAY)
    const indexedAnswer = asIndexedArray(target)
    const indexedGuess = asIndexedArray(guess)

    // score greens
    let i = indexedGuess.length
    while (i--) {
        const [guessChar, idx] = indexedGuess[i]
        if (guessChar === indexedAnswer[idx][0]) {
            score[idx] = LetterScore.GREEN
            indexedGuess.splice(idx, 1)
            indexedAnswer.splice(idx, 1)
        }
    }

    // score yellows
    const leftoverAnswerChars: string[] = project(indexedAnswer, 0)
    indexedGuess.forEach((elt: [string, number]) => {
        const [guessChar, idx] = elt
        if (leftoverAnswerChars.includes(guessChar)) {
            score[idx] = LetterScore.YELLOW
            deleteFirst(leftoverAnswerChars, guessChar)
        }
    })

    return score
}

const asIndexedArray = (str: string): Array<[string, number]> => str.split("").map((elt, idx) => [elt, idx])
const project = (table: Array<Array<any>>, column: number): Array<any> => table.map((arr) => arr[column])
const deleteFirst = <T,>(array: Array<T>, elt: T) => {
    const idx = array.findIndex(x => x === elt)
    array.splice(idx, 1)
}