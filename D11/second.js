// var data = require('./data').test;
// var data = require('./data').real;

var serialNum = 1788;


var highest = 0;
var highestX = -1;
var highestY = -1;


function runPower(len) {
   var grid = [];

   for (var x = 1; x < 301; x++) {
      grid[x] = [];
   }



   for (var x = 1; x < 301; x++) {
      for (var y = 1; y < 301; y++) {
         // console.log('x,y ' + x + ', ' + y)
         var rackId = x + 10;
         // console.log('rack id ' + rackId);
         var powerLevel = rackId * y;
         // console.log('powerlev ' + powerLevel);
         powerLevel += serialNum;
         // console.log('powerlev ' + powerLevel);
         powerLevel = powerLevel * rackId;
         // console.log('powerlev ' + powerLevel);
         powerLevel = (''+powerLevel)[(''+powerLevel).length - 3];
         // console.log('powerlev ' + powerLevel);
         powerLevel -= 5;
         // console.log('powerlev ' + powerLevel);

         // console.log(x + ', ' + y + ': ' + powerLevel);
         grid[x][y] = powerLevel;
      }
   }
//[[   ],
// []]

   for (var x = 1; x < 305; x++) {
      for (var y = 1; y < 305; y++) {
         if (x > 300 || y > 300) {
            continue;
         }
         var level = 0;
         // console.log("X: " + x + ", Y: " + y);
         for (var sqrLX = 0; sqrLX < len; sqrLX++) {
            for (var sqrLY = 0; sqrLY < len; sqrLY++) {
               if ((x + sqrLX) > 300 || (y + sqrLY) > 300) {
                  continue;
               }
               // console.log("    " + (x + sqrLX));
               level += grid[x + sqrLX][y + sqrLY];
            }
         }

         if (level > highest) {
            // console.log(level);
            highest = level;
            highestX = x;
            highestY = y;
            console.log(x + ', ' + y + ', ' + (len));
         }
      }
   }
}
for (var i = 1; i <=100; i++) {
   runPower(i);
}



/* GUESSES


*/
