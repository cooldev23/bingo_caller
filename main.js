const { createApp, ref, onBeforeMount } = Vue;
const app = createApp({
  setup() {
    // data
    const error = ref(''),
      getBallButtonText = ref('Start Game'),
      headerTitle = ref('Welcome to the Bingo Parlor!'),
      specialMessage = ref('Happy Birthday, Amabel!'),
      calledNumber = ref(''),
      gameData = ref([
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
      ]);

    // named functions
    function makePick() {
      // no letters, no game
      if (haveAllNumbersBeenCalled()) {
        getBallButtonText.value = 'Game Over';
        error.value = 'Game Over';
        return;
      }

      // set variables
      let letterObj = getLetterObject(),
          numberObj = getNumberObject(letterObj);

      // if all numbers have been picked for a certain letter set value and show warning/error
      if (letterObj.numbers.every((item) => item.isPicked)) {
        letterObj.hasNumbersLeftUnpicked = false;
        error.value = `All ${letterObj.letter} numbers have been picked`;
        calledNumber.value = '';
        return;
      }

      // set called number, error to empty and number as picked
      calledNumber.value = letterObj.letter + numberObj.num;
      error.value = '';
      numberObj.isPicked = true;

      // change button text if the game has started
      getBallButtonText.value = 'Get BINGO Ball'
    }
    function populateData() {
      // reset each letter's numbers
      resetNumbers();

      // loop to set 15 numbers for each letter
      for (let i = 0; i < gameData.value.length; i++) {
        var total = (i + 1) * 15;
        let j = i === 0 ? 1 : i * 15 + 1;
        for (j; j <= total; j++) {
          gameData.value[i].numbers.push({num: j, isPicked: false});
        }
      }

      // reset other properties to initial state
      error.value = '';
      calledNumber.value = '';
      getBallButtonText.value = 'Start Game';
    }

    function haveAllNumbersBeenCalled() {
      for (const item of gameData.value) {
        if (item.numbers.filter((obj) => !obj.isPicked).length) {
          return false;
        }
      }

      return  true;
    }

    function getLetterObject() {
      let letter = gameData.value[Math.floor(Math.random() * gameData.value.length)];
      if (letter.numbers.every((obj) => obj.isPicked)) {
        getLetterObject();
      }
      return  letter;
    }

    function getNumberObject(obj) {
      let availableNumbers = obj.numbers.filter((item) => !item.isPicked), 
          count = availableNumbers.length,
          numIndex = Math.floor(Math.random() * count);
    
      return availableNumbers[numIndex];
    }

    function resetNumbers() {
      gameData.value.forEach(function(item) {
        item.numbers = []
      });
    }

    // lifecycle hooks
    onBeforeMount(() => {
      populateData();
    })

    // expose data and methods
    return {
      error, getBallButtonText, headerTitle, specialMessage, calledNumber, gameData, makePick, populateData
    }
  }
});
app.mount('#app');