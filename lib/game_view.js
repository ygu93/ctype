import Game from './game.js';

class GameView{
  constructor(ctx){
    this.ctx = ctx;
    this.game = null;
    this.volume =  null;
    this.running = true;
    this.bindKeyHandlers();
    this.bindVolumeButton();
  }

  restart(){
    this.game = new Game(this.ctx, this, true);
    let gameStart = setInterval(()=>{
      if(this.game.ship === null){
        clearInterval(gameStart);
        this.game.gameOver();
        this.game = new Game(this.ctx, this);
      }
      this.game.draw(this.ctx);
      this.game.step();
    }, 20);
  }

  startAnim(){
    this.anim = setInterval(()=>{
      if(this.game.ship === null){
        clearInterval(this.anim);
        this.game.gameOver();
      }
      this.game.draw(this.ctx);
      this.game.step();
    }, 20);
  }



  start(){
    this.volume = !(document.getElementById('bg-music').paused);
    this.game = new Game(this.ctx, this);
    let gameStart = setInterval(()=>{
      if(this.game.ship === null){
        clearInterval(gameStart);
        this.game.gameOver();
        this.game = new Game(this.ctx, this);
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

  bindPauseButton(play){
    let canvas = document.getElementById("game-canvas");
    canvas.addEventListener("click", (e)=> {
      let clickedX = e.pageX - canvas.offsetLeft;
      let clickedY = e.pageY - canvas.offsetTop;
      if(clickedX >= 430 && clickedY >= 560 && this.running){
        this.running = false;
        clearInterval(play);
      }else if(clickedX >= 430 && clickedY >= 560 && !this.running){
        this.running = true;
        let gameStart = setInterval(()=>{
          if(this.game.ship === null){
            clearInterval(gameStart);
            this.game.gameOver();
            this.game = new Game(this.ctx, this);
          }
          this.game.draw(this.ctx);
          this.game.step();
        }, 20);

      }
    });
  }

  bindVolumeButton(){
    let canvas = document.getElementById("game-canvas");
    canvas.addEventListener("click", (e)=> {
      let clickedX = e.pageX - canvas.offsetLeft;
      let clickedY = e.pageY - canvas.offsetTop;
      if(clickedX <= 50 && clickedY >= 560 && this.volume){
        document.getElementById('bg-music').pause();
        this.volume = !this.volume;
      }else if(clickedX <= 50 && clickedY >= 560 && !this.volume){
        document.getElementById('bg-music').play();
        this.volume = !this.volume;
      }
    });
  }


}

export default GameView;
