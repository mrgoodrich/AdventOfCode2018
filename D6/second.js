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

var data = [[132, 308],
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
[151, 197]];

var count = 0;

for (var x = 0; x < 500; x++) {
  for (var y = 0; y < 500; y++) {
    var totalDistance = 0;

    for (var ndx in data) {

      var point = data[ndx];
      totalDistance += Math.abs(point[0] - x) + Math.abs(point[1] - y);
    }

    if (totalDistance < 10000) {
      count++;
    }
  }
}

console.log(count);
