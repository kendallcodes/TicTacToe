//represents all spaces on the board
let board = ["", "", "", "", "", "", "","",""]; 

//game status shows who's turn and who is the winner
const gameStatus = document.querySelector(".game-status");

//this indicates whether the game is in play
let gameActive = true; 

//player
let currentPlayer = "X"; 

//game messages
const winningMessage = () => `${currentPlayer} wins!`;
const drawMessage = () => `It's a draw!`;
const playerTurn = () => `It's ${currentPlayer}'s turn`;

//this is always shown until the game ends in a draw or win
gameStatus.innerHTML = playerTurn(); 

//chosenBlock is the clicked block. chosenBlockIndex grabs the value of the chosen block 
function blockSelection(clickedBlock) { 

const chosenBlock = clickedBlock.target; 

//parseInt changes the block indices into integers; grabs all with block-index attributes; 
const chosenBlockIndex = parseInt(
    chosenBlock.getAttribute('block-index')
); 
//if the block index of the board array is not an empty string or the game is not active, return; 
if (board[chosenBlockIndex] !== "" || !gameActive) { 
  return;
}

//board is rendered. The played block is filled. Checks for winner to see if the game continues
blockPlayed(chosenBlock, chosenBlockIndex); 
checkWinner(); 
}

//current player changes using the ternary operator. if currently player equals X then it changes to O, if O then X. Th
function changePlayer() { 
  currentPlayer = currentPlayer === "X" ? "O" : "X"; 
  gameStatus.innerHTML = playerTurn(); 
  }

//chosen block index represents the space on the board/index in the array of board. the inner HTML of chosen block becomes current player. 
  function blockPlayed(chosenBlock, chosenBlockIndex) { 

    board[chosenBlockIndex] = currentPlayer; 
    chosenBlock.innerHTML = currentPlayer; 
  }

//these arrays are the winning combinations for the board
const winningBoxes = [

  [0,1,2], 
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [2,5,8],
  [0,4,8],
  [2,4,6],
  [1,4,7]
];

//this function loops through the the board array and compares it to the winningBoxes array. If the indices/spaces on the board are not occupied the game continues; if not then then you check to see if a == b == c. if so then the roundWon variable changes to true and the game ends. 
function checkWinner() { 
  let roundWon = false; 
  for (let i = 0; i <= 7; i++) { 
    const win = winningBoxes[i];
    let a = board[win[0]];
    let b = board[win[1]];
    let c = board[win[2]];
    if (a === "" || b ===  "" || c === "") { 
      continue;
    }
    if (a === b && b === c) { 
      roundWon = true; 
      break;
    }
  }
//if roundWon then game status displays the winner. gameActive changes to false and which signifies the end of the game.
  if (roundWon) { 
    gameStatus.innerHTML = winningMessage(); 
    gameActive = false; 
    return;
  }
//a draw is determined if the board does not include empty strings. if its a draw then the draw message is displayed; the game ends; 
  let draw = !board.includes(''); 
  if (draw) { 
    gameStatus.innerHTML = drawMessage();
    gameActive = false; 
    return;
  }
//if there isn't a draw or a winner, the player changes 
  changePlayer(); 
}


//reset game clears the board by implementing an array of empty strings, resets the player turn, then each block is set to an empty string; 
function resetGame() { 

  gameActive = true; 
  currentPlayer = "X"; 
  board = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = playerTurn(); 
  document.querySelectorAll('.block')
              .forEach(block => block.innerHTML = "");
}

//each block that is clicked calls the block selection function
document.querySelectorAll('.block').forEach(block => block.addEventListener('click', blockSelection));
//connected to the reset button, each click calls the resetGame function 
document.querySelector('.game-reset').addEventListener('click', resetGame);

