import Asteroid from './asteroid.js';
import Ship from './ship';
import {words} from './words';
import Bullet from './bullet';
import Util from './util';

class Game{
  constructor(ctx){
    this.score = 0;
    this.ctx = ctx;
    this.wave = 1;
    this.astVel = 1000;
    this.timeStart = new Date().getTime();
    this.timeEnd = null;
    this.keysEntered = 0;
    this.errorKeys = 0;
    this.asteroids = [];
    this.ship = new Ship(this);
    this.currentWordIndex = "";
    this.bullets = [];
    this.destroyedAsteroids = [];
    this.generateAsteroid();
    let intervalId = setInterval(()=> {
      this.generateAsteroid();
      if(this.asteroids.length + this.destroyedAsteroids.length === Game.NUM_ASTEROIDS){
        clearInterval(intervalId);
      }}
      , 2000);
  }

  nextLevel(){
    Game.NUM_ASTEROIDS += (5+this.wave);
    this.wave +=1;
    this.astVel -= 75;
    let nextWave = setInterval(()=> {
      this.generateAsteroid();
      if(this.asteroids.length + this.destroyedAsteroids.length === Game.NUM_ASTEROIDS){
        clearInterval(nextWave);
      }}
      , 1500);
  }

  playLaserSound(){
    let laser = new Audio("../sounds/laser.wav");
    laser.play();
  }

  playError(){
    let error = new Audio("../sounds/empty.wav");
    error.play();
  }

  useBomb(){
    let bomb = new Audio('../sounds/bomb.mp3');
    bomb.play();
    this.asteroids.forEach((asteroid)=> {
      let explosion = setInterval(()=> this.drawExplosion(this.ctx, asteroid), 10);
      this.playExplosion();
      setTimeout(()=>clearInterval(explosion), 300);
      this.destroyedAsteroids.push(asteroid);
    });
    this.asteroids = [];
  }

  drawExplosion(ctx, asteroid){
    let explosion = document.getElementById("explosion");
    ctx.drawImage(
      explosion,
      asteroid.pos[0],
      asteroid.pos[1],
      30,
      30);
  }

  playExplosion(){
    let explosion = new Audio("../sounds/explosion.wav");
    explosion.play();
  }


  generateAsteroid(){
    let letters = Object.keys(words);
    let letter = letters[Math.round(Math.random() * letters.length)];
    let waveWord = null;
    if(words[letter]){
      waveWord = (words[letter][Math.round((Math.random() * words[letter].length))]);
    }
    if(waveWord){
      this.asteroids.push(new Asteroid({pos:this.randomPosition(), name:waveWord}, this, this.astVel));
    }
  }

  randomPosition(){
    return [Math.random() * Game.DIM_X, 0];
  }

  drawStats(){
    this.ctx.fillStyle = '#87ceeb';
    this.ctx.font = "900 21px sans-serif";
    this.ctx.fillText(`Wave ${this.wave} Score: ${this.score}`, 230, 590);
  }

  draw(ctx){
    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    let background = document.getElementById("background");
    ctx.drawImage(
      background,
      0,
      0,
      480,
      720);
    this.ship.draw(ctx);
    this.asteroids.forEach(asteroid=> {
      return(
      asteroid.draw(ctx),
      asteroid.drawText(ctx)
    );
    });
    this.bullets.forEach(bullet=> bullet.draw(ctx));
    if(this.destroyedAsteroids.length === Game.NUM_ASTEROIDS){
      this.nextLevel();
    }
    this.drawStats();
  }


  moveObjects(){
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
    for (var j = 0; j < this.bullets.length; j++) {
      this.bullets[j].move();
    }
  }

  step(){
    this.moveObjects();
    this.checkCollisions();
    this.checkAsteroids();
  }

  checkCollisions(){
    for (var i = 0; i < this.bullets.length; i++) {
      for (var j = 0; j < this.asteroids.length; j++) {
        if(this.bullets[i] && this.bullets[i].isCollidedWith(this.asteroids[j])){
          this.asteroids[j].bulletsTaken = this.asteroids[j].bulletsTaken + 1;
          this.bullets[i].collideWith(this.asteroids[j]);
        }
      }
    }
    for (var k = 0; k < this.asteroids.length; k++) {
      if(this.asteroids[k].isCollidedWith(this.ship)){
        this.asteroids[k].collideWith(this.ship);
      }
    }
  }

  checkAsteroids(){
    if(this.currentWordIndex!== "" && this.asteroids[this.currentWordIndex].name === ""){
      this.currentWordIndex = "";
    }
  }
  fireBullet(asteroid){
    let bullet = new Bullet(Util.vecToAsteroid(this.asteroids[this.currentWordIndex].pos, 30), this, asteroid);
    this.bullets.push(bullet);
    this.playLaserSound();
  }

  addScore(){
    this.score += (2*this.wave);
  }


  getInput(letter){
    this.keysEntered += 1;
    if(this.currentWordIndex !== ""){
      if(this.asteroids[this.currentWordIndex].name[0] === letter){
        this.fireBullet(this.asteroids[this.currentWordIndex]);
        this.asteroids[this.currentWordIndex].name = this.asteroids[this.currentWordIndex].name.slice(1);
        this.addScore();
      }else{
        this.errorKeys += 1;
        this.playError();
      }
    }else{
      let word = this.asteroids.filter((asteroid) => asteroid.name[0] === letter);
      if(word.length!==0){
        word = word[0];
        let index = this.asteroids.indexOf(word);
        this.currentWordIndex = index;
        this.asteroids[index].textColor = 'orange';
        this.asteroids[index].name = this.asteroids[index].name.slice(1);
        this.fireBullet(this.asteroids[index]);
        this.addScore();
      }else{
        this.errorKeys += 1;
        this.playError();
      }

    }
  }


}




Game.DIM_X = 480;
Game.DIM_Y = 720;
Game.NUM_ASTEROIDS = 5;




export default Game;
