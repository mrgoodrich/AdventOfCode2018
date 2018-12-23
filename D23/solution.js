// let data = require('./data').test;
let data = require('./data').real;

let strongestNdx = -1;
let strongestSignal = -1;
let strongestLocation;

// Get the nanobot with the largest radius.
for (let nanoNdx = 0; nanoNdx < data.length; nanoNdx++) {
   let nano = data[nanoNdx];
   if (nano.r > strongestSignal) {
      strongestSignal = nano.r;
      strongestNdx = nanoNdx;
      strongestLocation = nano.pos;
   }
}

console.log("Part one: " + getNumInRange(strongestLocation, strongestNdx));

// Locations with most nanobots found so far, with at least the one with the best Manhattan distance found so far of those.
let bestLocsSoFar = [[0,0,0]];
// Used to quickly prevent dupes in list of above.
let bestSoFarObj = {};
// The most nanobots found so far with a default to choose good starting location.
let bestNumFound = 50;
// Ended up not using this. I was going to repeat waves with shifts, but changed my mind.
let waveRepeats = 1;
// The disance between each scan, used for each dimension.
let scanDelta = 1000000;
// The number of outward scans from each best location so far.
let numScansPerWave = 6;

// Unused wave index. Mostly for debugging.
let waveNdx = 0;
let waveRepeatScans = 0;
// Scan until distance between each scan is 1. Didn't use repeats.
while (scanDelta > 1 || waveRepeatScans < waveRepeats) {
   console.log('Scanning with delta ' + scanDelta);
   waveNdx++;
   for (let scanNdx = 0; scanNdx < numScansPerWave; scanNdx++) {
      let xDiff = (scanNdx - numScansPerWave / 2) * scanDelta;
      for (let scanNdx = 0; scanNdx < numScansPerWave; scanNdx++) {
         let yDiff = (scanNdx - numScansPerWave / 2) * scanDelta;
         let foundBestInThisWave = false;
         for (let scanNdx = 0; scanNdx < numScansPerWave; scanNdx++) {
            // Only allow one new best location from each scan wave if distance between each scan is greater than 100.
            if (scanDelta < 100 || !foundBestInThisWave) {
               // Run a scan from each current best location.
               for (let bestLocNdx = 0; bestLocNdx < bestLocsSoFar.length; bestLocNdx++) {
                  let thisBestLoc = bestLocsSoFar[bestLocNdx];
                  let zDiff = (scanNdx - numScansPerWave / 2) * scanDelta;
                  let scanLoc =
                     [ thisBestLoc[0] + xDiff,
                        thisBestLoc[1] + yDiff,
                        thisBestLoc[2] + zDiff];
                  // Get the number of nanobots in range of this test location.
                  let scanRes = getNumInRange(scanLoc);
                  // If more nanobots found than before, clear list of those found and add this one.
                  if (scanRes > bestNumFound) {
                     bestNumFound = scanRes;
                     bestSoFarObj = {};
                     bestSoFarObj[scanLoc.join("|")] = true;
                     bestLocsSoFar = [ scanLoc ];
                     console.log(`New best of ${scanRes} at ${scanLoc}`);
                  }
                  // If the same number was found, only add if the Manhattan distance looks like a potential improvement.
                  else if (scanRes === bestNumFound
                     && getManhattanDistance(scanLoc, [0,0,0]) < getManhattanDistance(bestLocsSoFar[0],[0,0,0])
                     && getManhattanDistance(scanLoc, [0,0,0]) < getManhattanDistance(bestLocsSoFar[bestLocsSoFar.length - 1],[0,0,0])) {
                     foundBestInThisWave = true;
                     if (!bestSoFarObj[scanLoc.join("|")]) {
                        bestSoFarObj[scanLoc.join("|")] = true;
                        bestLocsSoFar.push(scanLoc);
                        console.log(`Matched best of ${scanRes} at ${scanLoc}`);
                     }
                  }
               }
            }
         }
      }
   }
   waveRepeatScans++;
   if (waveRepeatScans > waveRepeats && scanDelta > 1) {
      waveRepeatScans = 0;
      scanDelta = parseInt(scanDelta / 2);
   }
}

console.log(`Best: ${bestNumFound} at ${bestLocsSoFar}`);

// The shortest Manhattan distance of locations found with the most nanobots.
let shortestManhattan = getManhattanDistance(bestLocsSoFar[0], [0,0,0]);
// The location of the shortest above.
let closestBest = bestLocsSoFar[0];

// Find the location with the shortest Manhattan distance of those with the most nanobots.
for (let bestNdx = 0; bestNdx < bestLocsSoFar.length; bestNdx++) {
   let bestToCheck = bestLocsSoFar[bestNdx]; // value

   let thisDistance = getManhattanDistance(bestToCheck, [0,0,0]);
   if (thisDistance < shortestManhattan) {
      shortestManhattan = thisDistance;
      closestBest = bestToCheck;
   }
}

console.log(`Part two: ${shortestManhattan} at ${closestBest}`);

// Get the number of nanobots within range of a location. ignoreNdx maintains support for part one approach.
function getNumInRange(location, ignoreNdx) {
   let inRange = 0;

   for (let nanoNdx in data) {
      let nano = data[nanoNdx];

      if (nanoNdx === ignoreNdx) {
         continue;
      }

      if (getManhattanDistance(location, nano.pos) <= nano.r) {
         inRange++;
      }
   }

   return inRange;
}

// Get the Manhattan distance between two locations.
function getManhattanDistance(loc1, loc2) {
   let xDiff = Math.abs(loc1[0] - loc2[0]);
   let yDiff = Math.abs(loc1[1] - loc2[1]);
   let zDiff = Math.abs(loc1[2] - loc2[2]);
   return xDiff + yDiff + zDiff;
}
