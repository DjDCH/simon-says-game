var App = require('launchpad-app');
var Board = require('./board.js');
var Indicator = require('./indicator.js');


var ndiktors = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2,
  FULL: 3,
  SESSION: 4,
  MIXER: 5
};

var ndiktorsToBounds = [
  Board.bounds.SMALL,
  Board.bounds.MEDIUM,
  Board.bounds.LARGE,
  Board.bounds.FULL
];

//var ndiktorsTrans = [
//  [0, 8],
//  [1, 8],
//  [2, 8],
//  [3, 8],
//  [7, 8]
//];

function IndicatorList(board) {
  this.board = board;
  this.currentBounds = Board.bounds.FULL;
  this.currentBoundsIndicator = ndiktors.FULL;

  this.indicators = [
    new Indicator(this, ndiktors.SMALL, App.buttons.up),
    new Indicator(this, ndiktors.MEDIUM, App.buttons.down),
    new Indicator(this, ndiktors.LARGE, App.buttons.left),
    new Indicator(this, ndiktors.FULL, App.buttons.right),
    new Indicator(this, ndiktors.SESSION, App.buttons.session),
    new Indicator(this, ndiktors.MIXER, App.buttons.mixer)
  ];
}

IndicatorList.prototype = {
  reset: function() {
    this.init();
//    this.selectBoundsIndicator(this.currentBoundsIndicator);
    this.getIndicator(this.currentBoundsIndicator).select();
  },
  init: function() {
    this.getIndicator(ndiktors.SMALL).activate();
    this.getIndicator(ndiktors.MEDIUM).activate();
    this.getIndicator(ndiktors.LARGE).activate();
    this.getIndicator(ndiktors.FULL).activate();
    this.getIndicator(ndiktors.MIXER).activate();
  },
  getIndicator: function(indicator) {
    return (this.indicators[indicator]);
  },
  selectMixer: function() {
    this.getIndicator(ndiktors.MIXER).funny();
  },
  lockMixer: function() {
    this.getIndicator(ndiktors.MIXER).lock();
  },
  resetCurrent: function() {
    this.getIndicator(this.currentBoundsIndicator).activate();
  },
  selectBoundsIndicator: function(indicator) {
    this.resetCurrent();
    this.currentBoundsIndicator = indicator;

    this.getIndicator(indicator).select();
    this.setBounds(ndiktorsToBounds[indicator]);
  },
//  setIndicator: function(indicator, state) {
//    this.indicators[indicator] = state;
//    this.board.getButton(ndiktorsTrans[indicator]).setColor(statesTrans[state]);
//  },
  setBounds: function(bounds) {
    this.currentBounds = bounds;
    this.board.setBoundsReset(bounds);
  },
  pressed: function(indicator) {
    if (indicator.ndiktor == ndiktors.MIXER) {
      this.board.getGame().triggerQuickReset();
    } else if (indicator.ndiktor == ndiktors.SESSION) {
      console.log('Has happend');
      this.board.getGame().launchpad.reset();
//      this.board.repaint(); // FIXME: Does fuck all
    } else {
      this.selectBoundsIndicator(indicator.ndiktor);
    }
  }
};

module.exports = IndicatorList;
