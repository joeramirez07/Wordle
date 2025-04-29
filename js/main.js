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
keyboardEl.addEventListener('click', keyboardClick);


/*----- functions -----*/

init();

function init() {
  secretWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
  guesses = [];
  currentGuess = [];
  currentRow = 0;
  gameOver = false;
  messageEl.textContent = '';
  render(); 
}

function keyboardClick(evt) {
    if (gameOver) return;
  
    const button = evt.target;
    if (button.tagName !== 'BUTTON') return;
  
    const key = button.textContent;
  
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'DELETE') {
      deleteLetter();
    } else {
      addLetter(key);
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
    // Don't submit unless 5 letters have been typed
    if (currentGuess.length < wordLength) return;
  
    // Turn the letter array into one string 
    const guessWord = currentGuess.join('');
  
    // Save this guess to the list of guesses
    guesses.push([...currentGuess]);
  
    // Check for a win
    if (guessWord === secretWord) {
      messageEl.textContent = 'You Win!';
      gameOver = true;
    }
  
    // Check for a loss (no more guesses)
    if (guesses.length === maxGuesses && guessWord !== secretWord) {
      messageEl.textContent = `You Lose! The word was ${secretWord}`;
      gameOver = true;
    }
  
    // Clear the current guess and move to the next row
    currentGuess = [];
    currentRow++;
  }
  

function render() {
  renderBoard();
}

function renderBoard() {
    let html = '';
  
    guesses.forEach((guessArr, rowIdx) => {
      guessArr.forEach((letter, colIdx) => {
        let tileColor = 'lightgray';
  
        if (letter === secretWord[colIdx]) {
            tileColor = 'green';
  
        } else if (secretWord.includes(letter)) {
            tileColor = 'gold';
        }
  
        html += `<div class="tile" style="background-color:${tileColor};">${letter}</div>`;
      });
    });

    for (let i = 0; i < wordLength; i++) {
      const letter = currentGuess[i] || ''; // blank if not typed yet
      html += `<div class="tile">${letter}</div>`;
    }
  
    // 3. Fill in the rest of the board with empty tiles
    const totalTiles = maxGuesses * wordLength;
    const filledTiles = guesses.length * wordLength + wordLength;
    const remainingTiles = totalTiles - filledTiles;
  
    for (let i = 0; i < remainingTiles; i++) {
      html += `<div class="tile"></div>`;
    }
  
    // 4. Apply all tiles to the board at once
    boardEl.innerHTML = html;
  }
  