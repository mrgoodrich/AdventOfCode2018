// var data = require('./data').test;
var data = require('./data').real;
var potSum = 0;

var state = '##..##..#.##.###....###.###.#.#.######.#.#.#.#.##.###.####..#.###...#######.####.##...#######.##..#';
// var state = '...#..#.#..##......###...###...........';

var padding = 1000;

for (var i = 0; i < padding; i++) {
  state = '.' + state + '.';
}

// console.log(potSum);
  // console.log(state);
  stateSame = 0;
  var lastState;
for (var gen = 0; gen < 50000000000; gen++) {
  applyMatching();
  // increaseSum();
  if (state === lastState) {
    console.log('same at ' + gen);
    stateSame++;
    if (stateSame > 100) {
      break;
    }
  } else {
    lastState = state;
    increaseSum();
    // increases by 8 at one point for each generation    8 * gen - 43
    console.log(potSum + ' gen: ' + (gen + 1));
    potSum = 0;
  }
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

  // console.log(state);
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
