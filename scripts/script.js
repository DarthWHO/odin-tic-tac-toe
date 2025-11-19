const board = document.querySelector(".board");
const gameInfoDisplay = document.querySelector(".game-info");

const gridArray = ["", "", "", "", "", "", "", "", ""];

function drawBoard() {
  board.innerHTML = "";
  gridArray.map((cellValue, index) => {
    const cell = document.createElement("div");
    cell.classList.add(`square`);
    cell.classList.add(`square${index}`);
    cell.addEventListener("click", handleClick);
    if (cellValue != "") {
      cell.textContent = cellValue;
    }
    board.appendChild(cell);
  });
  checkWinner();
}

function Game() {
  const computerPlayer = "O";
  const humanPlayer = "X";
  const randomPlayer = Math.random() < 0.5 ? humanPlayer : computerPlayer;
  let currentPlayer = randomPlayer;
  let isGameOver = false;
  let winner = null;
  const setPlayer = function togglePlayer() {
    currentPlayer =
      currentPlayer === humanPlayer ? computerPlayer : humanPlayer;
    gameInfoDisplay.textContent = `${currentPlayer} is next to go`;
  };
  const getCurrentPlayer = function getCurrentPlayer() {
    return currentPlayer;
  };
  const setWinner = function setWinner(player) {
    isGameOver = true;
    winner = player;
    gameInfoDisplay.textContent = `Game Over! ${winner} has won the game!`;
  };

  return { isGameOver, setWinner, getCurrentPlayer, setPlayer };
}

let game = new Game();

function resetGame() {
  for (let i = 0; i < gridArray.length; i++) {
    gridArray[i] = "";
  }
  game = new Game();
  game.setPlayer();
  drawBoard();
}

function handleClick(event) {
  const el = event.target;
  const index = el.classList.value.slice(-1);
  if (el.textContent == "") {
    gridArray[index] = game.getCurrentPlayer();
    game.setPlayer();
  }
  drawBoard();
}

function checkWinner() {
  if (
    (gridArray[0] === gridArray[1] && gridArray[0] === gridArray[2]) ||
    (gridArray[0] === gridArray[3] && gridArray[0] === gridArray[6]) ||
    (gridArray[0] === gridArray[4] && gridArray[0] === gridArray[8])
  ) {
    if (gridArray[0] === "") return;
    game.setWinner(gridArray[0]);
  } else if (
    (gridArray[1] === gridArray[4] && gridArray[1] === gridArray[7]) ||
    (gridArray[1] === gridArray[5] && gridArray[2] === gridArray[8])
  ) {
    if (gridArray[1] === "") return;
    game.setWinner(gridArray[1]);
  } else if (gridArray[2] === gridArray[4] && gridArray[2] === gridArray[6]) {
    if (gridArray[2] === "") return;
    game.setWinner(gridArray[2]);
  } else if (gridArray[3] === gridArray[4] && gridArray[3] === gridArray[5]) {
    if (gridArray[3] === "") return;
    game.setWinner(gridArray[3]);
  } else if (gridArray[6] === gridArray[7] && gridArray[6] === gridArray[8]) {
    if (gridArray[6] === "") return;
    game.setWinner(gridArray[6]);
  } else {
    return;
  }
}

resetGame();
