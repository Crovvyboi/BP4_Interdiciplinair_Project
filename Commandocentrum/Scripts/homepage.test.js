const { default: expect } = require('expect');
const {findMax, calculateDecimal, firstInFirstOut, addToArray} = require('./homepageTest')

// findmax
var array = [10, 20, 5, 16, 7];
test('Find max - Standard array', () =>{
    expect(findMax(array)).toBe(20)
})

var array2 = [-10, 20, -30, 16, -7];
test('Find max - Minus array', () =>{
    expect(findMax(array2)).toBe(20)
})

var array3 = [20.1, 20.2, 5.0, 16.5, 7];
test('Find max - Decimal array', () =>{
    expect(findMax(array3)).toBe(20.2)
})

// calculateDecimal
var number = 10;
var maxNumber = 100;
test('Calculate decimal - Standard', () => {
    expect(calculateDecimal(number, maxNumber)).toBe(0.1)
})

var number2 = 0.1;
var maxNumber2 = 10;
test('Calculate decimal - Decimal', () => {
    expect(calculateDecimal(number2, maxNumber2)).toBe(0.01)
})

// firstInFirstOut
var fifoArray = [7, 1, 14, 13, 20];
var fifoNew = 5
test('FIFO - Standard', () => {
    expect(firstInFirstOut(fifoArray, fifoNew)).toStrictEqual([7, 1, 14, 13, 20, 5])
})

var fifoArray2 = [7, 1, 14, 13, 20, 7, 1, 14, 13, 20, 7, 1, 14, 13, 20];
var fifoNew2 = 5
test('FIFO - 15', () => {
    expect(firstInFirstOut(fifoArray2, fifoNew2)).toStrictEqual([1, 14, 13, 20, 7, 1, 14, 13, 20, 7, 1, 14, 13, 20, 5])
})