import { words5 } from "./words"

export const randomWord = (length: number = 5): string => {
    const availWords = words5
    return availWords[Math.floor((Math.random() * availWords.length))].toUpperCase()
}

export const isWordValid = (word: string) => {
    return words5.includes(word.toLowerCase())
}


export async function loadDictionary() {
    const words = await fullDictionary
    words.forEach((curr: string) => {
        const len = curr.length
        if (dictionaryWordLenght[len]) {
            dictionaryWordLenght[len].push(curr)
        } else {
            dictionaryWordLenght[len] = [curr]
        }
    })
    return console.log("Loaded dictionary")
}

const fullDictionary: Promise<string[]> = fetch('/dictionary.txt')
    .then((r) => r.text())
    .then((text) => text.split("\n"))

export const dictionaryWordLenght: { [id: number]: string[] } = {}


