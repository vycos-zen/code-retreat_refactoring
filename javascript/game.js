exports = typeof window !== "undefined" && window !== null ? window : global;


Game = function(gameTime) {
  var players          = new Array();
  var places           = new Array(6);
  var purses           = new Array(6);
  var inPenaltyBox     = new Array(6);

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;
  this.currentTime = 0;
  this.gameTime = gameTime;

  this.isGameTimeOver = function() {
    return this.currentTime === this.gameTime;
  }

  this.createQuestion = function(i) {
    popQuestions.push("Pop Question "+ i);
    scienceQuestions.push("Science Question "+ i);
    sportsQuestions.push("Sports Question "+ i);
    rockQuestions.push("Rock Question "+ i);
  };

  this.getWinner = function() {
    return players[purses.indexOf(Math.max(purses))];
  };

  for (var i = 0; i < 50; i++){
    this.createQuestion(i);
  };

  var didPlayerWin = function(){
    return !(purses[currentPlayer] == 6)
  };

  var nextPlayer = function() {
    currentPlayer += 1;
    if(currentPlayer == players.length)
      currentPlayer = 0;
  }

  var currentCategory = function(){
    if ([0, 4, 8].indexOf(places[currentPlayer]) !== -1) return 'Pop';
    if ([1, 5, 9].indexOf(places[currentPlayer]) !== -1) return 'Science';
    if ([2, 6, 10].indexOf(places[currentPlayer]) !== -1) return 'Sports';
    return 'Rock';
  };

  this.isPlayable = function(howManyPlayers){
    return howManyPlayers >= 2;
  };

  this.add = function(playerName){
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    this.showResult(playerName + " was added");
    this.showResult("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function(){
    return players.length;
  };

  var askQuestion = function(){
    if(currentCategory() == 'Pop')
      this.showResult(popQuestions.shift());
    if(currentCategory() == 'Science')
      this.showResult(scienceQuestions.shift());
    if(currentCategory() == 'Sports')
      this.showResult(sportsQuestions.shift());
    if(currentCategory() == 'Rock')
      this.showResult(rockQuestions.shift());
  }.bind(this);

  this.roll = function(roll){
    this.currentTime++;
    this.showResult(players[currentPlayer] + " is the current player");
    this.showResult("They have rolled a " + roll);

    if(inPenaltyBox[currentPlayer]){
      if(roll % 2 != 0){
        isGettingOutOfPenaltyBox = true;

        this.showResult(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if(places[currentPlayer] > 11){
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        this.showResult(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        this.showResult("The category is " + currentCategory());
        askQuestion();
      }else{
        this.showResult(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    }else{

      places[currentPlayer] = places[currentPlayer] + roll;
      if(places[currentPlayer] > 11){
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      this.showResult(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      this.showResult("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function(){
    var result = true;

    if (isGettingOutOfPenaltyBox) {

      this.showResult('Answer was correct!!!!');
      purses[currentPlayer] += 1;
      this.showResult(players[currentPlayer] + " now has " +
                  purses[currentPlayer]  + " Gold Coins.");

      result = didPlayerWin();;
    }
    nextPlayer();
    return result;
  };

  this.wrongAnswer = function(){
		this.showResult('Question was incorrectly answered');
		this.showResult(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;

    nextPlayer();
		return true;
  };
};

Game.prototype.showResult = function(result) {
  console.log(result);
}

//playGame();

module.exports = {
  Game
}
