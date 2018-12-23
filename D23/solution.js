// let data = require('./data').test;
let data = require('./data').real;

let strongestNdx = -1;
let strongestSignal = -1;
let strongestLocation;

for (let nanoNdx = 0; nanoNdx < data.length; nanoNdx++) {
   let nano = data[nanoNdx]; // value
   //console.log('data - index: ' + nanoNdx + ', value: ' + nano);
   if (nano.r > strongestSignal) {
      strongestSignal = nano.r;
      strongestNdx = nanoNdx;
      strongestLocation = nano.pos;
   }
}

console.log("Part one: " + getNumInRange(strongestLocation, strongestNdx));

let bestLocsSoFar = [[0,0,0]];
let bestSoFarObj = {};
let bestNumFound = 50;
let waveRepeats = 1;
let scanDelta = 1000000;
let numScansPerWave = 6;

let waveNdx = 0;
let waveRepeatScans = 0;
while (scanDelta > 1 || waveRepeatScans < waveRepeats) {
   console.log('Scanning with delta ' + scanDelta);
   waveNdx++;
   for (let scanNdx = 0; scanNdx < numScansPerWave; scanNdx++) {
      let xDiff = (scanNdx - numScansPerWave / 2) * scanDelta;
      for (let scanNdx = 0; scanNdx < numScansPerWave; scanNdx++) {
         let yDiff = (scanNdx - numScansPerWave / 2) * scanDelta;
         let foundBestInThisWave = false;
         for (let scanNdx = 0; scanNdx < numScansPerWave; scanNdx++) {
            if (scanDelta < 100 || !foundBestInThisWave) {
               for (let bestLocNdx = 0; bestLocNdx < bestLocsSoFar.length; bestLocNdx++) {
                  let thisBestLoc = bestLocsSoFar[bestLocNdx];
                  let zDiff = (scanNdx - numScansPerWave / 2) * scanDelta;
                  let scanLoc =
                     [ thisBestLoc[0] + xDiff,
                        thisBestLoc[1] + yDiff,
                        thisBestLoc[2] + zDiff];
                  let scanRes = getNumInRange(scanLoc);
                  if (scanRes > bestNumFound) {
                     bestNumFound = scanRes;
                     bestSoFarObj = {};
                     bestSoFarObj[scanLoc.join("|")] = true;
                     bestLocsSoFar = [ scanLoc ];
                     console.log(`New best of ${scanRes} at ${scanLoc}`);
                  } else if (scanRes === bestNumFound
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

let shortestManhattan = getManhattanDistance(bestLocsSoFar[0], [0,0,0]);
let closestBest = bestLocsSoFar[0];

for (let bestNdx = 0; bestNdx < bestLocsSoFar.length; bestNdx++) {
   let bestToCheck = bestLocsSoFar[bestNdx]; // value

   let thisDistance = getManhattanDistance(bestToCheck, [0,0,0]);
   if (thisDistance < shortestManhattan) {
      shortestManhattan = thisDistance;
      closestBest = bestToCheck;
   }
}

console.log(`Part two: ${shortestManhattan} at ${closestBest}`);


function getNumInRange(location, ignoreNdx) {
   let inRange = 0;

   for (let nanoNdx in data) { // index, array
      let nano = data[nanoNdx]; // value

      if (nanoNdx === ignoreNdx) {
         continue;
      }

      if (getManhattanDistance(location, nano.pos) <= nano.r) {
         inRange++;
      }
   }

   return inRange;
}

function getManhattanDistance(loc1, loc2) {
   let xDiff = Math.abs(loc1[0] - loc2[0]);
   let yDiff = Math.abs(loc1[1] - loc2[1]);
   let zDiff = Math.abs(loc1[2] - loc2[2]);
   return xDiff + yDiff + zDiff;
}


/*
Part two results


886 @ 46250005,31250000,36250000 113750005 GUESSED
114062505

*/

