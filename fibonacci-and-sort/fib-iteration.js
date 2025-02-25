// fibonacci in iteration
function fibs(n) {

  let array = [0, 1];
  let x = 0;
  let y = 1;
  let z;

  for (let i = 2; i < n; i++) {

    z = x + y;
    x = y;
    y = z;
    array.push(y);

  };

  return array;

};

console.log(fibs(8));