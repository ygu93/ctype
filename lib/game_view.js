import Game from './game.js';

class GameView{
  constructor(ctx){
    this.ctx = ctx;
    this.game = new Game(this.ctx);
  }


  start(){
    this.bindKeyHandlers();
    let gameStart = setInterval(()=>{
      if(this.game.ship === null){
        clearInterval(gameStart);
        this.game.gameOver();
      }
      this.game.draw(this.ctx);
      this.game.step();
    }, 20);
  }


  bindKeyHandlers(){
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach((letter)=> key(letter, ()=> this.game.getInput(letter)));
    key('enter', ()=>this.game.useBomb());
  }


}

export default GameView;
