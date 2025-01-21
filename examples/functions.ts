type SumFunction = (a: number, b: number) => number

const sum: SumFunction = (a, b) => a + b

const sum2: SumFunction = function sum2(a, b) {
    return a + b
}