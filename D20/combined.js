// var data = require('./data').test;
var data = require('./data').real;

const ROOM = '.';
const WALL = '#';
const DOOR_VERT = '-';
const DOOR_HORIZ = '|';

// const BEGINNING = '^';
// const END = '$';

const NORTH = 'N';
const SOUTH = 'S';
const EAST = 'E';
const WEST = 'W';

const START_BRANCH = "(";
const SPLIT_BRANCH = "|";
const END_BRANCH = ")";

// [[x, y]]
var allRooms = {};
var nextRoomId = 1;

var curRoom = addRoom(0, 0);
var stack = [curRoom];
stackFollowDirections();
// console.log(paths);

// addRoom(0, 0);
// for (var pathNdx = 0; pathNdx < paths.length; pathNdx++) {
//    var path = paths[pathNdx]; // value
//    // console.log(path);
//    // createRooms(path);
// }

// console.log(allRooms);
console.log('Part One: ' + findFarthestRoomLength(0, 0));

function findFarthestRoomLength(x, y) {
   var room = getRoom(x, y);

   var nodeToShortestPath = {};

   function checkConnections(node, length, path, visited) {
      let newVisited = visited;
      newVisited[node.id] = true;
      // path += ' ' + node.x + ',' + node.y + ' ';
      path += ',' + node.id;

      const shortestToThisNode = nodeToShortestPath[node.id];
      if (!shortestToThisNode || length < shortestToThisNode[0]) {
         nodeToShortestPath[node.id] = [length, path];
      }

      for (var roomNdx in node.connections) { // index, array
         var connection = node.connections[roomNdx]; // value
         // console.log(' - At node ' + node.id + '. Connections: ' + node.connections.map(conn => conn.id) + ' Visited: ' + JSON.stringify(visited));
         if (!newVisited[connection.id]) {
            // console.log('    Going to ' + connection.id);
            checkConnections(connection, length + 1, path, newVisited);
         } else {
            // console.log('    already visited ' + connection.id);
         }
      }
   }
   checkConnections(room, 0, '', {});

   var oneThousandDoorPathCount = 0;

   let longestShortestPath = -1;
   for (var node in nodeToShortestPath) { // key, object
      var shortestPath = nodeToShortestPath[node]; // value
      //console.log('nodeToShortestPath - key: ' + node + ', value: ' + shortestPath);
      if (shortestPath[0] > longestShortestPath) {
         longestShortestPath = shortestPath[0];
      }
      if (shortestPath[0] >= 1000) {
         oneThousandDoorPathCount++;
      }
   }

   // console.log(nodeToShortestPath);

   console.log('Part Two: ' + oneThousandDoorPathCount);

   return longestShortestPath;
}

// function createNORooms() { BAD
//    for (var pathNdx = 0; pathNdx < paths.length; pathNdx++) {
//       var path = paths[pathNdx];
//
//       var pathRooms = getRooms(path);
//       // console.log(pathRooms);
//       for (var pathRoomNdx in pathRooms) { // index, array
//          var pathRoom = pathRooms[pathRoomNdx]; // value
//          var x = pathRoom[0], y = pathRoom[1];
//          if (!getRoom(x, y)) {
//             addRoom(x, y, {connections: [], x: x, y: y});
//          }
//       }
//    }
// }


// function buildRoomGraph() { BAD
//    for (var x in allRooms) { // key, object
//       var yRooms = allRooms[x]; // value
//       for (var y in yRooms) { // key, object
//          var room = yRooms[y]; // value
//          let left = getRoom(x - 1, y),
//             right = getRoom(x + 1, y),
//             up = getRoom(x, y - 1),
//             down = getRoom(x, y + 1);
//          if (left) room.connections.push(left);
//          if (right) room.connections.push(right);
//          if (up) room.connections.push(up);
//          if (down) room.connections.push(down);
//       }
//    }
// }

function getRoom(x, y) {
   if (allRooms[x] && allRooms[x][y]) {
      return allRooms[x][y];
   }
   return false;
}

function addRoom(x, y) {
   // console.log('adding room at ' + x + ', ' + y);
   if (!allRooms[x]) {
      allRooms[x] = {};
   }
   allRooms[x][y] = {connections: [], x: x, y: y, id: nextRoomId++};
   return allRooms[x][y];
}

function addConnection(r1, r2) {
   if (!r1.connections.filter(c => c.id === r2.id).length) {
      r1.connections.push(r2);
   }
   if (!r2.connections.filter(c => c.id === r1.id).length) {
      r2.connections.push(r1);
   }
}


