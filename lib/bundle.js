/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _game_view = __webpack_require__(1);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var startButton = document.getElementById("new-game");
	  var canvas = document.getElementById("game-canvas").getContext("2d");
	  var gv = new _game_view2.default(canvas);
	  startButton.addEventListener("click", function () {
	    document.getElementById("main-menu").style.display = 'none';
	    document.getElementById('canvas-wrapper').style.display = 'block';
	    gv.start();
	  });
	  var instructions = document.getElementById('instructions');
	  instructions.addEventListener("click", function () {
	    document.getElementById("how-to-play").style.display = 'block';
	    document.getElementById("main-menu").style.display = 'none';
	  });
	
	  var back = document.getElementById('back');
	  back.addEventListener("click", function () {
	    document.getElementById("how-to-play").style.display = 'none';
	    document.getElementById("main-menu").style.display = 'block';
	  });
	
	  var audioOn = document.getElementById('audio-on');
	  var audioOff = document.getElementById('audio-off');
	  var audioOn2 = document.getElementById('audio-on2');
	  var audioOff2 = document.getElementById('audio-off2');
	  audioOn.addEventListener("click", function () {
	    document.getElementById('bg-music').pause();
	    audioOn.style.display = 'none';
	    audioOff.style.display = 'inline';
	  });
	
	  audioOff.addEventListener("click", function () {
	    document.getElementById('bg-music').play();
	    audioOn.style.display = 'inline';
	    audioOff.style.display = 'none';
	  });
	
	  audioOn2.addEventListener("click", function () {
	    document.getElementById('bg-music').pause();
	    audioOn2.style.display = 'none';
	    audioOff2.style.display = 'inline';
	  });
	
	  audioOff2.addEventListener("click", function () {
	    document.getElementById('bg-music').play();
	    audioOn2.style.display = 'inline';
	    audioOff2.style.display = 'none';
	  });
	
	  document.getElementById('restart').addEventListener("click", function () {
	    document.getElementById("game-over-wrapper").style.display = 'none';
	    var gameOver = document.getElementById("game-over");
	    while (gameOver.firstChild) {
	      gameOver.removeChild(gameOver.firstChild);
	    }
	    document.getElementById('canvas-wrapper').style.display = 'block';
	    gv.restart();
	  });
	
	  // document.getElementById('back-to-home').addEventListener("click", ()=>{
	  //   document.getElementById("game-over-wrapper").style.display = 'none';
	  //   let gameOver = document.getElementById("game-over");
	  //   while (gameOver.firstChild) {
	  //     gameOver.removeChild(gameOver.firstChild);
	  //   }
	  //   document.getElementById("main-menu").style.display = 'block';
	  // });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(2);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(ctx) {
	    _classCallCheck(this, GameView);
	
	    this.ctx = ctx;
	    this.game = null;
	    this.volume = null;
	    this.running = true;
	  }
	
	  _createClass(GameView, [{
	    key: 'restart',
	    value: function restart() {
	      var _this = this;
	
	      this.game = new _game2.default(this.ctx, this);
	      var gameStart = setInterval(function () {
	        if (_this.game.ship === null) {
	          clearInterval(gameStart);
	          _this.game.gameOver();
	          _this.game = new _game2.default(_this.ctx, _this);
	        }
	        _this.game.draw(_this.ctx);
	        _this.game.step();
	      }, 20);
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this2 = this;
	
	      this.volume = !document.getElementById('bg-music').paused;
	      this.game = new _game2.default(this.ctx, this);
	      this.bindKeyHandlers();
	      this.bindVolumeButton();
	      var gameStart = setInterval(function () {
	        if (_this2.game.ship === null) {
	          clearInterval(gameStart);
	          _this2.game.gameOver();
	        }
	        _this2.game.draw(_this2.ctx);
	        _this2.game.step();
	      }, 20);
	    }
	  }, {
	    key: 'bindKeyHandlers',
	    value: function bindKeyHandlers() {
	      var _this3 = this;
	
	      var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
	      alphabet.forEach(function (letter) {
	        return key(letter, function () {
	          return _this3.game.getInput(letter);
	        });
	      });
	      key('enter', function () {
	        return _this3.game.useBomb();
	      });
	    }
	  }, {
	    key: 'bindVolumeButton',
	    value: function bindVolumeButton() {
	      var _this4 = this;
	
	      var canvas = document.getElementById("game-canvas");
	      canvas.addEventListener("click", function (e) {
	        var clickedX = e.pageX - canvas.offsetLeft;
	        var clickedY = e.pageY - canvas.offsetTop;
	        if (clickedX <= 50 && clickedY >= 560 && _this4.volume) {
	          document.getElementById('bg-music').pause();
	          _this4.volume = !_this4.volume;
	        } else if (clickedX <= 50 && clickedY >= 560 && !_this4.volume) {
	          document.getElementById('bg-music').play();
	          _this4.volume = !_this4.volume;
	        }
	      });
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _asteroid = __webpack_require__(3);
	
	var _asteroid2 = _interopRequireDefault(_asteroid);
	
	var _ship = __webpack_require__(6);
	
	var _ship2 = _interopRequireDefault(_ship);
	
	var _words = __webpack_require__(7);
	
	var _bullet = __webpack_require__(8);
	
	var _bullet2 = _interopRequireDefault(_bullet);
	
	var _util = __webpack_require__(4);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(ctx, gv) {
	    var _this = this;
	
	    _classCallCheck(this, Game);
	
	    this.gv = gv;
	    this.bombs = 3;
	    this.score = 0;
	    this.ctx = ctx;
	    this.wave = 1;
	    this.astVel = 1000;
	    this.timeStart = new Date().getTime();
	    this.timeEnd = null;
	    this.keysEntered = 0;
	    this.errorKeys = 0;
	    this.asteroids = [];
	    this.ship = new _ship2.default(this);
	    this.currentWordIndex = "";
	    this.bullets = [];
	    this.destroyedAsteroids = [];
	    this.generateAsteroid();
	    var intervalId = setInterval(function () {
	      _this.generateAsteroid();
	      if (_this.asteroids.length + _this.destroyedAsteroids.length === Game.NUM_ASTEROIDS) {
	        clearInterval(intervalId);
	      }
	    }, 2000);
	  }
	
	  // resetGame(){
	  //   this.bombs = 3;
	  //   this.score = 0;
	  //   this.wave = 1;
	  //   this.astVel = 1000;
	  //   this.timeStart = new Date().getTime();
	  //   this.timeEnd = null;
	  //   this.keysEntered = 0;
	  //   this.errorKeys = 0;
	  //   this.asteroids = [];
	  //   this.ship = new Ship(this);
	  //   this.currentWordIndex = "";
	  //   this.bullets = [];
	  //   this.destroyedAsteroids = [];
	  //   this.generateAsteroid();
	  //   let intervalId = setInterval(()=> {
	  //     this.generateAsteroid();
	  //     if(this.asteroids.length + this.destroyedAsteroids.length === Game.NUM_ASTEROIDS){
	  //       clearInterval(intervalId);
	  //     }}
	  //     , 2000);
	  // }
	
	  _createClass(Game, [{
	    key: 'findWPM',
	    value: function findWPM() {
	      return Math.round((this.keysEntered - this.errorKeys) / 5 * (60 / ((this.timeEnd - this.timeStart) / 1000)));
	    }
	  }, {
	    key: 'findAccuracy',
	    value: function findAccuracy() {
	      var correctKeys = this.keysEntered - this.errorKeys;
	      return Math.round(correctKeys / this.keysEntered * 100) || 0;
	    }
	  }, {
	    key: 'nextLevel',
	    value: function nextLevel() {
	      var _this2 = this;
	
	      Game.NUM_ASTEROIDS += 5 + this.wave;
	      this.wave += 1;
	      this.astVel -= 75;
	      var nextWave = setInterval(function () {
	        _this2.generateAsteroid();
	        if (_this2.asteroids.length + _this2.destroyedAsteroids.length === Game.NUM_ASTEROIDS) {
	          clearInterval(nextWave);
	        }
	      }, 1500);
	    }
	  }, {
	    key: 'playLaserSound',
	    value: function playLaserSound() {
	      var laser = new Audio("../sounds/laser.wav");
	      laser.play();
	    }
	  }, {
	    key: 'playError',
	    value: function playError() {
	      var error = new Audio("../sounds/empty.wav");
	      error.play();
	    }
	  }, {
	    key: 'useBomb',
	    value: function useBomb() {
	      var _this3 = this;
	
	      if (this.bombs > 0) {
	        var bomb = new Audio('../sounds/bomb.mp3');
	        bomb.play();
	        this.asteroids.forEach(function (asteroid) {
	          var explosion = setInterval(function () {
	            return _this3.drawExplosion(_this3.ctx, asteroid);
	          }, 10);
	          _this3.playExplosion();
	          setTimeout(function () {
	            return clearInterval(explosion);
	          }, 300);
	          _this3.destroyedAsteroids.push(asteroid);
	        });
	        this.asteroids = [];
	        this.currentWordIndex = "";
	        this.bombs -= 1;
	      } else {
	        this.playError();
	      }
	    }
	  }, {
	    key: 'drawExplosion',
	    value: function drawExplosion(ctx, asteroid) {
	      var explosion = document.getElementById("explosion");
	      ctx.drawImage(explosion, asteroid.pos[0], asteroid.pos[1], 30, 30);
	    }
	  }, {
	    key: 'playExplosion',
	    value: function playExplosion() {
	      var explosion = new Audio("../sounds/explosion.wav");
	      explosion.play();
	    }
	  }, {
	    key: 'generateAsteroid',
	    value: function generateAsteroid() {
	      var letters = Object.keys(_words.words);
	      var letter = letters[Math.round(Math.random() * letters.length)];
	      var waveWord = null;
	      if (_words.words[letter]) {
	        waveWord = _words.words[letter][Math.round(Math.random() * _words.words[letter].length)];
	      }
	      if (waveWord) {
	        this.asteroids.push(new _asteroid2.default({ pos: this.randomPosition(), name: waveWord }, this, this.astVel));
	      }
	    }
	  }, {
	    key: 'randomPosition',
	    value: function randomPosition() {
	      return [Math.random() * Game.DIM_X, 0];
	    }
	  }, {
	    key: 'drawVolumeOff',
	    value: function drawVolumeOff(ctx) {
	      var volume = new Image();
	      volume.src = "../sprites/audioOff.png";
	      ctx.drawImage(volume, 10, 560, 40, 40);
	    }
	  }, {
	    key: 'drawVolumeButton',
	    value: function drawVolumeButton(ctx) {
	      var volume = new Image();
	      volume.src = "../sprites/audioOn.png";
	      ctx.drawImage(volume, 10, 560, 40, 40);
	    }
	  }, {
	    key: 'drawPauseButton',
	    value: function drawPauseButton(ctx) {
	      var pause = new Image();
	      pause.src = "../sprites/pause.png";
	      ctx.drawImage(pause, 430, 560, 40, 40);
	    }
	  }, {
	    key: 'drawStats',
	    value: function drawStats() {
	      this.ctx.fillStyle = '#87ceeb';
	      this.ctx.font = "900 21px sans-serif";
	      this.ctx.fillText('Wave ' + this.wave + ' Score: ' + this.score + ' Bombs: ' + this.bombs, 230, 590);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	      var background = document.getElementById("background");
	      ctx.drawImage(background, 0, 0, 480, 720);
	      if (this.ship) this.ship.draw(ctx);
	      this.asteroids.forEach(function (asteroid) {
	        return asteroid.draw(ctx), asteroid.drawText(ctx);
	      });
	      this.bullets.forEach(function (bullet) {
	        return bullet.draw(ctx);
	      });
	      if (this.destroyedAsteroids.length === Game.NUM_ASTEROIDS) {
	        this.nextLevel();
	      }
	      this.drawStats();
	      this.gv.volume ? this.drawVolumeButton(ctx) : this.drawVolumeOff(ctx);
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects() {
	      for (var i = 0; i < this.asteroids.length; i++) {
	        this.asteroids[i].move();
	      }
	      for (var j = 0; j < this.bullets.length; j++) {
	        this.bullets[j].move();
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.moveObjects();
	      this.checkCollisions();
	      this.checkAsteroids();
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      for (var i = 0; i < this.bullets.length; i++) {
	        for (var j = 0; j < this.asteroids.length; j++) {
	          if (this.bullets[i] && this.bullets[i].isCollidedWith(this.asteroids[j])) {
	            this.asteroids[j].bulletsTaken = this.asteroids[j].bulletsTaken + 1;
	            this.bullets[i].collideWith(this.asteroids[j]);
	          }
	        }
	      }
	      for (var k = 0; k < this.asteroids.length; k++) {
	        if (this.asteroids[k].isCollidedWith(this.ship)) {
	          this.drawExplosion(this.ctx, this.asteroids[k]);
	          this.playExplosion();
	          this.asteroids[k].collideWith(this.ship);
	        }
	      }
	    }
	  }, {
	    key: 'checkAsteroids',
	    value: function checkAsteroids() {
	      if (this.currentWordIndex !== "" && this.asteroids[this.currentWordIndex].name === "") {
	        this.currentWordIndex = "";
	      }
	    }
	  }, {
	    key: 'fireBullet',
	    value: function fireBullet(asteroid) {
	      var bullet = new _bullet2.default(_util2.default.vecToAsteroid(this.asteroids[this.currentWordIndex].pos, 30), this, asteroid);
	      this.bullets.push(bullet);
	      this.playLaserSound();
	    }
	  }, {
	    key: 'addScore',
	    value: function addScore() {
	      this.score += 2 * this.wave;
	    }
	  }, {
	    key: 'getInput',
	    value: function getInput(letter) {
	      this.keysEntered += 1;
	      if (this.currentWordIndex !== "") {
	        if (this.asteroids[this.currentWordIndex].name[0] === letter) {
	          this.fireBullet(this.asteroids[this.currentWordIndex]);
	          this.asteroids[this.currentWordIndex].name = this.asteroids[this.currentWordIndex].name.slice(1);
	          this.addScore();
	        } else {
	          this.errorKeys += 1;
	          this.playError();
	        }
	      } else {
	        var word = this.asteroids.filter(function (asteroid) {
	          return asteroid.name[0] === letter;
	        });
	        if (word.length !== 0) {
	          word = word[0];
	          var index = this.asteroids.indexOf(word);
	          this.currentWordIndex = index;
	          this.asteroids[index].textColor = 'orange';
	          this.asteroids[index].name = this.asteroids[index].name.slice(1);
	          this.fireBullet(this.asteroids[index]);
	          this.addScore();
	        } else {
	          this.errorKeys += 1;
	          this.playError();
	        }
	      }
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver() {
	      var gameOver = document.getElementById("game-over");
	      var stat2 = document.createElement("LI");
	      var wave = document.createTextNode('Wave: ' + this.wave);
	      stat2.appendChild(wave);
	      gameOver.appendChild(stat2);
	      var stat1 = document.createElement("LI");
	      var score = document.createTextNode('Score: ' + this.score);
	      stat1.appendChild(score);
	      gameOver.appendChild(stat1);
	      var stat3 = document.createElement("LI");
	      var wpm = document.createTextNode('WPM: ' + this.findWPM());
	      stat3.appendChild(wpm);
	      gameOver.appendChild(stat3);
	      var stat4 = document.createElement("LI");
	      var accuracy = document.createTextNode('Accuracy: ' + this.findAccuracy() + '%');
	      stat4.appendChild(accuracy);
	      gameOver.appendChild(stat4);
	      document.getElementById('canvas-wrapper').style.display = 'none';
	      document.getElementById('game-over-wrapper').style.display = 'block';
	      Game.NUM_ASTEROIDS = 5;
	    }
	  }]);
	
	  return Game;
	}();
	
	Game.DIM_X = 480;
	Game.DIM_Y = 620;
	Game.NUM_ASTEROIDS = 5;
	
	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(4);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _moving_object = __webpack_require__(5);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _ship = __webpack_require__(6);
	
	var _ship2 = _interopRequireDefault(_ship);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Asteroid = function (_MovingObject) {
	  _inherits(Asteroid, _MovingObject);
	
	  function Asteroid(options, game, speed) {
	    _classCallCheck(this, Asteroid);
	
	    options.pos = options.pos;
	    options.color = 'orange';
	    options.radius = 10;
	    options.vel = _util2.default.randomVec(options.pos, speed);
	    options.name = options.name;
	    options.textColor = options.textColor || "white";
	
	    var _this = _possibleConstructorReturn(this, (Asteroid.__proto__ || Object.getPrototypeOf(Asteroid)).call(this, options));
	
	    _this.bulletsNeeded = options.name.length || null;
	    _this.bulletsTaken = 0;
	    _this.game = game;
	    return _this;
	  }
	
	  _createClass(Asteroid, [{
	    key: 'collideWith',
	    value: function collideWith(otherObj) {
	      if (otherObj instanceof _ship2.default) {
	        this.game.ship = null;
	        this.game.timeEnd = Date.now();
	      }
	    }
	  }]);
	
	  return Asteroid;
	}(_moving_object2.default);
	
	exports.default = Asteroid;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Util = {
	  distance: function distance(pos1, pos2) {
	    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	  },
	  norm: function norm(vec) {
	    return Util.distance([0, 0], vec);
	  },
	  randomVec: function randomVec(pos, m) {
	    var vec = [225 - pos[0], 500 - pos[1]];
	    vec = this.scale(vec, m);
	    return vec;
	  },
	  dir: function dir(vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  scale: function scale(vec, m) {
	    return [vec[0] / m, vec[1] / m];
	  },
	  vecToAsteroid: function vecToAsteroid(pos, m) {
	    var vec = [pos[0] - 220, pos[1] - 500];
	    vec = this.scale(vec, m);
	    return vec;
	  }
	};
	
	exports.default = Util;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(4);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject(object) {
	    _classCallCheck(this, MovingObject);
	
	    this.pos = object.pos;
	    this.vel = object.vel;
	    this.radius = object.radius;
	    this.color = object.color;
	    this.game = object.game;
	    this.name = object.name;
	    this.textColor = object.textColor;
	  }
	
	  _createClass(MovingObject, [{
	    key: "drawText",
	    value: function drawText(ctx) {
	      ctx.textAlign = "center";
	      ctx.fillStyle = this.textColor;
	      ctx.font = "900 21px sans-serif";
	      ctx.fillText(this.name, this.pos[0], this.pos[1] - 10);
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      var image = document.getElementById("asteroid");
	      ctx.drawImage(image, this.pos[0], this.pos[1], 25, 25);
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      this.pos[0] += this.vel[0];
	      this.pos[1] += this.vel[1];
	    }
	  }, {
	    key: "collideWith",
	    value: function collideWith(otherObj) {}
	  }, {
	    key: "isCollidedWith",
	    value: function isCollidedWith(otherObj) {
	      if (otherObj && this) {
	        var distance = _util2.default.distance(this.pos, otherObj.pos);
	        return distance < this.radius + otherObj.radius;
	      }
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ship = function () {
	  function Ship() {
	    _classCallCheck(this, Ship);
	
	    this.pos = [220, 500];
	    this.color = "Blue";
	    this.radius = 10;
	  }
	
	  _createClass(Ship, [{
	    key: "draw",
	    value: function draw(ctx) {
	      var image = document.getElementById("ship");
	      ctx.drawImage(image, this.pos[0], this.pos[1], 40, 40);
	    }
	  }]);
	
	  return Ship;
	}();
	
	exports.default = Ship;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var words = exports.words = {
	  a: ["aardvark", "abaci", "aback", "abacus", "abaft", "abalone", "abandon", "abandoned", "abandonment", "abase", "abasement", "abash", "abashed", "abashedly", "abashment", "abate", "abatement", "abattoir", "abbe"],
	  b: ["brackishness", "bract", "brad", "brae", "brag", "braggadocio", "braggart", "bragger", "braid", "braided", "braiding", "braille", "brain", "brainchild", "brainchildren", "braininess", "brainless", "brainlessly", "brains", "brainstorm", "brainstorming", "brainteaser", "brainwash", "brainwashing", "brainy", "braise", "brake", "brakeman", "bramble", "brambly", "bran", "branch", "branched", "branchlik"],
	  c: ["compliment", "complimentary", "compliments", "comply", "component", "comport", "comportment", "compose", "composed", "composedly", "composer", "composite", "compositely", "composition", "compositor", "compost", "composure", "compote", "compound", "compoundable", "comprehend", "comprehensibility", "comprehensible", "comprehensibly", "comprehension", "comprehensive", "comprehensively", "comprehensiveness", "compress", "compressed", "compressible", "compression", "compressor", "comprise", "compromise"],
	  d: ["distressed", "distressful", "distressing", "distressingly", "distribute", "distribution", "distributive", "distributively", "distributor", "district", "distrust", "distrustful", "distrustfully", "disturb", "disturbance", "disturber", "disturbing", "disunion", "disunite", "disunity"],
	  e: ["epicenter", "epicure", "epicurean", "epidemic", "epidemically", "epidemiologist", "epidemiology", "epidermal", "epidermic", "epidermis", "epiglottis", "epigram", "epigrammatic", "epigraph", "epigraphy", "epilepsy", "epileptic", "epilog", "epilogue", "epinephrine", "epiphany", "episcopacy", "episcopal", "episcopate", "episode"],
	  f: ["fleet", "fleeting", "fleetingly", "fleetingness", "fleetly", "fleetness", "flesh", "fleshed", "fleshly", "fleshpot", "fleshy", "flew", "flex", "flexibility", "flexible", "flexibly", "flextime", "flibbertigibbet", "flick", "flicker", "flied", "flier", "flies", "flight"],
	  g: ["gardening", "gardens", "garfish", "gargantuan", "gargle", "gargoyle", "garish", "garishly", "garishness", "garland", "garlic", "garlicky", "garment", "garner", "garnet", "garnish", "garnishee", "garnishment", "garote", "garret", "garrison", "garrote", "garroter", "garrotte"],
	  h: ["hawker", "hawkish", "hawkishness", "hawser", "hawthorn", "hay", "haycock", "hayloft", "haymow", "hayrick", "hayride", "hayseed", "haystack", "haywire", "hazard", "hazardous", "hazardously", "haze", "hazel", "hazelnut", "hazer"],
	  i: ["invisible", "invisibly", "invitation", "invitational", "invite", "invitee", "inviting", "invitingly", "invocation", "invoice", "invoke", "involuntarily", "involuntariness", "involuntary", "involution", "involve", "involved", "involvement", "invulnerability", "invulnerable", "invulnerably", "inward", "inwardly", "inwards"],
	  j: ["jocundity", "jocundly", "jodhpurs", "jog", "jogger", "jogging", "joggle", "john", "johnnycake", "join", "joiner", "joinery", "jointed", "jointly", "joist", "joke", "joker", "jokey"],
	  k: ["kinfolks", "king", "kingdom", "kingfisher", "kingly", "kingpin", "kingship", "kinkily", "kinkiness", "kinsfolk", "kinship", "kinsman", "kinswoman", "kiosk", "kipper", "kirk", "kirsch", "kismet", "kiss", "kissable", "kisser", "kissoff", "kit"],
	  l: ["lovelorn", "lovely", "lovemaking", "lover", "loveseat", "lovesick", "loving", "lovingly", "low", "lowborn", "lowboy", "lowbrow", "lowdown", "lower", "lowercase", "lowermost", "lowland", "lowlander", "lowlands", "lowliness", "lowly", "lowness", "lox", "loyal", "loyalism", "loyalist", "loyally", "loyalty"],
	  m: ["minibus", "minicam", "minicomputer", "minim", "minima", "minimal", "minimalism", "minimalist", "minimally", "minimize", "minimum", "mining", "minion", "miniscule", "miniseries", "miniskirt", "minister", "ministerial", "ministrant", "ministration", "ministry", "minivan", "mink", "minnesinger", "minnow", "minor", "minoxidil", "minstrel", "minstrels"],
	  n: ["nonautomotive", "nonavailability", "nonbasic", "nonbeliever", "nonbelligerent", "nonbinding", "nonbreakable", "nonburnable", "noncaloric", "noncancerous", "nonce", "nonchalance", "nonchalant", "nonchalantly", "nonchargeable", "nonclerical", "nonclinical", "noncollectable", "noncom", "noncombat", "noncombatant", "noncombustible", "noncommercial", "noncommittal"],
	  o: ["overfed", "overfeed", "overfill", "overflew", "overflight", "overflow", "overflown", "overfly", "overfond", "overfull", "overgeneralize", "overgenerous", "overgraze", "overgrew", "overgrow", "overgrown", "overgrowth", "overhand", "overhanded", "overhang", "overhasty"],
	  p: ["posting", "postlude", "postman", "postmark", "postmaster", "postmenopausal", "postmeridian", "postmistress", "postmodern", "postmodernism", "postmodernist", "postmortem", "postnasal", "postnatal", "postoperative", "postpaid", "postpartum", "postpone", "postponement", "postprandial", "postscript"],
	  q: ["quickstep", "quid", "quiescence", "quiescent", "quiescently", "quiet", "quietly", "quietness", "quietude", "quietus", "quill", "quilt", "quilted", "quilter", "quilting", "quince", "quinine", "quinsy", "quint", "quintessence"],
	  r: ["recite", "reciter", "reckless", "recklessly", "recklessness", "reckon", "reckoning", "reclaim", "reclaimable", "reclamation", "reclassification", "reclassify", "recline", "recliner", "recluse", "reclusive", "recognition", "recognizable", "recognizably", "recognizance", "recognize", "recoil", "recollect"],
	  s: ["seasoned", "seasoning", "seat", "seating", "seatmate", "seawall", "seaward", "seawards", "seawater", "seaway", "seaweed", "seaworthiness", "seaworthy", "sebaceous", "seborrhea", "sec", "secant", "secede", "secession", "secessionist", "seclude", "secluded", "seclusion", "seclusive", "second", "secondarily", "secondary", "seconder"],
	  t: ["tubful", "tubing", "tubular", "tubule", "tuck", "tucker", "tuft", "tufted", "tufter", "tug", "tugboat", "tuition", "tularemia", "tulip", "tulle", "tumble", "tumbledown", "tumbler", "tumbleweed", "tumbling", "tumbrel", "tumbril"],
	  u: ["unisex", "unison", "unit", "unitary", "unite", "united", "unitedly", "unitize", "unity", "univalent", "univalve", "universal", "universality", "universalize", "universally", "universe", "university", "unjust", "unjustifiable"],
	  v: ["visit", "visitant", "visitation", "visitor", "visor", "vista", "visual", "visualization", "visualize", "visualizer", "visually", "vita", "vitae", "vital", "vitality", "vitalization", "vitalize", "vitally", "vitals", "vitamin", "vitiate", "vitiation", "viticulture", "viticulturist", "vitreous"],
	  w: ["wrap", "wraparound", "wrapper", "wrapping", "wrappings", "wrasse", "wrath", "wrathful", "wrathfully", "wreak", "wreath", "wreathe", "wreck", "wreckage", "wrecker", "wren", "wrench", "wrenching", "wrest", "wrestle", "wrestler", "wrestling"],
	  x: ["xenon", "xenophobe", "xenophobia", "xenophobic", "xerographic", "xerography", "xerox", "xylem", "xylophone", "xylophonist"],
	  y: ["yet", "yeti", "yew", "yield", "yielding", "yikes", "yin", "yip", "yipe", "yippee", "yodel", "yodeler", "yoga", "yoghurt", "yogi", "yogurt", "yoke", "yokel", "yolk", "yolked", "yon", "yonder", "yore", "you", "young"],
	  z: ["zinc", "zinfandel", "zing", "zinger", "zingy", "zinnia", "zip", "zipper", "zippy", "zircon", "zirconium", "zit", "zither", "zodiac", "zodiacal", "zombie", "zonal", "zonally", "zone", "zoned", "zoning", "zonked", "zoo"]
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(4);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _asteroid = __webpack_require__(3);
	
	var _asteroid2 = _interopRequireDefault(_asteroid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Bullet = function () {
	  function Bullet(vel, game, astTarget) {
	    _classCallCheck(this, Bullet);
	
	    this.pos = [220, 500];
	    this.vel = vel;
	    this.game = game;
	    this.radius = 5;
	    this.astTarget = astTarget;
	  }
	
	  _createClass(Bullet, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      var bullet = document.getElementById("bullet");
	      ctx.drawImage(bullet, this.pos[0], this.pos[1], 30, 30);
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      this.pos[0] += this.vel[0];
	      this.pos[1] += this.vel[1];
	    }
	  }, {
	    key: 'isCollidedWith',
	    value: function isCollidedWith(otherObject) {
	      var dist = _util2.default.distance(this.pos, otherObject.pos);
	      return dist < this.radius + otherObject.radius && otherObject === this.astTarget;
	    }
	  }, {
	    key: 'drawExplosion',
	    value: function drawExplosion(ctx) {
	      var explosion = document.getElementById("explosion");
	      ctx.drawImage(explosion, this.pos[0], this.pos[1], 30, 30);
	    }
	  }, {
	    key: 'playExplosion',
	    value: function playExplosion() {
	      var explosion = new Audio("../sounds/explosion.wav");
	      explosion.play();
	    }
	  }, {
	    key: 'collideWith',
	    value: function collideWith(otherObj) {
	      var _this = this;
	
	      if (otherObj instanceof _asteroid2.default) {
	        this.game.bullets.splice(this.game.bullets.indexOf(this), 1);
	        if (otherObj.bulletsTaken === otherObj.bulletsNeeded) {
	          (function () {
	            var explosion = setInterval(function () {
	              return _this.drawExplosion(_this.game.ctx);
	            }, 10);
	            _this.playExplosion();
	            setTimeout(function () {
	              return clearInterval(explosion);
	            }, 300);
	            _this.game.destroyedAsteroids.push(otherObj);
	            _this.game.asteroids.splice(_this.game.asteroids.indexOf(otherObj), 1);
	            _this.game.currentWordIndex = "";
	          })();
	        }
	      }
	    }
	  }]);
	
	  return Bullet;
	}();
	
	exports.default = Bullet;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map