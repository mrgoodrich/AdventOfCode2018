// var data = require('./data').test;
var data = require('./data').real;

// Make track.
var track = [];
var carts = [];
var cartId = 0;
for (var rowNdx = 0; rowNdx < data.length; rowNdx++) {
   var row = data[rowNdx]; // value
   track[rowNdx] = row + '                                                                                                                                                      '.substring(0, 150 - row.length);

   // Remove carts and store.
   for (var x = 0; x < 150; x++) {
      if (track[rowNdx][x] === 'v') {
         carts.push({
            facing: 'down',
            x: x,
            y: rowNdx,
            nextDir: 'left',
            id: ++cartId,
         });
         track[rowNdx] = track[rowNdx].substring(0, x) + '|' + track[rowNdx].substring(x + 1, 150);
      } else if (track[rowNdx][x] === '>') {
         carts.push({
            facing: 'right',
            x: x,
            y: rowNdx,
            nextDir: 'left',
            id: ++cartId,
         });
         track[rowNdx] = track[rowNdx].substring(0, x) + '-' + track[rowNdx].substring(x + 1, 150);
      } else if (track[rowNdx][x] === '<') {
         carts.push({
            facing: 'left',
            x: x,
            y: rowNdx,
            nextDir: 'left',
            id: ++cartId,
         });
         track[rowNdx] = track[rowNdx].substring(0, x) + '-' + track[rowNdx].substring(x + 1, 150);
      } else if (track[rowNdx][x] === '^') {
         carts.push({
            facing: 'up',
            x: x,
            y: rowNdx,
            nextDir: 'left',
            id: ++cartId,
         });
         track[rowNdx] = track[rowNdx].substring(0, x) + '|' + track[rowNdx].substring(x + 1, 150);
      }
   }
}
moveCount = 0;
var collision = false;
var removedIds = [];
var printedQ1Soln = false;
// printTrackWithCarts();
while (!collision) {
   moveCount++;
   // printTrackWithCarts();
   moveCarts();
   checkCollision();
}


function moveCarts() {
   // console.log('move');
   carts = carts.sort(function(a, b) {
      if (a.y < b.y) {
         return -1;
      } else if (a.y > b.y) {
         return 1;
      }
      if (a.x < b.x) {
         return -1;
      } else if (a.y < b.y) {
         return 1;
      }
      return 0;
   });

   for (var cartNdx = 0; cartNdx < carts.length; cartNdx++) {
      var cart = carts[cartNdx];
      if (removedIds.indexOf(cart.id) === -1) {
         var prevTrackSpot = track[cart.y][cart.x];

         if (prevTrackSpot === '-') {
            if (cart.facing === 'left') {
               cart.x--;
            } else {
               cart.x++;
            }
         } else if (prevTrackSpot === '|') {
            if (cart.facing === 'up') {
               cart.y--;
            } else {
               cart.y++;
            }
         } else if (prevTrackSpot === '\\') {
            if (cart.facing === 'right') {
               cart.y++;
               cart.facing = 'down';
            } else if (cart.facing === 'up') {
               cart.x--;
               cart.facing = 'left';
            } else if (cart.facing === 'down') {
               cart.x++;
               cart.facing = 'right';
            } else {
               cart.y--;
               cart.facing = 'up';
            }
         } else if (prevTrackSpot === '/') {
            if (cart.facing === 'left') {
               cart.y++;
               cart.facing = 'down';
            } else if (cart.facing === 'up') {
               cart.facing = 'right';
               cart.x++;
            } else if (cart.facing === 'right') {
               cart.facing = 'up';
               cart.y--;
            } else {
               cart.facing = 'left';
               cart.x--;
            }
         } else if (prevTrackSpot === '+') {
            if (cart.nextDir === 'straight') {
               cart.nextDir = 'right';
               if (cart.facing === 'left') {
                  cart.x--;
               } else if (cart.facing === 'right') {
                  cart.x++;
               } else if (cart.facing === 'up') {
                  cart.y--;
               } else if (cart.facing === 'down') {
                  cart.y++;
               }
            } else if (cart.nextDir === 'right') {
               cart.nextDir = 'left';
               if (cart.facing === 'up') {
                  cart.facing = 'right';
                  cart.x++;
               } else if (cart.facing === 'right') {
                  cart.facing = 'down';
                  cart.y++;
               } else if (cart.facing === 'left') {
                  cart.facing = 'up';
                  cart.y--;
               } else {
                  cart.facing = 'left';
                  cart.x--;
               }
            } else if (cart.nextDir === 'left') {
               cart.nextDir = 'straight';
               if (cart.facing === 'up') {
                  cart.facing = 'left';
                  cart.x--;
               } else if (cart.facing === 'right') {
                  cart.facing = 'up';
                  cart.y--;
               } else if (cart.facing === 'down') {
                  cart.facing = 'right';
                  cart.x++;
               } else {
                  cart.facing = 'down';
                  cart.y++;
               }
            } else {
               console.log('UNKNOWN NEXT DIR');
            }
         } else {
            console.log('UNKNOWN TRACK SPOT TYPE - ' + prevTrackSpot + '(' + cart.x + ',' + cart.y + ')' + track[cart.y][cart.x + 1]);
         }
         checkCollision();
      }
   }


   carts = carts.filter((c) => {
      for (var ndx in removedIds) { // index, array
         var removeId = removedIds[ndx]; // value
         // console.log('removeId: ' + c.id);
         if (c.id === removeId) {
            return false;
         }
      }
      return true;
   });

   if (carts.length === 1) {
      console.log("ONE CART LEFT, " + carts[0].x + ',' + carts[0].y + ', moves ' + moveCount);
      exit();
   }
}