function stackFollowDirections() {
   for (var charNdx = 0; charNdx < data.length; charNdx++) {
      var dir = data[charNdx]; // value
      switch (dir) {
         case NORTH:
         case SOUTH:
         case EAST:
         case WEST:
            curRoom = move(curRoom, dir);
            break;
         case START_BRANCH:
            // console.log('push');
            stack.push(curRoom);
            break;
         case END_BRANCH:
            // console.log('pop');
            curRoom = stack.pop();
            break;
         case SPLIT_BRANCH:
            curRoom = stack[stack.length - 1];
            break;
      }
   }
}


function move(curRoom, dir) {
   let curX = curRoom.x, curY = curRoom.y;
   switch (dir) {
      case NORTH:
         curY--;
         break;
      case SOUTH:
         curY++;
         break;
      case EAST:
         curX++;
         break;
      case WEST:
         curX--;
         break;
   }

   var existing = getRoom(curX, curY);
   if (!existing) {
      addRoom(curX, curY);
      existing = getRoom(curX, curY);
   }
   // console.log('--- || ' + curX + ', ' + curY);
   // console.log(curRoom);
   // console.log(existing);

   addConnection(curRoom, existing);

   return existing;
}

// function followDirections(existingPaths, remainingDirections) {
//    var gatheredPaths = existingPaths.splice(0);
//    for (var dirNdx = 0; dirNdx < remainingDirections.length; dirNdx++) {
//       var dirChar = remainingDirections[dirNdx];
//       switch (dirChar) {
//          case START_BRANCH:
//             var branchRoutesData = getBranchRoutes(remainingDirections.substring(dirNdx + 1, remainingDirections.length));
//             // console.log("branch routes data [1]: " + branchRoutesData[1]);
//             // console.log('gatheredPaths: ' + gatheredPaths);
//             var newRoutes = [];
//             for (var branchRouteNdx in branchRoutesData[1]) {
//                var branchRoute = branchRoutesData[1][branchRouteNdx];
//                // console.log('branch route: ' + branchRoute);
//                for (var gatheredPathNdx in gatheredPaths) {
//                   var gatheredPath = gatheredPaths[gatheredPathNdx];
//
//                   // move
//                   var cur = gatheredPath;
//                   for (var stepNdx = 0; stepNdx < branchRoute.length; stepNdx++) {
//                      // console.log('branch move');
//                      cur = move(cur, branchRoute[stepNdx]);
//                   }
//                   newRoutes.push(cur);
//                }
//             }
//             // console.log('newRoutes: ' + newRoutes);
//             gatheredPaths = newRoutes;
//             dirNdx += branchRoutesData[0];
//             break;
//          case SPLIT_BRANCH:
//          case END_BRANCH:
//             break;
//          default:
//             gatheredPaths = gatheredPaths.map(path => {
//                return move(path, dirChar);
//             });
//             break;
//       }
//    }
//
//    // for each char in remainingDirs
//       // if branch start
//          // call get branch routes
//          // new routes []
//          // for each route received
//             // for each existing route
//                // new routes push existing + route received
//          // existingpaths = new routes
//          // set next to char after branch parsed
//       // if basic
//          // add to end of all routes
//       // if other
//          // broken
//    // return existingpaths
// }
// function getPathsDirs(existingPaths, remainingDirections) {
//    var gatheredPaths = existingPaths.splice(0);
//    for (var dirNdx = 0; dirNdx < remainingDirections.length; dirNdx++) {
//       var dirChar = remainingDirections[dirNdx];
//       switch (dirChar) {
//          case START_BRANCH:
//             var branchRoutesData = getBranchRoutes(remainingDirections.substring(dirNdx + 1, remainingDirections.length));
//             // console.log("branch routes data [1]: " + branchRoutesData[1]);
//             // console.log('gatheredPaths: ' + gatheredPaths);
//             var newRoutes = [];
//             for (var branchRouteNdx in branchRoutesData[1]) {
//                var branchRoute = branchRoutesData[1][branchRouteNdx];
//                for (var gatheredPathNdx in gatheredPaths) {
//                   var gatheredPath = gatheredPaths[gatheredPathNdx];
//                   newRoutes.push(gatheredPath + branchRoute);
//                }
//             }
//             // console.log('newRoutes: ' + newRoutes);
//             gatheredPaths = newRoutes;
//             dirNdx += branchRoutesData[0];
//             break;
//          case SPLIT_BRANCH:
//          case END_BRANCH:
//             break;
//          default:
//             gatheredPaths = gatheredPaths.map(path => path + dirChar);
//             break;
//       }
//    }
//    return gatheredPaths;
// }

