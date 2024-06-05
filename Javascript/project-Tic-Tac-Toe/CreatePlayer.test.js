const CreatePlayer = require("./CreatePlayer");

describe("CreatePlayer test", () => {
  it("Should instantiate a new player", () => {
    const player1 = new CreatePlayer("testPlayer1", "x");
    const player2 = new CreatePlayer("testPlayer2", "o");

    expect(player1.name).toEqual("testPlayer1");
    expect(player1.id).toEqual("x");
    expect(player2.name).toEqual("testPlayer2");
    expect(player2.id).toEqual("o");
  });
});
