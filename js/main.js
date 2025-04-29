/*----- constants -----*/
const maxGuesses = 6;
const wordLength = 5;

/*----- state variables -----*/
let secretWord;
let guesses; // array of guesses → each guess is an array of letters
let currentGuess; // array of letters currently being typed
let currentRow;
let gameOver;

/*----- cached elements -----*/
const boardEl = document.getElementById('board');
const keyboardEl = document.getElementById('keyboard');
const messageEl = document.querySelector('h1');

/*----- event listeners -----*/
keyboardEl.addEventListener('click', handleKeyClick);

/*----- functions -----*/

init();

function init() {
  secretWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
  guesses = [];
  currentGuess = [];
  currentRow = 0;
  gameOver = false;
  messageEl.textContent = '';
  render(); // this will call renderBoard(), which builds and shows the board
}

function handleKeyClick(evt) {
  if (gameOver) return;

  const clicked = evt.target;
  if (clicked.tagName !== 'BUTTON') return;

  const letter = clicked.textContent;

  if (letter === 'ENTER') {
    submitGuess();
  } else if (letter === 'DELETE') {
    deleteLetter();
  } else if (/^[A-Z]$/.test(letter)) {
    addLetter(letter);
  }

  render();
}

function addLetter(letter) {
  if (currentGuess.length < wordLength) {
    currentGuess.push(letter);
  }
}

function deleteLetter() {
  currentGuess.pop();
}

function submitGuess() {
  if (currentGuess.length !== wordLength) return;

  const guessWord = currentGuess.join('');
  guesses.push([...currentGuess]);

  if (guessWord === secretWord) {
    messageEl.textContent = 'You Win!';
    gameOver = true;
  } else if (guesses.length === maxGuesses) {
    messageEl.textContent = `You Lose! The word was ${secretWord}`;
    gameOver = true;
  }

  currentGuess = [];
  currentRow++;
}

function render() {
  renderBoard();
}

function renderBoard() {
  let html = '';

  // 1. Render all submitted guesses
  guesses.forEach((guessArr, rowIdx) => {
    guessArr.forEach((letter, colIdx) => {
      let bgColor = 'lightgray';
      if (letter === secretWord[colIdx]) {
        bgColor = 'green';
      } else if (secretWord.includes(letter)) {
        bgColor = 'goldenrod';
      }

      html += `<div class="tile" style="background-color:${bgColor};">${letter}</div>`;
    });
  });

  // 2. Render current typing row
  for (let i = 0; i < wordLength; i++) {
    const letter = currentGuess[i] || '';
    html += `<div class="tile">${letter}</div>`;
  }

  // 3. Fill the rest of the board with empty tiles
  const totalTiles = maxGuesses * wordLength;
  const filledTiles = guesses.length * wordLength + wordLength;
  const remainingTiles = totalTiles - filledTiles;

  for (let i = 0; i < remainingTiles; i++) {
    html += `<div class="tile"></div>`;
  }

  // 4. Apply all the HTML to the board
  boardEl.innerHTML = html;
}



