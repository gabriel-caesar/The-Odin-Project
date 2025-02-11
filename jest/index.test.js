const { capitalize, reverseString, calculator, caesarCypher, analizeArray } = require('./index');

test('takes a string and capitalizes it', () => {
  expect(capitalize('carol')).toBe('Carol');
});

test('reverses a string', () => {
  expect(reverseString('lorac')).toBe('carol');
});

test('runs the calculator', () => {
  expect(calculator.add(1, 2)).toBe(3);
  expect(calculator.subtract(2,1)).toBe(1);
  expect(calculator.divide(4, 2)).toBe(2);
  expect(calculator.mulitply(2, 2)).toBe(4);
});

test('cyphers a string', () => {
  expect(caesarCypher('gabRiel', -3)).toBe("dxyOfbi");
  expect(caesarCypher('gabriel', -3)).toBe("dxyofbi");
})

test('returns data from a given array', () => {
  expect(analizeArray([1,8,3,4,2,6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6
 })
});