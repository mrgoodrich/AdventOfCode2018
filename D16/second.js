// var data = require('./data').test;
var data = require('./data').real;
var instructions = require('./data').instructions;
var memory = {};

var operations = [
   {
      name: 'addr',
      operation: (a,b,c) => {
         memory[c] = memory[a] + memory[b];
      },
      opcode: 0, //cant be 4 3 2 7 1 3 10 15 11 6 14 4 9 12
   },
   {
      name: 'addi',
      operation: (a,b,c) => {
         memory[c] = memory[a] + b;
      },
      opcode: 5, // cant be 1 2 3 4 9 15 0 6
   },
   {
      name: 'mulr',
      operation: (a,b,c) => {
         memory[c] = memory[a] * memory[b];
      },
      opcode: 14, // cant be 6 10 12 0 11 4
   },
   {
      name: 'muli',
      operation: (a,b,c) => {
         memory[c] = memory[a] * b;
      },
      opcode: 9, // cant be 12 10 15 11 10 0 4 6
   },
   {
      name: 'banr',
      operation: (a,b,c) => {
         memory[c] = memory[a] & memory[b];
      },
      opcode: 6, // cant be 4 7 11 5 12
   },
   {
      name: 'bani',
      operation: (a,b,c) => {
         memory[c] = memory[a] & b;
      },
      opcode: 15, // cant be 6 11 2 5 12
   },
   {
      name: 'borr',
      operation: (a,b,c) => {
         memory[c] = memory[a] | memory[b];
      },
      opcode: 13, //XXXXXX cant be 12 10 MUST BE 13
   },
   {
      name: 'bori',
      operation: (a,b,c) => {
         memory[c] = memory[a] | b;
      },
      opcode: 8, //cant be 6 9 if bori not 8 then bori is 13
   },
   {
      name: 'setr',
      operation: (a,b,c) => {
         memory[c] = memory[a];
      },
      opcode: 12, // cant be 10 0 4 11
   },
   {
      name: 'seti',
      operation: (a,b,c) => {
         memory[c] = a;
      },
      opcode: 10, // cant be 11 6 5 2 12 4
   },
   {
      name: 'gtir',
      operation: (a,b,c) => {
         if (a > memory[b]) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      },
      opcode: 4, // cant be 0 11
   },
   {
      name: 'gtri',
      operation: (a,b,c) => {
         if (memory[a] > b) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      },
      opcode: 7, //XXX cant be 0 MUST BE 7
   },
   {
      name: 'gtrr',
      operation: (a,b,c) => {
         if (memory[a] > memory[b]) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      },
      opcode: 11, // cant be 0 5 if not 1 then eqri is 1
   },
   {
      name: 'eqir',
      operation: (a,b,c) => {
         if (a === memory[b]) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      },
      opcode: 2, // cant be 0 11
   },
   {
      name: 'eqri',
      operation: (a,b,c) => {
         if (memory[a] === b) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      },
      opcode: 1, // cant be 0
   },
   {
      name: 'eqrr',
      operation: (a,b,c) => {
         if (memory[a] === memory[b]) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      },
      opcode: 3, // cant be 0 12
   },
];
var nameToOpcode = {};
var opcodesSeen = {};
for (var ndx in operations) { // index, array
   var operation = operations[ndx]; // value
   //console.log('operations - index: ' + ndx + ', value: ' + operation);
   nameToOpcode[operation.name] = operation.opcode;
   if (opcodesSeen[operation.opcode]) {
      console.log("already have " + operation.opcode);
      exit();
   }
   opcodesSeen[operation.opcode] = true;
}
// console.log(nameToOpcode);
// exit();


var numToValid = {};

var unsetOpcodes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

var names = operations.map(o => o.name);

var unsetNames = operations.filter(o => o.opcode === undefined).map(o => o.name);

console.log(unsetNames);

for (var ndx = 0; ndx < unsetOpcodes.length; ndx++) {
   var opcode = unsetOpcodes[ndx]; // value
   //console.log('unsetOpcodes - index: ' + ndx + ', value: ' + opcode);
   numToValid[opcode + ''] = unsetNames.slice();
}

// console.log(numToValid);

function getOperation(opcode) {
   for (var operationNdx = 0; operationNdx < operations.length; operationNdx++) {
      var operation = operations[operationNdx]; // value
      // console.log('operations - index: ' + operationNdx + ', value: ' + operation);
      if (operation.opcode == opcode) {
         return operation;
      }
   }
}

var used = [];

memory[0] = 0;
memory[1] = 0;
memory[2] = 0;
memory[3] = 0;

for (var sampleNdx = 0; sampleNdx < instructions.length; sampleNdx++) {
   var sample = instructions[sampleNdx];
   var operationArr = sample.split(' ');
   var opcode = operationArr[0];
   var a = parseInt(operationArr[1]);
   var b = parseInt(operationArr[2]);
   var c = parseInt(operationArr[3]);
   console.log(opcode +', ' + a + ', ' + b + ', ' + c);
   //
   // var invalid = [];
   //
   // memory = {};
   //
   var operation = getOperation(opcode);
   // // console.log(opcode);
   // console.log(operation);
   //
   // for (var beforeNdx = 0; beforeNdx < sample.before.length; beforeNdx++) {
   //    memory[beforeNdx] = sample.before[beforeNdx];
   // }

   operation.operation(a,b,c);
   //
   // for (var afterNdx = 0; afterNdx < sample.after.length; afterNdx++) {
   //    if (memory[afterNdx] !== sample.after[afterNdx]) {
   //       // not valid
   //       console.log('invalid!!! ' + opcode + ' cant be ' + operation.name);
   //       // exit();
   //    }
   // }
   //
   // used.push(opcode);

   // console.log(numToValid[opcode]);
   //
   // if (numToValid[opcode]) {
   // //    console.log(opcode);
   //    numToValid[opcode] = numToValid[opcode].filter(operation => (invalid.indexOf(operation) === -1));
   // }




   //
   //
   //
   // for (var key in numToValid) { // key, object
   //    var instances = numToValid[key]; // value
   //    //console.log('numToValid - key: ' + key + ', value: ' + instances);
   //
   //    for (var instanceNdx = 0; instanceNdx < instances.length; instanceNdx++) {
   //       var instance = instances[instanceNdx]; // value
   //       //console.log('instances - index: ' + instanceNdx + ', value: ' + instance);
   //
   //       if (instance)
   //    }
   // }

   // console.log(numToValid);

   // console.log(memory);
}

console.log(memory);

// console.log(numToValid);

/* GUESSES



*/
