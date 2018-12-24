// let data = require('./data').test;
let data = require('./data').real;

const IMMUNE = 'immune';
const INFECTION = 'infection';

function validateType(type) {
   if (['bludgeoning', 'cold', 'fire', 'radiation', 'slashing'].indexOf(type) === -1) {
      console.log('Invalid type: ' + type);
      exit();
   }
}

data.forEach(g => {
   g.immunities.forEach(immunity => {
      validateType(immunity);
   });
   g.weaknesses.forEach(weakness => {
      validateType(weakness);
   });
   validateType(g.attackType);
   if (g.initiative === undefined) {
      console.log('No initiative');
      exit();
   }
   if (g.attack === undefined) {
      console.log('No attack');
      exit();
   }
   if (g.units === undefined) {
      console.log('No units');
      exit();
   }
   if (g.hp === undefined) {
      console.log('No hp');
      exit();
   }
   if (g.team !== 'infection' && g.team !== 'immune') {
      console.log('Invalid team: ' + g.team);
      exit();
   }
   if (g.units <= 0) {
      console.log('Invalid units: ' + g.units);
      exit();
   }
   if (g.hp <= 0) {
      console.log('Invalid hp: ' + g.hp);
      exit();
   }
   if (g.attack <= 0) {
      console.log('Invalid attack: ' + g.attack);
      exit();
   }
});

function copyData() {
   let copy = [];
   data.forEach(g => {
      let copyGroup = {};
      copyGroup.id = g.id;
      copyGroup.team = g.team;
      copyGroup.units = g.units;
      copyGroup.hp = g.hp;
      copyGroup.immunities = g.immunities.slice(0);
      copyGroup.weaknesses = g.weaknesses.slice(0);
      copyGroup.attack = g.attack;
      copyGroup.attackType = g.attackType;
      copyGroup.initiative = g.initiative;
      if (copyGroup.team === IMMUNE) {
         copyGroup.attack += boost;
      }
      copy.push(copyGroup);
   });
   return copy;
}

let boost = -1;
let groups = [];
while (!getArmyGroups(IMMUNE).length || getArmyGroups(INFECTION).length) {
   boost++;
   groups = copyData();
   let fightNum = 0;
   let prevCombLeft = -1, occur = 0;
   while (getArmyGroups(IMMUNE).length && getArmyGroups(INFECTION).length && occur < 5) {
      fightNum++;
      // console.log('fight num ' + fightNum);
      runTargetPhase();
      runAttackPhase();
      clearTargetsAndRemoveDefeated();
      // console.log(`  remaining inf: ${getRemainingUnits(INFECTION)}`);
      // console.log(`  remaining imm: ${getRemainingUnits(IMMUNE)}`);
      let combLeft = getRemainingUnits(INFECTION) + getRemainingUnits(IMMUNE);
      if (prevCombLeft === combLeft) {
         occur++;
      } else {
         prevCombLeft = combLeft;
      }
   }

   if (!boost) {
      console.log(`Part one: ${getRemainingUnits(INFECTION) + getRemainingUnits(IMMUNE)}`)
   }

   // if (getArmyGroups(IMMUNE).length) {
   //    console.log(`For boost ${boost} ended with immune ${getRemainingUnits(IMMUNE)}`);
   // }
   // if (getArmyGroups(INFECTION).length) {
   //    console.log(`For boost ${boost} ended with infection ${getRemainingUnits(INFECTION)}`);
   // }
}

console.log('Part two: ' + getRemainingUnits(IMMUNE));







function getRemainingUnits(team) {
   let teamGroups = groups.filter(g => !team || g.team === team);
   if (!teamGroups.length) {
      return 0;
   }
   return teamGroups.map(g => g.units).reduce((a, sum) => a + sum);
}

function runTargetPhase() {
   let groupsByTargetOrder = groups.sort(pickTargetOrder);
   // console.log(groupsByTargetOrder.map(g => g.id));
   for (let targetNdx = 0; targetNdx < groupsByTargetOrder.length; targetNdx++) {
      let targetingGroup = groupsByTargetOrder[targetNdx];
      let toAttack = findBestTarget(targetingGroup);
      if (toAttack) {
         toAttack.targeted = true;
         targetingGroup.toAttack = toAttack;
      }
   }
}

function runAttackPhase() {
   let groupsByAttackOrder = groups.sort(attackOrder);
   for (let attackNdx = 0; attackNdx < groupsByAttackOrder.length; attackNdx++) {
      let attackingGroup = groupsByAttackOrder[attackNdx];
      if (attackingGroup.toAttack && attackingGroup.units) {
         let defendingGroup = attackingGroup.toAttack;
         // let initialUnits = defendingGroup.units;
         let calculatedPower = getCalculatedPower(attackingGroup, defendingGroup);
         // console.log('attGroup: ' + attackingGroup.id + ', defGroup: ' + defendingGroup.id + 'power: ' + calculatedPower);
         defendingGroup.units -= parseInt(calculatedPower / (defendingGroup.hp));
         if (defendingGroup.units < 0) {
            defendingGroup.units = 0;
         }
         // console.log(`${attackingGroup.id} attacks ${defendingGroup.id}, killing ${initialUnits - defendingGroup.units} units`);
      }
   }
}

function clearTargetsAndRemoveDefeated() {
   groups = groups.filter(group => group.units);
   groups.forEach(group => {
      group.toAttack = null;
      group.targeted = false;
   });
}

function getArmyGroups(team) {
   return groups.filter(group => group.team === team);
}

function findBestTarget(attacking) {
   let attackableGroups = getAttackableGroups(attacking);
   // console.log(attackableGroups.map(g => g.id));
   let attackableSorted = attackableGroups.sort((a, b) => {
      let attackVersusA = getCalculatedPower(attacking, a);
      let attackVersusB = getCalculatedPower(attacking, b);
      if (attackVersusA > attackVersusB) {
         return -1;
      } else if (attackVersusB > attackVersusA) {
         return 1;
      }
      let aEffPow = getEffectivePower(a);
      let bEffPow = getEffectivePower(b);
      if (aEffPow > bEffPow) {
         return -1;
      } else if (bEffPow > aEffPow) {
         return 1;
      }

      return b.initiative - a.initiative;
   });
   if (attackableSorted.length) {
      return attackableSorted[0];
   }
   return null;
}

function getCalculatedPower(attacking, defending) {
   let calculatedPower = attacking.attack * attacking.units;
   // console.log('init power: ' + calculatedPower);
   if (defending.weaknesses.indexOf(attacking.attackType) !== -1) {
      calculatedPower *= 2;
   }
   if (defending.immunities.indexOf(attacking.attackType) !== -1) {
      calculatedPower = 0;
   }
   // console.log(defending.weaknesses);
   // console.log(attacking.attackType);
   return calculatedPower;
}

function getAttackableGroups(group) {
   return groups.filter(g => {
      return g.team !== group.team
         && !g.targeted
         && getCalculatedPower(group, g);
   });
}

function pickTargetOrder(a, b) {
   let aEffPow = getEffectivePower(a);
   let bEffPow = getEffectivePower(b);
   if (aEffPow > bEffPow) {
      return -1;
   } else if (bEffPow > aEffPow) {
      return 1;
   }
   return b.initiative - a.initiative;
}

function attackOrder(a, b) {
   return b.initiative - a.initiative;
}

function getEffectivePower(group) {
   return group.units * group.attack;
}

/*
Guesses

5870 too low

 */