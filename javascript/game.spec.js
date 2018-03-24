let { Game } = require('./game.js');
var mock1Json = require('./mock_stage2_2.json');
var mock2Json = require('./mock2.json');
var mock3Json = require('./mock3.json');
var gameOutput = [];
var mock = [];

var game;

Game.prototype.showResult = function(result) {
  console.log(result);
  gameOutput.push(result);
};

playGame = (gameInput, gametime) => {
  var notAWinner = false;
  var isTimeOver = false;

  let roundIndex = 0;
  game = new Game(gametime);

  var round = 0;

  game.add('Chet');
  game.add('Pat');
  game.add('Sue');

  do{
    let round = {};
    round.roll = gameInput ? gameInput.mock[roundIndex].roll : Math.floor(Math.random()*6) + 1;
    game.roll(round.roll);
  
    round.wrongAnswer = gameInput ? gameInput.mock[roundIndex].wrongAnswer : Math.floor(Math.random()*10) === 7;
    if(round.wrongAnswer){
      notAWinner = game.wrongAnswer();
    }else{
      notAWinner = game.wasCorrectlyAnswered();
    }

    mock.push(round);
    roundIndex++;
  }while(notAWinner && !game.isGameTimeOver());

  game.getWinner();

  var gamePlay = {
    mock,
    gameOutput
  };

 console.log(JSON.stringify(gamePlay));
 return gameOutput;
}

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

describe("Your specs...", function() {
  var oldResult =  Game.prototype.showResult;
  it('should output the required mock1 output', () => {
    let response = playGame(mock1Json, 3000000000)
    expect(response).toEqual(mock1Json.gameOutput)
  });

  it('should output the required mock1 output', () => {
    let response = playGame(mock1Json, 15);
    expect(response).not.toEqual(mock1Json.gameOutput)
  });

  it('should output the required mock2 output', () => {
    Game.prototype.showResult = jasmine.createSpy('showResult spy');
    let response = playGame(mock1Json, 30);
    expect(Game.prototype.showResult).toHaveBeenCalled();
  });

  // it('should output the required mock3 output', () => {
  //   let response = playGame(mock3Json)
  //   expect(response).toEqual(mock3Json.gameOutput)
  // });
});
