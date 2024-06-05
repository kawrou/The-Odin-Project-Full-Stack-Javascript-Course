const GameBoard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  let originalBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const print = () => {
    console.log(board.map((row) => row.join("|")).join("\n"));
  };

  const markCell = (playerId, row, col) => {
    if ((board[row][col] === 0)) {
      board[row][col] = playerId;
      print();
    } else {
      console.log("Cell already marked. Choose another cell");
    }
  };

  const resetBoard = () => {
    board = originalBoard.map(row => row.slice()); 
		console.log("Cleared board")
		print(); 
  };

  return {
    board,
    print,
    markCell,
    resetBoard,
  };
})();

function TicTacToe(player1, player2) {
  let isPlayer1Turn = true;
  let currentPlayer;

  const checkCurrentPlayer = () => {
    return (currentPlayer = isPlayer1Turn ? player1 : player2);
  };

  function markCell(currentPlayer, rowSelection, collumnSelection) {
    GameBoard.print();
    GameBoard.markCell(currentPlayer, rowSelection, collumnSelection);
    GameBoard.print();
    isPlayer1Turn = !isPlayer1Turn;
  }

  const resetGameState = () => {
    GameBoard.resetBoard();
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

  function checkWin(player) {
		console.log(player)
    for (const combination of winCombinations) {
      if (
        combination.every(([row, col]) => GameBoard.board[row][col] === player)
      ) {
        return true;
      }
    }
    return false;
  }
  return {
    checkCurrentPlayer,
    markCell,
    checkWin,
    resetGameState,
  };
}

function CreatePlayer(name, id) {
  return { name, id };
}

function GameController() {
  let player1;
  let player2;
  let game;

  const createPlayers = () => {
    const player1Name = prompt("Enter name for player 1");
    const player2name = prompt("Enter name for player 2");
    player1 = CreatePlayer(player1Name, 1);
    player2 = CreatePlayer(player2name, 2);
  };

  const resetGame = () => {
    game.resetGameState();
		console.log("Game Reset")
		askMove();
  };

  function startGame() {
    createPlayers();
    game = TicTacToe(player1, player2);
    askMove();
  }

  const askMove = () => {
    const currentPlayer = game.checkCurrentPlayer();
    const rowSelection = prompt(`${currentPlayer.name} enter the row:`);
    const collumnSelection = prompt("Enter the column");
    game.markCell(
      currentPlayer.id,
      Number(rowSelection),
      Number(collumnSelection)
    );
    if (game.checkWin(currentPlayer.id)) {
      console.log(`${currentPlayer.name} win!`);
      const playAgain = prompt("Play again? (yes/no)").toLowerCase() === "yes";
      if (playAgain) {
        resetGame();
      }
    } else {
      askMove();
    }
  };

  return {
    startGame,
  };
}

const game = GameController();

