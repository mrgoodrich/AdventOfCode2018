// var data = require('./data').test;
var data = require('./data').real;

String.prototype.replaceAt=function(index, replacement) {
   return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};

const elves = [];
const goblins = [];

//map is data

var pNum = 0;

const ATTACK_POWER = 3;

//scan and insert elves and goblins, set empty where removed
for (var rowNdx = 0; rowNdx < data.length; rowNdx++) {
   const row = data[rowNdx];
   for (var x = 0; x < row.length; x++) {
      if (row[x] === 'G') {
         goblins.push({
            x: x,
            y: rowNdx,
            id: ++pNum,
            type: 'goblin',
            hp: 200,
         });
         data[rowNdx] = data[rowNdx].replaceAt(x, '.');
      } else if (row[x] === 'E') {
         elves.push({
            x: x,
            y: rowNdx,
            id: ++pNum,
            type: 'elf',
            hp: 200,
         });
         data[rowNdx] = data[rowNdx].replaceAt(x, '.');
      }
   }
}


printGrid();

// while elves exist and goblins exist
var round = 0;
while (true) {
   round++;
   // get order in array by id
   var pThisTurn = getCombined().sort(sortPInOrder);
   var turnOrder = pThisTurn.map(p => p.id); // remove as played, so we dont have to update ndx

   // console.log('turn order: ' + turnOrder);

   // console.log(turnOrder);

   // for each player in the array to move
   while (turnOrder.length) {

      var pThisTurn = turnOrder.splice(0, 1)[0];

      if (round === 36) {
         console.log('turn: ' + pThisTurn);
      }


      // find in either array
      var player;
      var isElf;

      var didFind = false;

      for (var elfNdx = 0; elfNdx < elves.length; elfNdx++) {
         var curElf = elves[elfNdx];
         if (curElf.id === pThisTurn) {
            if (round === 36) {
               console.log("FOUND!!" + JSON.stringify(curElf));
            }
            player = curElf;
            isElf = true;
            didFind = true;
         }
      }
      for (var goblinNdx = 0; goblinNdx < goblins.length; goblinNdx++) {
         var curGoblin = goblins[goblinNdx];
         if (curGoblin.id === pThisTurn) {
            if (round === 36) {
               console.log("FOUND! - " + JSON.stringify(curGoblin));
            }
            player = curGoblin;
            isElf = false;
            didFind = true;
         }
      }

      if (player != null && didFind) {


         if (!elves.length || !goblins.length) {

            // console.log(getCombined().map(p => p.hp));
            console.log('Last round: ' + round);

            console.log('elf health: ' + (elves.length ? (elves.map(p => p.hp).reduce((total, num) => total + num)) : 'none left'));
            console.log('gob health: ' + (goblins.length ? (goblins.map(p => p.hp).reduce((total, num) => total + num)) : 'none left'));

            var endingHealth = getCombined().map(p => p.hp).reduce((total, num) => total + num);

            console.log("FIRST ANSWER: " + endingHealth * (round - 1));

            // printGrid();
            exit();
         }

         var adj = getAdjacent(player);

         function attack() {
            if (round === 36) {
               printGrid()
               console.log(pThisTurn + " attackable adj: " + JSON.stringify(adj));
            }

            // console.log('attacking!');
            var toAttack = adj.sort(sortAttackable)[0];
            // console.log(toAttack);
            var orig = getPlayer(toAttack.id);
            // console.log('found orig - ' + orig);
            orig.hp -= ATTACK_POWER;
            if (orig.hp <= 0) {
               removeById(toAttack.id);
            }
         }

         // console.log('adj: ' + JSON.stringify(adj.map(p => p.id)));

         // if can attack
         if (adj.length) {
            // console.log('immediate attack');
            attack();
         } else {
            // console.log('going to move');
            move(player);
            // try attack
            adj = getAdjacent(player);
            if (adj.length) {
               attack();
            }
         }
      } else {
         // must have been killed this turn
         // console.log('not found');
      }
   }

   console.log('after ' + round + ' rounds:');

   printGrid();
}

function printGrid() {
   console.log();
   // console.log('num elves: ' + elves.length);
   // console.log('num goblins: ' + goblins.length);
   for (var rowNdx = 0; rowNdx < data.length; rowNdx++) {
      var rowStr = '';
      var rowHealths = '';
      const row = data[rowNdx];
      for (var x = 0; x < row.length; x++) {
         var potentialPlayer = getPlayerByLocation(x, rowNdx);
         if (potentialPlayer) {
            if (potentialPlayer.type === 'elf') {
               rowStr += 'E';
            } else {
               rowStr += 'G';
            }
            rowHealths += potentialPlayer.hp + ' ';
         } else {
            rowStr += data[rowNdx][x];
         }
      }
      console.log(rowStr + ' ' + rowHealths);
   }
}


