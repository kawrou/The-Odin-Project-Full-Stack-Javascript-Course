// CreatePlayer Factory Function
function CreatePlayer(name, symbol) {
  return { name, symbol };
}

// GameBoard class
const GameBoard = (() => {
  let gameBoard;

  const initializeBoard = () => {
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

  const resetGameState = () => {
    gameBoard.clearBoard();
  };
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
    const currentPlayerName = currentPlayer.name;
    const currentPlayerSymbol = currentPlayer.symbol;

    const isDraw = gameBoard
      .getGameBoard()
      .flat()
      .every((cell) => cell === "x" || cell === "o");
    if (isDraw) {
      return { winner: null, isDraw, symbol: currentPlayerSymbol };
    }

    for (const combination of winCombinations) {
      if (
        combination.every(
          ([row, col]) =>
            gameBoard.getGameBoard()[row][col] === currentPlayer.symbol
        )
      ) {
        return {
          winner: currentPlayerName,
          isDraw: false,
          symbol: currentPlayerSymbol,
        };
      }
    }

    return { winner: null, isDraw: false, symbol: currentPlayerSymbol };
  }
  return {
    markCell,
    resetGameState,
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

  // let isPlayer1Turn = true;
  let currentPlayer = player1;
  let isGameEnded = false;

  function startGame() {
    // createPlayers();
    game = gameLogic(gameBoard);
    console.log(`${currentPlayer.name}'s turn`);
    // Maybe need to return current player to update UI?
  }

  const resetGame = () => {
    isGameEnded = !isGameEnded;
    game.resetGameState();
  };

  // The handler should make the move and get back the result of the move
  // which updates the game state and returns the updates values for the UI.
  const makeMove = (row, col) => {
    if (!isGameEnded) {
      const response = game.markCell(currentPlayer, row, col);
      console.log(response);
      checkWinState(response);
      return response;
      // const winState = checkWinState(result);
      // return winState;

      //Check the values in result for updating the game state
      //If it is a draw, a win, or nothing.
      //Then handle the appropriate logic.
      //Maybe the logic is the same as checkWinState() below and can be reused?

      // result = {winner: Player, isDraw: bool, error: string};

      // if (error){ return error message and game state isn't updated}

      //  switchPlayerTurn();

      // if (winner){ update isGameEnded, update player's score, return won player object}
      // if (draw) { update isGameEnded, return isDraw: true};

      //  return something to indicate that it's the next players turn
    }
    return;
  };

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    return;
  };

  //Maybe don't need this here. This class is only interested in updating the win state.
  const checkWinState = (result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }

    if (result.isDraw) {
      console.log("The game is a draw!");
      isGameEnded = true;
      return;
    }

    if (result.winner === null && !result.isDraw) {
      console.log("Next players turn");
      switchPlayerTurn();
      return;
    }

    if (!result.isDraw) {
      console.log(`${result.winner} is the winner!`);
      isGameEnded = true;
      return;
    }
  };

  return {
    startGame,
    resetGame,
    makeMove,
    checkWinState,
  };
}

function UIController(gameController) {
  const boardContainer = document.getElementById("board-container");
  const message = document.getElementById("winner-message");
  const playAgainButton = document.getElementById("play-again-btn");

  const player1Name = document.getElementById("player1-name");
  const player1Score = document.getElementById("player1-score");
  const player2Name = document.getElementById("player2-name");
  const player2Score = document.getElementById("player2-score");

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
    gameController.resetGame();
    generateBoardHtml();
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

  const startGameButton = document.getElementById("start-game-btn");
  startGameButton.addEventListener("click", () => {
    gameController.startGame();
    startGameButton.style.display = "none";
  });
});
