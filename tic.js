const gameboard = (function () {
  let board = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const getBoard = () => board;
  const playerChoice = (x, y, type) => (board[x][y] = type);
  return { getBoard, playerChoice };
})();

function player(name, type) {
  const playerName = name;
  const playerType = type;
  let playerScore = 0;
  const getPlayerScore = () => playerScore;
  const changePlayerScore = () => ++playerScore;

  return { playerName, playerType, getPlayerScore, changePlayerScore };
}

const displayController = (function () {
  const createPlayer = (name) => {
    let playerName = prompt(`${name} enter name:`);
    let playerType;
    if (name === "Player 1") {
      playerType = "X";
    } else {
      playerType = "O";
    }
    const playerChosen = player(playerName, playerType);
    return playerChosen;
  };

  const createGameboard = () => {
    const currentBoard = gameboard;
    return currentBoard;
  };

  const checkColumnWin = (type) => {
    let arr = gameboard.getBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = i;
        let y = j;
        let count = 0;
        for (; x < 3; x++) {
          if (arr[x][y] === type) {
            count++;
          }
          if (count === 3) {
            console.log("win");
            return true;
          }
        }
      }
    }

    return false;
  };

  const checkRowWin = (type) => {
    let arr = gameboard.getBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = i;
        let y = j;
        let count = 0;
        for (; y < 3; y++) {
          if (arr[x][y] === type) {
            count++;
          }
          if (count === 3) {
            console.log("win");
            return true;
          }
        }
      }
    }
    return false;
  };

  const checkLeftDiagonalWin = (type) => {
    console.log("hello");
    let arr = gameboard.getBoard();
    let j = 0;
    let count = 0;
    for (let i = 0; i < 3; i++) {
      if (arr[i][j] === type) {
        console.log(i, j);
        count++;
      }
      if (count === 3) {
        console.log("win");
        return true;
      }
      j++;
    }
    return false;
  };

  const checkRightDiagonalWin = (type) => {
    let arr = gameboard.getBoard();
    let j = 2;
    let count = 0;
    for (let i = 2; i >= 0; i--) {
      if (arr[i][j] === type) {
        console.log(i, j);
        count++;
      }
      if (count === 3) {
        console.log("win");
        return true;
      }
      j--;
    }

    return false;
  };

  return {
    createPlayer,
    createGameboard,
    checkColumnWin,
    checkRowWin,
    checkLeftDiagonalWin,
    checkRightDiagonalWin,
  };
})();

let player1 = displayController.createPlayer("Player 1");
let player2 = displayController.createPlayer("Player 2");
let currentBoard = displayController.createGameboard();
let currentGame = false;
let checkWin = false;
let currentPlayer = 0;

console.log(player1, player2);

while (currentGame !== true) {
  if (currentPlayer === 0) {
    let x = prompt(`${player1.playerName} please put x coordinate`);
    let y = prompt(`${player1.playerName} please put y coordinate`);
    currentBoard.playerChoice(x, y, player1.playerType);
    currentPlayer = 1;
    console.log(currentBoard.getBoard());
  }

  currentGame = displayController.checkRowWin(player1.playerType);
  currentGame = displayController.checkColumnWin(player1.playerType);
  currentGame = displayController.checkLeftDiagonalWin(player1.playerType);
  currentGame = displayController.checkRightDiagonalWin(player1.playerType);

  if (currentPlayer === 1) {
    let x = prompt(`${player2.playerName} please put x coordinate`);
    let y = prompt(`${player2.playerName} please put y coordinate`);
    currentBoard.playerChoice(x, y, player2.playerType);
    currentPlayer = 0;
  }

  currentGame = displayController.checkRowWin(player2.playerType);
  currentGame = displayController.checkColumnWin(player2.playerType);
  currentGame = displayController.checkLeftDiagonalWin(player2.playerType);
  currentGame = displayController.checkRightDiagonalWin(player2.playerType);
}

console.log(currentGame);

displayController.checkRowWin("x");
displayController.checkColumnWin("x");
displayController.checkLeftDiagonalWin("x");
displayController.checkRightDiagonalWin("x");
