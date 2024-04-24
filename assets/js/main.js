let currentPlayer = "X"; // Human player
let computerPlayer = "O";
let board = ["", "", "", "", "", "", "", "", ""];
let title = document.querySelector(".title");
// Function to check for a winner
function checkWinner(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every((cell) => cell !== "")) {
    return "tie";
  }

  return null;
}

// Function to make a move for the player
function playerMove(index) {
  if (board[index] === "" && !checkWinner(board)) {
    board[index] = currentPlayer;
    renderBoard();
    if (!checkWinner(board)) {
      setTimeout(computerMove, 500);
    }
  }
}

// Function to make a move for the computer using Minimax algorithm
function computerMove() {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = computerPlayer;
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  board[move] = computerPlayer;
  renderBoard();
}

// Minimax algorithm
function minimax(board, depth, isMaximizing) {
  let result = checkWinner(board);

  if (result !== null) {
    if (result === "X") {
      return -10 + depth;
    } else if (result === "O") {
      return 10 - depth;
    } else {
      return 0;
    }
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = computerPlayer;
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = currentPlayer;
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}
function end(num1, num2, num3) {
//   title.innerHTML = `${square[num1]} Is Winner `;
  document.getElementById("item" + num1).style.background = "#fff";
  document.getElementById("item" + num2).style.background = "#fff";
  document.getElementById("item" + num3).style.background = "#fff";
//   setInterval(function () {
//     title.innerHTML += ".";
//   }, 1000);
//   setTimeout(function () {
//     location.reload();
//   }, 3000);
}
// Function to render the game board
function renderBoard() {
  const boardItems = document.querySelectorAll(".square");
  boardItems.forEach((item, index) => {
    item.textContent = board[index];
  });

  let winner = checkWinner(board);
  if (winner) {
    if (winner === "tie") {
      title.innerHTML = `No One Winner `;
    } else {
      title.innerHTML = `${winner} Is Winner `;

    }
    
    setInterval(function () {
        title.innerHTML += ".";
      }, 1000);
    setTimeout(function () {
        location.reload();
      }, 3000);
  }
}
