/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Card from './card';
var selectedCards = [];
var currentBoard = [];
var setScore = 0;
var defaultTimer = 30;

function shuffle(cards) {
  var currentIdx = cards.length;
  var tempVal = void 0,
      randomIdx = void 0;
  while (currentIdx !== 0) {
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx -= 1;
    tempVal = cards[currentIdx];
    cards[currentIdx] = cards[randomIdx];
    cards[randomIdx] = tempVal;
  }
  return cards;
}

var Game = function () {
  function Game() {
    var _this = this;

    _classCallCheck(this, Game);

    var deck = new Deck();
    this.deck = deck;
    this.deal(12, deck);
    this.timer = document.getElementById('timer');
    this.currentTimer = null;
    this.startTimer = this.startTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    document.getElementById('deal-button').onclick = this.redeal.bind(this);
    document.getElementById('play').onclick = function () {
      return _this.play();
    };
  }

  _createClass(Game, [{
    key: 'play',
    value: function play() {
      console.log("Let's play Set!");
      document.getElementById('splash').className = "hidden";
      this.startTimer();
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      this.clearTimer();
      document.getElementById('alerts').className = "error game-over bounceInDown";
      document.getElementById('alerts').innerHTML = "GAME OVER!";
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      var _this2 = this;

      console.log('Timer Started');
      this.timer.value = '' + defaultTimer;
      this.currentTimer = setInterval(function () {
        _this2.timer.value = parseInt(_this2.timer.value) - 1;
        if (_this2.timer.value === "0") {
          _this2.gameOver();
        }
      }, 1000);
    }
  }, {
    key: 'clearTimer',
    value: function clearTimer() {
      console.log('Timer Cleared');
      clearInterval(this.currentTimer);
      this.timer.value = '' + defaultTimer;
    }
  }, {
    key: 'redeal',
    value: function redeal() {
      this.deck = this.deck.concat(currentBoard);
      shuffle(this.deck);
      document.querySelectorAll('.card-container').forEach(function (el) {
        el.removeChild(el.childNodes[0]);
      });
      this.deal(12);
    }
  }, {
    key: 'evaluateSet',
    value: function evaluateSet(cards) {
      var _this3 = this;

      if (this.shapeSet(cards) && this.colorsSet(cards) && this.patternsSet(cards) && this.numbersSet(cards)) {
        this.flash('success', 'Valid set!');
        this.addPoints();
        setTimeout(function () {
          // Update the board after 1.5s of animations
          cards.forEach(function (card, i) {
            var bye = document.querySelector('[data-id=\'' + cards[i].id + '\']');
            var currId = cards[i].id;
            currentBoard.forEach(function (boardElement) {
              if (boardElement.id === currId) {
                var remove = currentBoard.indexOf(boardElement);
                currentBoard.splice(remove, 1);
              }
            });
            if (setScore < 24) {
              // If set count < 24, keep filling the board.
              var drawn = _this3.deck.shift();
              currentBoard.push(drawn);
              var newCard = _this3.createNewCard(drawn, i);
              newCard.classList.add('zoomIn');
              bye.parentNode.replaceChild(newCard, bye);
            } else {
              // Deck is empty. Clean up the board.
              bye.parentNode.removeChild(bye);
            }
          });
        }, 1500);
        console.log('valid set, reset timer');
        this.clearTimer();
        this.startTimer();
      } else {
        Array.from(document.querySelectorAll('.selected')).forEach(function (el) {
          el.classList.remove('shake');
          el.classList.add('shake');
        });
        this.flash('error', 'Not a valid set!');
      }
      selectedCards = [];
    }
  }, {
    key: 'flash',
    value: function flash(type, message) {
      var alert = document.getElementById('alerts');

      alert.className = '';
      alert.classList.remove('bounceOutUp');
      alert.classList.add(type);
      alert.classList.add('bounceInDown');
      alert.innerHTML = '' + message;

      setTimeout(function () {
        // allot time for alert animations
        var arr = document.querySelectorAll('.selected');
        alert.classList.remove('bounceInDown');
        arr.forEach(function (el) {
          el.classList.remove('shake');
          el.classList.remove('selected');
        });
      }, 1000);
      setTimeout(function () {
        alert.classList.add('bounceOutUp');
      }, 1000);
      setTimeout(function () {
        alert.classList.remove(type);
      }, 1750);
    }
  }, {
    key: 'createNewCard',
    value: function createNewCard(card, i) {
      var cardElement = document.createElement('div');
      var cardElementChildContainer = document.createElement('div');

      cardElement.setAttribute('data-id', card.shape + '-' + card.color + '-' + card.pattern + '-' + card.number);
      cardElement.setAttribute('data-shape', '' + card.shape);
      cardElement.setAttribute('data-color', '' + card.color);
      cardElement.setAttribute('data-pattern', '' + card.pattern);
      cardElement.setAttribute('data-number', '' + card.number);
      cardElement.className += 'card';
      cardElement.addEventListener('click', this.selectCard);
      cardElementChildContainer.className += "shape-container";
      cardElement.appendChild(cardElementChildContainer);

      for (var j = 0; j < card.number; j++) {
        var cardElementChild = document.createElement('div');
        cardElementChild.className += 'shape ' + card.shape + ' ' + card.color + ' ' + card.pattern + ' ' + card.number;
        cardElementChildContainer.appendChild(cardElementChild);
      }

      return cardElement;
    }
  }, {
    key: 'shapeSet',
    value: function shapeSet(cards) {
      if (cards[0].shape === cards[1].shape && cards[1].shape === cards[2].shape && cards[0].shape === cards[2].shape || cards[0].shape !== cards[1].shape && cards[1].shape !== cards[2].shape && cards[0].shape !== cards[2].shape) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'colorsSet',
    value: function colorsSet(cards) {
      if (cards[0].color === cards[1].color && cards[1].color === cards[2].color && cards[0].color === cards[2].color || cards[0].color !== cards[1].color && cards[1].color !== cards[2].color && cards[0].color !== cards[2].color) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'patternsSet',
    value: function patternsSet(cards) {
      if (cards[0].pattern === cards[1].pattern && cards[1].pattern === cards[2].pattern && cards[0].pattern === cards[2].pattern || cards[0].pattern !== cards[1].pattern && cards[1].pattern !== cards[2].pattern && cards[0].pattern !== cards[2].pattern) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'numbersSet',
    value: function numbersSet(cards) {
      if (cards[0].number === cards[1].number && cards[1].number === cards[2].number && cards[0].number === cards[2].number || cards[0].number !== cards[1].number && cards[1].number !== cards[2].number && cards[0].number !== cards[2].number) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'selectCard',
    value: function selectCard(e) {
      var _this4 = this;

      e.preventDefault();
      if (e.currentTarget.classList.contains('selected')) {
        selectedCards.forEach(function (el, i) {
          if (el.id === _this4.dataset.id) {
            selectedCards.splice(i, 1);
          }
        });
        e.currentTarget.classList.remove('selected');
      } else {
        e.currentTarget.classList.add("selected");
        setTimeout(function () {
          if (selectedCards.length !== 3) {
            var card = Object.assign({}, _this4.dataset);
            selectedCards.push(card);
            if (selectedCards.length === 3) {
              game.evaluateSet(selectedCards);
            }
          }
        }, 200);
      }
    }
  }, {
    key: 'addPoints',
    value: function addPoints() {
      setScore += 1;
      document.getElementById('points').value = setScore;
    }
  }, {
    key: 'deal',
    value: function deal(n) {
      var _this5 = this;

      currentBoard = [];
      var nArray = [];
      for (var i = 0; i < n; i++) {
        var card = this.deck.shift();
        currentBoard.push(card);
        nArray.push(card);
      }
      nArray.forEach(function (card, i) {
        var cardElement = _this5.createNewCard(card, i);
        document.getElementById('card-' + (i + 1)).appendChild(cardElement);
      });
    }
  }]);

  return Game;
}();

var Deck = function Deck() {
  var _this6 = this;

  _classCallCheck(this, Deck);

  var shapes = ['circle', 'square', 'diamond'];
  var colors = ['green', 'blue', 'orange'];
  var patterns = ['solid', 'stroke', 'striped'];
  var numbers = [1, 2, 3];

  this.cards = [];

  shapes.forEach(function (shape) {
    return colors.forEach(function (color) {
      return patterns.forEach(function (pattern) {
        return numbers.forEach(function (number) {
          return _this6.cards.push(new Card(shape, color, pattern, number));
        });
      });
    });
  });

  return shuffle(this.cards);
};

var Card = function Card(shape, color, pattern, number) {
  _classCallCheck(this, Card);

  this.id = shape + '-' + color + '-' + pattern + '-' + number;
  this.shape = shape;
  this.color = color;
  this.pattern = pattern;
  this.number = number;
};

var game = new Game();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map