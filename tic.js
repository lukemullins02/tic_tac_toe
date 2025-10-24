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
    let playerType = prompt(`${name} Choose X or O`);
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
          }
        }
      }
    }
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
          }
        }
      }
    }
  };

  const checkLeftDiagonalWin = (type) => {
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
      }
      j++;
    }
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
      }
      j--;
    }
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
console.log(currentBoard.getBoard());
currentBoard.playerChoice(0, 0, "x");
currentBoard.playerChoice(0, 1, "x");
currentBoard.playerChoice(0, 2, "x");
currentBoard.playerChoice(1, 0, "x");
currentBoard.playerChoice(1, 1, "x");
currentBoard.playerChoice(1, 2, "x");
currentBoard.playerChoice(2, 0, "x");
currentBoard.playerChoice(2, 1, "x");
currentBoard.playerChoice(2, 2, "x");
displayController.checkRowWin("x");
displayController.checkColumnWin("x");
displayController.checkLeftDiagonalWin("x");
displayController.checkRightDiagonalWin("x");
