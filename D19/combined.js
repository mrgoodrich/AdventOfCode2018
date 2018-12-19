// var data = require('./data').test;
var data = require('./data').real;

const PROBLEM_PART = 2;

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

// 1 2 4 5 10 20 57 (183 - 89).94 (371 - 183).188 (606 - 371).235

//https://www.calculatorsoup.com/calculators/math/factors.php

if (PROBLEM_PART === 2) {
   console.log('Part 2 Solution: ' + [1, 2, 4, 5, 10, 20, 43, 86, 172, 215, 430, 860, 12269, 24538, 49076, 61345, 122690, 245380, 527567, 1055134, 2110268, 2637835, 5275670, 10551340]
      .reduce((sum, a) => sum + a));
   exit();
}

var memory = {};
for (var memNdx = 0; memNdx < 6; memNdx++) {
   memory[memNdx] = 0;
}


if (PROBLEM_PART === 2) {
   memory[0] = 1;
}

var instrRegister = 3;
// var isBound;
var instrPointer = 0;

console.log(data.length);

var numInstr = 0;
while (instrPointer < data.length) {
   // if (instrPointer > data.length) {
   //    console.log('end, ' + memory[0]);
   //    exit();
   // }
   // console.log(memory);
   var thisInstruction = data[instrPointer];

   //    instrRegister = thisInstruction.split(' ')[1];
   //    // isBound = true;
   //    console.log('set to reg ' + instrRegister)


      let operationFields = thisInstruction.split(' ');
      let op = operations.filter(op => thisInstruction.startsWith(op.name))[0];
      let a = parseInt(operationFields[1]);
      let b = parseInt(operationFields[2]);
      let c = parseInt(operationFields[3]);
      // console.log(thisInstruction);

      // if (isBound) {



      memory[instrRegister] = instrPointer;
         // console.log('setting reg ' + instrRegister + ' to ' + instrPointer + ' through binding');
      // }

      op.operation(a,b,c);


      // if (isBound) {
      //    console.log('writing ' + memory[instrRegister] + ' back to reg ' + instrPointer + ' through bind');
         instrPointer = memory[instrRegister];
      // }

      instrPointer++;

   // }

   // console.log('instr ends at ' + instrPointer);
   if (numInstr++ % 100000 === 0) {
      console.log(memory);
      // console.log(numInstr);
      // console.log(instrPointer);
   }

}

console.log('Part 1 Solution: ' + memory[0]);


