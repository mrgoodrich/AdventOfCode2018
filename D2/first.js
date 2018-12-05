



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
var data = ['bazvmqthjtrnlosiecxyghkwud',
'pazvmqbijirzlosiecxyghkwud',
'pazvtqbmjtrnlosiecxyghkwzd',
'pazvmqbfjtrjlosnlcxyghkwud',
'pazvkqbfjtrtlosiecjyghkwud',
'paztmqbfjtrnbosiecxyglkwud',
'pazvmqbfjtunlosievxmghkwud',
'pazvmqbfjtmngosiecyyghkwud',
'jazvmqbfjtrnlosiecxygikpud',
'pazvqqbfctrnlosimcxyghkwud',
'pazvmqbfjtrnwogiecxyihkwud',
'pazvmqbfjtrqlojiecxeghkwud',
'payvmqbfjtrzlosiecxyghkwuk',
'pkzvmqnfjtrnlosieciyghkwud',
'pazvmqqfjtrnldsiecxyghkwui',
'pazvmqbfttrqlosiecxywhkwud',
'gazvmybfjthnlosiecxyghkwud',
'pazvmqbfjtrnlasiecxygptwud',
'pktvmqbfjtrnwosiecxyghkwud',
'pazvmqwfjtrnlosiecxgghkkud',
'pazvmzkbjtrnlosiecxyghkwud',
'pazvmqbfjtrnloslecxyghuwui',
'pezvmqbfjtrnlesieyxyghkwud',
'cazvmqbfjrrnlosiecxyghkmud',
'pazvmqrfjjrnlosiecxyghkwnd',
'pazvmqbgjtrnlosiecxyphtwud',
'pazvmqbvmtrnlosiecxyghkpud',
'pazdmqbfjtrnlosiecxyuhkpud',
'pazvmqbflnrnloshecxyghkwud',
'pazvvqbfjprilosiecxyghkwud',
'pazvwqbfjtrllosiecxyghknud',
'pazvmqbfjtrnloniecxdghkaud',
'pazvmqbfjtrnlvsuecxynhkwud',
'ptzvmqwfjtrnlosieccyghkwud',
'pkzvmqbjjtrnlosiecryghkwud',
'pazvmqqfjtrexosiecxyghkwud',
'pazgmqbfjtrneoyiecxyghkwud',
'paznmqbfjtrnlosiecxydhkwzd',
'pazvmqbfjtrnaosiwcxsghkwud',
'pazomqbfjxrnlosiewxyghkwud',
'pazsmqbfjprnlosiecxrghkwud',
'pazvmqbfqtrnoosiecxygmkwud',
'aazvmqbfjtrnlosiacxyghjwud',
'pazviqbfjtrnlobiecxygrkwud',
'qazwmqbfjhrnlosiecxyghkwud',
'pazvmqbfftrnlosiqcxygfkwud',
'patvmqbfjtonlosircxyghkwud',
'pazvmqbfjtrnlomaecxyghkpud',
'paztmqbfjtrulossecxyghkwud',
'pazvmqbijtrnlobiecxyghkwkd',
'pazvsqbfjtrnlospecxyghkqud',
'pbzmmqbfjtrnlosiecxyghkwhd',
'pezvkqbfjtenlosiecxyghkwud',
'razvmqbfjkrnlosiecxeghkwud',
'pazcmqbfjtrnloriecxyghkgud',
'pazvmqbfftfnlosiecvyghkwud',
'pazvmqpujtrnlosiepxyghkwud',
'patvgqbfjtrnloslecxyghkwud',
'pazvmqbfltrnlosibcxyghswud',
'pazvmebfjtrnlosaecxyehkwud',
'pazdmqbejtrnlosiecxyghrwud',
'pazvmcbfntrplosiecxyghkwud',
'pszvmqbfjtrnlosivcfyghkwud',
'puzvmqbfjtrnloeiecxyxhkwud',
'pazvmqbfjtrivooiecxyghkwud',
'pazvyqbfjtrngosiwcxyghkwud',
'pauvmqbfjtrnlosimexyghkwud',
'pazvmqbfjtrnwoshecxeghkwud',
'dazvmqbfjtrnloshecxygxkwud',
'pazvmqbfjtrtdosiecxyghvwud',
'pazxmqbfjtrnlosieceyghjwud',
'pazvmqbfjtrnlosihexjghkwud',
'pazvmqbfjsrnlosiecxughiwud',
'phzvcqbfjtrqlosiecxyghkwud',
'pazvmibfjtrnlosjecxxghkwud',
'pazvmqbfjtrbeosiecxlghkwud',
'pazvmqyfjttolosiecxyghkwud',
'fawvmqbfjtrnlosiecxyghkwhd',
'pazvmqbfjprnxosiecxyghkbud',
'macvmqbfjtrnlosiesxyghkwud',
'pazsmqbfjtrflouiecxyghkwud',
'pacvmqbfjtrnltsiecxyghcwud',
'pazvmqbfjtymlosiecxygykwud',
'pazvmqbfjtrclosiecxygukwmd',
'pazvmqbfjtrnlobiecxphhkwud',
'mazvmqbhitrnlosiecxyghkwud',
'pazvmqdtjtrnlrsiecxyghkwud',
'pazvmqbfjgrnllsieczyghkwud',
'pazvmqbfjtrilosiecxxgikwud',
'pazvmqbjjtrnlosreceyghkwud',
'paxvmmbfjtrilosiecxyghkwud',
'pazqmwbfjtrnlowiecxyghkwud',
'pazvmqbfjfrnqosiecxyghkwui',
'pazvmqbfjtrrgosiecxyghswud',
'pazvmqnfjtrnlosiecsyghkwmd',
'paiemqbmjtrnlosiecxyghkwud',
'pazvmqbfdtqnlosiecxyjhkwud',
'pazvmxbfjthndosiecxyghkwud',
'pqzvmqbfjtrnlosiecxbghkzud',
'pagrmqbfjtrnlosiecxygskwud',
'pazamqtfjtrnsosiecxyghkwud',
'pazvmqbfjtrnldshecxyzhkwud',
'pazvmnbfjtrllosieclyghkwud',
'snzvmqbfjnrnlosiecxyghkwud',
'pazvsqbfjdrnlosiecxyghswud',
'pazvmqnfjfrnlosiecsyghkwud',
'pazvmqbfjtrnlosiecxjghowum',
'pazvmqbfjtjnlosieczygfkwud',
'pazvmqbsjtrnloziecxyghkeud',
'pazvxqbgjtrnlooiecxyghkwud',
'pazvmqbfjtrnlooiecxmyhkwud',
'pazvmqbyftrnlosgecxyghkwud',
'pazvmqbfjtrnlosiwcxyqhksud',
'pazvmqkyjtrnlokiecxyghkwud',
'pazfmqbfjtrnlosijcxyohkwud',
'pazvmqbfjtrnlociecxygikcud',
'fazvmqbfjtrnlosiecxyjhkuud',
'pazvmqbojtknlohiecxyghkwud',
'pazvmqbfjtgnlosbecxyghkwux',
'pazvmqbfjtrnlocieckoghkwud',
'pazvdqbfjtrlltsiecxyghkwud',
'pazvmqbfjtsnlfsiecxyglkwud',
'przvpqbfjtrnyosiecxyghkwud',
'pazvmbrfjtrnlosiecxmghkwud',
'dazvmqbfttrnlostecxyghkwud',
'pazvmqbfttdnlosiecxygwkwud',
'pazvmqbvitrnlosieexyghkwud',
'pazvmqbfjhrnlosjecxyvhkwud',
'pazvmqbfstrnlosiecxyggkwpd',
'bazvmqbfjtrnlmsiecxyohkwud',
'patmmqbfjtrnlosizcxyghkwud',
'pazvmqbfwtrglosieqxyghkwud',
'pazvmqbfjtrnlosiecxdhhkwmd',
'pazvmqbfjdrnlosnexxyghkwud',
'oazrrqbfjtrnlosiecxyghkwud',
'pazvmqbfjcrnlosiecxygakwjd',
'pazvmqbfjtrnlosifcxfghkwyd',
'pazvmnbfjtrnlosiecxyahzwud',
'pazvmqbfgtrnlojiecxyghkgud',
'pazvmqbfjtrnlaliecxyghkwuy',
'pazvmqbfjtrnlfsiecrtghkwud',
'pazvmqbkjtrnloswecxdghkwud',
'pazvtqbfjtdnlosiecxyghkwuu',
'pozvmqbfrtrnlosiesxyghkwud',
'payvmqbfjornlossecxyghkwud',
'pazvuqbfjtrnlosiscxyghkpud',
'pgzcmqbfjtrnlotiecxyghkwud',
'pazvvqbfjtrnlobieyxyghkwud',
'pazycqbfjtrnlosiecxyzhkwud',
'pizvdqbfjtrnlosiecxbghkwud',
'pazvmqbfjtrnloqiecxmgtkwud',
'gazvmqbfjtrnlusiecxpghkwud',
'pazvmqdfjtralosiecxyghkwmd',
'pazvmqbfjtmnlosiecxywhawud',
'pazvlqbfjtrnlosqecxyghqwud',
'pazvmqbfjtrnlhsneixyghkwud',
'kazvmqbfjtrqlosimcxyghkwud',
'pazvmwbfjtrclosiecxyghkuud',
'pazvmqjfjtrnlosieckyghpwud',
'pezvmqbgjtrnloseecxyghkwud',
'pazvqqbfjtfnlosvecxyghkwud',
'oazvmqbfjtunlosiecxyghkwad',
'pazvmqbfjtrncoswecxyghfwud',
'pazvyqbfjtrnlosqecxygtkwud',
'pazvmqbfjtrvlzsiecxygwkwud',
'pazvmqbfjjrnlosiekxylhkwud',
'madvmqbfjtrnlosircxyghkwud',
'pazvmybfjtrnlisiecxyghkwbd',
'pazvmqbjjixnlosiecxyghkwud',
'pazvmqefjtrnloqiecxyghhwud',
'pazveqbfjtrnlosiecgygzkwud',
'pazvmqbfjtrxlosiecxmgwkwud',
'uazvmqufjtrnlosiecxyghkwuo',
'pasymqbfjtrnlosiecxyghowud',
'pazvmqbfjtlnlpsiecxyghswud',
'pnzvmqbfjprnloszecxyghkwud',
'pafjmqcfjtrnlosiecxyghkwud',
'pazvmqxfbtrnloqiecxyghkwud',
'pazvmzbfjtrnposiccxyghkwud',
'pazvmqbfjotulosiecxyghkwud',
'pazvmqbfotrnlosgecxykhkwud',
'przvmqbfjtrnlosiecxyqhkwcd',
'pazvmqbfjtsnlogiecxyyhkwud',
'pazvmqbfrtrnlzsiecxyghkwug',
'pazvmqbfjtrnlosiecxzgukwuo',
'pqzvmqbqjtrnlosdecxyghkwud',
'pazvmqbfjtqqlosiecxughkwud',
'pazvmqbfjtrnlosiedhyphkwud',
'pazsmqbcutrnlosiecxyghkwud',
'pazvmqbgrtrnlosiecxyghpwud',
'pazemqbfjtznlosiecxyghkvud',
'pazvkqbfjtrilosiecxyghkwod',
'pfzvmqbfjtrnlopiecxygjkwud',
'pazvmqvfjtreloniecxyghkwud',
'pazvmqbfjernljsiecxgghkwud',
'pazvmqikjtrnlosiecxyghqwud',
'pazvmqbfjtrnpesoecxyghkwud',
'fazvmqbfjtrnlosihchyghkwud',
'pazvmqbfjtgnloanecxyghkwud',
'pazvmqsfjqrnlosiecxychkwud',
'parvmqbfjtrnlosiecxygfuwud',
'przvmqbfjtrhlosihcxyghkwud',
'pazvmqbcjtrnlosimcxgghkwud',
'pazvmqbfjtrnlosceciyjhkwud',
'pazvkqbfjtrylosivcxyghkwud',
'pazvmqbfjtrnlgsieoxyghdwud',
'pazvmqnfstrnlowiecxyghkwud',
'pazvmqbfdtrnlosieumyghkwud',
'pazvmqbfjtrnlosyecxfghkwul',
'pazvmqbfjtrclosivcxyghkcud',
'pazjmqbfjtrnlosiecxygokwkd',
'hazvmqbfjtrflosiecxzghkwud',
'wazvmqbfjtrnlomiecxyphkwud',
'yazvmqbfjirnkosiecxyghkwud',
'pczvmqbfjtrnlohiecxyghkwpd',
'pazvmqbfotrbeosiecxlghkwud',
'pazvmqbfjtrplosiecxynhzwud',
'paxvbqbwjtrnlosiecxyghkwud',
'pazvmqvfjtrnlosiecbyghqwud',
'pazjmqbfjtrnlosiecxoghkwed',
'pazvmqbfjtreljsitcxyghkwud',
'mazamqbfjtrnlosiecxoghkwud',
'pazvmqbfjjrnposiscxyghkwud',
'pbrvmqbfjtrnloliecxyghkwud',
'pazvmqbfjtrnlosiecxgghkyyd',
'pmzvmqbfntrnlosiecxyghkwuw',
'pazvzqbfjtrnlosienxyghzwud',
'pazvmqifjtvnlosrecxyghkwud',
'tazvmqbhjtjnlosiecxyghkwud',
'pazvmqbfjtlnxosiecxyghkwuo',
'pazvmqbfjennlosiecxyghkwxd',
'pahvmqbfjhrnlosiecxythkwud',
'pazvmlkfjtrnlxsiecxyghkwud',
'pfzvmqbojtrnlosieciyghkwud',
'pazvbqbfjtrollsiecxyghkwud',
'eazvmqbfjtrnlosiecayghkoud',
'pazvmqbfjtjnlvsiecxyghkwsd',
'pazvoqbojtrnlosiecfyghkwud',
'pazvmqbfjtuslosiecxyghksud',
'pazvmqbfjnrnlosiedxyghkwup',
'pazvmqbjjtrnlosieaxyghdwud',
'pazccqbfjtrhlosiecxyghkwud',
'pbzvmqkfjtrnlosievxyghkwud',
'pazvmqrljtrnlosiscxyghkwud',
'pazvmqbfjfoqlosiecxyghkwud',
'pazcmqbfjtrnlosiecxyihkwuf',
'pszvmqbfjtrnnosiacxyghkwud',
'aazvmqbfjtrnlosieyxyghkwld',
'pazvrqbfntrnlosiycxyghkwud',
'pkzvoqbfjtrnlosiecxyghxwud'];

var two = 0, three = 0;

for (var ndx in data) {
  var val = data[ndx];

  var letters = {};


  for (var cndx in val) {
    var letter = val[cndx];

    var exist = letters[letter];
    if (!exist) {
      exist = 0;
    }
    exist++;
    letters[letter] = exist;
  }
  var increasedTwo = false, increasedThree = false;
  for (var key in letters) {
    if (letters[key] == 2 && !increasedTwo) {
      two++;
      increasedTwo = true;
    } else if (letters[key] == 3 && !increasedThree) {
      three++;
      increasedThree = true;
    }
  }
}

console.log(three * two);