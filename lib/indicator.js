//var Board = require('./board.js');
var App = require('launchpad-app');

var states = {
  DISABLED: 0,
  ACTIVE: 1,
  SELECTED: 2,
  LOCKED: 3,
  FUNNY: 4
};

var colors = [
  App.colors.none,
  App.colors.green,
  App.colors.amber,
  App.colors.red,
  App.colors.yellow
];

function Indicator(parent, ndiktor, pos) {
  this.parent = parent;
  this.ndiktor = ndiktor;
  this.state = states.DISABLED;
  this.color = colors[0];
  this.button = parent.board.getButton(pos);
  this.button.on('press', function(pos) {
    this.parent.pressed(this);
  }.bind(this));
}

Indicator.prototype = {
  disable: function() {
    this.state = states.DISABLED;
    this.updateButton();
  },
  activate: function() {
    this.state = states.ACTIVE;
    this.updateButton();
  },
  select: function() {
    this.state = states.SELECTED;
    this.updateButton();
  },
  lock: function() {
    this.state = states.LOCKED;
    this.updateButton();
  },
  funny: function() {
    this.state = states.FUNNY;
    this.updateButton();
  },
  updateButton: function() {
    this.color = colors[this.state];
    this.button.setColor(this.color);
  },
  isEnabled: function() {
    return (this.state != states.DISABLED);
  },
  isActive: function() {
    return (this.isEnabled()); // Indicator is consider active when enable
  },
  isSelected: function() {
    return (this.isEnabled()
      && (this.state == states.SELECTED));
  },
  isLocked: function() {
    return (this.isEnabled()
      && (this.state == states.LOCKED));
  }
};

module.exports = Indicator;
