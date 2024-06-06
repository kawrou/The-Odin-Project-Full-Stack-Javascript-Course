// CreatePlayer Factory Function
function CreatePlayer(name, id) {
  return { name, id };
}

// GameBoard class
const GameBoard = (() => {
  //   let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getGameBoard = () => gameBoard;

  const markCell = (player, row, col) => {
    if (["x", "o"].includes(gameBoard[row][col])) {
      throw new Error("The cell is already marked!");
    }

    gameBoard[row][col] = player;
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
function TicTacToe(player1, player2, GameBoard) {
  let isPlayer1Turn = true;
  let currentPlayer;

  const checkCurrentPlayer = () => {
    return (currentPlayer = isPlayer1Turn ? player1 : player2);
  };

  function markCell(rowSelection, collumnSelection) {
    const currentPlayer = checkCurrentPlayer();
    try {
      GameBoard.markCell(currentPlayer.id, rowSelection, collumnSelection);
    } catch (err) {
      throw Error(err); 
    }
  }

  const switchPlayerTurn = () => {
    isPlayer1Turn = !isPlayer1Turn;
  };

  const resetGameState = () => {
    GameBoard.clearBoard();
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
    const isDraw = GameBoard.getGameBoard()
      .flat()
      .every((cell) => cell === "x" || cell === "o");
    if (isDraw) {
      return { winner: null, isDraw };
    }

    for (const combination of winCombinations) {
      if (
        combination.every(
          ([row, col]) =>
            GameBoard.getGameBoard()[row][col] === currentPlayer.id
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
function GameController() {
  let player1;
  let player2;
  let game;

  const createPlayers = () => {
    const player1Name = prompt("Enter name for player 1");
    const player2name = prompt("Enter name for player 2");
    player1 = CreatePlayer(player1Name, "x");
    player2 = CreatePlayer(player2name, "y");
  };

  const resetGame = () => {
    game.resetGameState();
    console.log("Game Reset");
    askMove();
  };

  function startGame() {
    createPlayers();
    game = TicTacToe(player1, player2, GameBoard);
    askMove();
  }

  const askMove = () => {
    console.log(
      GameBoard.getGameBoard()
        .map((row) => row.join("|"))
        .join("\n")
    );
    const currentPlayer = game.checkCurrentPlayer();
    const rowSelection = prompt(`${currentPlayer.name} enter the row:`);
    const collumnSelection = prompt("Enter the column");

    try {
      game.markCell(Number(rowSelection), Number(collumnSelection));
    } catch (err) {
      console.log(err);
      askMove();
    }

    if (checkWinState() === false) {
      game.switchPlayerTurn();
      askMove();
    }
  };

  const checkWinState = () => {
    const winState = game.checkIsWon();
    if (winState.isDraw) {
      console.log("The game is a draw!");
    }

    if (winState.winner === null && !winState.isDraw) {
      alert("Next players turn");
      return false;
    }

    if (!winState.isDraw) {
      alert(`${winState.winner} is the winner!`);
    }
    const playAgain = prompt("Play again? (yes/no)").toLowerCase() === "yes";
    if (playAgain) {
      resetGame();
    }
  };

  return {
    startGame,
  };
}

const game = GameController();
