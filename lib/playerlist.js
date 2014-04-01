var Player = require('./player.js');

var PLAYER_NUM = 8;

function PlayerList(board) {
  this.board = board;
  this.currentPlayer = 0;
  this.currentAlivePlayerCount = 0;
  this.players = [];

  for (var i = 0; i < PLAYER_NUM; i++) {
    this.players.push(new Player(this, i, [8, i]));
  }

  // Enable player Zero
  this.players[0].play();
  this.players[1].enable();
}

PlayerList.prototype = {
  reset: function() {
    for (var i = 0; i < PLAYER_NUM; i++) {
      if (this.players[i].isEnabled()) {
        this.players[i].enable();
      }
    }

    this.players[0].play();
    this.players[1].enable();
    this.currentPlayer = 0;
  },
  updateAlivePlayerCount: function() {
    var count = 0;

    for (var i = 0; i < PLAYER_NUM; i++) {
      if (this.players[i].isAlive()) {
        count++;
      }
    }

    this.currentAlivePlayerCount = count;
  },
  next: function() {
    this.updateAlivePlayerCount();

    if (this.currentAlivePlayerCount <= 1) {
      this.board.getGame().triggerGameOver();
      return;
    }

    var lastPlayer = this.players[this.currentPlayer];

    if (!lastPlayer.isDead()) {
      this.players[this.currentPlayer].enable();
    }

    for (var i = 0; i < PLAYER_NUM; i++) {
      this.currentPlayer++;
      this.currentPlayer %= 8;

      if (this.players[this.currentPlayer].isAlive()) {
        break;
      }
    }

    this.players[this.currentPlayer].play();
  },
  kill: function() {
    this.players[this.currentPlayer].kill();
  },
  pressed: function(player) {
    if (player.num == 0) { // Player Zero is always enable
      return;
    }

    if (!player.isEnabled()) {
      player.enable();
    } else {
      player.disable();
    }

    this.board.getGame().triggerQuickReset();
  }
};

module.exports = PlayerList;
