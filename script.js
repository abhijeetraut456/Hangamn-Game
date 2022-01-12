const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');

const popupContainer = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-btn');

const notification = document.getElementById('notification-container');

const figureParts = document.querySelectorAll('.figure-parts');

//Data
const words = ['programming', 'interface', 'wizard', 'application'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// console.log(selectedWord);

//Show hidden word
const displayWord = () => {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ''
        }</span>`
    )
    .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerHTML = 'Congratulation! You won 😃 ';
    popupContainer.style.display = 'flex';
  }
};

displayWord();

//Show notification
const showNotification = () => {
  notification.classList.add('show');
  setTimeout(() => notification.classList.remove('show'), 2000);
};

// update wrong wrongLetters
const updateWrongLettersEl = () => {
  //Display wrong letter
  wrongLettersEl.innerHTML = ` 
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  //Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerHTML = 'Unfortunately you lost 😕';
    popupContainer.style.display = 'flex';
  }
};
console.log(figureParts.length);

//keydown letter press
window.addEventListener('keydown', (e) => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//Restart play again game

playAgainBtn.addEventListener('click', () => {
  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popupContainer.style.display = 'none';
});
