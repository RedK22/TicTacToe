const box = document.querySelectorAll(".box");
const btn = document.querySelector(".btn");
const turn = document.querySelector(".turn");

let player = 0;
let board = [];
let winnerFound = false;
let gameActive = true;

const highlightWinner = function (winningBoxes) {
  for (const index of winningBoxes) {
    box[index].classList.add("winner");
  }
};

const clickHandler = function (index) {
  if (!gameActive) {
    console.warn("Game is over. Click reset to play again.");
    alert("Game is over. Click reset to play again.");
    return;
  }

  const b = box[index];

  if (b.textContent == "X" || b.textContent == "O") {
    console.warn("Already picked");
  } else if (b.textContent == "") {
    if (player === 0) {
      b.textContent = "X";
      board[index] = "X";
      player++;
    } else {
      b.textContent = "O";
      board[index] = "O";
      player--;
    }
  }
  checkWinner();

  turn.textContent = `Player ${player + 1}'s turn!`;
  // console.log(index);
  // console.log(board);
};

box.forEach((b, index) => {
  b.addEventListener("click", function () {
    clickHandler(index);
  });
});

// !Reset button
btn.addEventListener("click", function () {
  box.forEach((b) => {
    b.textContent = "";
    b.classList.remove("winner");
  });
  player = 0;
  turn.textContent = `Player ${player + 1}'s turn!`;
  board = [];
  gameActive = true;
});

//! Checking Winner
const checkWinner = function () {
  //! Checking for a winner horizontally
  for (let i = 0; i < 9; i += 3) {
    if (board[i] && board[i] === board[i + 1] && board[i] === board[i + 2]) {
      highlightWinner([i, i + 1, i + 2]);
      setTimeout(() => {
        alert(`Player ${board[i]} won the game!`);
      }, 750);
      console.log(`Winner: ${board[i]}`);
      winnerFound = true;
      gameActive = false;
      break;
    }
  }

  //! Checking for a winner vertically
  for (let i = 0; i < 3; i++) {
    if (board[i] && board[i] === board[i + 3] && board[i] === board[i + 6]) {
      highlightWinner([i, i + 3, i + 6]);
      setTimeout(() => {
        alert(`Player ${board[i]} won the game!`);
      }, 750);
      console.log(`Winner: ${board[i]}`);
      winnerFound = true;
      gameActive = false;
      break;
    }
  }

  //! Check for a winner diagonally (top-left to bottom-right)
  if (board[0] && board[0] === board[4] && board[0] === board[8]) {
    highlightWinner([0, 4, 8]);
    setTimeout(() => {
      alert(`Player ${board[0]} won the game!`);
    }, 750);
    console.log(`Winner: ${board[0]}`);
    winnerFound = true;
    gameActive = false;
  }

  //! Check for a winner diagonally (top-right to bottom-left)
  if (board[2] && board[2] === board[4] && board[2] === board[6]) {
    highlightWinner([2, 4, 6]);
    setTimeout(() => {
      alert(`Player ${board[2]} won the game!`);
    }, 750);
    winnerFound = true;
    gameActive = false;
  }

  if (!winnerFound) {
    console.log("No winner yet");
  }

  checkFull();
};

////////////////////////////////////
const checkFull = function () {
  if (!winnerFound && Array.from(box).some((b) => b.textContent == "")) {
    console.log("At least one box is empty");
  } else if (!winnerFound) {
    console.log("All boxes are filled");
    gameActive = false;
    setTimeout(() => {
      alert("The game is a draw. Please reset and play again!");
    }, 750);
  }
};
