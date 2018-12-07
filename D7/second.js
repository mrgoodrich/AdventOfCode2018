String.prototype.replaceAll = function(search, replacement) {
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

var data = [
  // test data

// ['C', 'A'],
// ['C', 'F'],
// ['A', 'B'],
// ['A', 'D'],
// ['B', 'E'],
// ['D', 'E'],
// ['F', 'E'],






  ['A', 'N'],
  ['P', 'R'],
  ['O', 'T'],
  ['J', 'U'],
  ['M', 'X'],
  ['E', 'X'],
  ['N', 'T'],
  ['W', 'G'],
  ['Z', 'D'],
  ['F', 'Q'],
  ['U', 'L'],
  ['I', 'X'],
  ['X', 'Y'],
  ['D', 'Y'],
  ['S', 'K'],
  ['C', 'G'],
  ['K', 'V'],
  ['B', 'R'],
  ['Q', 'L'],
  ['T', 'H'],
  ['H', 'G'],
  ['V', 'L'],
  ['L', 'R'],
  ['G', 'Y'],
  ['R', 'Y'],
  ['G', 'R'],
  ['X', 'V'],
  ['V', 'Y'],
  ['Z', 'U'],
  ['U', 'R'],
  ['J', 'Y'],
  ['Z', 'C'],
  ['O', 'L'],
  ['C', 'H'],
  ['V', 'G'],
  ['F', 'K'],
  ['Q', 'G'],
  ['S', 'Q'],
  ['M', 'G'],
  ['T', 'L'],
  ['C', 'Q'],
  ['T', 'V'],
  ['W', 'Z'],
  ['C', 'K'],
  ['I', 'C'],
  ['X', 'Q'],
  ['F', 'X'],
  ['J', 'S'],
  ['I', 'K'],
  ['U', 'Q'],
  ['I', 'Q'],
  ['N', 'H'],
  ['A', 'T'],
  ['T', 'G'],
  ['D', 'T'],
  ['A', 'X'],
  ['D', 'G'],
  ['C', 'T'],
  ['W', 'Q'],
  ['W', 'K'],
  ['V', 'R'],
  ['H', 'R'],
  ['F', 'H'],
  ['F', 'V'],
  ['U', 'T'],
  ['K', 'H'],
  ['B', 'T'],
  ['H', 'Y'],
  ['J', 'Z'],
  ['B', 'Y'],
  ['I', 'V'],
  ['W', 'V'],
  ['Q', 'R'],
  ['I', 'S'],
  ['E', 'H'],
  ['J', 'B'],
  ['S', 'G'],
  ['E', 'S'],
  ['N', 'I'],
  ['Z', 'F'],
  ['E', 'I'],
  ['S', 'B'],
  ['D', 'L'],
  ['Q', 'T'],
  ['Q', 'H'],
  ['K', 'Y'],
  ['M', 'U'],
  ['U', 'K'],
  ['W', 'I'],
  ['J', 'W'],
  ['K', 'T'],
  ['P', 'Y'],
  ['L', 'G'],
  ['K', 'B'],
  ['I', 'Y'],
  ['U', 'B'],
  ['P', 'O'],
  ['O', 'W'],
  ['O', 'J'],
  ['A', 'J'],
  ['F', 'G']


  // real data

];


var objs = {};

var nonStart = {};

for (var ndx in data) {
  var req  = data[ndx];
  var source = req[0];

  if (!objs[source]) {
    // console.log('adding ' + source);
    objs[source] = {
      avail: [req[1]]
    }
  } else {
    objs[source].avail.push(req[1]);
  }

  nonStart[req[1]] = true;
}

// assume a start

var path = '';
var availableNext = [];

// init available next
var validStart =[]
for (var source in objs) {
  if (!nonStart[source]) {
    availableNext.push(source);
  }
}


function meetsReqs(let) {

  var mustBeDone = [];

  for (var source in objs) {
    // console.log(objs[source].avail);
    if (objs[source].avail.includes(let)) {
      mustBeDone.push(source);
    }
  }


  for (var must in mustBeDone) {
    if (path.indexOf(must) == -1) {
      return false;
    }
  }
  return true;
}

function getNextAlph() {
  var earliest;
  for (var ndx in availableNext) {
    var cand = availableNext[ndx];

    console.log('cand' + cand);

    if ((!earliest || cand < earliest)
      && meetsReqs(cand)

  ) {
      earliest = cand;
    }
  }
  availableNext = availableNext.filter(a => a != earliest);
  return earliest;
}

// function findNewPaths() {
//   for (var source in objs) {
//     var req = data[ndx];
//     var dest = req[1];
//
//     if (req)
//   }
// }

// console.log(objs);

function removeDups(a) {
  return a.filter(function(item, pos) {
    return a.indexOf(item) == pos;
  })
}

var inProgress = {};

var workCount = 0;

function work() {
  workCount++;
  console.log('working');
  console.log(objs);
  for (var key in inProgress) {
    console.log('   key ' + key + ' - ' + inProgress[key]);
  }
  var takenTasks = [];

  var numWorkers = 5;
  for (var ndx = 0; ndx < numWorkers; ndx++ ) {
    addTopPriorityTask();
  }
  console.log(takenTasks);
  for (var ndx = 0; ndx < takenTasks.length; ndx++ ) {
    var task = takenTasks[ndx];
    inProgress[takenTasks[ndx]]--;
    if (inProgress[takenTasks[ndx]] === 0) {
      path += task;
      console.log('Path now: ' + path);
      if (objs[task]) {
        availableNext = availableNext.concat(objs[task].avail);
        objs[task].avail = [];
      }
      availableNext = removeDups(availableNext);
      delete inProgress[task];
    }
  }


  function addTopPriorityTask() {
    var topPriority;
    for (var key in inProgress) {
      if (!takenTasks.includes(key)) {
        if (!topPriority || key < topPriority){
          topPriority = key;
        }
      }
    }

    if (topPriority) {
      takenTasks.push(topPriority);
    } else {
      var next = getNextAlph();
      if (next) {
        inProgress[next] = next.charCodeAt(0) - 64 + 60;//TODO + 60 DONE
        takenTasks.push(next);
      }
    }
  }
}


console.log(Object.keys(inProgress).length);
while ((availableNext.length || Object.keys(inProgress).length)) {
  work();
}
console.log('FINAL WORK: ' + workCount);


console.log(path);

// console.log(data);



/* GUESSES

 can start at A P M E


AJBNHGICGHKBHQGHLGRSBGKQTGHLUBKLQRTVGLRWGIKQVXQVYZCDFGHKLQTUVXY


*/
