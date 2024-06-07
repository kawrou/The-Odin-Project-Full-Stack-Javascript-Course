// CreatePlayer Factory Function
function CreatePlayer(name, symbol) {
  return { name, symbol };
}

// GameBoard class
const GameBoard = (() => {
  //   let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

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
    // gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  return {
    getGameBoard,
    markCell,
    clearBoard,
  };
})();

//TicTacToe Logic
function TicTacToe(player1, player2, gameBoard) {
  let isPlayer1Turn = true;
  let currentPlayer;

  const checkCurrentPlayer = () => {
    return (currentPlayer = isPlayer1Turn ? player1 : player2);
  };

  function markCell(row, col) {
    const currentPlayer = checkCurrentPlayer();
    const success = gameBoard.markCell(currentPlayer.symbol, row, col);
    if (!success) {
      return false;
    }
    return true;
  }

  const switchPlayerTurn = () => {
    isPlayer1Turn = !isPlayer1Turn;
  };

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
      return { winner: null, isDraw };
    }

    for (const combination of winCombinations) {
      if (
        combination.every(
          ([row, col]) =>
            gameBoard.getGameBoard()[row][col] === currentPlayer.symbol
        )
      ) {
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
function GameController(createPlayer, gameBoard) {
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

  const resetGame = () => {
    game.resetGameState();
  };

  function startGame() {
    // createPlayers();
    game = TicTacToe(player1, player2, gameBoard);
  }

  function logGameBoard() {
    console.log(
      gameBoard
        .getGameBoard()
        .map((row) => row.join("|"))
        .join("\n")
    );
  }

  const makeMove = (row, col) => {
    const success = game.markCell(row, col);

    if (!success) {
      return false;
    }
    game.switchPlayerTurn();
    return gameBoard.getGameBoard();
  };

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

  const generateBoardHtml = () => {
    while (boardContainer.firstChild) {
      boardContainer.removeChild(boardContainer.firstChild);
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-row", row);
        cell.setAttribute("data-col", col);

        cell.addEventListener("click", () => {
          const success = gameController.makeMove(row, col);
          if (success) {
            refreshBoard(success);
            const winState = gameController.checkWinState();

            if (!winState) {
              return;
            }

            if (winState.winner || winState.isDraw) {
              handleGameEnd(winState);
            }
          }
        });
        boardContainer.appendChild(cell);
      }
    }
  };

  playAgainButton.addEventListener("click", () => {
    playAgain();
    hidePlayAgainButton();
  });

  function hidePlayAgainButton() {
    playAgainButton.style.display = "none";
  }

  function showPlayAgainButton() {
    playAgainButton.style.display = "block";
  }

  const refreshBoard = (gameBoard) => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      const row = cell.getAttribute("data-row");
      const col = cell.getAttribute("data-col");

      if (gameBoard[row][col] === 0) {
        console.log(gameBoard[row][col]);
        cell.textContent = "";
      } else {
        cell.textContent = gameBoard[row][col];
      }
    });
  };

  const handleGameEnd = (winState) => {
    if (winState.isDraw) {
      winnerMessage.textContent = "The game is a drawer!";
    } else {
      winnerMessage.textContent = `${winState.winner.name} is the winner!`;
    }
    showPlayAgainButton();
  };

  function playAgain() {
    gameController.resetGame();
    generateBoardHtml();
  }

  return {
    generateBoardHtml,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const gameController = GameController(CreatePlayer, GameBoard);
  const uiController = UIController(gameController);
  uiController.generateBoardHtml();
  const startGameButton = document.getElementById("start-game-btn");
  startGameButton.addEventListener("click", () => {
    gameController.startGame();
    startGameButton.style.display = "none";
  });
});
