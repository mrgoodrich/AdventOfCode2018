var data = [
   // test data


   // real data
];

String.prototype.replaceAll = function (search, replacement) {
   var target = this;
   return target.replace(new RegExp(search, 'g'), replacement);
};

// console.log("tes".replaceAll('te', 'f'));

// for (var ndx in arr) {
//   var val = arr[ndx];
//
//   console.log(val);
// }

// var map = {};
// (!map.test) && (map.test = 'hi');

// objiter arriter

var numMarbles = 70825;
var numPlayers = 428;

var players = [];

var curMarble = {
   mNum: 0,
};
curMarble.next = curMarble;
curMarble.prev = curMarble;

for (var playerNum = 0; playerNum < numPlayers; playerNum++) {
   players.push(0);
}

function increaseLast(reg, turn) {
   // if (turn === numMarbles - 1) {
   //    return reg * 100;
   // }
   return reg;
}

for (var turnNdx = 1; turnNdx < numMarbles; turnNdx++) {
   if (turnNdx !== 0 && turnNdx % 23 === 0) {
      players[turnNdx % numPlayers] += increaseLast(turnNdx, turnNdx);
      // console.log('added ' + turnNdx);
      var sevenBack = curMarble.prev.prev.prev.prev.prev.prev.prev;
      var eightBack = sevenBack.prev;
      var sixBack = sevenBack.next;
      eightBack.next = sixBack;
      sixBack.prev = eightBack;
      players[turnNdx % numPlayers] += increaseLast(sevenBack.mNum, turnNdx);
      // console.log('added 7b ' + sevenBack.mNum);
      curMarble = sixBack;
   } else {
      var newMarble = {
         mNum: turnNdx,
      };
      var oneClockwise = curMarble.next;
      // console.log('1 -> ' + oneClockwise.mNum);
      var twoClockwise = curMarble.next.next;
      // console.log('2 -> ' + twoClockwise.mNum);
      oneClockwise.next = newMarble;
      newMarble.prev = oneClockwise;
      newMarble.next = twoClockwise;
      twoClockwise.prev = newMarble;
      curMarble = newMarble;
   }
   // console.log('after t' + turnNdx + ', ' + curMarble.prev.mNum + ' cur ' + curMarble.mNum + ' ' + curMarble.next.mNum)
}
var maxVal = 0;
players.forEach((val,ndx) => { // array. value, index
	// console.log('players-val: ' + val + ', ndx: ' + ndx);
	if (val > maxVal) {
	   maxVal = val;
   }

});

console.log(maxVal);

/* GUESSES



*/


