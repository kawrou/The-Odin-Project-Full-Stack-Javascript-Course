const gameBoard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  return {
    board,
    print: () =>
      console.log(this.board.map((row) => row.join(" | ")).join("\n")),
  };
})();

function ticTacToe(player1, player2) {
  let isPlayer1Turn = true;

  function markCell(currentPlayer, rowSelection, collumnSelection) {
    let currentPlayer = isPlayer1Turn ? player1 : player2;
    let row = rowSelection;
    let col = collumnSelection;

    if (gameBoard[row][col] === 0) {
      gameBoard[row][col] = currentPlayer.name;
      isPlayer1Turn = !isPlayer1Turn;
      gameBoard.board.print();
      checkWin(currentPlayer);
    } else {
      console.log("Cell already marked. Choose another cell");
      markCell(currentPlayer, row, col);
    }
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

  function checkWin(player) {
    for (const combination of winCombinations) {
      if (
        combination.every(
          ([row, col]) => gameBoard.board[row][col] === player.name
        )
      ) {
        return true;
      }
    }
    return false;
  }
}

function createPlayer(name) {
  return { name };
}

const player1 = createPlayer("x");
const player2 = createPlayer("y");

ticTacToe(player1, player2);

console.prompt()