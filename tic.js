const usernames = document.querySelector(".usernames");
const scores = document.querySelector(".scores");

const gameboard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const getBoard = () => board;
  const playerChoice = (x, y, type) => (board[x][y] = type);
  const reset = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
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
    if (name === "Player 1") {
      playerType = "X";
    } else {
      playerType = "O";
    }
    const playerChosen = player(playerName, playerType);
    const newPlayer = document.createElement("p");
    newPlayer.classList.add("player");
    newPlayer.textContent = `${playerChosen.playerName}: ${playerChosen.playerType}`;
    usernames.appendChild(newPlayer);

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

  const checkTie = () => {
    let arr = gameboard.getBoard();
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (arr[i][j] !== "") {
          count++;
        }
      }
    }
    if (count === 9) {
      return true;
    }
  };

  const checkWin = (player) => {
    displayController.checkRowWin(player);
    displayController.checkColumnWin(player);
    displayController.checkLeftDiagonalWin(player);
    displayController.checkRightDiagonalWin(player);
  };

  return {
    createPlayer,
    createGameboard,
    checkColumnWin,
    checkRowWin,
    checkLeftDiagonalWin,
    checkRightDiagonalWin,
    checkWin,
    checkTie,
  };
})();

const displayWeb = (function () {
  const showBoard = (board) => {
    const container = document.querySelector(".container");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        console.log("Hello");
        let tile = document.createElement("div");
        tile.classList.add("tiles");
        tile.dataset.cord = `${i},${j}`;
        tile.textContent = board.getBoard()[i][j];
        container.appendChild(tile);
      }
    }
  };

  // const updateBoard = (board) => {
  //   const container = document.querySelector(".container");
  //   const children = container.children;
  //   let count = 0;

  //   for (let i = 0; i < 3; i++) {
  //     for (let j = 0; j < 3; j++) {
  //       children[count].textContent = board.getBoard()[i][j];
  //       count++;
  //     }
  //   }
  // };

  return {
    showBoard,
    // updateBoard,
  };
})();

// function playGame() {
//   let player1 = displayController.createPlayer("Player 1");
//   let player2 = displayController.createPlayer("Player 2");
//   let prevScore1 = 0;
//   let prevScore2 = 0;
//   let currentBoard = displayController.createGameboard();
//   let currentGame = true;
//   let currentPlayer = 0;
//   displayWeb.showBoard(currentBoard);

//   let tiles = document.querySelectorAll(".tiles");

//   while (currentGame) {
//     displayWeb.updateBoard(currentBoard);
//     while (currentPlayer === 0) {
//       let userAns = prompt(
//         `${player1.playerName} please put x and y coordinates`
//       );
//       let x = userAns.substring(0, 1);
//       let y = userAns.substring(2);
//       currentPlayer = 1;

//       if (x < 3 && x >= 0 && y < 3 && y >= 0) {
//         if (currentBoard.getBoard()[x][y] === ".") {
//           currentBoard.playerChoice(x, y, player1.playerType);
//         } else {
//           alert("Spot already filled");
//           currentPlayer = 0;
//         }
//       } else {
//         alert("Invalid coordinates");
//         currentPlayer = 0;
//       }
//     }

//     displayController.checkWin(player1);

//     if (prevScore1 + 1 === player1.getPlayerScore()) {
//       currentBoard.reset();
//       prevScore1 = player1.getPlayerScore();
//       currentPlayer = 0;
//     }

//     if (currentPlayer === 1) {
//       let userAns = prompt(
//         `${player2.playerName} please put x and y coordinates`
//       );
//       let x = userAns.substring(0, 1);
//       let y = userAns.substring(2);
//       currentPlayer = 0;

//       if (x < 3 && x >= 0 && y < 3 && y >= 0) {
//         if (currentBoard.getBoard()[x][y] === ".") {
//           currentBoard.playerChoice(x, y, player2.playerType);
//         } else {
//           alert("Spot already filled");
//           currentPlayer = 1;
//         }
//       } else {
//         alert("Invalid coordinates");
//         currentPlayer = 1;
//       }
//     }

//     if (prevScore2 + 1 === player2.getPlayerScore()) {
//       currentBoard.reset();
//       prevScore2 = player2.getPlayerScore();
//       currentPlayer = 0;
//     }

//     displayController.checkWin(player2);

//     console.log(currentBoard.getBoard());
//     console.log(player2.getPlayerScore(), player1.getPlayerScore());
//   }
// }

function playGame() {
  let player1 = displayController.createPlayer("Player 1");
  let player2 = displayController.createPlayer("Player 2");
  let prevScore1 = 0;
  let prevScore2 = 0;
  let currentBoard = displayController.createGameboard();
  let currentPlayer = 0;
  let displayScore = document.createElement("div");
  displayScore.textContent = "0:0";
  displayScore.classList.add("score");
  scores.appendChild(displayScore);

  displayWeb.showBoard(currentBoard);
  let tiles = document.querySelectorAll(".tiles");
  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      console.log(currentBoard.getBoard());
      if (currentPlayer === 0) {
        let x = tile.dataset.cord.substring(0, 1);
        let y = tile.dataset.cord.substring(2);
        let tie = false;

        if (currentBoard.getBoard()[x][y] === "") {
          currentBoard.playerChoice(x, y, player1.playerType);
          tile.textContent = player1.playerType;
          currentPlayer = 1;
        } else {
          alert("Try again");
          currentPlayer = 0;
        }
        tie = displayController.checkTie();

        if (tie === true) {
          const container = document.querySelector(".container");
          const children = container.children;
          for (let i = 0; i < 9; i++) {
            children[i].textContent = "";
          }
          currentBoard.reset();
          currentPlayer = 0;
        }
        displayController.checkWin(player1);

        if (prevScore1 + 1 === player1.getPlayerScore()) {
          const container = document.querySelector(".container");
          const children = container.children;
          for (let i = 0; i < 9; i++) {
            children[i].textContent = "";
          }
          displayScore.textContent = `${player1.getPlayerScore()}:${player2.getPlayerScore()}`;
          currentBoard.reset();
          prevScore1 = player1.getPlayerScore();
          currentPlayer = 0;
        }
      } else if (currentPlayer === 1) {
        let x = tile.dataset.cord.substring(0, 1);
        let y = tile.dataset.cord.substring(2);
        if (currentBoard.getBoard()[x][y] === "") {
          currentBoard.playerChoice(x, y, player2.playerType);
          tile.textContent = player2.playerType;
          currentPlayer = 0;
        } else {
          alert("Try again");
          currentPlayer = 1;
        }
        displayController.checkWin(player2);

        if (prevScore2 + 1 === player2.getPlayerScore()) {
          const container = document.querySelector(".container");
          const children = container.children;
          for (let i = 0; i < 9; i++) {
            children[i].textContent = "";
          }
          displayScore.textContent = `${player1.getPlayerScore()}:${player2.getPlayerScore()}`;
          currentBoard.reset();
          prevScore2 = player2.getPlayerScore();
          currentPlayer = 0;
        }
      }
    });
  });
}

playGame();
