const Player = require("./player");

describe("Player", () => {
  test("create", () => {
    const player = new Player();
    expect(player.id).not.toBeUndefined();
  });
});
