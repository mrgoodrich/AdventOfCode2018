// var data = require('./data').test;
var data = require('./data').real;

var memory = {};

var operations = [
   {
      name: 'addr',
      operation: (a,b,c) => {
         memory[c] = memory[a] + memory[b];
      }
   },
   {
      name: 'addi',
      operation: (a,b,c) => {
         memory[c] = memory[a] + b;
      }
   },
   {
      name: 'mulr',
      operation: (a,b,c) => {
         memory[c] = memory[a] * memory[b];
      }
   },
   {
      name: 'muli',
      operation: (a,b,c) => {
         memory[c] = memory[a] * b;
      }
   },
   {
      name: 'banr',
      operation: (a,b,c) => {
         memory[c] = memory[a] & memory[b];
      }
   },
   {
      name: 'bani',
      operation: (a,b,c) => {
         memory[c] = memory[a] & b;
      }
   },
   {
      name: 'borr',
      operation: (a,b,c) => {
         memory[c] = memory[a] | memory[b];
      }
   },
   {
      name: 'bori',
      operation: (a,b,c) => {
         memory[c] = memory[a] | b;
      }
   },
   {
      name: 'setr',
      operation: (a,b,c) => {
         memory[c] = memory[a];
      }
   },
   {
      name: 'seti',
      operation: (a,b,c) => {
         memory[c] = a;
      }
   },
   {
      name: 'gtir',
      operation: (a,b,c) => {
         if (a > memory[b]) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      }
   },
   {
      name: 'gtri',
      operation: (a,b,c) => {
         if (memory[a] > b) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      }
   },
   {
      name: 'gtrr',
      operation: (a,b,c) => {
         if (memory[a] > memory[b]) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      }
   },
   {
      name: 'eqir',
      operation: (a,b,c) => {
         if (a === memory[b]) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      }
   },
   {
      name: 'eqri',
      operation: (a,b,c) => {
         if (memory[a] === b) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      }
   },
   {
      name: 'eqrr',
      operation: (a,b,c) => {
         if (memory[a] === memory[b]) {
            memory[c] = 1;
         } else {
            memory[c] = 0;
         }
      }
   },
];

var threePlusBehave = 0;

for (var sampleNdx = 0; sampleNdx < data.length; sampleNdx++) {
   var sample = data[sampleNdx];
   var operationArr = sample.operation.split(' ');
   var opcode = operationArr[0];
   var a = parseInt(operationArr[1]);
   var b = parseInt(operationArr[2]);
   var c = parseInt(operationArr[3]);

   var numValid = 0;

   for (var operationNdx = 1; operationNdx < operations.length; operationNdx++) {
      memory = {};

      var operation = operations[operationNdx];
      console.log(operation.name);

      for (var beforeNdx = 0; beforeNdx < sample.before.length; beforeNdx++) {
         memory[beforeNdx] = sample.before[beforeNdx];
      }

      operation.operation(a,b,c);

      var isValid = true;
      for (var afterNdx = 0; afterNdx < sample.after.length; afterNdx++) {
         if (memory[afterNdx] !== sample.after[afterNdx]) {
            isValid = false;
         }
      }

      if (isValid) {
         console.log('isvalid');
         numValid++;
      }
   }

   if (numValid >= 3) {
      console.log('more than 3');
      threePlusBehave++;
   }
}

console.log(threePlusBehave);

/* GUESSES



*/