function getPlayerByLocation(x, y) {
   var combined = getCombined();
   for (var ndx = 0; ndx < combined.length; ndx++) {
      var player = combined[ndx];
      if (player.x === x && player.y === y) {
         return player;
      }
   }
   return null;
}

function sortPInOrder(a, b) {
   if (a.y < b.y) {
      return -1;
   } else if (b.y < a.y) {
      return 1;
   } else {
      if (a.x < b.x) {
         return -1;
      } else if (a.x > b.x) {
         return 1;
      } else {
         return 0;
      }
   }
}

function getCombined() {
   var combined = [];
   combined = combined.concat(elves).concat(goblins);
   return combined;
}

function isValid(y, x) {
   return x >= 0 && x < data[0].length && y >= 0 && y < data.length;
}

function move(thisPlayer) {

   var pathToClosest = getPathToClosest(thisPlayer);
   if (round === 36) {
      console.log('this player id ' + thisPlayer.id);
      console.log(pathToClosest);

      console.log('p - ' + JSON.stringify(thisPlayer));
      console.log(pathToClosest);
   }

   if (pathToClosest.length) {
      var nextPoint = pathToClosest[0];

      thisPlayer.x = nextPoint.x;
      thisPlayer.y = nextPoint.y;
   }
}

function getPathToClosest(thisPlayer) {
   var thisX = thisPlayer.x;
   var thisY = thisPlayer.y;

   // console.log('getting in range');
   var potentialTargets;
   if (thisPlayer.type === 'elf') {
      potentialTargets = goblins;
   } else {
      potentialTargets = elves;
   }

   if (round === 36) {
      console.log('potential targets: ' + JSON.stringify(potentialTargets));
   }

   var potentialAdjs = [];

   for (var ndx = 0; ndx < potentialTargets.length; ndx++) {
      var potentialTarget = potentialTargets[ndx];

      for (var i = 0; i < 4; i++) {
         var x = potentialTarget.x + [0, -1, 1, 0][i];
         var y = potentialTarget.y + [-1, 0, 0, 1][i];

         if (isValid(y, x) && isEmptySpot(y, x)) {
            potentialAdjs.push([x, y]);
         }
      }
   }

   if (round === 36) {
      console.log('potential adj: ' + potentialAdjs);
   }

// if (thisPlayer.id === 5) {
//       printGrid();
// }
   // console.log("potential adj: " + potentialAdjs.join(' | '));

   // have literal ?'s in example at this point

   // BFS each, collect reachable, but only keep nearest reachable
   var closestAdjX, closestAdjY;
   var closestPath = [];
   var closestDist = -1;

   for (var potentialAdjNdx in potentialAdjs) { // index, array
      var potentialAdj = potentialAdjs[potentialAdjNdx]; // value

      var path = BFS(thisPlayer, potentialAdj[0], potentialAdj[1]);
      // console.log('    ' + path);
      if (path !== -1) {
         var shouldRepl = false;
         if (closestDist === -1 || closestAdjX === undefined || closestAdjY === undefined) {
            shouldRepl = true;
         }
         if (path.length < closestDist) {
            shouldRepl = true;
         }
         if (path.length === closestDist) {
            if (potentialAdj[1] < closestAdjY) {
               shouldRepl = true;
            } else if (potentialAdj[1] === closestAdjY && potentialAdj[0] < closestAdjX) {
               shouldRepl = true;
            }
         }
         if (shouldRepl) {
            closestPath = path;
            closestDist = path.length;
            closestAdjX = potentialAdj[0];
            closestAdjY = potentialAdj[1];
         }
      }
   }
   // console.log(closestDist);
   // console.log(closestPath);

   return closestPath;
}

function isEmptySpot(y, x) {
   // console.log('checking space at ' + x + ', ' + y + ' for type ' + srcType);
   if (data[y][x] === '#') {
      // console.log('taken by wall');
      return false;
   }

   var combined = getCombined();
   for (var ndx in combined) { // index, array
      var player = combined[ndx]; // value

      if (player.x === x && player.y === y) {
         // console.log('taken by teammate');
         return false;
      }
   }
   // console.log('true');
   return true;
}

function isOpenSpace(y, x, srcType) {
   // console.log('checking space at ' + x + ', ' + y + ' for type ' + srcType);
   if (data[y][x] === '#') {
      // console.log('taken by wall');
      return false;
   }

   var teammates;
   if (srcType === 'elf') {
      teammates = elves;
   } else {
      teammates = goblins;
   }

   for (var tNdx in teammates) { // index, array
      var teammate = teammates[tNdx]; // value

      if (teammate.x === x && teammate.y === y) {
         // console.log('taken by teammate');
         return false;
      }
   }
   // console.log('true');
   return true;
}

/**
 * expl ret type
 * @return {number}
 */
