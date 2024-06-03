//I should be able to see a gameboard
//GAMEBOARD:
// The gameboard can be represented by a 1 dimensional array of a 3 x 3 grid
// [0,0,0,0,0,0,0,0,0]
// The index of the array maps to the cell of the board

// Or it can be represented by a multi-dimensional array
// [
//  [0, 0, 0],
//  [0, 0, 0],
//  [0, 0, 0],
// ];
// The cell would be retrieved by something like gameBoard[0][0] for the top left corner.

//I should be able to mark a cell
//MARK:
//Select the index position of the cell
//We can mark the value of the index with either the name of the player or by an ID which could be represented by (1 and 2) or (x and y) as there are only 2 players

// 1-D
// [1,2,1,2,1,0,1,0,2]
// OR
// [x,y,x,y,x,"",x,"",y]

// Multi
// [
//  [1, 2, 1],
//  [2, 1, 0],
//  [1, 0, 2],
// ];
// OR
// [
//  ["x", "y", "x"],
//  ["y", "x", ""],
//  ["x", "", "y"],
// ];

// MARKING:
// Would then need a function to make the mark:
// makeMark(player.id, index){
//     gameBoard.getBoard[index] = player.id
// }

// or
// makeMark(player.id, row, col){
// gameBoard.getBoard[row][col] = player.id
// }

// I should be able to win a game
// Need to check winning combinations after every move to determine the winner

// WINNING COMBINATIONS (Index):
//[0,1,2] - top row
//[0,3,6] - left column
//[0,4,8] - top left to bottom right
//[1,4,7] - middle column
//[2,5,8] - right column
//[2,4,6] - top right to bottom left
//[3,4,5] - middle row
//[6,7,8] - bottom row

// or
//[0][0], [0][1], [0][2] - top row
//[1][0], [1][1], [1][2] - middle row
//[2][0], [2][1], [2][2] - bottom row
//[0][0], [2][0], [3],[0] - left column
//[0][1], [2][1], [3][1] - middle column
//[0][2], [2][2], [3][2] - right column
//[0][0], [2][1], [3][2] - top left to bottom right
//[0][2], [2][1], [3][0] - top right to bottom left

// CHECKING:
// Iterate over the values in the arrays as index of the array
//for every array in winCombinations:
// function checkWin(player) {
//  for (const combination of winCombinations) {
//   for (const index of combination) {
//    if (gameBoard.getBoard[index] === player.id) {
//     return true;
//    }
//   }
//   return false;
//  }
// }

// function checkWin(player) {
//  for (const combination of winCombinations) {
//   if (combination.every((index) => gameBoard(index) === player)) {
//    return true;
//   }
//  }
//  return false;
// }


// TURNS
// Can use a boolean flag as it's only a 2 player game.
// isPlayer1Turn = true;

// After the 1st player makes a move, set to false:
// !isPlayer1Turn


// const GameBoard = function () {
//  let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//  return {
//   getGameBoard: () => {
//    gameBoard;
//   },
//  };
// };


//Should create players with a name
//To be iterated on when integrating browser features
//Currently returns 'x' and 'y'.
function createPlayer(name) {
 return { name };
}

const playerX = createPlayer("x");
const playerY = createPlayer("y");

console.log(playerX.name);
console.log(playerY.name);

