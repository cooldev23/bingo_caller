const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      error: '',
      getBallButtonText: 'Start Game',
      calledNumber: '',
      gameData: 
      [
        {
          letter: 'B',
          stillHasNumbers: true,
          numbers: []
        },
        {
          letter: 'I',
          stillHasNumbers: true,
          numbers: []
        },
        {
          letter: 'N',
          stillHasNumbers: true,
          numbers: []
        },
        {
          letter: 'G',
          stillHasNumbers: true,
          numbers: []
        },
        {
          letter: 'O',
          stillHasNumbers: true,
          numbers: []
        }
      ],
      allNumbers: [],
      numbersCalled: [],
    }
  },
  methods: {
    makePick() {
      // set variables
      let randNum = Math.floor(Math.random() * this.letters.length),
        letter = this.letters[randNum],
        count = this[letter].length,
        numIndex = Math.floor(Math.random() * count),
        number = this[letter][numIndex];

      // no letters, no game
      if (!this.letters.length) {
        this.error = 'Game Over';
        return;
      }

      /* if all numbers have been removed for a certain letter
      remove it and show warning/error */
      if (!count) {
        this.letters.splice(randNum,1);
        this.error = `All ${letter} numbers have been picked`;
        this.calledNumber = '';
        return;
      }

      /* perform operations to remove number from parent letter (i.e. B12, G63),
      and add to array */
      this[letter].splice(numIndex,1);
      this.calledNumber = letter + number;
      this.numbersCalled.push(this.calledNumber);
      this.error = '';
      this.allNumbers[number-1].isPicked = true;

      // change button text if the game has started
      if (this.numbersCalled.length) {
        this.getBallButtonText = 'Get BINGO Ball'
      }
    },
    populateData() {
      // set letters property
      // this.letters = ["B", "I", "N", "G", "O"];

      // loop to set 15 numbers for each letter
      for (let i = 0; i < this.gameData.length; i++) {
        var total = (i + 1) * 15;
        let j = i === 0 ? 1 : i * 15 + 1;
        for (j; j <= total; j++) {
          this.gameData[i].numbers.push(j);
        }
      }

      // reset other properties to initial state
      this.error = '';
      this.numbersCalled = [];
      this.calledNumber = '';
      this.allNumbers.forEach(function(item,index) {
        item.isPicked = false;
      })
    },
    populateAllNumbers() {
      for (let i = 1; i <= 75; i++) {
        this.allNumbers.push({num: i, isPicked: false});
      }
    }
  },
  created() {
    this.populateAllNumbers();
    this.populateData();
  }
});
app.mount('#app');