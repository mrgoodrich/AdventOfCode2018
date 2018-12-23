// var data = require('./data').test;
var data = require('./data').real;
var potSum = 0;

var state = '##..##..#.##.###....###.###.#.#.######.#.#.#.#.##.###.####..#.###...#######.####.##...#######.##..#';
// var state = '...#..#.#..##......###...###...........';

var padding = 1000;

for (var i = 0; i < padding; i++) {
  state = '.' + state + '.';
}

for (var gen = 0; gen < 20; gen++) {
  applyMatching();
  // increaseSum();
}
increaseSum();

function applyMatching() {
  var nextState = state.replace(/#/g, ".");
  for (var charNdx = 2; charNdx < state.length - 2; charNdx++) {
    var p = state[charNdx];

    for (var ruleNdx in data) {
      var rule = data[ruleNdx];

      if (state.substring(charNdx - 2, charNdx + 3) === rule.match) {
        // console.log('match - ' + rule.match + ' to '+ rule.becomes);
        // console.log(nextState);
        nextState = nextState.substr(0, charNdx) + rule.becomes + nextState.substr(charNdx + 1);
        // console.log(nextState);
      }
    }
  }
  state = nextState;

  console.log(state);
}

function increaseSum() { // DONE DONT TOUCH
  for (var charNdx = 0; charNdx < state.length + padding * 2; charNdx++) {
    var p = state[charNdx];
    if (p === '#') {
      potSum += charNdx - padding
    }
  }
}

console.log(potSum);



/* GUESSES

You guessed 75412

2600

*/
