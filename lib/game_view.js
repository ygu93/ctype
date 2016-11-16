import Game from './game.js';

class GameView{
  constructor(ctx){
    this.ctx = ctx;
    this.game = new Game;
  }

  start(){
    this.bindKeyHandlers();
    setInterval(()=>{
      this.game.draw(this.ctx);
      this.game.moveObjects();
      this.game.checkAsteroids();
    }, 20);
  }

  bindKeyHandlers(){
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach((letter)=> key(letter, ()=> this.game.getInput(letter)));

  }


}

export default GameView;
