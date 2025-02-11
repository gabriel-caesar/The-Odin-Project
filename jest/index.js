function capitalize(string) {
  const char = string.split('');
  char[0] = char[0].toUpperCase();
  return char.join('');
};

function reverseString(string) {
  return string.split('').reverse('').join('');
};

const calculator = {
  add: function(n1, n2) {
    return n1 + n2;
  },
  subtract: function(n1, n2) {
    return n1 - n2;
  },
  divide: function(n1, n2) {
    return n1 / n2;
  },
  mulitply: function(n1, n2) {
    return n1 * n2;
  }
};

// the parameter lets you choose either the alphabet will be capitalized or not
function alphabet(x) {
  // enter either "a" or "A"
  const char = x.charCodeAt(0);
  let array = [];
  for (let i = 0; i < 26; i++) {
    array.push(String.fromCharCode(char + i));
  }
  return array;
};

// cyphers a string
function caesarCypher(string, key) {
  // reference of the regular alphabet
  const array = alphabet("a");

  // recursively builds the cyphered alphabet array
  function helper(i, array) {
    if (i === key) { // if key equals to i (base case)
      return array;
    } else if (key > 0) { // if key is positive
      // push the first element to the end of the array
      i++
      let element = array.shift();
      array.push(element);
      return helper(i, array);
    } else { // if the key is negative
      // unshift the last element to the start of the array
      i--;
      let element = array.pop();
      array.unshift(element);
      return helper(i, array);
    };
  };
  
  const lowerCaseCypher = helper(0, array); // cyphered lower case alphabet
  let indexes = []; // index of the string in a regular alphabet
  let current = string.split(''); // [s,t,r,i,n,g];

  for (let i = 0; i < current.length; i++) {
    if (alphabet('a').indexOf(current[i]) === -1) { // if a upper case letter is found in string
      const array = alphabet("A"); // regular upper case alphabet
      const upperCaseCypher = helper(0, array); // cyphered upper case alphabet
      indexes.push(alphabet('A').indexOf(current[i])); 
      current[i] = upperCaseCypher[indexes[i]];
    } else { // if all letters in string are lower case
      // finding the indexes of the current string in a regular alphabet
      indexes.push(alphabet('a').indexOf(current[i]));
      // then use those same indexes in the cyphered alphabet to assign it on the string
      current[i] = lowerCaseCypher[indexes[i]];
    }
  };
 
  return current.join(''); // cyphered string
};

function analizeArray(array) {
  function mergeSort(array) {
    if (array.length === 0 || array.length === 1) {
      return array;
    };

    const a = array.slice(0, Math.ceil(array.length/2));
    const b = array.slice(Math.ceil(array.length/2));
    
    const c = mergeSort(a);
    const d = mergeSort(b);

    return helper(c, d);
  };

  function helper(x, y) {
    if (x.length === 0) return y;
    if (y.length === 0) return x;

    if (x[0] < y[0]) {
      return [x[0], ...helper(x.splice(1), y)];
    };
    if (y[0] < x[0]) {
      return [y[0], ...helper(x, y.splice(1))];
    };
  };

  return {
    'average': array[Math.ceil(array.length/2)],
    'min': mergeSort(array)[0],
    'max': mergeSort(array)[array.length - 1],
    'length': array.length
  }
};
const array = [1,8,3,4,2,6];
console.log(analizeArray(array));

module.exports = { capitalize, reverseString, calculator, caesarCypher, analizeArray };
