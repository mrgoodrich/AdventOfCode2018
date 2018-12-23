// var data = require('./data').test;
// var data = require('./data').real;

var serialNum = 1788;

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

var highest = 0;
var highestX = -1;
var highestY = -1;
for (var x = 1; x < 299; x++) {
   for (var y = 1; y < 299; y++) {
      var level = grid[x][y] + grid[x][y+1] + grid[x][y+2]
         + grid[x+1][y] + grid[x+1][y+1] + grid[x+1][y+2]
         + grid[x+2][y] + grid[x+2][y+1] + grid[x+2][y+2];
      if (level > highest) {
         highest = level;
         highestX = x;
         highestY = y;
      }
   }
}

console.log(highestX + ', ' + highestY + ' and power ' + grid[highestX][highestY] + ' top ' + highest);


/* GUESSES


*/
