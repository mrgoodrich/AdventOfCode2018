// var data = require('./data').test;
var data = require('./data').real;

var operations = [
   {
      name: 'addr',
      operation: (a,b,c) => {
         memory[c] = memory[a] + memory[b];
      },
      opcode: 0,
   },
   {
      name: 'addi',
      operation: (a,b,c) => {
         memory[c] = memory[a] + b;
      },
      opcode: 5,
   },
   {
      name: 'mulr',
      operation: (a,b,c) => {
         memory[c] = memory[a] * memory[b];
      },
      opcode: 14,
   },
   {
      name: 'muli',
      operation: (a,b,c) => {
         memory[c] = memory[a] * b;
      },
      opcode: 9,
   },
   {
      name: 'banr',
      operation: (a,b,c) => {
         memory[c] = memory[a] & memory[b];
      },
      opcode: 6,
   },
   {
      name: 'bani',
      operation: (a,b,c) => {
         memory[c] = memory[a] & b;
      },
      opcode: 15,
   },
   {
      name: 'borr',
      operation: (a,b,c) => {
         memory[c] = memory[a] | memory[b];
      },
      opcode: 13,
   },
   {
      name: 'bori',
      operation: (a,b,c) => {
         memory[c] = memory[a] | b;
      },
      opcode: 8,
   },
   {
      name: 'setr',
      operation: (a,b,c) => {
         memory[c] = memory[a];
      },
      opcode: 12,
   },
   {
      name: 'seti',
      operation: (a,b,c) => {
         memory[c] = a;
      },
      opcode: 10,
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
      opcode: 4,
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
      opcode: 7,
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
      opcode: 11,
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
      opcode: 2,
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
      opcode: 1,
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
      opcode: 3,
   },
];

const operationNameToOperation = {};
operations.forEach((operation, _) => { // array. value, index
	//console.log('operations-val: ' + operation + ', ndx: ' + _);
	operationNameToOperation[operation.name] = operation;
});


// const mostInstr = 1000000000;

let foundUnderflowSource = {};
let mostOperationsUnderflowSource = -1;

// for (var iVal = 0; iVal < 3000; iVal++) {

   var memory = {};
   for (var memNdx = 0; memNdx < 6; memNdx++) {
      memory[memNdx] = 0;
   }

   memory[0] = 1;  // Solution to part 1: 7216956

   var instrRegister = 1;
   // var isBound;
   var instrPointer = 0;

   // console.log(data.length);

   var numInstr = 0;
   while (instrPointer < data.length && instrPointer >= 0) {// && numInstr < mostInstr) {

      // console.log(memory);
      var thisInstruction = data[instrPointer];

      //    instrRegister = thisInstruction.split(' ')[1];
      //    // isBound = true;
      //    console.log('set to reg ' + instrRegister)


      let operationFields = thisInstruction.split(' ');
      let op = operationNameToOperation[operationFields[0]]; //operations.filter(op => thisInstruction.startsWith(op.name))[0];
      let a = parseInt(operationFields[1]);
      let b = parseInt(operationFields[2]);
      let c = parseInt(operationFields[3]);
      // console.log(thisInstruction);

      memory[instrRegister] = instrPointer;
      // console.log('setting reg ' + instrRegister + ' to ' + instrPointer + ' through binding');

      // console.log('ip is ' + instrPointer);
      op.operation(a,b,c);


      // console.log('writing ' + memory[instrRegister] + ' back to reg ' + instrPointer + ' through bind');
      instrPointer = memory[instrRegister];

      instrPointer++;

      // console.log('instr ends at ' + instrPointer);
      // console.log(instrPointer);
      if (instrPointer === 28) {
         if (!Object.keys(foundUnderflowSource).length) {
            console.log('Part one: ' + memory[3]);
            // exit();
         }
         if (foundUnderflowSource[memory[3]]) {
            console.log('Part two: ' + mostOperationsUnderflowSource);
            exit();
         }
         mostOperationsUnderflowSource = memory[3];
         foundUnderflowSource[memory[3]] = true;
         // console.log(Object.keys(memory).map(key => memory[key]).join(', '));
         // console.log(numInstr);
      }

      numInstr++;

   }

   // if (numInstr !== mostInstr) {
   //    console.log('done - ' + numInstr + ' instr for r0 of ' + iVal);
   // }
// }
// console.log('ival: ' + iVal);


// if (numInstr !== mostInstr) {
   console.log('halted after ' + numInstr + ' instructions');
// }


/*

Guesses

15917266 too high part 2
5398312 too low




Reg 5 / Reg 1 = 77


Reg = 1, The step of last reg was periodically X then immediately X * 256



Reg 0 = 0




Reg 0 = 1
1, 0, 0, 123, 0, 0
1, 1, 0, 72, 0, 0
1, 2, 0, 1, 0, 0
1, 4, 0, 1, 0, 0
1, 5, 0, 0, 0, 0

VERIF ABOVE

1, 6, 65536, 0, 0, 0
1, 7, 65536, 1505483, 0, 0
1, 8, 65536, 1505483, 0, 0
1, 9, 65536, 1505483, 0, 0
1, 10, 65536, 1505483, 0, 0
1, 11, 65536, 99209824217, 0, 0
1, 12, 65536, 6146009, 0, 0
1, 13, 65536, 6146009, 0, 0
1, 14, 65536, 6146009, 0, 0
1, 16, 65536, 6146009, 0, 0
1, 17, 65536, 6146009, 0, 0
1, 18, 65536, 6146009, 0, 1
1, 19, 65536, 6146009, 0, 256
1, 20, 65536, 6146009, 0, 0
1, 21, 65536, 6146009, 0, 0
1, 23, 65536, 6146009, 0, 0
1, 24, 65536, 6146009, 1, 0
1, 17, 65536, 6146009, 1, 0
1, 18, 65536, 6146009, 1, 2
1, 19, 65536, 6146009, 1, 512
























 */

