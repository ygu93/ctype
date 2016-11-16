import Asteroid from './asteroid.js';
import Ship from './ship';
import {words} from './words';

class Game{
  constructor(){
    this.asteroids = [];
    this.ship = new Ship(this);
    this.currentWordIndex = "";
    this.bullets = [];
    this.destroyedAsteroids = [];
    let intervalId = setInterval(()=> {
      this.generateAsteroid();
      if(this.asteroids.length + this.destroyedAsteroids.length === Game.NUM_ASTEROIDS){
        clearInterval(intervalId);
      }}
      , 2000);
  }

  generateAsteroid(){
    let letters = Object.keys(words);
    let letter = letters[Math.round(Math.random() * letters.length)];
    let waveWord = "";
    waveWord = (words[letter][Math.round((Math.random() * words[letter].length))]);
    this.asteroids.push(new Asteroid({pos:this.randomPosition(), name:waveWord}, this));
  }

  randomPosition(){
    return [Math.random() * Game.DIM_X, 0];
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
  }


  moveObjects(){
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
  }

  checkAsteroids(){
    if(this.currentWordIndex!== "" && this.asteroids[this.currentWordIndex].name === ""){
      this.destroyedAsteroids.push(this.asteroids[this.currentWordIndex]);
      this.currentWordIndex = "";
      this.asteroids.splice(this.currentWordIndex, 1);
    }
  }

  getInput(letter){
    letter = letter.toLowerCase();
    if(this.currentWordIndex !== ""){
      if(this.asteroids[this.currentWordIndex].name[0] === letter){
        this.asteroids[this.currentWordIndex].name = this.asteroids[this.currentWordIndex].name.slice(1);
      }
    }else{
      let word = this.asteroids.filter((asteroid) => asteroid.name[0] === letter);
      if(word.length!==0){
        word = word[0];
        let index = this.asteroids.indexOf(word);
        this.currentWordIndex = index;
        this.asteroids[index].textColor = 'orange';
        this.asteroids[index].name = this.asteroids[index].name.slice(1);
      }

    }
  }



}




Game.DIM_X = 480;
Game.DIM_Y = 720;
Game.NUM_ASTEROIDS = 5;




export default Game;
