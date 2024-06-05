const GameBoard = (() => {
  //   let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getGameBoard = () => gameBoard;

//   const markCell = (player, index) => {
//     if (["x", "o"].includes(gameBoard[index])) {
//       throw new Error("The cell is already marked!");
//     }
//     gameBoard[index] = player;
//   };

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

module.exports = GameBoard;
