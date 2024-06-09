// CreatePlayer Factory Function
function CreatePlayer(name, symbol) {
  let score = 0;

  function addScore() {
    score += 1;
  }

  function getScore() {
    return score;
  }
  return { name, symbol, addScore, getScore };
}

// GameBoard class
const GameBoard = (() => {
  let gameBoard;

  const initializeBoard = () => {
    console.log("initialize board was called");
    // gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  const getGameBoard = () => gameBoard;

  const markCell = (currentPlayer, row, col) => {
    // Checks if the selections are out of bounds
    let response = { success: null, error: null };

    if (
      row < 0 ||
      row >= gameBoard.length ||
      col < 0 ||
      col >= gameBoard[row].length
    ) {
      console.log("Invalid move! Choose another cell.");
      response.error = "Invalid move! Choose another cell.";
      response.success = false;
      return response;
    }

    // Checks if a cell is already marked
    if (["x", "o"].includes(gameBoard[row][col])) {
      console.log("Cell was already marked! Choose another cell");
      response.error = "Cell was already marked! Choose another cell.";
      response.success = false;
      return response;
    }

    gameBoard[row][col] = currentPlayer;
    response.success = true;
    return response;
  };

  const clearBoard = () => {
    initializeBoard();
  };

  initializeBoard();
  return {
    getGameBoard,
    markCell,
    clearBoard,
  };
})();

//TicTacToe Logic
function TicTacToe(gameBoard) {
  function markCell(currentPlayer, row, col) {
    const response = gameBoard.markCell(currentPlayer.symbol, row, col);
    if (response.error) {
      return response;
    }

    const winConditionResult = checkWinCondition(currentPlayer);

    const result = winConditionResult;
    return result;
  }
  // prettier-ignore
  const winCombinations = [
      // Rows
    [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],

      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],

      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
      ];

  function checkWinCondition(currentPlayer) {
    const isDraw = gameBoard
      .getGameBoard()
      .flat()
      .every((cell) => cell === "x" || cell === "o");
    if (isDraw) {
      return {
        winner: null,
        isDraw,
        symbol: currentPlayer.symbol,
      };
    }

    for (const combination of winCombinations) {
      if (
        combination.every(
          ([row, col]) =>
            gameBoard.getGameBoard()[row][col] === currentPlayer.symbol
        )
      ) {
        return {
          winner: currentPlayer.name,
          isDraw: false,
          symbol: currentPlayer.symbol,
        };
      }
    }

    return {
      winner: null,
      isDraw: false,
      symbol: currentPlayer.symbol,
    };
  }
  return {
    markCell,
  };
}

//Control the flow of the game
function GameController(createPlayer, gameBoard, gameLogic) {
  // let player1;
  // let player2;
  // let game;

  // const createPlayers = () => {
  //   const player1Name = prompt("Enter name for player 1");
  //   const player2name = prompt("Enter name for player 2");
  //   player1 = createPlayer(player1Name, "x");
  //   player2 = createPlayer(player2name, "y");
  // };

  const player1 = createPlayer("player1", "x");
  const player2 = createPlayer("player2", "o");
  let game;

  let currentPlayer = player1;
  let isGameEnded = false;

  function startGame() {
    // createPlayers();
    game = gameLogic(gameBoard);
    return currentPlayer.name;
  }

  const resetGame = () => {
    isGameEnded = !isGameEnded;
    gameBoard.clearBoard();
    return currentPlayer.name;
  };

  const makeMove = (row, col) => {
    if (!isGameEnded) {
      const response = game.markCell(currentPlayer, row, col);
      console.log(response);
      checkWinState(response);
      return response;
    }
    return;
  };

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    return;
  };

  const checkWinState = (result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }

    if (result.isDraw) {
      console.log("The game is a draw!");
    } else if (result.winner === null) {
      console.log("Next player's turn");
    } else {
      console.log(`${result.winner} is the winner!`);
      currentPlayer.addScore();
    }

    isGameEnded = result.isDraw || result.winner !== null;
    switchPlayerTurn();
  };

  const getScore = () => {
    return [player1.getScore(), player2.getScore()];
  };

  return {
    startGame,
    resetGame,
    makeMove,
    getScore,
  };
}

function UIController(gameController) {
  const boardContainer = document.getElementById("board-container");
  const message = document.getElementById("winner-message");
  const startGameButton = document.getElementById("start-game-btn");
  const playAgainButton = document.getElementById("play-again-btn");

  const player1Name = document.getElementById("player1-name");
  const player1Score = document.getElementById("player1-score");
  const player2Name = document.getElementById("player2-name");
  const player2Score = document.getElementById("player2-score");

  player1Name.textContent = "Player 1";
  player2Name.textContent = "Player 2";
  player1Score.textContent = "0";
  player2Score.textContent = "0";

  startGameButton.addEventListener("click", () => {
    message.textContent = `${gameController.startGame()} starts`;
    startGameButton.style.display = "none";
  });

  const generateBoardHtml = () => {
    while (boardContainer.firstChild) {
      boardContainer.removeChild(boardContainer.firstChild);
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = createCell(row, col);
        boardContainer.appendChild(cell);
      }
    }
  };

  function createCell(row, col) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-row", row);
    cell.setAttribute("data-col", col);

    cell.addEventListener("click", () => {
      message.textContent = "";
      const result = gameController.makeMove(row, col);
      if (!result) {
        return;
      }
      if (result.error) {
        handleErrorMessage(result.error);
        return;
      }

      updateCell(row, col, result.symbol);

      if (result.winner || result.isDraw) {
        handleGameEnd(result);
      }
      return;
    });
    return cell;
  }

  const handleErrorMessage = (error) => {
    message.textContent = error;
  };

  const handleGameEnd = (result) => {
    if (result.isDraw) {
      message.textContent = "The game is a draw!";
    } else {
      message.textContent = `${result.winner} is the winner!`;
      const [score1, score2] = gameController.getScore();
      player1Score.textContent = score1;
      player2Score.textContent = score2;
    }
    showPlayAgainButton();
  };

  const updateCell = (row, col, value) => {
    const cell = document.querySelector(
      `.cell[data-row='${row}'][data-col='${col}']`
    );
    cell.textContent = value;
  };

  playAgainButton.addEventListener("click", () => {
    playAgain();
    hidePlayAgainButton();
    message.textContent = "";
  });

  function playAgain() {
    const startingPlayer = gameController.resetGame();
    generateBoardHtml();
    setTimeout(() => (message.textContent = `${startingPlayer} starts`), 0);
  }

  function hidePlayAgainButton() {
    playAgainButton.style.display = "none";
  }

  function showPlayAgainButton() {
    playAgainButton.style.display = "block";
  }

  return {
    generateBoardHtml,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const gameController = GameController(CreatePlayer, GameBoard, TicTacToe);
  const uiController = UIController(gameController);
  uiController.generateBoardHtml();
});
