// ------------------- THIS FILE HANDLES THE GENERATION OF RANDOM POSITIONS FOR SHIPS --------------------

const { SHIPS_LIST, SHIPS_LIST_TWO } = require('./Ship');

// generates random numbers (from 0 to 'numbers')
function zeroTo(number) { return Math.floor(Math.random() * number) };

// map to keep track of positions
const map = new Map();
let tryPosition = [];
let surroundings = [];

// recursive function that assign x and y positions and handles duplication cases
function positionAssigner(array, posX, posY, orientation, shipLength, i = 0) {

  // ---------------------------------------- VERTICAL CONDITIONS ----------------------------------------

  if (i === shipLength) { //                       <-- BASE CONDITION
    
    // map the entire tryPosition array
    tryPosition.forEach(pos => {
      map.set(pos.toString());
    });
    // map the ships surroundings
    surroundings.forEach(pos => {
      if (pos[0] >= 0 && pos[1] >= 0) map.set(pos.toString());
    });
    // assign the filtered tryPosition to array
    array = tryPosition;
    // clear tryPositions and surroundigs for the next cycle
    tryPosition = [];
    surroundings = [];
    return array;
  }; // base condition
  
  // check if there is orientation and no duplicates
  if (!map.has([posX, posY + i].toString()) && orientation === 'vertical') {
    
    // inserting positions inside array
    tryPosition.push([posX, posY + i]);

    // surrounding of head and tail squares positions
    if (tryPosition.length === shipLength) {
      const last = tryPosition[tryPosition.length - 1];
      const first = tryPosition[0];
      surroundings.push([first[0], first[1] - 1]);
      surroundings.push([last[0], last[1] + 1]);
    };
  
    // also inserting the surroundings preventing ships touching themselves
    surroundings.push([posX + 1, posY + i]);
    surroundings.push([posX - 1, posY + i]);
    
    // recursively cycle to a new square position
    return positionAssigner(array, posX, posY, 'vertical', shipLength, i + 1);
  };

  // if there is a duplicate
  if (map.has([posX, posY + i].toString()) && orientation === 'vertical') {
    tryPosition = [];
    surroundings = [];

    // resets the data so the function can find a brand new coordinate
    return positionAssigner(array, zeroTo(9), zeroTo(10 - shipLength), 'vertical', shipLength, 0);
  };

  // ---------------------------------------- HORIZONTAL CONDITIONS ----------------------------------------

  // check if there is orientation and no duplicates
  if (!map.has([posX + i, posY].toString()) && orientation === 'horizontal') {

    // inserting positions inside array
    tryPosition.push([posX + i, posY]);

    // // surrounding of head and tail squares positions           dont need it since youre keeping track of the big ones
    // if (tryPosition.length === shipLength) {
    //   const last = tryPosition[tryPosition.length - 1];
    //   const first = tryPosition[0];
    //   surroundings.push([first[0] - 1, first[1]]);
    //   surroundings.push([last[0] + 1, last[1]]);
      
    // };

    // // also inserting the surroundings preventing ships touching themselves
    // surroundings.push([posX, (posY + i) + 1]);
    // surroundings.push([posX, (posY + i) - 1]);

    // recursively cycle to a new square position
    return positionAssigner(array, posX, posY, 'horizontal', shipLength, i + 1);
  };

  // if there is a duplicate
  if (map.has([posX + i, posY ].toString()) && orientation === 'horizontal') {
    tryPosition = [];
    surroundings = [];
    
    // resets the data so the function can find a brand new coordinate
    return positionAssigner(array, zeroTo(10 - shipLength), zeroTo(9), 'horizontal', shipLength, 0);
  };
};

// generate random positions for ships
function randomizePositions(array) {

  array.forEach(ship => { 
    // each ship is generated by its head and grows downwards if vertical
    // if it is horizontal it grows rightwards
    
    if (ship.length === 5) {
      // Carrier is vertical, therefore it can't be generated after the 5th row in the board
      const x = zeroTo(9);
      const y = zeroTo(5);
      
      return ship.position = positionAssigner(ship.position, x, y, 'vertical', 5);

    } else if (ship.length === 4) { 
      // same rule applies here, but Battleships can be generated up to the 6th row
      const x = zeroTo(9);
      const y = zeroTo(6);

      return ship.position = positionAssigner(ship.position, x, y, 'vertical', 4);

    } else if (ship.length === 3 && ship.name === "Cruiser") { 
      // same rule applies here, but Cruisers can be generated up to the 7th row
      const x = zeroTo(9);
      const y = zeroTo(7);
      
      return ship.position = positionAssigner(ship.position, x, y, 'vertical', 3);

    } else if (ship.length === 3 && ship.name === "Destroyer") { 
      // Destroyer is horizontal, therefore it can't be generated after the 7th column in the board
      const x = zeroTo(7);
      const y = zeroTo(9);
      
      return ship.position = positionAssigner(ship.position, x, y, 'horizontal', 3);

    } else { // Submarine.length === 2
      // same rule applies here, but Submarines can be generated up to the 8th column
      const x = zeroTo(8);
      const y = zeroTo(9);

      return ship.position = positionAssigner(ship.position, x, y, 'horizontal', 2);

    };
  });
  
  // clearing map for a second call, otherwise map from a previous call would overlap the next one
  map.clear();
  // returns the ship position
  return array;
};

module.exports = { randomizePositions };