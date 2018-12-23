// var data = require('./data').test;
// var data = require('./data').real;

var recipes = [3, 7];

var first = 0;
var second = 1;

var recentlyNew = [3, 7];

while (true) { //430971
   var combo = recipes[first] + recipes[second];
   if (combo >= 10) {
      recipes.push(1);
      recentlyNew.push(1);
   }
   var ones = combo % 10;
   recipes.push(ones);
   recentlyNew.push(ones);

   first = (first + 1 + recipes[first]) % recipes.length;
   second = (second + 1 + recipes[second]) % recipes.length;

   // console.log(recipes.join('').substring(recipe, recipe + 6));

   if (recentlyNew.join('').indexOf('430971') !== -1) {
      console.log('ANS 2: ' + (recipes.length - 6));
      exit();
   }

   if (recentlyNew.length > 30) {
      recentlyNew = recentlyNew.slice(recentlyNew.length - 30, recentlyNew.length);
   }
   if (recipes.length % 100000 === 0) {
      console.log('sanity: ' + recipes.length);
   }
}

// var scoresAfter = '';
// for (var recipe = 0; recipe < 10; recipe++) { //430971
//    var combo = (parseInt(recipes[first]) + parseInt(recipes[second])) + '';
//    scoresAfter += combo;
//    for (var ndx = 0; ndx < combo.length; ndx++) {
//       recipes.push(combo[ndx]);
//    }
//    first = (first + 1 + parseInt(recipes[first])) % recipes.length;
//    second = (second + 1 + parseInt(recipes[second])) % recipes.length;
// }
//
// var num = 430971;
// console.log(recipes.join('').substring(num, num + 10));

/* GUESSES



*/

