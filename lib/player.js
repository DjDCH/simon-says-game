//var Board = require('./board.js');
var App = require('launchpad-app');

var states = {
  DISABLED: 0,
  ALIVE: 1,
  PLAYING: 2, // Alive and current turn
  DEAD: 3
};

var colors = [
  App.colors.none,
  App.colors.green,
  App.colors.yellow,
  App.colors.red
];

function Player(parent, num, pos) {
  this.parent = parent;
  this.num = num;
  this.state = states.DISABLED;
  this.color = colors[0];
  this.button = parent.board.getButton(pos);
  this.button.on('press', function(pos) {
    this.parent.pressed(this);
  }.bind(this));
}

Player.prototype = {
  disable: function() {
    this.state = states.DISABLED;
    this.updateButton();
  },
  enable: function() {
    this.state = states.ALIVE;
    this.updateButton();
  },
  play: function() {
    this.state = states.PLAYING;
    this.updateButton();
  },
  kill: function() {
    this.state = states.DEAD;
    this.updateButton();
  },
  updateButton: function() {
    this.color = colors[this.state];
    this.button.setColor(this.color);
  },
  isEnabled: function() {
    return (this.state != states.DISABLED);
  },
  isAlive: function() {
    return (this.isEnabled()
        && (this.state == states.ALIVE || this.state == states.PLAYING));
  },
  isPlaying: function() {
    return (this.isEnabled()
        && (this.state == states.PLAYING));
  },
  isDead: function() {
    return (this.isEnabled()
        && (this.state == states.DEAD));
  },
  say: function() {
    console.log('Hello world! My num is ' + this.num + ' and my state is ' + this.state + ' and my color is ' + this.color);
  }
};

module.exports = Player;
