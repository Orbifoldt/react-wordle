export const zip = <A, B>(a: Array<A>, b: Array<B>): Array<[A, B]> => a.map((entry, i) => [entry, b[i]]);

/**
 * Pushes values into a given array untill it has a given size. (Mutates the array)
 * @param arr The array to push values into
 * @param size The required size of the array. If less than the current size the array will be unchanged
 * @param value The value to push into the array
 */
export function fillToSize<T>(arr: Array<T>, size: number, value: T): Array<T> {
    while (arr.length < size) {
        arr.push(value)
    }
    return arr
}