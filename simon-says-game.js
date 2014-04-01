var App = require('launchpad-app');
var Game = require('./lib/game.js');

var pad = new App.Launchpad();
var game = new Game(pad);

App(pad, {
  start: game.start.bind(game),
  key: game.keyHandler.bind(game)
});
