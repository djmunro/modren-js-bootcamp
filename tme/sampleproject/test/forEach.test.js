const assert = require('assert');
const { forEach } = require('../index');

let numbers;
beforeEach(() => {
  numbers = [1, 2, 3];
});

it('should sum an array', () => {
  let total = 0;
  forEach(numbers, (value) => {
    total += value;
  });

  assert.strictEqual(total, 5);
  numbers.push(3);
  numbers.push(3);
  numbers.push(3);
  numbers.push(3);
});

it('beforeEach it ran each time', () => {
  assert.strictEqual(numbers.length, 3);
});
