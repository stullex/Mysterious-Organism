// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//our Specimen Factory
const pAequorFactory = (num, arr) => {
  return {
    specimen: num,
    dna: arr,

    mutate() {
      //mutation to get a slightly different DNA
      let ranNum = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[ranNum] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[ranNum] = newBase;
      return this.dna;
    }, //comparsion method to get the percentual difference between DNA x and y
    compareDNA(pAequor) {
      let matches = 0;
      let length = this.dna.length;
      for (let i = 0; i < length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          matches++;
        }
      }
      const simliaritys = (100 * matches) / length;
      console.log(
        ` Specimen ${this.specimen} and specimen ${
          pAequor.specimen
        } have ${simliaritys.toFixed(2)} % DNA in common`
      );
    }, //method to determin which DNA has a better chance to survive
    willLikelySurvive() {
      let countG = 0;
      let countC = 0;
      for (let i = 0; i < this.dna.length; i++) {
        let testCount = this.dna[i];
        if (testCount === "G") {
          countG++;
        } else if (testCount === "C") {
          countC++;
        }
      }
      if (countC >= 9 || countG >= 9) {
        return true;
      } else {
        return false;
      }
    },
  };
};

//the great DNA Filter
const SurvivorDNA = (testArr) => {
  trueArr = [];
  if (testArr.willLikelySurvive() === true) {
    trueArr.push(testArr.dna);
    return "This is a perfect Test Subject:" + "\n" + trueArr;
  } else {
    return "This Species probably won't make it :(";
  }
};

//specimen 1 + DNA
const test1 = pAequorFactory(1, mockUpStrand());
console.log(test1, "\n");

//specimen 2 + DNA
const test2 = pAequorFactory(2, mockUpStrand());
console.log(test2);

//comparsion of matching DNA strands in %
test1.compareDNA(test2);

//the mutated DNA
const test3 = test1.mutate();
console.log(`Mutated Array ${test3}`, "\n");

//logs a boolean if the G or C strand-count is equal to, or higher than 9
const survivors = test1.willLikelySurvive();
console.log("Will this specimen survive?: " + survivors, "\n");

//tests the DNA if it is more likely to survive and logs the DNA Array to the console
console.log(SurvivorDNA(test1));

//Zeile 100 :)
