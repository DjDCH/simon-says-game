var EventEmitter = require('events').EventEmitter;
var util = require('util');
var App = require('launchpad-app');

function Button(board, pos) {
  this.board = board;
  this.pos = pos;
  this.x = pos[0];
  this.y = pos[1];
  this.color = App.colors.none;
}

util.inherits(Button, EventEmitter);

Button.prototype.trigger = function() {
  this.emit('press', this.pos); // Should call all listener
};

Button.prototype.getPos = function() {
  return this.pos;
};

Button.prototype.getX = function() {
  return this.x;
};

Button.prototype.getY = function() {
  return this.y;
};

Button.prototype.getColor = function() {
  return this.color;
};

Button.prototype.setColor = function(color) {
//  if (this.color == color) {
//    return;
//  }

  this.color = color;
  this.repaint();
};

Button.prototype.repaint = function() {
  var game = this.board.getGame();

  if (game) {
    game.launchpad.set(this.pos, this.color); // Call launchpad to update color
  } else {
    console.log('Game is not set');
  }
};

Button.prototype.isFunctions = function() {
  return (this.y == 8);
};

Button.prototype.isActions = function() {
  return (this.x == 8);
};

Button.prototype.isSpecial = function() {
  return (this.isFunctions() || this.isActions());
};

Button.prototype.isUp = function() {
  return (this.isFunctions() && this.x == 0);
};

Button.prototype.isDown = function() {
  return (this.isFunctions() && this.x == 1);
};

Button.prototype.isLeft = function() {
  return (this.isFunctions() && this.x == 2);
};

Button.prototype.isRight = function() {
  return (this.isFunctions() && this.x == 3);
};

Button.prototype.isSession = function() {
  return (this.isFunctions() && this.x == 4);
};

Button.prototype.isUser1 = function() {
  return (this.isFunctions() && this.x == 5);
};

Button.prototype.isUser2 = function() {
  return (this.isFunctions() && this.x == 6);
};

Button.prototype.isMixer = function() {
  return (this.isFunctions() && this.x == 7);
};

Button.prototype.isAction = function(y) {
  return (this.isActions() && this.y == y);
};

module.exports = Button;
