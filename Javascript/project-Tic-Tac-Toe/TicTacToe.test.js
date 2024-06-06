const GameBoard = require("./GameBoard");
const TicTacToe = require("./TicTacToe");

const mockPlayer1 = {
  name: "testPlayer1",
  id: "x",
};

const mockPlayer2 = {
  name: "testPlayer2",
  id: "o",
};

const mockGameBoard = {
  getGameBoard: jest.fn(),
  markCell: jest.fn(),
  clearBoard: jest.fn(),
};

let testTicTacToe;
describe("TicTacToe tests", () => {
  beforeEach(() => {
    testTicTacToe = new TicTacToe(mockPlayer1, mockPlayer2, mockGameBoard);
  });

  it("can check current player", () => {
    const currentPlayer = testTicTacToe.checkCurrentPlayer();
    expect(currentPlayer).toEqual(mockPlayer1);
  });

  it("can mark a cell", () => {
    testTicTacToe.markCell("1", "1");
    expect(mockGameBoard.markCell).toHaveBeenCalledWith("x", "1", "1");
  });

  it("switches player turn after marking a cell ", () => {
    testTicTacToe.markCell("0", "1");
    testTicTacToe.switchPlayerTurn();
    const currentPlayer = testTicTacToe.checkCurrentPlayer();
    expect(currentPlayer).toEqual(mockPlayer2);
  });

  it("can reset game board state", () => {
    testTicTacToe.markCell("1", "1");
    expect(mockGameBoard.markCell).toHaveBeenCalledWith("x", "1", "1");
    testTicTacToe.resetGameState();
    expect(mockGameBoard.clearBoard).toHaveBeenCalled();
  });

  it("returns false when the game hasn't won", () => {
    const gameBoardState = [
      ["", "", ""],
      ["", "x", ""],
      ["", "", ""],
    ];
    mockGameBoard.getGameBoard.mockReturnValue(gameBoardState);
    testTicTacToe.markCell("1", "1");
    const winState = testTicTacToe.checkIsWon();
    expect(winState).toEqual({ winner: null, isDraw: false });
  });

  it("returns true when the game has won", () => {
    const gameBoardState = [
      ["", "", "x"],
      ["", "x", ""],
      ["x", "", ""],
    ];

    mockGameBoard.getGameBoard.mockReturnValue(gameBoardState);
    testTicTacToe.markCell("1", "1");
    const winState = testTicTacToe.checkIsWon();
    expect(winState).toEqual({ winner: mockPlayer1, isDraw: false });
  });

  it("returns a tie when all cells are marked", () => {
    const gameBoardState = [
      ["o", "x", "o"],
      ["x", "x", "o"],
      ["x", "o", "x"],
    ];

    mockGameBoard.getGameBoard.mockReturnValue(gameBoardState);
    testTicTacToe.markCell("1", "1");
    const winState = testTicTacToe.checkIsWon();
    expect(winState).toEqual({ winner: null, isDraw: true });
  });
});
