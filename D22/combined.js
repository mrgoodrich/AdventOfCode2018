var pq = require('priorityqueue');

// Test data.
let DEPTH = 510;
let TARGET = [10, 10]; // 10, 10
let MAX_WANDER = 10;

const IS_REAL = true;//true; //false;

// Real data.
if (IS_REAL) {
   DEPTH = 3198;
   TARGET = [12, 757];
   MAX_WANDER = 100;
}

const ROCKY = 0;//'.';
const WET = 1;//'=';
const NARROW = 2;//'|';
const MOUTH = 'M';
const TAR = 'T';

const TOP_LEFT = [0, 0];

const geoIndex = [];
const erosionLevel = {};
const regionType = [];


for (let y = 0; y <= TARGET[1] + MAX_WANDER; y++) {
   erosionLevel[y] = {};
}

function setErosionLevel(x, y, geoIndex) {
   erosionLevel[y][x] = (geoIndex + DEPTH) % 20183;
}

// Set static levels.
for (let y = 0; y <= TARGET[1] + MAX_WANDER; y++) {
   geoIndex[y] = [];
   for (let x = 0; x <= TARGET[0] + MAX_WANDER; x++) {
      if ((x === TARGET[0] && y === TARGET[1])
         || (x === 0 && y === 0)) {
         geoIndex[y][x] = 0;
         setErosionLevel(x, y, 0);
      } else if (!x) {
         geoIndex[y][x] = y * 48271;
         setErosionLevel(x, y, geoIndex[y][x]);
      } else if (!y) {
         geoIndex[y][x] = x * 16807;
         setErosionLevel(x, y, geoIndex[y][x]);
      }
   }
}

// Set geothermic index.
for (let diag = 0; diag <= TARGET[0] + TARGET[1] + 2 * MAX_WANDER; diag++) {
   for (let y = 0; y <= TARGET[1] + MAX_WANDER; y++) {
      const x = diag - y;
      // console.log('Setting at location: ' + diag + ', ' + (diag - y));
      if (x === 0 || y === 0 || (x === TARGET[0] && y === TARGET[1])) {
         continue;
      }
      if (diag >= y && diag <= y + TARGET[0] + MAX_WANDER) {
         const left = erosionLevel[y][x - 1];
         const up = erosionLevel[y - 1][x];
         geoIndex[y][x] = left * up;
         // console.log(left + ', ' + up + ', ' + geoIndex[y][x]);
         setErosionLevel(x, y, geoIndex[y][x]);
      }
   }
}

// Set region type.
for (let y = 0; y <= TARGET[1] + MAX_WANDER; y++) {
   regionType[y] = [];
   for (let x = 0; x <= TARGET[0] + MAX_WANDER; x++) {
      switch (erosionLevel[y][x] % 3) {
         case 0:
            regionType[y][x] = ROCKY;
            break;
         case 1:
            regionType[y][x] = WET;
            break;
         case 2:
            regionType[y][x] = NARROW;
            break;
      }
      // console.log(totalRisk);
   }
}

let totalRisk = 0;

for (let y = 0; y <= TARGET[1]; y++) {
   for (let x = 0; x <= TARGET[0]; x++) {
      totalRisk += regionType[y][x];
   }
}



// if (!IS_REAL) {
//    assertLocationData(0, 0, 0, 510, 0);
//    assertLocationData(1, 0, 16807, 17317, 1);
//    assertLocationData(0, 1, 48271, 8415, 0);
//    assertLocationData(1, 1, 145722555, 1805, 2);
//    assertLocationData(10, 10, 0, 510, 0);
// }

console.log('Part one: ' + totalRisk);

const CLIMBING_GEAR = 'CLIMBING_GEAR';
const TORCH = 'TORCH';
const NEITHER = 'NEITHER';

// regionType[TARGET[1]][TARGET[0]] = ROCKY;

let minTimeToTargetSoFar = 1000000000; // abandon if ever longer than this time

// start at 0 - move(0, 0, 1)

// import a priority queue from S/O


