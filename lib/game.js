var Board = require('./board.js');
var PlayerList = require('./playerlist.js');
var IndicatorList = require('./indicatorlist.js');
var App = require('launchpad-app');


var states = {
  PLAYING: 0,
  BETWEEN_TURNS: 1,
  GAME_OVER: 2
};

function Game(launchpad) {
  this.launchpad = launchpad;

  this.board = new Board(this);
  this.playerList = new PlayerList(this.board);
  this.indicatorList = new IndicatorList(this.board);

  this.currentState = null;
  this.currentSequence = null;
  this.currentMoveIndex = null;
  this.btnKeyLastPressed = null;
}

Game.prototype = {
  posToBtnKey: function(pos) {
    return pos[1] * 8 + pos[0];
  },
  btnKeyToPos: function(btnKey) {
    return [btnKey % 8, ~~(btnKey / 8)];
  },
  setBtnKeyColor: function(btnKey, color) {
    var pos = this.btnKeyToPos(btnKey);
    this.launchpad.set(pos, color);
  },
  showKeypress: function(btnKey) {
//    setBtnKeyColor(btnKeyLastPressed, colors.none);
    this.btnKeyLastPressed = btnKey;
//    var pos = btnKeyToPos(btnKey);
    var color = App.colors.yellow;
    this.setBtnKeyColor(btnKey, color);
  },
  reactToKeypress: function(btnKey) {
    this.board.innerFill(App.colors.none);
    this.showKeypress(btnKey);

    if (this.currentMoveIndex < this.currentSequence.length) {
      if (this.currentSequence[this.currentMoveIndex] != btnKey) {
        this.triggerPlayerFail();
      }
      this.currentMoveIndex++;
    } else {
      this.currentSequence.push(btnKey);
      this.switchPlayer();
    }
  },
  switchPlayer: function() {
    this.currentState = states.BETWEEN_TURNS;

    this.currentMoveIndex = 0;

    setTimeout(function () {
      this.playerList.next();

      if (this.currentState != states.GAME_OVER) {
        this.displayNewTurn();

        this.currentState = states.PLAYING;
      }
    }.bind(this), 500);
  },
  triggerPlayerFail: function() {
    this.playerList.kill();
    this.board.innerFill(App.colors.red);

    setTimeout(function () {
      this.switchPlayer();
    }.bind(this), 500);
  },
  triggerGameOver: function() {
    this.currentState = states.GAME_OVER;

    this.indicatorList.selectMixer();
    this.launchpad.fill(App.colors.yellow);

//    setTimeout(function () {
//      this.start();
//    }.bind(this), 2000);
  },
  triggerQuickReset: function() {
    this.currentState = states.GAME_OVER;

    this.indicatorList.lockMixer();
    this.launchpad.fill(App.colors.red);

    setTimeout(function () {
      this.start();
    }.bind(this), 200);
  },
  displayNewTurn: function() {
    this.board.innerFill(App.colors.green);
  },
  displayRing: function() {
    this.board.outerFill(App.colors.orange);
  },
  start: function() {
    this.launchpad.reset();
    this.playerList.reset();
    this.indicatorList.reset();
    this.board.repaint();

    this.currentState = states.PLAYING;
    this.currentSequence = [];
    this.currentMoveIndex = 0;
    this.btnKeyLastPressed = 0;

    this.displayRing();
    this.displayNewTurn();
  },
  keyHandler: function(pressed, pos) {
    if (pressed) {
      var button = this.board.getButton(pos);

      if (button.isSpecial()) {
        button.trigger();
      } else {
        if (this.currentState == states.PLAYING) {
          if (this.board.isInbounds(pos)) {
            this.reactToKeypress(
              this.posToBtnKey(pos)
            );
          }
        }
      }
    }
  }
};

module.exports = Game;
