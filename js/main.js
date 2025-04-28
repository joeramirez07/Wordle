 /*----- constants -----*/


  /*----- state variables -----*/
let secretWord = '';
let currentGuess = '';
let currentRow = 0;
let gameOver = false;


  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/
// Initialize the game
//Declare, but don't initialize, the application-wide state variables. 
// The initialization of the variables to their "initial" state should be done within an initialize, 
// //or similarly named function, e.g., init.
function init() {
    secretWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    currentGuess = '';
    currentRow = 0;
    gameOver = false;
  
    buildBoard();
  }
  
  function pickSecretWord()[
    const randomIndex = Math.floor(Math.random) *  

  ]