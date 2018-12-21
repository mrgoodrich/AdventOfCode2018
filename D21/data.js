exports.test = [];

exports.real = [
   'seti 123 0 3', // set mem reg 3 to 123
   'bani 3 456 3', // set mem reg 3 to mem reg 3 & 456
   'eqri 3 72 3', // if mem reg 3 eq 72, mem 3 is 1 else 0
   'addr 3 1 1', // set mem reg 1 to mem reg 1 plus mem reg 3
   'seti 0 0 1', // set mem reg 1 to 0
   'seti 0 1 3', // set mem reg 3 to 0 // probably reset after confirm & works
   'bori 3 65536 2', // set mem reg 2 to mem reg 3 | 65536 (x10000)
   'seti 1505483 6 3', // set mem reg 3 to 1505483 (101101111100011001011)
   'bani 2 255 4',  // set mem reg 4 to mem reg 2 & 255
   'addr 3 4 3', // set mem reg 3 to mem reg 3 + mem reg 4
   'bani 3 16777215 3', // set mem reg 3 to mem reg 3 & 16777215 (111111111111111111111111)
   'muli 3 65899 3', // set mem reg 3 to mem reg 3 * 65899
   'bani 3 16777215 3', // set mem reg 3 to mem reg 3 & 16777215 (111111111111111111111111)
   'gtir 256 2 4', // if 256 > mem reg 2 set mem reg 4 to 1 else 0
   'addr 4 1 1', // set meme reg 1 to mem reg 1 + mem reg 4
   'addi 1 1 1', // set mem reg 1 to  mem reg 1 + 1
   'seti 27 6 1', // set mem reg 1 to 27
   'seti 0 3 4', // set mem reg 4 to 0
   'addi 4 1 5', // set mem reg 5 to mem reg 4 + 1
   'muli 5 256 5', // set reg 5 to mem reg 5 * 256
   'gtrr 5 2 5', // if mem reg 5 > mem reg 2 set mem reg 5 to 1 else 0
   'addr 5 1 1', // set mem reg 1 to mem reg 5 + mem reg 1
   'addi 1 1 1', // set mem reg 1 to mem reg 1 + 1
   'seti 25 4 1', // set mem reg 1 to 25
   'addi 4 1 4', // set mem reg 4 to mem reg 4 + 1
   'seti 17 3 1', // set mem reg 1 to 17
   'setr 4 1 2', // set mem reg 2 to mem reg 4
   'seti 7 4 1', // set mem reg 1 to 7
   'eqrr 3 0 4', // if mem reg 3 eq mem reg 0 then mem reg 4  = 1 else 0
   'addr 4 1 1', // set mem reg 1 to mem reg 4 + mem reg 1
   'seti 5 9 1']; // set mem reg 1 to 5

/*

ip
 0   r3 = 123    (1111011)
 1   r3 &= 456 (111001000) -> 1001000 = 72
 2   r3 = (r3 == 72) ? 1 : 0 -> r3 = 1
 3   r1 += r3 // pointer += 1 or 0, if 1
 4   r1 = 0 // reset to 0
 5   r3 = 0    // reset r3

 6   r2 = r3 | 65536       (10000000000000000) // get 5th bit in r3 into r2
 7   r3 = 1505483      (101101111100011001011)
 8   r4 = r2 & 255 // get first byte of r2 into r4
 9   r3 += r4
10   r3 &= 16777215 (111111111111111111111111)
11   r3 *= 65899           (10000000101101011)
12   r3 &= 16777215 (111111111111111111111111)
13   r4 = (256 > r2) ? 1 : 0       (100000000)
14   r1 += 4                           + (100)
15   r1++                                + (1)
16   r1 = 27                           (11011)
17   r4 = 0
18   r5 = r4 + 1                         + (1)
19   r5 *= 256                  *= (100000000)
20   reg5 = (reg5 > reg2) ? 1 : 0
21   r1 += r5
22   r1 += 1
23   r1 = 25
24   r4++
25   r1 = 17
26   r2 = r4
27   r1 = 7
28   r4 = (r3 == r0) ? 1 : 0 // only use of r0, so r3 val at checks will cause halt
29   r1 = r4 + r1 // if r3 == r0, terminate the program
30   r1 = 5 // loop back to start of non-validation





 */

