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

  const markCell = (player, row, col) => {
    // Checks if the selections are out of bounds
    if (
      row < 0 ||
      row >= gameBoard.length ||
      col < 0 ||
      col >= gameBoard[row].length
    ) {
      console.log("Invalid move! Choose another cell.");
      return false;
    }

    // Checks if a cell is already marked
    if (["x", "o"].includes(gameBoard[row][col])) {
      console.log("Cell was already marked! Choose another cell");
      return false;
    }

    gameBoard[row][col] = player;
    return true;
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
    // const currentPlayer = checkCurrentPlayer();
    if (!isGameEnded) {
      const isSuccess = gameBoard.markCell(currentPlayer.symbol, row, col);

      if (isSuccess) {
        switchPlayerTurn();
      }

      return [isSuccess, currentPlayer.symbol];
    }

    return [(isSuccess = false)];
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

  function checkIsWon() {
    const isDraw = gameBoard
      .getGameBoard()
      .flat()
      .every((cell) => cell === "x" || cell === "o");
    if (isDraw) {
      isGameEnded = true;
      return { winner: null, isDraw };
    }

    for (const combination of winCombinations) {
      if (
        combination.every(
          ([row, col]) =>
            gameBoard.getGameBoard()[row][col] === currentPlayer.symbol
        )
      ) {
        isGameEnded = true;
        return { winner: currentPlayer, isDraw: false };
      }
    }

    return { winner: null, isDraw: false };
  }
  return {
    checkCurrentPlayer,
    markCell,
    switchPlayerTurn,
    checkIsWon,
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
    game = gameLogic(player1, player2, gameBoard);
    // Maybe need to return current player to update UI?
  }

  const resetGame = () => {
    isGameEnded = !isGameEnded;
    game.resetGameState();
  };

  // The handler should make the move and get back the result of the move
  // which updates the game state and returns the updates values for the UI.
  const makeMove = (row, col) => {
    const result = game.markCell(currentPlayer, row, col);

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

  };

  // const checkCurrentPlayer = () => {
  //   return (currentPlayer = isPlayer1Turn ? player1 : player2);
  // };

  const switchPlayerTurn = () => {
  //   isPlayer1Turn = !isPlayer1Turn;
		currentPlayer = isPlayer1Turn ? player1 : player2; 
		return 
  };

  //Maybe don't need this here. This class is only interested in updating the win state.
  const checkWinState = () => {
    const winState = game.checkIsWon();

    if (winState.isDraw) {
      console.log("The game is a draw!");
      return { isDraw: true, winner: null };
    }

    if (winState.winner === null && !winState.isDraw) {
      console.log("Next players turn");
      return null;
    }

    if (!winState.isDraw) {
      console.log(`${winState.winner.name} is the winner!`);
      return { isDraw: false, winner: winState.winner };
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
  const winnerMessage = document.getElementById("winner-message");
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
      const [success, currentPlayerSymbol] = gameController.makeMove(row, col);
      if (success) {
        updateCell(row, col, currentPlayerSymbol);

        const winState = gameController.checkWinState();

        if (!winState) {
          return;
        }

        if (winState.winner || winState.isDraw) {
          handleGameEnd(winState);
        }
      }

      return;
    });
    return cell;
  }

  const handleGameEnd = (winState) => {
    if (winState.isDraw) {
      winnerMessage.textContent = "The game is a draw!";
    } else {
      winnerMessage.textContent = `${winState.winner.name} is the winner!`;
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
    winnerMessage.textContent = "";
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