// function getBranchRoutes(branchDirections) {
//    // console.log('getting branch routes with remaining dirs: ' + branchDirections);
//    var topLevelPaths = [];
//    var curDepth = 0;
//    var curPath = '';
//
//    for (var branchDirNdx in branchDirections) { // index, array
//       var branchDir = branchDirections[branchDirNdx]; // value
//       switch (branchDir) {
//          case START_BRANCH:
//             curDepth++;
//             curPath += branchDir;
//             break;
//          case SPLIT_BRANCH:
//             // console.log('hit split with level ' + curDepth);
//             if (curDepth === 0) {
//                topLevelPaths.push(curPath);
//                curPath = '';
//             } else {
//                curPath += branchDir;
//             }
//             break;
//          case END_BRANCH:
//             if (curDepth === 0) {
//                topLevelPaths.push(curPath);
//
//                var finalPaths = [];
//                for (var topLevelPathNdx = 0; topLevelPathNdx < topLevelPaths.length; topLevelPathNdx++) {
//                   var topLevelPath = topLevelPaths[topLevelPathNdx];
//                   // console.log('calling getPaths with ' + topLevelPath);
//                   finalPaths = finalPaths.concat(getPathsDirs([''], topLevelPath));
//                   // console.log('final paths: ' + finalPaths);
//                }
//                return [branchDirNdx - 1, finalPaths];
//             } else {
//                curDepth--;
//                curPath += branchDir;
//             }
//             break;
//          default:
//             curPath += branchDir;
//             break;
//       }
//    }
//    console.log("Never found end of branch!");
//    exit();
//
//    // branchTopLevelPaths []
//
//    // split by top level | manually
//    // for each
//       // call getPaths on split with existing as ['']
//       // add paths to top level paths
//    // return [nextNdx, top level paths]
// }

// function createRooms(path) {
//    // console.log(path);
//    var curRoom = getRoom(0, 0);
//
//    var curX = 0;
//    var curY = 0;
//    // Find coords of rooms. Make start 0, 0.
//    for (var charNdx = 0; charNdx < path.length; charNdx++) {
//       var char = path[charNdx];
//
//       // console.log('moving ' + char);
//
//       switch (char) {
//          case NORTH:
//             curY--;
//             break;
//          case SOUTH:
//             curY++;
//             break;
//          case EAST:
//             curX++;
//             break;
//          case WEST:
//             curX--;
//             break;
//       }
//
//       var existing = getRoom(curX, curY);
//       if (!existing) {
//          addRoom(curX, curY);
//          existing = getRoom(curX, curY);
//       }
//       // console.log('--- || ' + curX + ', ' + curY);
//       // console.log(curRoom);
//       // console.log(existing);
//
//       addConnection(curRoom, existing);
//       curRoom = existing;
//    }
// }




//
//
//
//
// buildTree(data, directionTreeRoot);
//
// function buildTree(directions, root) {
//    var newRoot = {
//       dirs: '',
//       children: [],
//    };
//
//    for (var charNdx = 0; charNdx < directions.length; charNdx++) {
//       var char = directions[charNdx];
//       switch (char) {
//          case END_BRANCH:
//             paths.push(curPath);
//             return paths;
//          case START_BRANCH:
//             buildTree()
//
//             var branchCharNdx = charNdx + 1;
//             var branchChar = directions[branchCharNdx];
//             var newNodeDirs = '';
//             while (branchChar !== END_BRANCH) {
//                switch (branchChar) {
//                   case SPLIT_BRANCH:
//                      newRoot.children = newRoot.children.concat(buildTree(newNodeDirs, newRoot));
//                      newNodeDirs = '';
//                      break;
//                }
//             }
//             newRoot.children = newRoot.children.concat(buildTree(newNodeDirs, newRoot));
//             break;
//          case SPLIT_BRANCH:
//             paths.push(curPath);
//             curPath = '';
//             break;
//          default:
//             newRoot.dirs += char;
//             break;
//       }
//    }
//
//
//
//
//    return paths;
//
//    let nextPaths = [];
//    let brokenPath = path.substring(charNdx + 1, path.length);
//    let nextCharNdx = 0;
//    let nextChar = brokenPath[nextCharNdx];
//    let curPathCreate = '';
//    while (nextChar !== END_BRANCH) {
//       switch (nextChar) {
//          case SPLIT_BRANCH:
//             nextPaths.push(curPathCreate);
//             curPathCreate = '';
//             break;
//          case START_BRANCH:
//             getBranchedPaths();
//          default:
//             curPathCreate += nextChar;
//             break;
//       }
//       nextCharNdx++;
//       nextChar = brokenPath[nextCharNdx];
//    }
//    nextPaths.push(curPathCreate);
//    console.log(nextPaths);
//    console.log(brokenPath);
// }
//
//
//
//
//
//
//











/* GUESSES

1065 too low

*/
