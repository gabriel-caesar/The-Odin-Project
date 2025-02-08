// every knight moves
const REGULAR_MOVES = [
  [2, 1], [2, -1],
  [-2, 1], [-2, -1],
  [1, 2], [1, -2],
  [-1, 2], [-1, -2]
];

// checks for moves inside of the chessboard
const inBounds = (x, y) => {
  return (x >= 0 && x <= 7) && (y >= 0 && y <= 7);
};

// calculates new moves for the given position
const calcPositions = (pos) => {
  let [x, y] = pos;
  let NEW_MOVES = [];

  // for each coordinate array, add 'pos' and check if it is in bounds; 
  REGULAR_MOVES.forEach((array) => {
    let a = array[0] + x;
    let b = array[1] + y;
    if (inBounds(a, b)) NEW_MOVES.push([a, b]);
  });

  return NEW_MOVES;
};

// using BFS (level-order) to find the shortest path
const knightMoves = (start, end) => {

  // base condition if start equals to end
  if (start[0] === end[0] && start[1] === end[1]) {
    console.log(`=> You made it in 0 moves! Here's your path:`);
    return console.log(start);
  };

  // defining queue starting with the initial position
  let queue = [[start]];
  // Map() to keep track of the visited moves
  const visited = new Map();
  // first visited move is the initial move
  visited.set(start.toString(), null); 
  
  while (queue.length !== 0) {
    let CURRENT_DATA = queue.shift();
    let CURRENT_POSITION = CURRENT_DATA[CURRENT_DATA.length - 1];
    let CURRENT_MOVES = calcPositions(CURRENT_POSITION);

    for (let MOVES of CURRENT_MOVES) {
      if (MOVES[0] === end[0] && MOVES[1] === end[1]) {
        const fullPath = [...CURRENT_DATA, MOVES]
        console.log(`=> You made it in ${fullPath.length - 1} moves! Here's your path:`);
        fullPath.forEach(x => console.log(x));
        return;
      }
      
      // if the current move being analized wasn't visited yet, visit it and push it to the queue
      if (!visited.has(MOVES.toString(), CURRENT_DATA.toString())) {
        // key is the possible move and the value is the parent move
        visited.set(MOVES.toString(), CURRENT_DATA.toString());
        queue.push([...CURRENT_DATA, MOVES]);
      }
    }
  };

};

knightMoves([3,3],[4,3]);