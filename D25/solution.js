// let data = require('./data').test;
let data = require('./data').real;

let nodes = [];
let nextId = 1;

for (let pointNdx in data) { // index, array
   let point = data[pointNdx]; // value

   nodes.push({
      x: point[0],
      y: point[1],
      z: point[2],
      t: point[3],
      connections: [],
      id: nextId++,
   });
}

for (let nodeNdx = 0; nodeNdx < nodes.length; nodeNdx++) {
   let node1 = nodes[nodeNdx];

   for (let node2Ndx = nodeNdx + 1; node2Ndx < nodes.length; node2Ndx++) {
      let node2 = nodes[node2Ndx];
      if (node2Ndx !== nodeNdx) {
         // console.log(`Comparing ${JSON.stringify(node1)} and ${JSON.stringify(node2)} - distance: ${getManhattanDistance(node1, node2)}`);
         if (getManhattanDistance(node1, node2) <= 3) {
            node1.connections.push(node2);
            node2.connections.push(node1);


            // if (node1.constellation && node2.constellation) {
            //    let toMove = constellations[node2.constellation];
            //    for (var toMoveNdx in toMove) { // index, array
            //       var toMoveNode = toMove[toMoveNdx]; // value
            //       toMoveNode.constellation = node1.constellation;
            //    }
            //    constellations[node1.constellation] = constellations[node1.constellation].concat(toMove);
            // } else if (node1.constellation) {
            //    node2.constellation = node1.constellation;
            //    constellations[node1.constellation].push(node2);
            // } else if (node2.constellation) {
            //    node1.constellation = node2.constellation;
            //    constellations[node2.constellation].push(node1);
            // } else {
            //    console.log('making new constellation for ' + JSON.stringify(node1) + ' and ' + JSON.stringify(node2));
            //    let thisConstellation = nextConstellation++;
            //    constellations[thisConstellation] = [node1, node2];
            //    node1.constellation = thisConstellation;
            //    node2.constellation = thisConstellation;
            // }
         } else {
            // if (!node1.constellation) {
            //    console.log('making new constellation for ' + JSON.stringify(node2));
            //    let thisConstellation = nextConstellation++;
            //    constellations[thisConstellation] = [node1];
            //    node1.constellation = thisConstellation;
            // }
            // if (!node2.constellation) {
            //    console.log('making new constellation for ' + JSON.stringify(node2));
            //    let thisConstellation = nextConstellation++;
            //    constellations[thisConstellation] = [node2];
            //    node2.constellation = thisConstellation;
            // }
         }
      }
   }
}

let nodeObj = {};
nodes.forEach(node => {
   nodeObj[node.id] = node;
});

let q = [];
let numConstellations = 0;
while (Object.keys(nodeObj).length) {
   numConstellations++;
   q.push(Object.keys(nodeObj)[0]);

   while (q.length) {
      let thisNodeId = q.pop();
      if (nodeObj[thisNodeId]) {
         let thisNode = nodeObj[thisNodeId];
         // console.log(thisNode);
         thisNode.connections.forEach(conn => {
            if (nodeObj[conn.id]) {
               q.push(conn.id);
            }
         });
         delete nodeObj[thisNode.id];
      }
   }
}

console.log(`Part one: ${numConstellations}`);

let chronalEnergy = '🔴';
for (let star = 0; star < 49; star++) {
   chronalEnergy += '*';
}

console.log(`Part two: ${chronalEnergy}`);


// Get the Manhattan distance between two locations.
function getManhattanDistance(loc1, loc2) {
   let xDiff = Math.abs(loc1.x - loc2.x);
   let yDiff = Math.abs(loc1.y- loc2.y);
   let zDiff = Math.abs(loc1.z - loc2.z);
   let tDiff = Math.abs(loc1.t - loc2.t);
   return xDiff + yDiff + zDiff + tDiff;
}


/*
Guesses



 */