function checkCollision() {
   //
   // var tempSort = carts = carts.sort(function(a, b) {
   //    if (a.y < b.y) {
   //       return -1;
   //    } else if (a.y > b.y) {
   //       return 1;
   //    }
   //    if (a.x < b.x) {
   //       return -1;
   //    } else if (a.y < b.y) {
   //       return 1;
   //    }
   //    return 0;
   // });
   // console.log(carts);
   for (var cartNdx in carts) { // index, array
      var cart = carts[cartNdx]; // value
      for (var cartNdx2 in carts) { // index, array
         var cart2 = carts[cartNdx2]; // value

         if (cartNdx !== cartNdx2) {
            if (cart.x === cart2.x && cart.y === cart2.y) {// && toRemove.indexOf(cart.id) === -1 && toRemove.indexOf(cart2.id) === -1) {
               // console.log(carts);
               // toRemove.push(cart.id);
               // carts.splice(cartNdx, 1);
               // cartNdx--;
               // cartNdx2--;
               // carts.splice(cartNdx2 - 1, 1);


               removedIds.push(cart.id);
               removedIds.push(cart2.id);

               // console.log(carts.length);
               // console.log(carts.length);
               // return true;
               // cartNdx--;
               // cartNdx2--;
               // toRemove.push(cart2.id);
               // console.log('remove id ' + cart.id);
               // console.log(carts);
               if (!printedQ1Soln) {
                  printedQ1Soln = true;
                  console.log('Q1: collision at ' + cart.x + ',' + cart.y); // will print twice per coll
               }

            }
         }
      }
   }
   // // console.log(carts);
   // carts = carts.filter((c) => {
   //    for (var ndx in toRemove) { // index, array
   //       var removeId = toRemove[ndx]; // value
   //       // console.log('removeId: ' + c.id);
   //       if (c.id === removeId) {
   //          return false;
   //       }
   //
   //    }
   //    return true;
   // });
}

function printTrackWithCarts() {
   for (var y = 0; y < 7; y++) {
      let row = '';
      for (var x = 0; x < 13; x++) {
         let foundCart = false;
         for (var cartNdx in carts) { // index, array
            var cart = carts[cartNdx]; // value
            //console.log('carts - index: ' + cartNdx + ', value: ' + cart);
            if (!foundCart && cart.x === x && cart.y === y) {
               if (cart.facing === 'up') {
                  row += '^';
               } else if (cart.facing === 'down') {
                  row += 'v';
               } else if (cart.facing === 'left') {
                  row += '<';
               } else if (cart.facing === 'right') {
                  row += '>';
               }
               foundCart = true;
            }
         }
         if (!foundCart) {
            row += track[y][x];
         }

      }
      console.log(row);
   }
}


// Remove carts and store.


/* GUESSES

2nd 0,121

*/
