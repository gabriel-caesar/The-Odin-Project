// merge sort
function mergeSort(array) {
  // console.log("Your momma")

  let arr1, arr2;

  if (array.length === 1 || array.length === 0) {
    return array;
  }

  arr1 = array.slice(0, Math.ceil(array.length/2));
  arr2 = array.slice(Math.ceil(array.length/2));
  
  let a = mergeSort(arr1);
  let b = mergeSort(arr2);

  // console.log(merge(a, b));
  return merge(a, b);
  
};

function merge(x, y) {
  console.log("runned");

  if (x.length === 0) return y;
  if (y.length === 0) return x;
  
  if (x[0] < y[0]) {
    return [x[0], ...merge(x.slice(1), y)]; 
  } else {// "merge(x, y.slice(1))" will return sorted
    return [y[0], ...merge(x, y.slice(1))]; 
  }

};

function binSearch(n, array, start = 0, end = array.length - 1) {
  if (start > end) return -1; // If no match is found

  let sum = start + end;
  let middle = Math.floor(sum / 2); // Correct middle calculation

  if (array[middle] === n) {
    return middle; // Found the element
  } else if (array[middle] < n) {
    // Search the right subarray
    let subArray = array.slice(middle + 1);
    console.log("middle < n", subArray, `middle = ${middle}`);
    // Adjust the indices for the subarray and pass to the next recursive call
    return binSearch(n, subArray, middle + 1, end);
  } else {
    // Search the left subarray
    let subArray = array.slice(0, middle);
    console.log("middle > n", subArray, `middle = ${middle}`);
    // Adjust the indices for the subarray and pass to the next recursive call
    return binSearch(n, subArray, start, middle - 1);
  }
}

const result = binSearch(7, [1, 2, 3, 4, 5, 6, 7, 8]);
console.log(result); // Output the index of 7
