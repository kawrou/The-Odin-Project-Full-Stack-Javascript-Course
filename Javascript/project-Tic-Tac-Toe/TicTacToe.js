// const GameBoard = require("./GameBoard");

function TicTacToe(player1, player2, GameBoard) {
  let isPlayer1Turn = true;
  let currentPlayer;

  const checkCurrentPlayer = () => {
    return (currentPlayer = isPlayer1Turn ? player1 : player2);
  };

  function markCell(rowSelection, collumnSelection) {
    const currentPlayer = checkCurrentPlayer();
    GameBoard.markCell(currentPlayer.id, rowSelection, collumnSelection);
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

module.exports = TicTacToe;
