const GameBoard = require("./GameBoard");

describe("GameBoard class test", () => {
  beforeEach(() => {
    GameBoard.clearBoard();
  });
  it("returns the gameboard", () => {
    // const expectedBoard = ["", "", "", "", "", "", "", "", ""];

    const expectedBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    expect(GameBoard.getGameBoard()).toEqual(expectedBoard);
  });

  it("marks a cell", () => {
    // const expectedBoard = ["x", "", "", "", "", "", "", "", ""];
    const expectedBoard = [
      ["x", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    // GameBoard.markCell("x", 0);
    GameBoard.markCell("x", 0, 0);
    expect(GameBoard.getGameBoard()).toEqual(expectedBoard);
  });

  it("resets the board", () => {
    // const expectedBoard = ["", "", "", "", "", "", "", "", ""];
    const expectedBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    // GameBoard.markCell("x", 0);
    GameBoard.markCell("x", 0, 0);
    GameBoard.clearBoard();
    expect(GameBoard.getGameBoard()).toEqual(expectedBoard);
  });

  it("can't mark a cell that's already marked", () => {
    const expectedBoard = [
      ["", "", ""],
      ["", "x", ""],
      ["", "", ""],
    ];

    GameBoard.markCell("x", 1, 1);
    expect(() => GameBoard.markCell("o", 1, 1)).toThrow(
      "The cell is already marked!"
    );
  });
});
