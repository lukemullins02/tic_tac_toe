const gameboard = (function () {
  let board = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const getBoard = () => board;
  const playerChoice = (x, y, type) => (board[x][y] = type);
  const reset = () => {
    board = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];
  };
  return { getBoard, playerChoice, reset };
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
    console.log(playerName);
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

  const checkColumnWin = (player) => {
    let arr = gameboard.getBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = i;
        let y = j;
        let count = 0;
        for (; x < 3; x++) {
          if (arr[x][y] === player.playerType) {
            count++;
          }
          if (count === 3) {
            console.log("win");
            player.changePlayerScore();
          }
        }
      }
    }
  };

  const checkRowWin = (player) => {
    let arr = gameboard.getBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = i;
        let y = j;
        let count = 0;
        for (; y < 3; y++) {
          if (arr[x][y] === player.playerType) {
            count++;
          }
          if (count === 3) {
            console.log("win");
            player.changePlayerScore();
          }
        }
      }
    }
  };

  const checkLeftDiagonalWin = (player) => {
    let arr = gameboard.getBoard();
    let j = 0;
    let count = 0;
    for (let i = 0; i < 3; i++) {
      if (arr[i][j] === player.playerType) {
        count++;
      }
      if (count === 3) {
        console.log("win");
        player.changePlayerScore();
      }
      j++;
    }
  };

  const checkRightDiagonalWin = (player) => {
    let arr = gameboard.getBoard();
    let j = 0;
    let count = 0;
    for (let i = 2; i >= 0; i--) {
      if (arr[i][j] === player.playerType) {
        count++;
      }
      if (count === 3) {
        console.log("win");
        player.changePlayerScore();
      }
      j++;
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

function playGame() {
  let player1 = displayController.createPlayer("Player 1");
  let player2 = displayController.createPlayer("Player 2");
  let prevScore1 = 0;
  let prevScore2 = 0;
  let currentBoard = displayController.createGameboard();
  let currentGame = true;
  let currentPlayer = 0;

  while (currentGame) {
    if (currentPlayer === 0) {
      let userAns = prompt(
        `${player1.playerName} please put x and y coordinates`
      );
      let x = userAns.substring(0, 1);
      let y = userAns.substring(2);
      currentPlayer = 1;

      if (x < 3 && x >= 0 && y < 3 && y >= 0) {
        if (currentBoard.getBoard()[x][y] === ".") {
          currentBoard.playerChoice(x, y, player1.playerType);
        } else {
          alert("Spot already filled");
          currentPlayer = 0;
        }
      } else {
        alert("Invalid coordinates");
        currentPlayer = 0;
      }
    }

    displayController.checkRowWin(player1);
    displayController.checkColumnWin(player1);
    displayController.checkLeftDiagonalWin(player1);
    displayController.checkRightDiagonalWin(player1);

    if (prevScore1 + 1 === player1.getPlayerScore()) {
      currentBoard.reset();
      prevScore1 = player1.getPlayerScore();
      currentPlayer = 0;
    }

    if (currentPlayer === 1) {
      let userAns = prompt(
        `${player2.playerName} please put x and y coordinates`
      );
      let x = userAns.substring(0, 1);
      let y = userAns.substring(2);
      currentPlayer = 0;

      if (x < 3 && x >= 0 && y < 3 && y >= 0) {
        if (currentBoard.getBoard()[x][y] === ".") {
          currentBoard.playerChoice(x, y, player2.playerType);
        } else {
          alert("Spot already filled");
          currentPlayer = 1;
        }
      } else {
        alert("Invalid coordinates");
        currentPlayer = 1;
      }
    }

    if (prevScore2 + 1 === player2.getPlayerScore()) {
      currentBoard.reset();
      prevScore2 = player2.getPlayerScore();
      currentPlayer = 0;
    }

    displayController.checkRowWin(player2);
    displayController.checkColumnWin(player2);
    displayController.checkLeftDiagonalWin(player2);
    displayController.checkRightDiagonalWin(player2);
    console.log(currentBoard.getBoard());
    console.log(player2.getPlayerScore(), player1.getPlayerScore());
  }
}

playGame();