function BFS(src, dstX, dstY) {
   // console.log('src is ' + JSON.stringify(src));
   // console.log('dst is ' + JSON.stringify(dst));

   var validPaths = [];
   var bestLength = -1;

   if (data[src.y][src.x] === '#' || data[dstY][dstX] === '#') {
      return -1;
   }

   var visited = {};

   visited[src.x + '|' + src.y] = true;

   var q = [];

   var qNodeS = {pt: src, dist: []};
   q.push(qNodeS);

   while (q.length) {
      var curQ = q[0];
      var pt = curQ.pt;

      if (pt.x === dstX && pt.y === dstY) {
         // console.log('found, returning ' + curQ.dist);
         // return curQ.dist;
         validPaths.push(curQ);
      }

      var dequeue = q.splice(0, 1)[0];
      // console.log('dequeued ' + JSON.stringify(dequeue));

      for (var i = 0; i < 4; i++) {
         var row = pt.y + [-1, 0, 0, 1][i]; // row is y
         var col = pt.x + [0, -1, 1, 0][i];

         // console.log(dequeue);
         // if (dequeue.pt.id === 5) {
         //    console.log('5 checking row ' + row + ' and col ' + col);
         // }

         if (isValid(row, col) && isOpenSpace(row, col, src.type) && !visited[col + '|' + row]) {
            // console.log('visiting ' + col + ', ' + row);
            visited[col + '|' + row] = true;
            var loc = {'x': col, 'y': row};
            var newPath = [];
            newPath = newPath.concat(curQ.dist);
            newPath.push(loc);
            var qNodeAdj = {pt: loc, dist: newPath};
            q.push(qNodeAdj);
            // console.log('adding to queue ' + JSON.stringify(qNodeAdj));
         }
         // else {
         //    console.log('first: ' + isValid(row, col));
         //    console.log('second: ' + isOpenSpace(row, col, src.type));
         //    console.log('third: ' + !visited[col + '|' + row]);
         //    console.log('cant go to ' + col + ', ' + row);
         // }
      }
   }
   // console.log('cant reach, so -1');

   if (!validPaths.length) {
      return -1;
   }

   if (validPaths.length > 1) {
      console.log("FOUND MULTIPLE VALID PATHS!! " + validPaths.length);
   }

   return validPaths[0].dist;
}

function getAdjacent(thisPlayer) {
   var adj = [];

   function getAdjCol(coll) {
      for (var eNdx = 0; eNdx < coll.length; eNdx++) {
         var player = coll[eNdx];
         if (thisPlayer.id !== player.id) {
            var xDistThere = Math.abs(player.x - thisPlayer.x);
            var yDistThere = Math.abs(player.y - thisPlayer.y);
            // console.log('distance between ' + thisPlayer.id + ' and ' + player.id + ' : ' + xDistThere + ' & ' + yDistThere);
            if ((xDistThere === 1 && yDistThere === 0) || (yDistThere === 1 && xDistThere === 0)) {
               // console.log(thisPlayer.id + ' is adj to ' + player.id);
               adj.push(player);
            }
         }
      }
   }
   if (thisPlayer.type === 'elf') {
      getAdjCol(goblins);
   } else {
      getAdjCol(elves);
   }

   return adj;
}

function sortAttackable(a, b) {
   if (a.hp < b.hp) {
      return -1;
   } else if (b.hp < a.hp) {
      return 1;
   } else {
      if (a.y < b.y) {
         return -1;
      } else if (b.y < a.y) {
         return 1;
      } else {
         if (a.x < b.x) {
            return -1;
         } else if (b.x < a.x) {
            return 1;
         } else {
            return 0;
         }
      }
   }
}

function getPlayer(id) {
   for (var ndx = 0; ndx < elves.length; ndx++) {
      var cur = elves[ndx];
      if (cur.id === id) {
         return cur;
      }
   }
   for (var ndx = 0; ndx < goblins.length; ndx++) {
      var cur = goblins[ndx];
      if (cur.id === id) {
         return cur;
      }
   }
   console.log("EXPECTED!!");
   exit();
}

function removeById(id) {
   if (round === 36) {
      console.log("REMOVING " + id);
   }
   for (var ndx = 0; ndx < elves.length; ndx++) {
      var cur = elves[ndx];
      if (cur.id === id) {
         // console.log('finds to remove');
         elves.splice(ndx, 1);
         return;
      }
   }
   for (var ndx = 0; ndx < goblins.length; ndx++) {
      var cur = goblins[ndx];
      if (cur.id === id) {
         // console.log('finds to remove')
         goblins.splice(ndx, 1);
         return;
      }
   }
   console.log("EXPECTED FOR REMOVAl!!");
   exit();
}


function getXYStr(something) {
   return '<' + something.x + ', ' + something.y + '>';
}


/* GUESSES

268800 TOO HIGH
266240 TOO HIGH
270618 TOO HIGH

268065 Not the right answer
250745 Not right answer

264384

*/
