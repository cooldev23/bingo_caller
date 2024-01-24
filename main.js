const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      error: '',
      getBallButtonText: 'Start Game',
      headerTitle: 'Welcome to the Bingo Parlor!',
      specialMessage: 'Happy Birthday, Amabel!',
      calledNumber: '',
      gameData: 
      [
        {
          letter: 'B',
          hasNumbersLeftUnpicked: true,
          numbers: [],
          letterClasses: {
            border: '1px solid lightpink',
            backgroundColor: 'lightpink'
          }
        },
        {
          letter: 'I',
          hasNumbersLeftUnpicked: true,
          numbers: [],
          letterClasses: {
            border: '1px solid lavender',
            backgroundColor: 'lavender'
          }
        },
        {
          letter: 'N',
          hasNumbersLeftUnpicked: true,
          numbers: [],
          letterClasses: {
            border: '1px solid #FFFBB8',
            backgroundColor: '#FFFBB8'
          }
        },
        {
          letter: 'G',
          hasNumbersLeftUnpicked: true,
          numbers: [],
          letterClasses: {
            border: '1px solid lightblue',
            backgroundColor: 'lightblue'
          }
        },
        {
          letter: 'O',
          hasNumbersLeftUnpicked: true,
          numbers: [],
          letterClasses: {
            border: '1px solid lightgreen',
            backgroundColor: 'lightgreen'
          }
        }
      ]
    }
  },
  methods: {
    makePick() {
      // no letters, no game
      if (this.haveAllNumbersBeenCalled()) {
        this.getBallButtonText = 'Game Over';
        this.error = 'Game Over';
        return;
      }

      // set variables
      let letterObj = this.getLetterObject(),
          numberObj = this.getNumberObject(letterObj);

      // if all numbers have been picked for a certain letter set value and show warning/error
      if (letterObj.numbers.every((item) => item.isPicked)) {
        letterObj.hasNumbersLeftUnpicked = false;
        this.error = `All ${letterObj.letter} numbers have been picked`;
        this.calledNumber = '';
        return;
      }

      // set called number, error to empty and number as picked
      this.calledNumber = letterObj.letter + numberObj.num;
      this.error = '';
      numberObj.isPicked = true;

      // change button text if the game has started
      this.getBallButtonText = 'Get BINGO Ball'
    },
    populateData() {
      // reset each letter's numbers
      this.resetNumbers();

      // loop to set 15 numbers for each letter
      for (let i = 0; i < this.gameData.length; i++) {
        var total = (i + 1) * 15;
        let j = i === 0 ? 1 : i * 15 + 1;
        for (j; j <= total; j++) {
          this.gameData[i].numbers.push({num: j, isPicked: false});
        }
      }

      // reset other properties to initial state
      this.error = '';
      this.calledNumber = '';
      this.getBallButtonText = 'Start Game';
    },
    haveAllNumbersBeenCalled() {
      for (const item of this.gameData) {
        if (item.numbers.filter((obj) => !obj.isPicked).length) {
          return false;
        }
      }
      return  true;
    },
    getLetterObject() {
      return this.gameData[Math.floor(Math.random() * this.gameData.length)];
    },
    getNumberObject(obj) {
      let availableNumbers = obj.numbers.filter((item) => !item.isPicked), 
          count = availableNumbers.length,
          numIndex = Math.floor(Math.random() * count);

      return availableNumbers[numIndex];
    },
    resetNumbers() {
      this.gameData.forEach(function(item) {
        item.numbers = []
      });
    }
  },
  created() {
    this.populateData();
  }
});
app.mount('#app');