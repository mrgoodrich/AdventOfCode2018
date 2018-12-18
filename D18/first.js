// var data = require('./data').test;
var data = require('./data').real;

String.prototype.replaceAt=function(index, replacement) {
   return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};

// console.log(data);

const OPEN = '.';
const TREE = '|';
const LUMBER = '#';

for (var minute = 0; minute < 10; minute++) {
   var next = [];
   for (var y = 0; y < data.length; y++) {
      next.push(data[y].slice(0));
   }

   for (var y = 0; y < data.length; y++) {
      for (var x = 0; x < data[0].length; x++) {
         var acreBefore = data[y][x];

         switch (acreBefore) {
            case OPEN:
               // console.log(countType(x, y, TREE));
               if (countType(x, y, TREE) >= 3) {
                  next[y] = next[y].replaceAt(x, TREE);
               }
               break;
            case TREE:
               if (countType(x, y, LUMBER) >= 3) {
                  next[y] = next[y].replaceAt(x, LUMBER);
               }
               break;
            case LUMBER:
               if (countType(x, y, LUMBER) < 1 || countType(x, y, TREE) < 1) {
                  next[y] = next[y].replaceAt(x, OPEN);
               }
               break;
         }
      }
   }
   // console.log(next);
   data = next;
}

function countType(x, y, type) {
   count = 0;
   for (var xAdj = -1; xAdj <= 1; xAdj++) {
      for (var yAdj = -1; yAdj <= 1; yAdj++) {
         var xCheck = x + xAdj;
         var yCheck = y + yAdj;
         if (xCheck >= 0 
            && xCheck < data[0].length
            && yCheck >= 0 
            && yCheck < data.length
            && !(xAdj === 0 && yAdj === 0) && data[yCheck][xCheck] === type) {
            count++;
         }
      }
   }
   return count;
}

var treeCount = 0;
var lumberCount = 0;
for (var y = 0; y < data.length; y++) {
   for (var x = 0; x < data[0].length; x++) {
      if (data[y][x] === TREE) {
         treeCount++;
      } else if (data[y][x] === LUMBER) {
         lumberCount++;
      }
   }
}

console.log(treeCount * lumberCount);


/* GUESSES

*/
