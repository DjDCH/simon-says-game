var Button = require('./button.js');

var ROW = 8;

var bounds = {
  SMALL: 3,
  MEDIUM: 2,
  LARGE: 1,
  FULL: 0
};

function Board(game) {
  this.game = game;
  this.buttons = {};
  this.currentBounds = bounds.FULL;
}

Board.bounds = bounds;

Board.prototype = {
  getButton: function(pos) {
    var index = this.getIndexFromPos(pos);

    return (this.buttons[index] || (this.buttons[index] = new Button(this, pos)));
  },
  getIndexFromPos: function(pos) {
    return (pos[0] + ':' + pos[1]);
  },
  getGame: function() {
    return (this.game);
  },
//  setGame: function(game) {
//    this.game = game;
//  },
  getBounds: function() {
    return (this.currentBounds);
  },
  setBounds: function(bounds_) {
    this.currentBounds = bounds_;
  },
  setBoundsReset: function(bounds_) {
    this.setBounds(bounds_);
    this.game.triggerQuickReset();
  },
  isInbounds: function(pos) {
    var x = pos[0], y = pos[1];

    return (x >= 0 + this.currentBounds
         && y >= 0 + this.currentBounds
         && x < ROW - this.currentBounds
         && y < ROW - this.currentBounds);
  },
  fill: function(color) {
    for (var i = 0; i < ROW; i++) {
      for (var j = 0; j < ROW; j++) {
        this.getButton([i, j]).setColor(color); // FIXME
//        launchpad.set(pos, color);
      }
    }
  },
  innerFill: function(color) {
    for (var i = 0 + this.currentBounds; i < ROW - this.currentBounds; i++) {
      for (var j = 0 + this.currentBounds; j < ROW - this.currentBounds; j++) {
        this.getButton([i, j]).setColor(color);
//        launchpad.set([i, j], color);
      }
    }
  },
  outerFill: function(color) {
    for (var i = 0; i < ROW; i++) {
      for (var j = 0; j < ROW; j++) {
        var pos = [i, j];

        if (!this.isInbounds(pos)) {
          this.getButton(pos).setColor(color);
//          launchpad.set(pos, color);
        }
      }
    }
  },
  repaint: function() {
    for (var button in this.buttons) {
      this.getButton(button).repaint();
    }
  }
};

module.exports = Board;
