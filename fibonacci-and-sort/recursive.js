// fibonacci recursive

function fibsRec(n, array = [0, 1]) {

  if (array.length >= n) return array;

  array.push(array[array.length - 1] + array[array.length - 2]);

  return fibsRec(n, array);
}

console.log(fibsRec(8));
