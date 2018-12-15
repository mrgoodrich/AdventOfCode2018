var data = require('./data').test;
// var data = require('./data').real;

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
         data[rowNdx][x] = '.';
      } else if (row[x] === 'E') {
         elves.push({
            x: x,
            y: rowNdx,
            id: ++pNum,
            type: 'elf',
            hp: 200,
         });
         data[rowNdx][x] = '.';
      }
   }
}

printGrid();

// while elves exist and goblins exist
// while (elves.length && goblins.length) {
// get order in array by id
var pThisTurn = getCombined().sort(sortPInOrder);
var turnOrder = pThisTurn.map(p => p.id); // remove as played, so we dont have to update ndx

// console.log(turnOrder);

// for each player in the array to move
while (turnOrder.length) {
   var pThisTurn = turnOrder.splice(0, 1)[0];

   // find in either array
   var player;
   var isElf;

   for (var elfNdx = 0; elfNdx < elves.length; elfNdx++) {
      var curElf = elves[elfNdx];
      if (curElf.id === pThisTurn) {
         player = curElf;
         isElf = true;
      }
   }
   for (var goblinNdx = 0; goblinNdx < goblins.length; goblinNdx++) {
      var curGoblin = goblins[goblinNdx];
      if (curGoblin.id === pThisTurn) {
         player = curGoblin;
         isElf = false;
      }
   }

   if (player) {
      // console.log('found at ' + player.x + ', ' + player.y);

      var adj = getAdjacent(player);

      function attack() {
         var toAttack = adj.sort(sortAttackable)[0];
         // console.log(toAttack);
         var orig = getPlayer(toAttack.id);
         // console.log('found orig - ' + orig);
         orig.hp -= 3;
         if (orig.hp <= 0) {
            removeById(toAttack.id);
         }
      }

      console.log('adj: ' + JSON.stringify(adj.map(p => p.id)));

      // if can attack
      if (adj.length) {
         attack();
      } else {
         move(player);
         // try attack
         adj = getAdjacent(player);
         if (adj.length) {
            attack();
         }
      }
   } else {
      // must have been killed this turn
      console.log('not found');
   }
}
printGrid();

// }

function printGrid() {
   console.log();
   for (var rowNdx = 0; rowNdx < data.length; rowNdx++) {
      var rowStr = '';
      const row = data[rowNdx];
      for (var x = 0; x < row.length; x++) {
         var potentialPlayer = getPlayerByLocation(x, rowNdx);
         if (potentialPlayer) {
            if (potentialPlayer.type === 'elf') {
               rowStr += 'E';
            } else {
               rowStr += 'G';
            }
         } else {
            rowStr += data[rowNdx][x];
         }
      }
      console.log(rowStr);
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

function isValid(x, y) {
   return x >= 0 && y < data[0].length && y >= 0 && y < data.length;
}

function move(thisPlayer) {
   var reachable = getInRange(thisPlayer);

   console.log(reachable);
}

function getInRange(thisPlayer) {
   var combined = getCombined();

   var closest;
   var closestDist = -1;

   for (var ndx = 0; ndx < combined.length; ndx++) {
      var cur = combined[ndx];
      var distance = BFS(thisPlayer, cur);

      if (distance !== -1) {
         console.log(distance)
         exit();
      }

      if (closestDist === -1 || distance < closestDist) {
         closest = cur;
         closestDist = distance;
      }
   }
}

/**
 * @return {number}
 */
function BFS(src, dst) {
   if (data[src.y][src.x] === '#' || data[dst.y][dst.x] === '#') {
      return -1;
   }

   var visited = {};

   visited[src.y + '|' + src.x] = true;

   var q = [];

   var qNodeS = {pt: src, dist: 0};
   q.push(qNodeS);

   while (q.length) {
      var curQ = q[0];
      console.log(curQ);
      var pt = curQ.pt;

      if (pt.x === dst.x && pt.y === dst.y) {
         return curQ.dist;
      }

      var temp = q.splice(0, 1)[0];

      for (var i = 0; i < 4; i++) {
         var row = pt.y + [-1, 0, 0, 1][i];
         var col = pt.x + [0, -1, 1, 0][i];

         if (isValid(row, col) && data[col][row] && !visited[col + '|' + row]) {
            visited[col + '|' + row] = true;
            var loc = {'x': row, 'y': col};
            var qNodeAdj = {pt: loc, dist: curQ.dist + 1};
            q.push(qNodeAdj);
         }
      }
   }
   return -1;
}

function getAdjacent(thisPlayer) {
   var adj = [];

   for (var eNdx = 0; eNdx < elves.length; eNdx++) {
      var elf = elves[eNdx];
      console.log('distance between ' + thisPlayer.id + ' and ' + elf.id + xDistThere + ' & ' + yDistThere);
      var xDistThere = Math.abs(elf.x - thisPlayer.x) === 1;
      var yDistThere = Math.abs(elf.y - thisPlayer.y) === 1;
      if ((xDistThere && !yDistThere) || (yDistThere && !xDistThere)) {
         adj.push(elf);
      }

   }
   for (var gNdx = 0; gNdx < goblins.length; gNdx++) {
      var goblin = goblins[gNdx];
      var xDistThere = Math.abs(goblin.x - thisPlayer.x) === 1;
      var yDistThere = Math.abs(goblin.y - thisPlayer.y) === 1;
      if ((xDistThere && !yDistThere) || (yDistThere && !xDistThere)) {
         adj.push(goblin);
      }
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
      } else if (a.y < b.y) {
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
   for (var ndx = 0; ndx < elves.length; ndx++) {
      var cur = elves[ndx];
      if (cur.id === id) {
         console.log('finds to remove');
         elves.splice(ndx, 1);
         return;
      }
   }
   for (var ndx = 0; ndx < goblins.length; ndx++) {
      var cur = goblins[ndx];
      if (cur.id === id) {
         console.log('finds to remove')
         goblins.splice(ndx, 1);
         return;
      }
   }
   console.log("EXPECTED FOR REMOVAl!!");
   exit();
}


console.log('done, yo');

/* GUESSES


*/
