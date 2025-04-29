/*----- constants -----*/
const maxGuesses = 6;
const wordLength = 5;

/*----- state variables -----*/
let secretWord = '';
let currentGuess = '';
let currentRow = 0;
let gameOver = false;

/*----- cached elements  -----*/
const boardEl = document.getElementById('board');
const keyboardEl = document.getElementById('keyboard');

/*----- event listeners -----*/
keyboardEl.addEventListener('click', keyboardClick);

/*----- functions -----*/

function buildBoard() {
  boardEl.innerHTML = '';
  for (let i = 0; i < maxGuesses * wordLength; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.setAttribute('id', `tile-${i}`);
    boardEl.appendChild(tile);
  }
}

// Initialize the game 
function init() {
  secretWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
  currentGuess = '';
  currentRow = 0;
  gameOver = false;
  
  // Build the board when game starts
  buildBoard(); 
}

// Update the board visually
function render() {
 
}

// Handle keyboard button clicks
function keyboardClick(event) {
  
}

// Add a letter to the current guess
function addLetter() {
  
}

// Delete the last letter
function deleteLetter() {
  
}

// Call init to start the game
init();

