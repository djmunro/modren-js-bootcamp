module.exports = {
  forEach(arr, fn) {
    for (const index in arr) {
      fn(arr[index], index);
    }
  },
  map(arr, fn) {
    const result = [];

    for (let index = 0; index < arr.length; index += 1) {
      result.push(fn(arr[index], index));
    }

    return result;
  },
};
