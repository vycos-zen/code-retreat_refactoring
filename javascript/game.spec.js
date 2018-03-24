let { Game, playGame } = require('./game.js');
var mock1Json = require('./mock1.json');
var mock2Json = require('./mock2.json');
var mock3Json = require('./mock3.json');

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

describe("Your specs...", function() {
  it('should output the required mock1 output', () => {
    let response = playGame(mock1Json)
    expect(response).toEqual(mock1Json.gameOutput)
  });

  // it('should output the required mock2 output', () => {
  //   let response = playGame(mock2Json)
  //   expect(response).toEqual(mock2Json.gameOutput)
  // });

  // it('should output the required mock3 output', () => {
  //   let response = playGame(mock3Json)
  //   expect(response).toEqual(mock3Json.gameOutput)
  // });
});