// Default comparison semantics
const toMove = new pq({
   comparator: (a,b) => b[2] - a[2]
});
toMove.push([0, 0, 0, TORCH]);

let posToBestTime = {};

while(toMove.size()) {
   let next = toMove.pop();
   // console.log(next);
   move(next[0], next[1], next[2], next[3], next[4]);
}

function move(x, y, totalTimeSoFar, previousTool) {
   // console.log(`Moved to ${x}, ${y} with time so far of ${totalTimeSoFar}`);

   if (posToBestTime[`${x}|${y}|${previousTool}`]
      && posToBestTime[`${x}|${y}|${previousTool}`] <= totalTimeSoFar) {
      return;
   }
   posToBestTime[`${x}|${y}|${previousTool}`] = totalTimeSoFar;

   if (x === TARGET[0] && y === TARGET[1]) {
      if (previousTool !== TORCH) {
         totalTimeSoFar += 7;
         previousTool = TORCH;
      }
      if (totalTimeSoFar < minTimeToTargetSoFar) {
         // console.log(`Found a path to the target that takes ${totalTimeSoFar} minutes`);
         minTimeToTargetSoFar = totalTimeSoFar;
      }
      return;
   }

   // Try to move to adjacent locations.
   attemptMoveNewRegion(x + 1, y);
   attemptMoveNewRegion(x, y + 1);
   attemptMoveNewRegion(x - 1, y);
   attemptMoveNewRegion(x, y - 1);

   function attemptMoveNewRegion(newX, newY) {
      // Prune based on best path so far.
      if (totalTimeSoFar > minTimeToTargetSoFar) {
         return;
      }

      if (newX < 0 || newY < 0) {
         return;
      }
      if (newX > TARGET[0] + MAX_WANDER || newY > TARGET[1] + MAX_WANDER) {
         return;
      }

      // console.log(`Attempting to move to ${newX}, ${newY}`);

      if (canUseTool(previousTool, newX, newY)) {
         toMove.push([newX, newY, totalTimeSoFar + 1, previousTool]);
      } else {
         const newTools = getToolsForLocation(newX, newY);
         if (canUseTool(newTools[0], x, y)) {
            toMove.push([newX, newY, totalTimeSoFar + 8, newTools[0]]);
         }
         if (canUseTool(newTools[1], x, y)) {
            toMove.push([newX, newY, totalTimeSoFar + 8, newTools[1]]);
         }
      }
   }
}

console.log("Part two: " + minTimeToTargetSoFar);


function canUseTool(tool, x, y) {
   let region = regionType[y][x];
   switch (tool) {
      case CLIMBING_GEAR:
         return region === ROCKY || region === WET;
      case TORCH:
         return region === ROCKY || region === NARROW;
      case NEITHER:
         return region === WET || region === NARROW;
   }
   console.log('Unknown tool type: ' + tool);
   exit();
}

function getToolsForLocation(x, y) {
   const type = regionType[y][x];
   switch (type) {
      case ROCKY:
         return [CLIMBING_GEAR, TORCH];
      case WET:
         return [CLIMBING_GEAR, NEITHER];
      case NARROW:
         return [TORCH, NEITHER];
   }
   console.log(`Unknown region type at ${x}, ${y}: ${type}`);
}







// 012345     0
// 123456    1
// 2345.7.    2


// function assertLocationData(x, y, expectedGeo, expectedErosion, expectedType) {
//    console.log('Checking location: ' + x + ', ' + y);
//    console.log('Geo index. Expected: ' + expectedGeo + ', Actual: ' + geoIndex[y][x]);
//    console.log('Erosion level. Expected: ' + expectedErosion + ', Actual: ' + erosionLevel[y][x]);
//    console.log('Region type. Expected: ' + expectedType + ', Actual: ' + regionType[y][x]);
//    console.log('\n');
// }

/*

Guesses


1041 too low
1042 too low


1043 right


1045 wrong
1048 too high

Had bug with index of x and y for target wrong in geo. 2 hours later found it :)


*/

