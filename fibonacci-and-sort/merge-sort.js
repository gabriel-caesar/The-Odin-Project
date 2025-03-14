// merge sort
export function mergeSort(array) {

  let arr1, arr2;

  if (array.length === 1 || array.length === 0) {
    return array;
  }

  arr1 = array.slice(0, Math.ceil(array.length/2));
  arr2 = array.slice(Math.ceil(array.length/2));
  
  let a = mergeSort(arr1);
  let b = mergeSort(arr2);

  return merge(a, b);
  
};

function merge(x, y) {

  if (x.length === 0) return y;
  if (y.length === 0) return x;
  
  if (x[0] < y[0]) {
    return [x[0], ...merge(x.slice(1), y)]; 
  } else {// "merge(x, y.slice(1))" will return sorted
    return [y[0], ...merge(x, y.slice(1))]; 
  }

};

console.log(mergeSort([6,7,3,4,6,1]));