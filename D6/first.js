String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var data = [

  // [1, 1],
  // [1, 6],
  // [8, 3],
  // [3, 4],
  // [5, 5],
  // [8, 9]

  [132, 308],
[325, 300],
[310, 231],
[177, 248],
[111, 304],
[65, 135],
[227, 116],
[60, 80],
[182, 353],
[60, 42],
[314, 164],
[142, 50],
[90, 266],
[234, 219],
[68, 121],
[168, 153],
[258, 50],
[354, 92],
[126, 154],
[303, 324],
[90, 47],
[236, 316],
[316, 217],
[180, 110],
[70, 300],
[256, 221],
[56, 256],
[235, 190],
[56, 197],
[168, 145],
[250, 117],
[107, 77],
[259, 156],
[188, 301],
[183, 76],
[92, 224],
[41, 113],
[343, 90],
[162, 176],
[186, 77],
[312, 134],
[89, 98],
[191, 313],
[68, 225],
[85, 273],
[96, 161],
[260, 93],
[343, 153],
[247, 327],
[151, 197]
];

var closestLetters = [];

var borderMin = 0;//-20;//-800;
var borderMax = 500;//20;// 1400;

// max 33320
//no, 48320 for 36
// trying -700 1300  --- max 63115 for 9

var pointToCount = {};


for (var x = borderMin; x < 500; x++) {
  // !(closestLetters[x]) && (closestLetters[x] = []);
  for (var y = borderMin; y < 500; y++) {
    var closestNdx = -1;
    var distanceClosest = 10000000;
    var isTie = false;

    for (var letterNdx in data) {

      var point = data[letterNdx];

      var manDist = Math.abs(point[0] - x) + Math.abs(point[1] - y);

      // console.log('point is ' + data[letterNdx]);
      // console.log('manDist is ' + manDist);

      if (manDist < distanceClosest) {
        isTie = false;
        closestNdx = letterNdx;
        distanceClosest = manDist;
      } else if (manDist == distanceClosest) {
        isTie = true;
      }
    }
    if (!isTie) {
      if (!pointToCount[closestNdx]) {
        pointToCount[closestNdx] = 0;
      }
      pointToCount[closestNdx]++;
      if (!x || !y || x == 499 || y == 499) {
        pointToCount[closestNdx] -= 100000000;
      }
    }
    // closestLetters[x][y] = isTie ? -1 : closestNdx;
  }
}

var maxVal = -1;
var letter;

for (var key in pointToCount) {
  var val = pointToCount[key];
  if (val > maxVal) {
    maxVal = val;
    letter = key;
  }
}

console.log('letter: ' + letter + ' and max ' + maxVal);



// var counted = {};

// function getSize(x,y) {
//   var letterLoc = closestLetters[x][y];
//   if (letterLoc == -1) {
//     // console.log('shared boundary');
//     return -1;
//   }
//   // console.log("testing: " + letterLoc);
//
//   var size = 0;
//
//   var toVisit = [[x, y]];
//
//   function consider(x4, y4) {
//     // console.log('considering ' + x4 + ' and ' + y4);
//     if (!counted[x4 + '|' + y4]) {
//       counted[x4 + '|' + y4] = true;
//       // console.log('new');
//       size++;
//       toVisit.push([x4, y4]);
//     }
//   }
//
//   function expandAllConn(x2, y2) {
//     // console.log('source of exp is ' + x2 + ', ' + y2 + ' val ' + closestLetters[x2][y2]);
//     for (var x3 = -1; x3 < 2; x3++) {
//       for (var y3 = -1; y3 < 2; y3++) {
//         if (x3 != 0 || y3 != 0) {
//           var neighborX = x2 + x3;
//           var neighborY = y2 + y3;
//           // console.log('neighborX: ' + neighborX);
//           // console.log('neighborY: ' + neighborY);
//           if (neighborX > borderMin && neighborX < borderMax &&
//             neighborY > borderMin && neighborY < borderMax) {
//               if (letterLoc === closestLetters[neighborX][neighborY]) {
//                 consider(neighborX, neighborY);
//               }
//           } else {
//             // console.log('border inf - ' + x2 + ', ' + y2);
//             return -1;
//           }
//         }
//       }
//     }
//   }
//
//   while (toVisit.length) {
//     var cur = toVisit.shift();
//     if (expandAllConn(cur[0], cur[1]) == -1) {
//       // console.log("infinite!");
//       return -1;
//     }
//   }
//   return [size, letterLoc];
// }

// var sizes = [];
//
// for (var ndx in data) {
//   var point = data[ndx];
//
//     sizes.push(getSize(point[0], point[1]));
// }


// console.log(getSize(0, 0));

// for (var x = borderMin; x < borderMax; x++) {
//   var all = '';
//   for (var y = borderMin; y < borderMax; y++) {
//     // if (closestLetters[x][y] !== undefined) {
//       all += closestLetters[x][y];
//     // }
//
//   }
//   console.log(all);
// }
// console.log(closestLetters[0][3]);

// sizes = sizes.filter(a => a != -1 && a[0]);
// sizes = sizes.sort((a,b) => (a[0] > b[0]) ? -0 : ((a[0] < b[0]) ? 0 : 0));
//
// var maxSize = -1;
// var maxSizeVal = -1;
//
// for (var ndx in sizes) {
//   var val = sizes[ndx];
//
//   if (val[0] > maxSize) {
//     maxSize = val[0];
//     maxSizeVal = val[1];
//   }
// }
//
// console.log('size: ' + maxSize + ', val: ' + maxSizeVal);

// console.log(sizes);
