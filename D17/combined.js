// var data = require('./data').test;
var data = require('./data').real;

const CLAY = '#';
const FLOW = '|';
const SAND = '.';
const SOURCE = '+';
const STAGNANT = '~';

const clayTiles = [];

// Convert scans to array of clay points.
for (let ndx = 0; ndx < data.length; ndx++) {
   let scan = data[ndx];
   if (scan.xend) {
      const y = scan.y;
      const xmin = scan.x;
      const xmax = scan.xend;

      for (let x = xmin; x <= xmax; x++) {
         clayTiles.push([x,y]);
      }
   } else {
      const x = scan.x;
      const ymin = scan.y;
      const ymax = scan.yend;

      for (let y = ymin; y <= ymax; y++) {
         clayTiles.push([x,y]);
      }
   }
}

// Get max min clay y.
var minY = 100000, maxY = -1;
const arbMaxX = 1000;
for (var clayNdx = 0; clayNdx < clayTiles.length; clayNdx++) {
   let clay = clayTiles[clayNdx];
   if (clay[1] < minY) {
      minY = clay[1];
   }
   if (clay[1] > maxY) {
      maxY = clay[1];
   }
}

console.log('min y: ' + minY + ', max y: ' + maxY);

var tiles = [];

// Init with sand.
for (let y = 0; y < maxY + 2; y++) {
   tiles[y] = [];
   for (let x = 0; x < 3000; x++) {
      setAt(x, y, SAND);
   }
}

// Add clay.
for (let clayNdx = 0; clayNdx < clayTiles.length; clayNdx++) {
   let clay = clayTiles[clayNdx]; // value
   setAt(clay[0], clay[1], CLAY);
}

function createSource(x, y) {
   if (!canFlow(at(x, y)) || x < 0 || x > arbMaxX || y > maxY) {
      return;
   }

   setAt(x, y, SOURCE);

   // Chain downward sources.
   if (canFlow(down(x, y))) {
      createSource(x, y + 1);
      // The stagnant water now supports a new source.
      if (isStagnant(down(x, y))) {
         createSource(x, y);
      }
   } else {
      // Chain horizontal flow along clay.
      for (var toRight = x + 1; isAboveClay(toRight, y); toRight++) {
         setAt(toRight, y, FLOW);
      }
      for (var toLeft = x - 1; isAboveClay(toLeft, y); toLeft--) {
         setAt(toLeft, y, FLOW);
      }

      // Create source when water moves off of clay.
      if (canFlow(down(toLeft, y)) || canFlow(down(toRight, y))) {
         // Two sources above clay improves readability and doesn't change behavior.
         createSource(toRight, y);
         createSource(toLeft, y);
      }
      // If the horizontal flow was between walls, it's stagnant.
      else if (isClay(at(toRight, y)) && isClay(at(toLeft, y))) {
         for (let stagnantX = toRight - 1; stagnantX > toLeft; stagnantX--) {
            setAt(stagnantX, y, STAGNANT);
         }
      }
   }
}

// Add spring source.
createSource(500, 0);

console.log('FINAL: ');
printTiles();

// Count water tiles in range.
console.log();
let waterCount = 0, stagnantCount = 0;
for (var y = minY; y < maxY + 1; y++) {
   for (var x = 400; x < arbMaxX; x++) {
      if (isWater(at(x, y))) {
         waterCount++;
      }
      if (isStagnant(at(x, y))) {
         stagnantCount++;
      }
   }
}
console.log('Water tiles (part 1): ' + waterCount);
console.log('Stagnant water (part 2): ' + stagnantCount);

function canFlow(tile) {
   return isSand(tile) || isFlow(tile) || isSource(tile);
}

function isAboveClay(x, y) {
   return !canFlow(down(x, y)) && canFlow(at(x, y));
}

function isWater(tile) {
   return isFlow(tile) || isStagnant(tile) || isSource(tile);
}


function isFlow(tile) {
   return tile === FLOW;
}
function isStagnant(tile) {
   return tile === STAGNANT;
}
function isSand(tile) {
   return tile === SAND;
}
function isClay(tile) {
   return tile === CLAY;
}
function isSource(tile) {
   return tile === SOURCE;
}


function at(x, y) {
   return tiles[y][x];
}
function setAt(x, y, val) {
   tiles[y][x] = val;
}
// function getLeft(x, y) {
//    return tiles[y][x - 1];
// }
// function setLeft(x, y, val) {
//    tiles[y][x - 1] = val;
// }
// function getRight(x, y) {
//    return tiles[y][x + 1];
// }
// function setRight(x, y, val) {
//    tiles[y][x + 1] = val;
// }
function down(x, y) {
   return tiles[y + 1][x];
}
// function setDown(x, y, val) {
//    tiles[y + 1][x] = val;
// }

function printTiles() {
   console.log();
   for (let y = 0; y < maxY + 1; y++) {
      let row = '';
      for (let x = 400; x < arbMaxX; x++) {
         row += tiles[y][x];
      }
      console.log(row);
   }
}


/* GUESSES



*/
